import type { World } from "@/data/siteContent";
import type { WorldFocus } from "@/lib/types";

/**
 * "Three Worlds" colour coding (brand bible 2.3). Class names are written
 * out in full so Tailwind can find them.
 */
export const worldStyles: Record<
  World,
  {
    label: string;
    shortLabel: string;
    text: string; // accessible on papyrus at small sizes
    heading: string; // large headings only
    bar: string;
    dot: string;
    border: string;
    badge: string;
  }
> = {
  fusha: {
    label: "Fusha (Standard Arabic)",
    shortLabel: "Fusha",
    text: "text-lapis",
    heading: "text-lapis",
    bar: "bg-lapis",
    dot: "bg-lapis",
    border: "border-lapis",
    badge: "border-lapis text-lapis",
  },
  egyptian: {
    label: "Egyptian Arabic (On the Street)",
    shortLabel: "Egyptian",
    text: "text-carnelian-deep",
    heading: "text-carnelian",
    bar: "bg-carnelian",
    dot: "bg-carnelian",
    border: "border-carnelian",
    badge: "border-carnelian-deep text-carnelian-deep",
  },
  quranic: {
    label: "Simple Qur'anic Meaning",
    shortLabel: "Qur'anic",
    text: "text-malachite",
    heading: "text-malachite",
    bar: "bg-malachite",
    dot: "bg-malachite",
    border: "border-malachite",
    badge: "border-malachite text-malachite",
  },
};

/** Badge colours for the world_focus column of covered_topics. */
export const focusBadge: Record<WorldFocus, string> = {
  Fusha: "border-lapis text-lapis",
  Egyptian: "border-carnelian-deep text-carnelian-deep",
  Quranic: "border-malachite text-malachite",
  "All Three": "border-ink/60 text-ink",
};

export const focusLabel: Record<WorldFocus, string> = {
  Fusha: "Fusha",
  Egyptian: "Egyptian",
  Quranic: "Qur'anic Roots",
  "All Three": "All Three",
};
