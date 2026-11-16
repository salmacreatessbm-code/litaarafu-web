/** Row shapes that mirror supabase/schema.sql. */

export type BookingStatus = "pending" | "confirmed" | "completed";

export type WorldFocus = "Fusha" | "Egyptian" | "Quranic" | "All Three";

export const WORLD_FOCUS_OPTIONS: WorldFocus[] = [
  "Fusha",
  "Egyptian",
  "Quranic",
  "All Three",
];

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  learning_goal: string | null;
  level_note: string | null;
  progress_percent: number;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string | null;
  student_name: string;
  student_email: string;
  service_slug: string;
  service_title: string;
  price_eur: number;
  preferred_schedule: string | null;
  timezone: string | null;
  status: BookingStatus;
  scheduled_at: string | null;
  meeting_link: string | null;
  notes: string | null;
  created_at: string;
};

export type CoveredTopic = {
  id: string;
  user_id: string;
  session_date: string;
  root_arabic: string | null;
  root_franco: string | null;
  topic_title: string;
  world_focus: WorldFocus;
  summary: string | null;
  homework_note: string | null;
  created_at: string;
};

/** Minimal signed-in user info passed from server to client components. */
export type Viewer = {
  name: string;
  email: string;
} | null;
