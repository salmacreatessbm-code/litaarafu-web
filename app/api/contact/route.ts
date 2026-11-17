import { NextResponse } from "next/server";
import { notifyAdminOfContact } from "@/lib/email";
import { getServerConfig } from "@/lib/siteConfig";
import { contactSchema, firstIssue } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/contact  { name, contact, track }
 *
 * Forwards a contact-form inquiry to the teacher's inbox (ADMIN_EMAIL)
 * through Resend. Nothing is stored in the database. In preview mode,
 * when Resend or ADMIN_EMAIL is not configured yet, it validates the
 * input and answers with mode "preview".
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: firstIssue(parsed.error) },
      { status: 400 },
    );
  }

  const { resendApiKey, adminEmail } = getServerConfig();
  if (!resendApiKey || !adminEmail) {
    console.info("[contact] Preview mode. Not sent:", {
      track: parsed.data.track,
    });
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const sent = await notifyAdminOfContact(parsed.data);
  if (!sent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message just now. Please try again in a minute, or message us on WhatsApp.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "live" });
}
