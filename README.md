# لِتَعَارَفُوا · Li-ta'arafu

*To know one another.*

Website MVP v1: a public landing page with a weekly-newsletter sign-up, an interactive "One Root, Three Worlds" explorer, bookable classes, a student portal, and a teacher quick-update view.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase**, ready for **GitHub + Vercel**.

---

## What's inside

| Path | What it is |
| :--- | :--- |
| `data/siteContent.ts` | **Edit text and prices here.** Taglines, services, pricing, audience pathways, FAQs. |
| `data/rootsAndLessons.ts` | **Add roots here.** Weekly roots, flashcards, sample lesson and homework. |
| `lib/siteConfig.ts` | Reads every environment variable in one place. |
| `supabase/schema.sql` | Database tables, Row-Level Security policies, and automation. |
| `app/page.tsx` | Public landing page. |
| `app/login`, `app/signup` | Student authentication (Supabase Auth, email + password). |
| `app/dashboard` | Student dashboard: classes, progress, topics covered. |
| `app/admin` | Teacher quick-update view (only for `ADMIN_EMAIL`). |
| `app/api/subscribe`, `app/api/book` | Validated form endpoints. |
| `components/` | Page sections and shared pieces (logo, booking modal, forms). |

### Preview mode

The site builds and runs **before** Supabase is connected. In preview mode:

- the newsletter and booking forms validate and show success, but **nothing is saved** (a note says so);
- `/dashboard` shows a sample student so you can see the layout;
- `/login`, `/signup` and `/admin` show a short "connect Supabase" notice.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open <http://localhost:3000>. It starts in preview mode until you fill in `.env.local` (next step).

---

## 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. **Run the schema.** In the Supabase dashboard open **SQL Editor → New query**, paste the whole of `supabase/schema.sql`, and press **Run**. It is safe to run again later.
3. **Copy your keys.** In **Project Settings → API** you'll find the project URL, the `anon` public key, and the `service_role` key.
4. **Set the auth URLs.** In **Authentication → URL Configuration**:
   - **Site URL:** your live address, e.g. `https://your-site.vercel.app`
   - **Redirect URLs:** add `https://your-site.vercel.app/auth/callback` and `http://localhost:3000/auth/callback`
5. Leave **Authentication → Sign In / Providers → Email → Confirm email** switched **on**. Guest bookings are attached to a new account only after the email address is verified, which stops anyone claiming someone else's bookings.

### Fill in `.env.local`

