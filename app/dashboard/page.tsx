import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { learnerGoals } from "@/data/siteContent";
import { logOut } from "@/app/auth/actions";
import { Ar, Franco, WithArabic } from "@/components/Arabic";
import { BookButton, BookingProvider } from "@/components/BookingProvider";
import { LocalTime } from "@/components/LocalTime";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { demoDashboardData, loadDashboardData } from "@/lib/dashboardData";
import { isAdminEmail, isSupabaseConfigured } from "@/lib/siteConfig";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Booking, WorldFocus } from "@/lib/types";
import { focusBadge, focusLabel } from "@/lib/worlds";

export const metadata: Metadata = { title: "My dashboard" };

// Always rendered per request: it shows one student's private data.
export const dynamic = "force-dynamic";

const statusBadge: Record<Booking["status"], { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "border-carnelian-deep text-carnelian-deep",
  },
  confirmed: { label: "Confirmed", className: "border-malachite text-malachite" },
  completed: { label: "Completed", className: "border-ink/60 text-ink" },
};

const isWebLink = (value: string | null): value is string =>
  Boolean(value && /^https?:\/\//i.test(value));

const formatDay = (isoDate: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));

function BookingRow({ booking }: { booking: Booking }) {
  const badge = statusBadge[booking.status];
  return (
    <li className="py-4">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <p className="font-semibold">{booking.service_title}</p>
          <p className="text-base">
            {booking.scheduled_at ? (
              <LocalTime iso={booking.scheduled_at} />
            ) : (
              <>
                Time to be confirmed
                {booking.preferred_schedule
                  ? ` · you suggested: ${booking.preferred_schedule}`
                  : ""}
              </>
            )}
          </p>
        </div>
        <span className={`badge ${badge.className}`}>{badge.label}</span>
      </div>
      {booking.status === "confirmed" && isWebLink(booking.meeting_link) && (
        <a
          href={booking.meeting_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-3 !px-4 !py-2"
        >
          Join the video call ↗
        </a>
      )}
    </li>
  );
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  let data;
  let viewer = null;
  let isAdmin = false;

  if (!supabase) {
    data = demoDashboardData();
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?next=/dashboard");
    data = await loadDashboardData(supabase, user);
    viewer = { name: data.profile.full_name ?? "", email: user.email ?? "" };
    isAdmin = isAdminEmail(user.email);
  }

  const { profile, bookings, topics } = data;
  const firstName = (profile.full_name ?? "").trim().split(/\s+/)[0];

  // Soonest class first; requests without a time yet go last.
  const upcoming = bookings
    .filter((booking) => booking.status !== "completed")
    .sort((a, b) => {
      if (a.scheduled_at && b.scheduled_at) {
        return a.scheduled_at.localeCompare(b.scheduled_at);
      }
      if (a.scheduled_at) return -1;
      if (b.scheduled_at) return 1;
      return b.created_at.localeCompare(a.created_at);
    });
  const past = bookings
    .filter((booking) => booking.status === "completed")
    .sort((a, b) =>
      (b.scheduled_at ?? b.created_at).localeCompare(a.scheduled_at ?? a.created_at),
    );

  const focusCount = (focus: WorldFocus) =>
    topics.filter(
      (topic) => topic.world_focus === focus || topic.world_focus === "All Three",
    ).length;
  const focusAreas: { focus: WorldFocus; dot: string }[] = [
    { focus: "Fusha", dot: "bg-lapis" },
    { focus: "Egyptian", dot: "bg-carnelian" },
    { focus: "Quranic", dot: "bg-malachite" },
  ];

  const goalLabel = learnerGoals.find(
    (goal) => goal.value === profile.learning_goal,
  )?.label;
  const progress = Math.min(100, Math.max(0, profile.progress_percent));

  return (
    <BookingProvider viewer={viewer}>
      <SiteHeader viewer={viewer} />
      <main id="main" className="mx-auto max-w-content px-4 py-10 md:px-6 md:py-14">
        {!isSupabaseConfigured && (
          <p className="mb-8 rounded-md border border-gold bg-papyrus-deep p-4 text-base">
            <strong>Preview mode.</strong> This is a sample student so you can
            see how the dashboard looks. Connect Supabase (see the README) and
            students will see their own classes, progress, and topics here.
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Student portal</p>
            <h1 className="h-section mt-2">
              <Ar className="font-bold text-lapis">أَهْلًا</Ar>
              {firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-1 text-base">
              <Franco>ahlan</Franco> · welcome back.
              {goalLabel ? ` Your goal: ${goalLabel}.` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link href="/admin" className="btn-outline !px-4 !py-2">
                Teacher view
              </Link>
            )}
            {viewer && (
              <form action={logOut}>
                <button type="submit" className="btn-outline !px-4 !py-2">
                  Log out
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Booked & scheduled classes */}
          <section aria-labelledby="classes-title" className="card p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="classes-title" className="h-card">
                Booked &amp; scheduled classes
              </h2>
              <BookButton className="btn-primary !px-4 !py-2">
                Book another session
              </BookButton>
            </div>

            <h3 className="mt-6 text-sm font-semibold uppercase text-lapis"
              style={{ letterSpacing: "0.1em" }}>
              Upcoming
            </h3>
            {upcoming.length > 0 ? (
              <ul className="divide-y divide-gold/60">
                {upcoming.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-base">
                Nothing booked yet. Pick a class and we&apos;ll confirm a time by
                email.
              </p>
            )}

            {past.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-semibold uppercase text-lapis"
                  style={{ letterSpacing: "0.1em" }}>
                  Completed
                </h3>
                <ul className="divide-y divide-gold/60">
                  {past.map((booking) => (
                    <BookingRow key={booking.id} booking={booking} />
                  ))}
                </ul>
              </>
            )}
          </section>

          {/* Learning progress */}
          <section aria-labelledby="progress-title" className="card p-6 md:p-7">
            <h2 id="progress-title" className="h-card">
              Learning progress
            </h2>

            <div className="mt-5 flex items-baseline justify-between">
              <span className="text-base font-semibold">Overall</span>
              <span className="text-2xl font-semibold text-malachite">{progress}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Overall learning progress"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-2 h-4 rounded-full border border-gold bg-gold/20 p-0.5"
            >
              <div
                className="h-full rounded-full bg-malachite"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h3 className="mt-6 text-sm font-semibold uppercase text-lapis"
              style={{ letterSpacing: "0.1em" }}>
              Where you are now
            </h3>
            <p className="mt-1 text-base">
              {profile.level_note ? (
                <WithArabic text={profile.level_note} />
              ) : (
                "Your teacher will add a level note after your first session."
              )}
            </p>

            <h3 className="mt-6 text-sm font-semibold uppercase text-lapis"
              style={{ letterSpacing: "0.1em" }}>
              Focus areas
            </h3>
            <ul className="mt-2 space-y-2">
              {focusAreas.map(({ focus, dot }) => {
                const count = focusCount(focus);
                return (
                  <li key={focus} className="flex items-center justify-between gap-3 text-base">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${count > 0 ? dot : "border border-ink/40"}`}
                        aria-hidden="true"
                      />
                      <span className={count > 0 ? "font-semibold" : ""}>
                        {focusLabel[focus]}
                      </span>
                    </span>
                    <span>
                      {count > 0
                        ? `${count} ${count === 1 ? "lesson" : "lessons"}`
                        : "Not started"}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-baseline justify-between border-t border-gold pt-4">
              <span className="text-base font-semibold">Sessions completed</span>
              <span className="text-2xl font-semibold text-lapis">{past.length}</span>
            </p>
          </section>
        </div>

        {/* Topics & roots covered so far */}
        <section aria-labelledby="topics-title" className="mt-10">
          <h2 id="topics-title" className="h-card">
            Topics &amp; roots covered so far
          </h2>

          {topics.length > 0 ? (
            <ol className="mt-5 space-y-5">
              {topics.map((topic) => (
                <li key={topic.id} className="card p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <time dateTime={topic.session_date} className="text-base font-semibold">
                      {formatDay(topic.session_date)}
                    </time>
                    <span className={`badge ${focusBadge[topic.world_focus]}`}>
                      {focusLabel[topic.world_focus]}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {topic.root_arabic && (
                      <p className="rounded-md border border-gold bg-papyrus px-4 text-center">
                        <Ar sized className="block text-[1.75rem] font-bold text-lapis">
                          {topic.root_arabic}
                        </Ar>
                        {topic.root_franco && (
                          <Franco className="block pb-2">{topic.root_franco}</Franco>
                        )}
                      </p>
                    )}
                    <h3 className="h-card flex-1">
                      <WithArabic text={topic.topic_title} />
                    </h3>
                  </div>

                  {topic.summary && (
                    <p className="mt-3 text-base">
                      <WithArabic text={topic.summary} />
                    </p>
                  )}
                  {topic.homework_note && (
                    <p className="mt-3 border-t border-gold/60 pt-3 text-base">
                      <span className="font-semibold text-carnelian-deep">Homework: </span>
                      <WithArabic text={topic.homework_note} />
                    </p>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-base">
              After each class, the root and topic you covered will appear here
              with your homework.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </BookingProvider>
  );
}
