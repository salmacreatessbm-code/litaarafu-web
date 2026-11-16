"use client";

import { useState, type FormEvent } from "react";
import { learnerGoals, newsletter } from "@/data/siteContent";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "done"; preview: boolean };

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          goal: form.get("goal"),
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
        <p className="h-card text-malachite">{newsletter.successTitle}</p>
        <p className="mt-2">{newsletter.successBody}</p>
        {status.preview && (
          <p className="mt-3 rounded-md border border-gold bg-papyrus-deep p-3 text-sm">
            Preview mode: the database is not connected yet, so this email
            address was not saved. See the README to connect Supabase.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="font-semibold">{newsletter.prompt}</p>

      <div>
        <label htmlFor="newsletter-email" className="field-label">
          {newsletter.emailLabel}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={newsletter.emailPlaceholder}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="newsletter-goal" className="field-label">
          {newsletter.goalLabel}
        </label>
        <select
          id="newsletter-goal"
          name="goal"
          required
          defaultValue=""
          className="field"
        >
          <option value="" disabled>
            {newsletter.goalPlaceholder}
          </option>
          {learnerGoals.map((goal) => (
            <option key={goal.value} value={goal.value}>
              {goal.label}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Leave this field empty</label>
        <input
          id="newsletter-website"
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
        {status.kind === "sending" ? "Sending…" : newsletter.cta}
      </button>

      <p className="text-sm">{newsletter.microcopy}</p>
    </form>
  );
}
