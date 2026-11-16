import { brand, learnerGoals } from "@/data/siteContent";
import { getServerConfig } from "@/lib/siteConfig";

/**
 * Optional email notifications through Resend (https://resend.com).
 * Every function here is "best effort": if RESEND_API_KEY is missing or
 * Resend is down, we log and carry on, so a form submission never fails
 * because of email.
 */

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Email = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

async function send({ to, subject, html, replyTo }: Email) {
  const { resendApiKey, resendFromEmail } = getServerConfig();
  if (!resendApiKey || !to) return false;

  // Without a verified domain, Resend only allows its test sender, which
  // delivers to the Resend account owner's own inbox.
  const from = resendFromEmail
    ? `${brand.nameLatin} <${resendFromEmail}>`
    : `${brand.nameLatin} <onboarding@resend.dev>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error("[email] Resend rejected the message:", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] Could not reach Resend:", error);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Shared layout                                                       */
/* ------------------------------------------------------------------ */

const ar = (text: string, size = 22) =>
  `<span lang="ar" dir="rtl" style="font-family:'Amiri','Traditional Arabic','Times New Roman',serif;font-size:${size}px;line-height:2;letter-spacing:0;">${text}</span>`;

const fr = (text: string) =>
  `<span style="font-style:italic;color:#1B2028;">${text}</span>`;

function layout(body: string) {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#F7F3EB;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;font-family:'Lora',Georgia,'Times New Roman',serif;font-size:17px;line-height:1.65;color:#1B2028;">
<p style="margin:0 0 4px;text-align:center;color:#1B3B6F;font-weight:700;">${ar(brand.nameArabic, 34)}</p>
<p style="margin:0 0 24px;text-align:center;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;border-top:1px solid #C49A3A;padding-top:10px;">Li-ta'arafu</p>
${body}
</div>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

/** Welcome Email #1 (brand bible, section 4.5). */
export async function sendWelcomeEmail(to: string) {
  const h = (colour: string, text: string) =>
    `<h2 style="margin:28px 0 8px;font-size:19px;line-height:1.3;color:${colour};">${text}</h2>`;

  const body = `
<p>${ar("أَهْلًا وَسَهْلًا")} · ${fr("ahlan wa sahlan!")}</p>
<p>Welcome to <strong>${ar(brand.nameArabic, 20)}</strong>. We're really glad you're here.</p>
<p>Every week, we'll send you a fresh Arabic root broken down across three worlds (Fusha, Egyptian street speech, and the Qur'an), a set of quick flashcards, and real examples from our lessons and homework so you can see exactly how we learn together.</p>
<p>Your very first root is the one hidden right inside our name:</p>
<p style="text-align:center;border:1px solid #C49A3A;border-radius:8px;padding:12px;background:#FBF8F2;">
<strong>${ar("ع - ر - ف", 28)}</strong><br>${fr("3 - R - F")} · to know, to recognize</p>

${h("#1B3B6F", "In Fusha")}
<p><strong>${ar("عَرَفَ")}</strong> (${fr("3arafa")}) means “he knew” or “he recognized.” Put it into the “doing something with each other” pattern and you get <strong>${ar("تَعَارَفَ")}</strong> (${fr("ta3aarafa")}): <em>to get to know one another</em>. You'll also see <strong>${ar("مَعْرِفَة")}</strong> (${fr("ma3rifa")}), meaning knowledge or acquaintance.</p>

${h("#A33620", "On the street in Egypt")}
<p>Walk through Cairo for ten minutes and you'll hear this root everywhere:</p>
<ul style="padding-left:20px;">
<li><strong>${ar("مَعْرَفْش")}</strong> (${fr("ma3rafsh")}): “I don't know.” Honestly, the single most useful word in the country.</li>
<li><strong>${ar("إِنْتَ عَارِف؟")}</strong> (${fr("inta 3aaref?")}): “Do you know?”</li>
<li><strong>${ar("اِتْعَرَّفْنَا")}</strong> (${fr("it3arrafna")}): “We've met / we got to know each other.” Usually answered with <strong>${ar("اِتْشَرَّفْنَا")}</strong> (${fr("itsharrafna")}), “it's an honor.”</li>
</ul>
<p>Notice how Fusha ${fr("3arafa")} becomes ${fr("3irif")} in Egyptian speech. The vowels shift, the rhythm relaxes, and the three root letters stay right where they are.</p>

${h("#2F664B", "In the Qur'an")}
<p>In Surah al-Hujuraat (49:13), God says:</p>
<p style="text-align:center;color:#2F664B;">${ar("وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا", 26)}</p>
<p><em>“…and We made you nations and tribes so that you may know one another.”</em><br>That's our tagline, our name, and the whole reason we exist.</p>

