"use client";

import { useState, type FormEvent } from "react";
import { contact, contactTracks } from "@/data/siteContent";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "done"; preview: boolean };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const copy = contact.form;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          contact: form.get("contact"),
          track: form.get("track"),
          website: form.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setStatus({
          kind: "error",
          message: result.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      setStatus({ kind: "done", preview: result.mode === "preview" });
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <div role="status">
        <p className="h-card text-malachite">{copy.successTitle}</p>
        <p className="mt-2">{copy.successBody}</p>
        {status.preview && (
          <p className="mt-3 rounded-md border border-gold bg-papyrus-deep p-3 text-sm">
            Preview mode: email delivery is not set up yet, so this message
            was not sent. Add RESEND_API_KEY and ADMIN_EMAIL (see the README).
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="field-label">
          {copy.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="contact-contact" className="field-label">
          {copy.contactLabel}
        </label>
        <input
          id="contact-contact"
          name="contact"
          type="text"
          required
          minLength={5}
          maxLength={254}
          placeholder={copy.contactPlaceholder}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="contact-track" className="field-label">
          {copy.trackLabel}
        </label>
        <select
          id="contact-track"
          name="track"
          required
          defaultValue=""
          className="field"
        >
          <option value="" disabled>
            {copy.trackPlaceholder}
          </option>
          {contactTracks.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status.kind === "error" && (
        <p role="alert" className="font-semibold text-carnelian-deep">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="btn-primary w-full"
      >
        {status.kind === "sending" ? "Sending…" : copy.submit}
      </button>
    </form>
  );
}
