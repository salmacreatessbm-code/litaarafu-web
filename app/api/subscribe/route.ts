import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notifyAdminOfSubscriber, sendWelcomeEmail } from "@/lib/email";
import { firstIssue, subscribeSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/subscribe  { email, goal }
 *
 * Saves a newsletter subscriber to Supabase and (optionally) sends the
 * welcome email through Resend. In preview mode, when Supabase is not
 * configured yet, it validates the input and answers with mode "preview"
 * so the form still works on a fresh checkout.
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

  // Honeypot field: hidden from people, tempting for bots. Pretend it worked.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, mode: "live" });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: firstIssue(parsed.error) },
      { status: 400 },
    );
  }
  const { email, goal } = parsed.data;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.info("[subscribe] Preview mode. Not saved:", { email, goal });
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email, learning_goal: goal });

  // 23505 = unique violation: this address is already subscribed. Answer
  // exactly as for a new subscriber so the form never reveals who is on
  // the list, and skip the emails so nobody gets the welcome twice.
  if (error?.code === "23505") {
    return NextResponse.json({ ok: true, mode: "live" });
  }
  if (error) {
    console.error("[subscribe] Supabase insert failed:", error.message);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save your email just now. Please try again in a minute.",
      },
      { status: 500 },
    );
  }

  await Promise.all([
    sendWelcomeEmail(email),
    notifyAdminOfSubscriber(email, goal),
  ]);

  return NextResponse.json({ ok: true, mode: "live" });
}
