import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logOut } from "@/app/auth/actions";
import { logTopic, updateProgress } from "@/app/admin/actions";
import { BookingAdminForm } from "@/components/admin/BookingAdminForm";
import { BrandLogo } from "@/components/BrandLogo";
import { getServerConfig, isAdminEmail, isSupabaseConfigured } from "@/lib/siteConfig";
import { createSupabaseAdminClient, getCurrentUser } from "@/lib/supabase/server";
import {
  WORLD_FOCUS_OPTIONS,
  type Booking,
  type CoveredTopic,
  type Profile,
} from "@/lib/types";
import { focusLabel } from "@/lib/worlds";

export const metadata: Metadata = {
  title: "Teacher view",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gold">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2 md:px-6">
          <BrandLogo />
          <span className="badge border-lapis text-lapis">Teacher view</span>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-content px-4 py-10 md:px-6">
        {children}
      </main>
    </div>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Shell>
      <div className="card max-w-[40rem] p-6 md:p-8">
        <h1 className="h-card">{title}</h1>
        <div className="mt-3 space-y-3 text-base">{children}</div>
      </div>
    </Shell>
  );
}

function BookingItem({
  booking,
  studentId,
}: {
  booking: Booking;
  studentId: string | null;
}) {
  return (
    <li className="border-t border-gold/60 py-5 first:border-t-0 first:pt-0">
      <p className="font-semibold">
        {booking.service_title} · €{Number(booking.price_eur)}
      </p>
      <p className="text-base">
        {booking.student_name} ({booking.student_email}) · currently{" "}
        <strong>{booking.status}</strong>
      </p>
      <p className="text-base">
        Usually free: {booking.preferred_schedule ?? "not given"}
        {booking.timezone ? ` · ${booking.timezone}` : ""}
      </p>
      {booking.notes && <p className="text-base">Notes: {booking.notes}</p>}
      <BookingAdminForm booking={booking} studentId={studentId} />
    </li>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string; saved?: string; error?: string }>;
}) {
  const { student: studentParam, saved, error } = await searchParams;

  if (!isSupabaseConfigured) {
    return (
      <Notice title="Connect Supabase first">
        <p>
          The teacher view works once Supabase is connected. Follow the steps
          in the README, then come back to this page.
        </p>
      </Notice>
    );
  }

  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");

  if (!isAdminEmail(user.email)) {
    return (
      <Notice title="This page is for the teacher only">
        <p>
          {getServerConfig().adminEmail
            ? "You're logged in with a student account."
            : "No teacher account is set yet. Add ADMIN_EMAIL to the environment variables, then redeploy."}
        </p>
        <p>
          <Link href="/dashboard" className="font-semibold text-lapis underline">
            Go to my dashboard
          </Link>
        </p>
      </Notice>
    );
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return (
      <Notice title="One more setting needed">
        <p>
          Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to your environment
          variables (Supabase → Project Settings → API), then redeploy. The
          teacher view uses it to update students&apos; records.
        </p>
      </Notice>
    );
  }

  const [studentsResult, guestResult] = await Promise.all([
    admin
      .from("profiles")
      .select("*")
      .order("full_name", { ascending: true, nullsFirst: false }),
    admin
      .from("bookings")
      .select("*")
      .is("user_id", null)
      .neq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);
  const students = (studentsResult.data as Profile[] | null) ?? [];
  const guestBookings = (guestResult.data as Booking[] | null) ?? [];
  const loadError = studentsResult.error ?? guestResult.error;

  const student = students.find((item) => item.id === studentParam) ?? null;

  let bookings: Booking[] = [];
  let topics: CoveredTopic[] = [];
  if (student) {
    const [bookingsResult, topicsResult] = await Promise.all([
      admin
        .from("bookings")
        .select("*")
        .eq("user_id", student.id)
        .order("created_at", { ascending: false }),
      admin
        .from("covered_topics")
        .select("*")
        .eq("user_id", student.id)
        .order("session_date", { ascending: false })
        .limit(5),
    ]);
    bookings = (bookingsResult.data as Booking[] | null) ?? [];
    topics = (topicsResult.data as CoveredTopic[] | null) ?? [];
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Teacher quick-update</p>
          <h1 className="h-section mt-2">Update a student</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard" className="btn-outline !px-4 !py-2">
            My dashboard
          </Link>
          <form action={logOut}>
            <button type="submit" className="btn-outline !px-4 !py-2">
              Log out
            </button>
          </form>
        </div>
      </div>

      {saved && (
        <p role="status" className="mt-6 rounded-md border border-malachite bg-papyrus-light p-3 font-semibold text-malachite">
          {saved}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-6 rounded-md border border-carnelian-deep bg-papyrus-light p-3 font-semibold text-carnelian-deep">
          {error}
        </p>
      )}
      {loadError && (
        <p role="alert" className="mt-6 rounded-md border border-carnelian-deep bg-papyrus-light p-3 text-base text-carnelian-deep">
          Could not load data from Supabase. Check that you ran
          supabase/schema.sql and that the service-role key is correct.
        </p>
      )}

      {/* Student picker: a plain GET form, so it works without JavaScript. */}
      <form method="get" className="card mt-6 flex flex-wrap items-end gap-4 p-5">
        <div className="min-w-[16rem] flex-1">
          <label htmlFor="student" className="field-label">
            Student
          </label>
          <select
            id="student"
            name="student"
            defaultValue={student?.id ?? ""}
            required
            className="field"
          >
            <option value="" disabled>
              {students.length > 0
                ? "Choose a registered student"
                : "No students have signed up yet"}
            </option>
            {students.map((item) => (
              <option key={item.id} value={item.id}>
                {item.full_name || "(no name)"} · {item.email}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary">
          Open student
        </button>
      </form>

      {student && (
        <div className="mt-8 space-y-8">
          {/* (a) Progress */}
          <section aria-labelledby="admin-progress" className="card p-6">
            <h2 id="admin-progress" className="h-card">
              Progress &amp; level note
            </h2>
            <form action={updateProgress} className="mt-4 grid gap-4 md:grid-cols-[10rem_1fr_auto] md:items-end">
              <input type="hidden" name="studentId" value={student.id} />
              <div>
                <label htmlFor="progressPercent" className="field-label">
                  Progress (0–100%)
                </label>
                <input
                  id="progressPercent"
                  name="progressPercent"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  required
                  defaultValue={student.progress_percent}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="levelNote" className="field-label">
                  Current level note
                </label>
                <input
                  id="levelNote"
                  name="levelNote"
                  type="text"
                  maxLength={1000}
                  defaultValue={student.level_note ?? ""}
                  placeholder="e.g. Reads vowelled text slowly; confident with greetings"
                  className="field"
                />
              </div>
              <button type="submit" className="btn-primary">
                Save
              </button>
            </form>
          </section>

          {/* (b) Bookings */}
          <section aria-labelledby="admin-bookings" className="card p-6">
            <h2 id="admin-bookings" className="h-card">
              Booked classes
            </h2>
            {bookings.length > 0 ? (
              <ul className="mt-4">
                {bookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} studentId={student.id} />
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-base">This student has no bookings yet.</p>
            )}
          </section>

          {/* (c) Covered topic & homework */}
          <section aria-labelledby="admin-topic" className="card p-6">
            <h2 id="admin-topic" className="h-card">
              Log a covered topic &amp; homework
            </h2>
            <form action={logTopic} className="mt-4 grid gap-4 md:grid-cols-2">
              <input type="hidden" name="studentId" value={student.id} />
              <div>
                <label htmlFor="sessionDate" className="field-label">
                  Session date
                </label>
                <input
                  id="sessionDate"
                  name="sessionDate"
                  type="date"
                  required
                  defaultValue={today}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="worldFocus" className="field-label">
                  World focus
                </label>
                <select id="worldFocus" name="worldFocus" defaultValue="All Three" className="field">
                  {WORLD_FOCUS_OPTIONS.map((focus) => (
                    <option key={focus} value={focus}>
                      {focusLabel[focus]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rootArabic" className="field-label">
                  Root in Arabic
                </label>
                <input
                  id="rootArabic"
                  name="rootArabic"
                  type="text"
                  lang="ar"
                  dir="rtl"
                  maxLength={60}
                  placeholder="ع - ر - ف"
                  className="field !font-arabic text-xl"
                />
              </div>
              <div>
                <label htmlFor="rootFranco" className="field-label">
                  Root in Franco-Arab
                </label>
                <input
                  id="rootFranco"
                  name="rootFranco"
                  type="text"
                  maxLength={60}
                  placeholder="3 - R - F"
                  className="field"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="topicTitle" className="field-label">
                  Topic title
                </label>
                <input
                  id="topicTitle"
                  name="topicTitle"
                  type="text"
                  required
                  minLength={2}
                  maxLength={200}
                  className="field"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="summary" className="field-label">
                  Lesson summary
                </label>
                <textarea id="summary" name="summary" rows={3} maxLength={4000} className="field" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="homeworkNote" className="field-label">
                  Homework
                </label>
                <textarea id="homeworkNote" name="homeworkNote" rows={2} maxLength={2000} className="field" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-primary">
                  Add to {student.full_name?.split(" ")[0] || "student"}&apos;s dashboard
                </button>
              </div>
            </form>

            {topics.length > 0 && (
              <div className="mt-6 border-t border-gold pt-4">
                <h3 className="text-base font-semibold">Most recent entries</h3>
                <ul className="mt-2 space-y-1 text-base">
                  {topics.map((topic) => (
                    <li key={topic.id}>
                      {topic.session_date} · {topic.topic_title} ({focusLabel[topic.world_focus]})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Guest requests: booked without an account (yet). */}
      <section aria-labelledby="admin-guests" className="card mt-8 p-6">
        <h2 id="admin-guests" className="h-card">
          Requests from people without an account
        </h2>
        <p className="mt-1 text-base">
          These attach to a student automatically once they sign up and
          confirm the same email address.
        </p>
        {guestBookings.length > 0 ? (
          <ul className="mt-4">
            {guestBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} studentId={student?.id ?? null} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-base">No open guest requests.</p>
        )}
      </section>
    </Shell>
  );
}
