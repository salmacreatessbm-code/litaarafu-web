"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  bookingModal,
  bookingTrackOptions,
  priceLabel,
  pricingSection,
  services,
} from "@/data/siteContent";
import { siteConfig } from "@/lib/siteConfig";
import type { Viewer } from "@/lib/types";

type BookingContextValue = {
  openBooking: (serviceSlug?: string, track?: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside <BookingProvider>.");
  }
  return context;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "done"; preview: boolean; linked: boolean };

/**
 * Wraps a page, provides `openBooking(slug)` to any button inside it and
 * renders the booking modal once. `viewer` pre-fills name and email for
 * signed-in students.
 */
export function BookingProvider({
  viewer,
  children,
}: {
  viewer: Viewer;
  children: ReactNode;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [serviceSlug, setServiceSlug] = useState<string>(services[0].slug);
  const [track, setTrack] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone ?? "");
    } catch {
      // Leave the field empty; it is optional.
    }
  }, []);

  const openBooking = useCallback((slug?: string, preferredTrack?: string) => {
    if (slug && services.some((item) => item.slug === slug)) {
      setServiceSlug(slug);
    }
    if (preferredTrack && bookingTrackOptions.includes(preferredTrack)) {
      setTrack(preferredTrack);
    }
    setStatus({ kind: "idle" });
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  const service = services.find((item) => item.slug === serviceSlug) ?? services[0];
  const calendarUrl = siteConfig.calendarLinks[service.calendarKey] ?? "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "sending" });

    // Track and discount code travel inside the notes, so the booking
    // API and database stay unchanged.
    const discountCode = String(form.get("discountCode") ?? "").trim();
    const notes = [
      track ? `Track: ${track}` : "",
      discountCode ? `Discount code: ${discountCode}` : "",
      String(form.get("notes") ?? "").trim(),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          serviceSlug,
          preferredSchedule: form.get("preferredSchedule"),
          timezone: form.get("timezone"),
          notes,
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
      setStatus({
        kind: "done",
        preview: result.mode === "preview",
        linked: Boolean(result.linked),
      });
      // Refresh server data so a new booking shows up in the dashboard.
      router.refresh();
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  const contextValue = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        className="m-auto w-[min(100%-2rem,36rem)] rounded-lg border border-gold bg-papyrus p-0 text-ink backdrop:bg-ink/60"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Book a session</p>
              <h2 id="booking-title" className="h-card mt-1">
                {service.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close booking form"
              className="-mr-2 -mt-2 rounded-md p-2 text-2xl leading-none text-ink hover:bg-papyrus-deep"
            >
              ×
            </button>
          </div>

          {status.kind === "done" ? (
            <div className="mt-6" role="status">
              <p className="h-card text-malachite">{bookingModal.successTitle}</p>
              <p className="mt-2">{bookingModal.successBody}</p>
              {status.preview ? (
                <p className="mt-3 rounded-md border border-gold bg-papyrus-deep p-3 text-sm">
                  Preview mode: the database is not connected yet, so this
                  request was not saved. See the README to connect Supabase.
                </p>
              ) : status.linked ? (
                <p className="mt-3">
                  {bookingModal.successSignedIn}{" "}
                  <Link href="/dashboard" className="font-semibold text-lapis underline">
                    Open my dashboard
                  </Link>
                </p>
              ) : (
                <p className="mt-3">
                  {bookingModal.successGuest}{" "}
                  <Link href="/signup" className="font-semibold text-lapis underline">
                    Create my free account
                  </Link>
                </p>
              )}
              <button type="button" onClick={close} className="btn-primary mt-6">
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xl font-semibold text-lapis">
                  {priceLabel(service.priceEur)}
                  {service.unit ? ` ${service.unit}` : ""}
                </span>
                {service.regularPriceEur !== null && (
                  <span className="text-sm">
                    <s>€{service.regularPriceEur}</s> ·{" "}
                    {pricingSection.promoLabel.toLowerCase()}
                  </span>
                )}
              </p>
              <p className="mt-3 text-base">{bookingModal.intro}</p>

              {calendarUrl && (
                <p className="mt-4 rounded-md border border-gold bg-papyrus-light p-3 text-base">
                  {bookingModal.calendarPrompt}{" "}
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lapis underline"
                  >
                    {bookingModal.calendarButton}
                  </a>
                </p>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="booking-service" className="field-label">
                    Class
                  </label>
                  <select
                    id="booking-service"
                    className="field"
                    value={serviceSlug}
                    onChange={(event) => setServiceSlug(event.target.value)}
                  >
                    {services.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.shortTitle} ({priceLabel(item.priceEur)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-track" className="field-label">
                      {bookingModal.trackLabel}
                    </label>
                    <select
                      id="booking-track"
                      className="field"
                      required
                      value={track}
                      onChange={(event) => setTrack(event.target.value)}
                    >
                      <option value="" disabled>
                        Choose a track
                      </option>
                      {bookingTrackOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="booking-discount" className="field-label">
                      {bookingModal.discountLabel}{" "}
                      <span className="font-normal">(optional)</span>
                    </label>
                    <input
                      id="booking-discount"
                      name="discountCode"
                      type="text"
                      maxLength={40}
                      autoComplete="off"
                      placeholder={bookingModal.discountPlaceholder}
                      className="field"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-name" className="field-label">
                      Your name
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={120}
                      autoComplete="name"
                      defaultValue={viewer?.name ?? ""}
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="field-label">
                      Email address
                    </label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      defaultValue={viewer?.email ?? ""}
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-schedule" className="field-label">
                    When are you usually free?
                  </label>
                  <textarea
                    id="booking-schedule"
                    name="preferredSchedule"
                    required
                    minLength={3}
                    maxLength={500}
                    rows={2}
                    placeholder={bookingModal.schedulePlaceholder}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="booking-timezone" className="field-label">
                    Your time zone
                  </label>
                  <input
                    id="booking-timezone"
                    name="timezone"
                    type="text"
                    maxLength={80}
                    value={timezone}
                    onChange={(event) => setTimezone(event.target.value)}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="booking-notes" className="field-label">
                    Anything we should know? <span className="font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="booking-notes"
                    name="notes"
                    maxLength={1900}
                    rows={3}
                    placeholder={bookingModal.notesPlaceholder}
                    className="field"
                  />
                </div>

                {/* Honeypot: hidden from people, filled in by bots. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="booking-website">Leave this field empty</label>
                  <input
                    id="booking-website"
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
                  {status.kind === "sending" ? "Sending…" : bookingModal.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

/** Any button that opens the booking modal for a given service. */
export function BookButton({
  serviceSlug,
  track,
  className = "btn-primary",
  children,
}: {
  serviceSlug?: string;
  /** Pre-selects a track in the modal (see bookingTrackOptions). */
  track?: string;
  className?: string;
  children: ReactNode;
}) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      className={className}
      onClick={() => openBooking(serviceSlug, track)}
    >
      {children}
    </button>
  );
}