${h("#1B2028", "This week's 3 flashcards")}
<ol style="padding-left:20px;">
<li><strong>${ar("مَعْرَفْش")}</strong> (${fr("ma3rafsh")}) → I don't know <em>(Egyptian)</em></li>
<li><strong>${ar("مَعْرِفَة")}</strong> (${fr("ma3rifa")}) → Knowledge / an acquaintance <em>(Fusha &amp; Egyptian)</em></li>
<li><strong>${ar("لِتَعَارَفُوا")}</strong> (${fr("li-ta3aarafoo")}) → So that you may know one another <em>(Qur'an 49:13)</em></li>
</ol>

${h("#1B2028", "Sample lesson & homework mini-challenge (30 seconds)")}
<ul style="padding-left:20px;">
<li><em>From our Lesson 1 worksheet:</em> Spot the three root letters inside <strong>${ar("تَعَارُف")}</strong> (${fr("ta3aaruf")}, getting acquainted). <em>(Answer: ${ar("ع - ر - ف", 20)}!)</em></li>
<li><em>Your real-world homework:</em> Next time an Arabic-speaking friend or family member asks you something you don't know, hit them with a casual <strong>${fr("ma3rafsh!")}</strong> and watch their face light up.</li>
</ul>

${h("#1B2028", "What's coming next")}
<ul style="padding-left:20px;">
<li>Next week's newsletter: Root <strong>${ar("ك - ت - ب", 20)}</strong> (${fr("K - T - B")}), 3 new flashcards, and why Egyptians call signing a marriage contract “writing the book.”</li>
<li>Ready for live practice? Create your free student account on our site anytime to book a <strong>€5 level assessment</strong> or <strong>€30 1:1 class</strong> and track every topic you cover.</li>
</ul>
<p>Hit reply anytime and tell us what brought you to Arabic. We read every single message.</p>
<p>${ar("مَعَ السَّلَامَة")} · ${fr("ma3a s-salaama")} (go with safety),<br><strong>The ${ar(brand.nameArabic, 20)} Team</strong></p>`;

  const { adminEmail } = getServerConfig();
  return send({
    to,
    subject: "Your first root, flashcards & sample lesson: ع - ر - ف",
    html: layout(body),
    replyTo: adminEmail || undefined,
  });
}

export async function notifyAdminOfSubscriber(email: string, goal: string) {
  const { adminEmail } = getServerConfig();
  if (!adminEmail) return false;
  const goalLabel =
    learnerGoals.find((item) => item.value === goal)?.label ?? goal;

  return send({
    to: adminEmail,
    subject: `New newsletter subscriber: ${email}`,
    html: layout(
      `<p><strong>${esc(email)}</strong> just joined the weekly newsletter.</p>
<p>What brings them to Arabic: ${esc(goalLabel)}</p>`,
    ),
    replyTo: email,
  });
}

/* ------------------------------------------------------------------ */
/* Bookings                                                            */
/* ------------------------------------------------------------------ */

type BookingEmail = {
  name: string;
  email: string;
  serviceTitle: string;
  priceEur: number;
  preferredSchedule: string;
  timezone: string | null;
  notes: string | null;
  hasAccount: boolean;
};

export async function notifyAdminOfBooking(booking: BookingEmail) {
  const { adminEmail } = getServerConfig();
  if (!adminEmail) return false;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600;">${label}</td><td style="padding:6px 0;">${esc(value)}</td></tr>`;

  return send({
    to: adminEmail,
    subject: `New booking request: ${booking.serviceTitle} (${booking.name})`,
    html: layout(
      `<p>A new booking request just came in. Confirm it from <strong>/admin</strong>.</p>
<table style="border-collapse:collapse;font-size:16px;">
${row("Class", `${booking.serviceTitle} (€${booking.priceEur})`)}
${row("Student", booking.name)}
${row("Email", booking.email)}
${row("Usually free", booking.preferredSchedule)}
${row("Time zone", booking.timezone ?? "Not given")}
${row("Notes", booking.notes ?? "None")}
${row("Student account", booking.hasAccount ? "Signed in" : "Booked as a guest")}
</table>`,
    ),
    replyTo: booking.email,
  });
}

export async function sendBookingReceipt(booking: BookingEmail) {
  const { adminEmail } = getServerConfig();
  return send({
    to: booking.email,
    subject: `We got your request: ${booking.serviceTitle}`,
    html: layout(
      `<p>${ar("أَهْلًا")} · ${fr("ahlan!")}</p>
<p>Thank you for requesting a <strong>${esc(booking.serviceTitle)}</strong> (€${booking.priceEur}). We'll email you shortly to confirm a time that fits the availability you sent us.</p>
<p>Nothing is charged until your session is confirmed.${
        booking.hasAccount
          ? " You can follow this booking in your student dashboard."
          : " Create a free student account with this same email address and the booking will appear in your dashboard automatically."
      }</p>
<p>${ar("مَعَ السَّلَامَة")} · ${fr("ma3a s-salaama")},<br><strong>The ${ar(brand.nameArabic, 20)} Team</strong></p>`,
    ),
    replyTo: adminEmail || undefined,
  });
}
