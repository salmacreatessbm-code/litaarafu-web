"use client";

import { useEffect, useState } from "react";

const format = (iso: string, timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone,
  }).format(new Date(iso));

/**
 * Shows a class time in the viewer's own time zone. The server renders
 * UTC first; the browser swaps in the local time once it loads.
 */
export function LocalTime({ iso }: { iso: string }) {
  const [text, setText] = useState(() => format(iso, "UTC"));

  useEffect(() => {
    setText(format(iso));
  }, [iso]);

  return <time dateTime={iso}>{text}</time>;
}
