"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdminEmail } from "@/lib/siteConfig";
import { createSupabaseAdminClient, getCurrentUser } from "@/lib/supabase/server";
import { WORLD_FOCUS_OPTIONS } from "@/lib/types";

/**
 * Teacher-only actions. Each one re-checks that the signed-in user is the
 * ADMIN_EMAIL before touching the database with the service-role key.
 */
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Not authorised.");
  }
  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }
  return admin;
}

/** Back to /admin, keeping the selected student and showing a message. */
function backToAdmin(
  studentId: string | null,
  result: { saved: string } | { error: string },
): never {
  const params = new URLSearchParams();
  if (studentId) params.set("student", studentId);
  if ("saved" in result) params.set("saved", result.saved);
  else params.set("error", result.error);
  redirect(`/admin?${params.toString()}`);
}

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value ? value : null));

const optionalId = (value: FormDataEntryValue | null) => {
  const parsed = z.uuid().safeParse(value);
  return parsed.success ? parsed.data : null;
};

/* (a) Progress percentage and level note ----------------------------- */

const progressSchema = z.object({
  studentId: z.uuid(),
  progressPercent: z.coerce
    .number("Progress must be a number.")
    .int("Progress must be a whole number.")
    .min(0, "Progress can't be below 0.")
    .max(100, "Progress can't be above 100."),
  levelNote: text(1000),
});

export async function updateProgress(formData: FormData) {
  const admin = await requireAdmin();
  const studentId = optionalId(formData.get("studentId"));
  const parsed = progressSchema.safeParse({
    studentId: formData.get("studentId"),
    progressPercent: formData.get("progressPercent"),
    levelNote: formData.get("levelNote") ?? "",
  });
  if (!parsed.success) {
    backToAdmin(studentId, { error: parsed.error.issues[0].message });
  }

  const { error } = await admin
    .from("profiles")
    .update({
      progress_percent: parsed.data.progressPercent,
      level_note: parsed.data.levelNote,
    })
    .eq("id", parsed.data.studentId);
  if (error) {
    console.error("[admin] updateProgress failed:", error.message);
    backToAdmin(studentId, { error: "Could not save progress. Please try again." });
  }

  revalidatePath("/dashboard");
  backToAdmin(studentId, { saved: "Progress saved." });
}

/* (b) Confirm a booking, set its time and meeting link ---------------- */

const bookingSchema = z.object({
  bookingId: z.uuid(),
  status: z.enum(["pending", "confirmed", "completed"]),
  scheduledAt: z
    .string()
    .trim()
    .transform((value) => (value ? value : null))
    .refine((value) => value === null || !Number.isNaN(Date.parse(value)), {
      message: "That date and time doesn't look right.",
    }),
  meetingLink: z
    .string()
    .trim()
    .max(500)
    .transform((value) => (value ? value : null))
    .refine((value) => value === null || /^https?:\/\/\S+$/i.test(value), {
      message: "The meeting link must start with https://",
    }),
});

export async function updateBooking(formData: FormData) {
  const admin = await requireAdmin();
  const studentId = optionalId(formData.get("studentId"));
  const parsed = bookingSchema.safeParse({
    bookingId: formData.get("bookingId"),
    status: formData.get("status"),
    scheduledAt: formData.get("scheduledAt") ?? "",
    meetingLink: formData.get("meetingLink") ?? "",
  });
  if (!parsed.success) {
    backToAdmin(studentId, { error: parsed.error.issues[0].message });
  }
  if (parsed.data.status !== "pending" && !parsed.data.scheduledAt) {
    backToAdmin(studentId, {
      error: "Add a date and time before confirming or completing a class.",
    });
  }

  const { error } = await admin
    .from("bookings")
    .update({
      status: parsed.data.status,
      scheduled_at: parsed.data.scheduledAt
        ? new Date(parsed.data.scheduledAt).toISOString()
        : null,
      meeting_link: parsed.data.meetingLink,
    })
    .eq("id", parsed.data.bookingId);
  if (error) {
    console.error("[admin] updateBooking failed:", error.message);
    backToAdmin(studentId, { error: "Could not save the booking. Please try again." });
  }

  revalidatePath("/dashboard");
  backToAdmin(studentId, { saved: "Booking saved." });
}

/* (c) Log a covered topic and homework -------------------------------- */

const topicSchema = z.object({
  studentId: z.uuid(),
  sessionDate: z.iso.date("Please choose the session date."),
  rootArabic: text(60),
  rootFranco: text(60),
  topicTitle: z
    .string()
    .trim()
    .min(2, "Please give the topic a title.")
    .max(200, "Please keep the title under 200 characters."),
  worldFocus: z.enum(WORLD_FOCUS_OPTIONS),
  summary: text(4000),
  homeworkNote: text(2000),
});

export async function logTopic(formData: FormData) {
  const admin = await requireAdmin();
  const studentId = optionalId(formData.get("studentId"));
  const parsed = topicSchema.safeParse({
    studentId: formData.get("studentId"),
    sessionDate: formData.get("sessionDate"),
    rootArabic: formData.get("rootArabic") ?? "",
    rootFranco: formData.get("rootFranco") ?? "",
    topicTitle: formData.get("topicTitle"),
    worldFocus: formData.get("worldFocus"),
    summary: formData.get("summary") ?? "",
    homeworkNote: formData.get("homeworkNote") ?? "",
  });
  if (!parsed.success) {
    backToAdmin(studentId, { error: parsed.error.issues[0].message });
  }

  const { error } = await admin.from("covered_topics").insert({
    user_id: parsed.data.studentId,
    session_date: parsed.data.sessionDate,
    root_arabic: parsed.data.rootArabic,
    root_franco: parsed.data.rootFranco,
    topic_title: parsed.data.topicTitle,
    world_focus: parsed.data.worldFocus,
    summary: parsed.data.summary,
    homework_note: parsed.data.homeworkNote,
  });
  if (error) {
    console.error("[admin] logTopic failed:", error.message);
    backToAdmin(studentId, { error: "Could not save the topic. Please try again." });
  }

  revalidatePath("/dashboard");
  backToAdmin(studentId, { saved: "Topic logged. It is now in the student's dashboard." });
}
