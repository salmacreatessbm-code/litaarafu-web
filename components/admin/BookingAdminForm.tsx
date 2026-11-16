"use client";

import { useEffect, useState } from "react";
import { updateBooking } from "@/app/admin/actions";
import type { Booking } from "@/lib/types";

/** "2026-01-31T18:30" in the teacher's own time zone, for datetime-local. */
function toLocalInput(iso: string) {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Confirm a booking, set its date/time and add the Zoom/Meet link.
 * The time is typed in the teacher's local time and sent as an exact
 * moment (ISO), so every student sees it correctly in their own zone.
 */
export function BookingAdminForm({
  booking,
  studentId,
}: {
  booking: Booking;
  studentId: string | null;
}) {
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    if (booking.scheduled_at) setLocalValue(toLocalInput(booking.scheduled_at));
  }, [booking.scheduled_at]);

  const iso =
    localValue && !Number.isNaN(new Date(localValue).getTime())
      ? new Date(localValue).toISOString()
      : "";

  return (
    <form
      action={updateBooking}
      className="mt-4 grid gap-4 md:grid-cols-[10rem_1fr_1fr_auto] md:items-end"
    >
      <input type="hidden" name="bookingId" value={booking.id} />
      <input type="hidden" name="studentId" value={studentId ?? ""} />
      <input type="hidden" name="scheduledAt" value={iso} />

      <div>
        <label htmlFor={`status-${booking.id}`} className="field-label">
          Status
        </label>
        <select
          id={`status-${booking.id}`}
          name="status"
          defaultValue={booking.status === "pending" ? "confirmed" : booking.status}
          className="field"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor={`when-${booking.id}`} className="field-label">
          Date &amp; time (your local time)
        </label>
        <input
          id={`when-${booking.id}`}
          type="datetime-local"
          value={localValue}
          onChange={(event) => setLocalValue(event.target.value)}
          className="field"
        />
      </div>
      <div>
        <label htmlFor={`link-${booking.id}`} className="field-label">
          Zoom / Meet link
        </label>
        <input
          id={`link-${booking.id}`}
          name="meetingLink"
          type="url"
          inputMode="url"
          placeholder="https://"
          defaultValue={booking.meeting_link ?? ""}
          className="field"
        />
      </div>
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
