"use client";

import { useState } from "react";
import Link from "next/link";
import {
  assessmentOffer,
  discounts,
  pricingPlans,
  pricingSection,
} from "@/data/siteContent";
import { BookButton } from "@/components/BookingProvider";

type View = "monthly" | "byClass";

const views: { value: View; label: string }[] = [
  { value: "monthly", label: pricingSection.monthlyLabel },
  { value: "byClass", label: pricingSection.byClassLabel },
];

export function Pricing({ signedIn }: { signedIn: boolean }) {
  const [view, setView] = useState<View>("monthly");

  return (
    <section id="pricing" className="border-b border-gold bg-papyrus-deep">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{pricingSection.overline}</p>
        <h2 className="h-section mt-2 max-w-[40rem]">{pricingSection.header}</h2>
        <p className="mt-4 max-w-[46rem]">{pricingSection.subheader}</p>

        {/* Universal first step: shown in both views. */}
        <div className="mt-10 flex flex-col gap-5 rounded-lg border-2 border-carnelian-deep bg-papyrus-light p-6 md:flex-row md:items-center md:gap-8 md:p-7">
          <div className="flex-1">
            <span className="badge border-carnelian-deep text-carnelian-deep">
              {assessmentOffer.badge}
            </span>
            <h3 className="h-card mt-3">{assessmentOffer.title}</h3>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[2rem] font-semibold leading-tight text-carnelian-deep md:text-[2.5rem]">
                {assessmentOffer.price}
              </span>
              <span className="text-base">
                <span className="sr-only">Regular price: </span>
                <s>{assessmentOffer.regularPrice}</s> · {pricingSection.promoLabel}
              </span>
            </p>
            <p className="mt-3 text-base">{assessmentOffer.description}</p>
          </div>
          <BookButton
            serviceSlug={assessmentOffer.serviceSlug}
            className="btn-cta w-full shrink-0 md:w-auto"
          >
            {assessmentOffer.cta}
          </BookButton>
        </div>

        {/* Monthly / by-class toggle */}
        <div
          role="group"
          aria-label="Pricing view"
          className="mx-auto mt-10 flex w-fit rounded-full border border-lapis bg-papyrus-light p-1"
        >
          {views.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={view === item.value}
              onClick={() => setView(item.value)}
              className={`rounded-full px-4 py-2 text-base font-semibold transition-colors sm:px-6 ${
                view === item.value
                  ? "bg-lapis text-papyrus"
                  : "text-lapis hover:bg-papyrus-deep"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <li key={plan.id} className="card flex flex-col p-6 md:p-7">
              <h3 className="h-card">{plan.title}</h3>
              <p className="mt-1 text-base font-semibold text-lapis">{plan.subtitle}</p>

              <ul className="mt-4 space-y-1.5 text-base">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="font-semibold text-malachite" aria-hidden="true">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <ul className="mt-auto space-y-3 pt-6" aria-live="polite">
                {plan[view].map((option) => (
                  <li
                    key={option.serviceSlug}
                    className="rounded-md border border-gold bg-papyrus p-4"
                  >
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[1.75rem] font-semibold leading-tight text-lapis md:text-[2rem]">
                        {option.price}
                      </span>
                      <span className="font-semibold text-lapis">{option.unit}</span>
                    </p>
                    <p className="text-base">{option.detail}</p>
                    <BookButton
                      serviceSlug={option.serviceSlug}
                      className="btn-primary mt-3 w-full"
                    >
                      {option.cta}
                    </BookButton>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Built-in discounts */}
        <ul className="mt-5 grid gap-5 rounded-lg border border-dashed border-gold bg-papyrus p-6 md:grid-cols-2 md:gap-8 md:p-7">
          {discounts.map((discount) => {
            const [before, after] = discount.code
              ? discount.body.split(discount.code)
              : [discount.body, ""];
            return (
              <li key={discount.title}>
                <h3 className="text-lg font-semibold text-malachite">
                  {discount.title}
                </h3>
                <p className="mt-1 text-base">
                  {before}
                  {discount.code && (
                    <code className="rounded border border-malachite bg-papyrus-light px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-malachite">
                      {discount.code}
                    </code>
                  )}
                  {after}
                </p>
              </li>
            );
          })}
        </ul>

        {!signedIn && (
          <p className="mt-6 text-base">
            <Link href="/signup" className="font-semibold text-lapis underline">
              Create a free student account
            </Link>{" "}
            to track your classes and progress.
          </p>
        )}
      </div>
    </section>
  );
}
