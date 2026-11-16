import Link from "next/link";
import { brand } from "@/data/siteContent";
import { Ar } from "@/components/Arabic";

/**
 * Horizontal header lockup, RTL-honest: Arabic on the right, English on
 * the left, separated by a 1px Hammered Gold rule.
 */
export function BrandLogo({ size = "md" }: { size?: "md" | "lg" }) {
  const arabicSize = size === "lg" ? "text-[2.25rem]" : "text-[1.75rem]";
  const latinSize = size === "lg" ? "text-sm" : "text-[0.6875rem] sm:text-xs";

  return (
    <Link
      href="/"
      aria-label={`${brand.nameLatin}: home`}
      className="inline-flex items-center gap-3"
    >
      <span
        className={`font-latin font-semibold uppercase text-ink ${latinSize}`}
        style={{ letterSpacing: "0.18em" }}
        aria-hidden="true"
      >
        Li-ta&apos;arafu
      </span>
      <span className="h-8 w-px bg-gold" aria-hidden="true" />
      <Ar sized className={`font-bold text-lapis ${arabicSize} !leading-[1.6]`}>
        {brand.nameArabic}
      </Ar>
    </Link>
  );
}

/** Stacked lockup with the gold hairline and carnelian nuqta. */
export function BrandLogoStacked() {
  return (
    <div className="inline-flex flex-col items-center">
      <Ar sized className="text-[3rem] font-bold text-lapis md:text-[4.25rem] !leading-[1.6]">
        {brand.nameArabic}
      </Ar>
      <span className="flex w-[60%] items-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-gold" />
        <span className="h-1 w-1 rounded-full bg-carnelian" />
        <span className="h-px flex-1 bg-gold" />
      </span>
      <span
        className="mt-2 font-latin text-xs font-semibold uppercase text-ink md:text-sm"
        style={{ letterSpacing: "0.18em" }}
      >
        Li-ta&apos;arafu
      </span>
    </div>
  );
}
