import type { SupabaseClient } from "@supabase/supabase-js";
import type { Booking, CoveredTopic, Profile } from "@/lib/types";

export type DashboardData = {
  profile: Profile;
  bookings: Booking[];
  topics: CoveredTopic[];
};

/** Everything the dashboard shows for one student. */
export async function loadDashboardData(
  supabase: SupabaseClient,
  user: { id: string; email?: string; user_metadata?: Record<string, unknown> },
): Promise<DashboardData> {
  const [profileResult, bookingsResult, topicsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("covered_topics")
      .select("*")
      .eq("user_id", user.id)
      .order("session_date", { ascending: false })
      .order("created_at", { ascending: false }),
  ]);

  for (const result of [profileResult, bookingsResult, topicsResult]) {
    if (result.error) {
      console.error("[dashboard] Supabase query failed:", result.error.message);
    }
  }

  const fullName = user.user_metadata?.full_name;
  const profile: Profile = (profileResult.data as Profile | null) ?? {
    id: user.id,
    full_name: typeof fullName === "string" ? fullName : null,
    email: user.email ?? null,
    learning_goal: null,
    level_note: null,
    progress_percent: 0,
    created_at: new Date().toISOString(),
  };

  return {
    profile,
    bookings: (bookingsResult.data as Booking[] | null) ?? [],
    topics: (topicsResult.data as CoveredTopic[] | null) ?? [],
  };
}

/**
 * Sample student shown at /dashboard in preview mode (before Supabase is
 * connected), so you can see the layout with realistic content.
 */
export function demoDashboardData(): DashboardData {
  const id = "00000000-0000-0000-0000-000000000000";
  const inDays = (days: number, hour: number) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + days);
    date.setUTCHours(hour, 0, 0, 0);
    return date.toISOString();
  };
  const day = (days: number) => inDays(days, 12).slice(0, 10);
  const booking = (partial: Partial<Booking>): Booking => ({
    id: crypto.randomUUID(),
    user_id: id,
    student_name: "Sample Student",
    student_email: "student@example.com",
    service_slug: "one-on-one",
    service_title: "1:1 Tailored Private Classes",
    price_eur: 30,
    preferred_schedule: "Weekday evenings",
    timezone: "Europe/Berlin",
    status: "pending",
    scheduled_at: null,
    meeting_link: null,
    notes: null,
    created_at: inDays(-1, 9),
    ...partial,
  });

  return {
    profile: {
      id,
      full_name: "Sample Student",
      email: "student@example.com",
      learning_goal: "heritage",
      level_note:
        "Confident with greetings and family phrases. Now connecting spoken Egyptian to the script.",
      progress_percent: 35,
      created_at: inDays(-40, 9),
    },
    bookings: [
      booking({
        status: "confirmed",
        scheduled_at: inDays(3, 17),
        meeting_link: "https://meet.example.com/sample-class",
      }),
      booking({
        service_slug: "small-group",
        service_title: "Small-Group Classes (Max 5 Students)",
        price_eur: 10,
        preferred_schedule: "Saturday mornings",
      }),
      booking({
        status: "completed",
        scheduled_at: inDays(-7, 17),
        created_at: inDays(-12, 9),
      }),
      booking({
        service_slug: "assessment",
        service_title: "30-Minute Level Assessment",
        price_eur: 5,
        status: "completed",
        scheduled_at: inDays(-21, 16),
        created_at: inDays(-25, 9),
      }),
    ],
    topics: [
      {
        id: crypto.randomUUID(),
        user_id: id,
        session_date: day(-7),
        root_arabic: "س - ل - م",
        root_franco: "S - L - M",
        topic_title: "Greetings, goodbyes and thank-yous",
        world_focus: "Egyptian",
        summary:
          "Practised salaamu 3aleeku, ma3a s-salaama and tislam eedak in a family-dinner role play.",
        homework_note:
          "Send a voice note thanking someone with تِسْلَم إِيدَك (tislam eedak).",
        created_at: inDays(-7, 18),
      },
      {
        id: crypto.randomUUID(),
        user_id: id,
        session_date: day(-21),
        root_arabic: "ع - ر - ف",
        root_franco: "3 - R - F",
        topic_title: "Introductions: getting to know one another",
        world_focus: "All Three",
        summary:
          "Followed the root from 3arafa in Fusha to ma3rafsh on the street and li-ta3aarafoo in Qur'an 49:13.",
        homework_note: "Spot the root letters in five words from the worksheet.",
        created_at: inDays(-21, 17),
      },
    ],
  };
}
