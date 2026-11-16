"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/siteContent";

export function MobileNav({
  portal,
}: {
  portal: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="rounded-md border border-lapis px-3 py-2 text-base font-semibold text-lapis"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-b border-gold bg-papyrus px-4 py-4 shadow-lg"
        >
          <ul className="mx-auto flex max-w-content flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 font-semibold text-ink hover:bg-papyrus-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 sm:hidden">
              <Link
                href={portal.href}
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                {portal.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
