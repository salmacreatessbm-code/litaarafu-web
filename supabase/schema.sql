-- =====================================================================
-- لِتَعَارَفُوا (Li-ta'arafu) · database schema
--
-- How to run: Supabase dashboard -> SQL Editor -> New query -> paste this
-- whole file -> Run. It is safe to run more than once.
--
-- Security model
--   * Students can read only their own profile, bookings and topics.
--   * Students can edit only their own name and learning goal.
--   * Anyone can submit a booking request or join the newsletter, but
--     only as a new "pending" row. Nobody can read other people's rows.
--   * Progress, confirmations, meeting links and covered topics are
--     written by the teacher from /admin, which uses the service-role
--     key on the server (the service role bypasses Row-Level Security).
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. profiles: one row per student account
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  full_name        text,
  email            text,
  learning_goal    text,
  level_note       text,
  progress_percent integer not null default 0
                   check (progress_percent between 0 and 100),
  created_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2. bookings: class requests, from guests and signed-in students
-- ---------------------------------------------------------------------
create table if not exists public.bookings (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users (id) on delete set null,
  student_name       text not null,
  student_email      text not null,
  service_slug       text not null,
  service_title      text not null,
  price_eur          numeric(8, 2) not null check (price_eur >= 0),
  preferred_schedule text,
  timezone           text,
  status             text not null default 'pending'
                     check (status in ('pending', 'confirmed', 'completed')),
  -- Set by the teacher when the class is confirmed.
  scheduled_at       timestamptz,
  meeting_link       text,
  notes              text,
  created_at         timestamptz not null default now()
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_student_email_idx
  on public.bookings (lower(student_email));

-- ---------------------------------------------------------------------
-- 3. covered_topics: the lesson log shown in the student dashboard
-- ---------------------------------------------------------------------
create table if not exists public.covered_topics (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  session_date  date not null default current_date,
  root_arabic   text,
  root_franco   text,
  topic_title   text not null,
  world_focus   text not null default 'All Three'
                check (world_focus in ('Fusha', 'Egyptian', 'Quranic', 'All Three')),
  summary       text,
  homework_note text,
  created_at    timestamptz not null default now()
);

create index if not exists covered_topics_user_id_idx
  on public.covered_topics (user_id, session_date desc);

-- ---------------------------------------------------------------------
-- 4. newsletter_subscribers: weekly roots & flashcards list
-- ---------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  learning_goal text,
  created_at    timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (lower(email));

-- =====================================================================
-- Row-Level Security
-- =====================================================================
alter table public.profiles               enable row level security;
alter table public.bookings               enable row level security;
alter table public.covered_topics         enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- profiles ------------------------------------------------------------
drop policy if exists "Students read their own profile" on public.profiles;
create policy "Students read their own profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Students update their own profile" on public.profiles;
create policy "Students update their own profile"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Students may change only their name and goal. Progress and level notes
-- belong to the teacher, so column-level privileges lock them down.
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (full_name, learning_goal) on public.profiles to authenticated;

-- bookings ------------------------------------------------------------
drop policy if exists "Students read their own bookings" on public.bookings;
create policy "Students read their own bookings"
  on public.bookings for select
  to authenticated
  using (user_id = (select auth.uid()));

-- A request always starts as "pending", with no time or meeting link, and
-- can be attached only to the account that is making it (or to no account).
drop policy if exists "Anyone can request a booking" on public.bookings;
create policy "Anyone can request a booking"
  on public.bookings for insert
  to anon, authenticated
  with check (
    status = 'pending'
    and scheduled_at is null
    and meeting_link is null
    and (user_id is null or user_id = (select auth.uid()))
  );

revoke update, delete on public.bookings from anon, authenticated;

-- covered_topics ------------------------------------------------------
drop policy if exists "Students read their own topics" on public.covered_topics;
create policy "Students read their own topics"
  on public.covered_topics for select
  to authenticated
  using (user_id = (select auth.uid()));

revoke insert, update, delete on public.covered_topics from anon, authenticated;

-- newsletter_subscribers ----------------------------------------------
drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

revoke select, update, delete on public.newsletter_subscribers
  from anon, authenticated;

-- =====================================================================
-- Automation
-- =====================================================================

-- When a student signs up: create their profile from the sign-up form.
-- When their email is verified: attach any earlier guest bookings made
-- with that same email address to their account.
create or replace function public.handle_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.profiles (id, full_name, email, learning_goal)
    values (
      new.id,
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      new.email,
      nullif(trim(new.raw_user_meta_data ->> 'learning_goal'), '')
    )
    on conflict (id) do nothing;
  else
    update public.profiles
       set email = new.email
     where id = new.id
       and email is distinct from new.email;
  end if;

  -- Only link once the address is verified, so nobody can claim someone
  -- else's bookings by signing up with an email they do not own.
  if new.email is not null and new.email_confirmed_at is not null then
    update public.bookings
       set user_id = new.id
     where user_id is null
       and lower(student_email) = lower(new.email);
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_auth_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of email, email_confirmed_at on auth.users
  for each row execute function public.handle_auth_user();

-- When a guest books with the email of an existing verified account,
-- attach the booking to that account straight away.
create or replace function public.link_booking_to_account()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.bookings b
     set user_id = u.id
    from auth.users u
   where b.id = new.id
     and b.user_id is null
     and u.email_confirmed_at is not null
     and lower(u.email) = lower(new.student_email);
  return null;
end;
$$;

drop trigger if exists on_booking_created on public.bookings;
create trigger on_booking_created
  after insert on public.bookings
  for each row
  when (new.user_id is null)
  execute function public.link_booking_to_account();