| Variable | Required | Where it comes from |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | For `/admin` | Supabase → Project Settings → API. **Keep it secret.** |
| `ADMIN_EMAIL` | For `/admin` | The email you will sign up with as the teacher |
| `NEXT_PUBLIC_CAL_ASSESSMENT_URL` | Optional | Direct calendar link (Cal.com, Calendly…) for the assessment |
| `NEXT_PUBLIC_CAL_ONE_ON_ONE_URL` | Optional | Calendar link for 1:1 classes |
| `NEXT_PUBLIC_CAL_GROUP_URL` | Optional | Calendar link for group classes |
| `NEXT_PUBLIC_CAL_HOMEWORK_URL` | Optional | Calendar link for homework checks |
| `RESEND_API_KEY` | Optional | [resend.com](https://resend.com) → API Keys |
| `RESEND_FROM_EMAIL` | Optional | A sender address on a domain you verified in Resend |

Restart `npm run dev` after changing `.env.local`.

**About email (Resend).** With `RESEND_API_KEY` set, the site sends the welcome email to new subscribers, a receipt to people who book, and a notification to `ADMIN_EMAIL` for both. Until you verify your own domain in Resend and set `RESEND_FROM_EMAIL`, Resend's test sender only delivers to your own Resend account address, so students will not receive anything yet.

### Become the teacher

1. Set `ADMIN_EMAIL` to your email address.
2. Go to `/signup` and create an account with **that same email**. Confirm it from your inbox.
3. Open `/admin`.

---

## 3. Push to GitHub

```bash
git add .
```

```bash
git commit -m "update"
```

```bash
git push
```

`.env.local` is ignored by git, so your keys never reach GitHub.

---

## 4. Deploy on Vercel

1. At [vercel.com](https://vercel.com) choose **Add New → Project** and import this GitHub repository. Vercel detects Next.js by itself.
2. Under **Environment Variables**, add the same variables you put in `.env.local`.
3. Press **Deploy**.
4. Copy your live URL into Supabase (**Authentication → URL Configuration**, step 2.4 above).

From then on, every `git push` rebuilds and publishes the site in about a minute.

> `NEXT_PUBLIC_*` values are baked in when the site is built. If you change one in Vercel, press **Redeploy** for it to take effect.

---

## How the pieces work

### Bookings and accounts

- Anyone can request a class from the booking modal. Requests are saved as `pending`.
- If the student is signed in, the booking is attached to their account straight away.
- If they book as a guest and later sign up **with the same email**, the database attaches their earlier bookings automatically once the email is confirmed.
- Titles and prices are always taken from `data/siteContent.ts` on the server, never from the browser.

### The teacher view (`/admin`)

Pick a student from the dropdown, then:

- **(a)** update their progress percentage and level note;
- **(b)** confirm a class, set its date and time, and add the Zoom/Meet link;
- **(c)** log a "covered topic & homework" entry, which appears in the student's dashboard immediately.

Requests from people who have not created an account yet are listed at the bottom, so you can confirm those too.

Type class times in **your own local time**. Students see them converted to their time zone.

### Security

- Row-Level Security is on for every table. Students can read only their own rows, and can edit only their own name and learning goal.
- Progress, confirmations, meeting links and topics can be changed only from `/admin`, which checks `ADMIN_EMAIL` on the server on every action and uses the service-role key there.
- The service-role key is never sent to the browser. Do not prefix it with `NEXT_PUBLIC_`.

### Database tables

| Table | Purpose |
| :--- | :--- |
| `profiles` | One row per student: name, email, goal, level note, progress |
| `bookings` | Class requests and their status, time and meeting link |
| `covered_topics` | The lesson log shown in the dashboard |
| `newsletter_subscribers` | Weekly newsletter list |

Two additions beyond the original brief: `bookings.scheduled_at` (the confirmed class date and time) and the `newsletter_subscribers` table (so sign-ups have somewhere to be saved).

You can also open any table in Supabase's **Table Editor** and edit it like a spreadsheet.

---

## Quick-edit reference

| I want to… | Do this |
| :--- | :--- |
| Change text, prices, or the year-end promo | Edit `data/siteContent.ts` |
| Remove a discount | Set that service's `regularPriceEur` to `null` |
| Add a weekly root, flashcard, or lesson preview | Add an object in `data/rootsAndLessons.ts` |
| Add an FAQ | Add to `faqs` in `data/siteContent.ts` |
| Show a contact email in the footer | Fill in `brand.contactEmail` in `data/siteContent.ts` |
| Change colours | Edit `tailwind.config.ts` |
| Update a student | Log in at `/admin` |

### Writing Arabic on the site

- Always write Arabic with full *tashkeel*, and give the Egyptian Franco-Arab spelling beside it (`3` = ع, `2` = ء, `7` = ح, plus `q`, `kh`, `gh`, `sh`).
- In code, wrap Arabic in the `<Ar>` component from `components/Arabic.tsx`. It adds `lang="ar" dir="rtl"`, the Amiri font, line-height 2 and zero letter-spacing. Plain text passed through `<WithArabic>` is wrapped automatically.
- Never put `overflow: hidden`, `truncate`, letter-spacing or italics on Arabic.

---

## Commands

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Start the local development site |
| `npm run build` | Production build, with type and lint checks |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint only |
