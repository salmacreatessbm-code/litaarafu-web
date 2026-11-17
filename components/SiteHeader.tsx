import Link from "next/link";
import { navLinks, primaryCta } from "@/data/siteContent";
import { BookButton } from "@/components/BookingProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileNav } from "@/components/MobileNav";
import type { Viewer } from "@/lib/types";

export function SiteHeader({ viewer }: { viewer: Viewer }) {
  const portal = viewer
    ? { href: "/dashboard", label: "My Dashboard" }
    : { href: "/login", label: "Log In" };

  return (
    <header className="sticky top-0 z-40 border-b border-gold bg-papyrus/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2 md:px-6">
        <BrandLogo />

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-base font-semibold text-ink hover:text-lapis hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href={portal.href}
            className="hidden whitespace-nowrap text-base font-semibold text-lapis hover:underline lg:inline"
          >
            {portal.label}
          </Link>
          <BookButton
            serviceSlug="assessment"
            className="btn-cta hidden whitespace-nowrap !px-4 !py-2 sm:inline-flex"
          >
            {primaryCta}
          </BookButton>
          <MobileNav portal={portal} />
        </div>
      </div>
    </header>
  );
}
