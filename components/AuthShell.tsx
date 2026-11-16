import type { ReactNode } from "react";
import { brand } from "@/data/siteContent";
import { BrandLogo } from "@/components/BrandLogo";

/** Shared frame for the log-in and sign-up pages. */
export function AuthShell({
  title,
  intro,
  children,
  footer,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gold">
        <div className="mx-auto flex max-w-content items-center px-4 py-2 md:px-6">
          <BrandLogo />
        </div>
      </header>

      <main id="main" className="flex flex-1 items-start justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-[30rem]">
          <div className="card p-6 md:p-8">
            <div className="h-1 w-12 rounded-full bg-lapis" aria-hidden="true" />
            <h1 className="h-section mt-4">{title}</h1>
            <p className="mt-2 text-base">{intro}</p>
            <div className="mt-6">{children}</div>
          </div>
          <p className="mt-5 text-center text-base">{footer}</p>
          <p className="mt-8 text-center text-sm italic">“{brand.tagline}”</p>
        </div>
      </main>
    </div>
  );
}

export function SetupNotice() {
  return (
    <p className="mb-5 rounded-md border border-gold bg-papyrus-deep p-3 text-sm">
      Preview mode: student accounts switch on once Supabase is connected.
      Follow the steps in the README, then reload this page.
    </p>
  );
}
