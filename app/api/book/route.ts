import { NextResponse } from "next/server";
import { services } from "@/data/siteContent";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notifyAdminOfBooking, sendBookingReceipt } from "@/lib/email";
import { bookingSchema, firstIssue } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/book
 * { name, email, serviceSlug, preferredSchedule, timezone?, notes? }
 *
 * Saves a booking request as "pending". If the visitor is signed in, the
 * booking is attached to their account straight away. Guest bookings are
 * attached later by the database, as soon as an account with the same
 * verified email exists (see supabase/schema.sql).
 *
 * The title and price are always looked up on the server from
 * data/siteContent.ts, never trusted from the browser.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that request. Please try again." },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, mode: "live", linked: false });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: firstIssue(parsed.error) },
      { status: 400 },
    );
  }
  const input = parsed.data;

  const service = services.find((item) => item.slug === input.serviceSlug);
  if (!service) {
    return NextResponse.json(
      { ok: false, error: "Please choose a class." },
      { status: 400 },
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.info("[book] Preview mode. Not saved:", {
      service: service.slug,
      email: input.email,
    });
    return NextResponse.json({ ok: true, mode: "preview", linked: false });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("bookings").insert({
    user_id: user?.id ?? null,
    student_name: input.name,
    student_email: input.email,
    service_slug: service.slug,
    service_title: service.title,
    price_eur: service.priceEur,
    preferred_schedule: input.preferredSchedule,
    timezone: input.timezone,
    notes: input.notes,
    status: "pending",
  });

  if (error) {
    console.error("[book] Supabase insert failed:", error.message);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your booking just now. Please try again in a minute.",
      },
      { status: 500 },
    );
  }

  const emailDetails = {
    name: input.name,
    email: input.email,
    serviceTitle: service.title,
    priceEur: service.priceEur,
    preferredSchedule: input.preferredSchedule,
    timezone: input.timezone,
    notes: input.notes,
    hasAccount: Boolean(user),
  };
  await Promise.all([
    notifyAdminOfBooking(emailDetails),
    sendBookingReceipt(emailDetails),
  ]);

  return NextResponse.json({ ok: true, mode: "live", linked: Boolean(user) });
}
