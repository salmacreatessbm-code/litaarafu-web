import Link from "next/link";
import { comingSoon, pricingSection, services } from "@/data/siteContent";
import { BookButton } from "@/components/BookingProvider";

export function Pricing({ signedIn }: { signedIn: boolean }) {
  return (
    <section id="classes" className="border-b border-gold bg-papyrus-deep">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{pricingSection.overline}</p>
        <h2 className="h-section mt-2 max-w-[40rem]">{pricingSection.header}</h2>
        <p className="mt-4 max-w-[46rem]">{pricingSection.subheader}</p>
        {!signedIn && (
          <p className="mt-3">
            <Link href="/signup" className="font-semibold text-lapis underline">
              Create a free student account →
            </Link>
          </p>
        )}

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="card flex flex-col p-6 md:p-7">
              <span className="badge self-start border-turquoise text-ink">
                {service.badge}
              </span>
              <h3 className="h-card mt-3">{service.title}</h3>

              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[2rem] font-semibold leading-tight text-lapis md:text-[2.5rem]">
                  €{service.priceEur}
                </span>
                {service.unit && (
                  <span className="font-semibold text-lapis">{service.unit}</span>
                )}
                {service.regularPriceEur !== null && (
                  <span className="text-lg">
                    <span className="sr-only">Regular price: </span>
                    <s>€{service.regularPriceEur}</s>
                  </span>
                )}
              </p>
              {service.regularPriceEur !== null && (
                <p className="mt-2">
                  <span className="badge border-carnelian-deep text-carnelian-deep">
                    {pricingSection.promoLabel}
                  </span>
                </p>
              )}

              <p className="mt-4 text-base">{service.copy}</p>
              <div className="mt-auto pt-6">
                <BookButton serviceSlug={service.slug} className="btn-primary w-full">
                  {service.cta}
                </BookButton>
              </div>
            </li>
          ))}

          <li className="card flex flex-col gap-4 border-dashed p-6 md:col-span-2 md:flex-row md:items-center md:gap-8 md:p-7">
            <div className="flex-1">
              <span className="badge border-malachite text-malachite">
                {comingSoon.badge}
              </span>
              <h3 className="h-card mt-3">{comingSoon.title}</h3>
              <p className="mt-1 text-base font-semibold text-malachite">
                {comingSoon.status}
              </p>
              <p className="mt-3 text-base">{comingSoon.copy}</p>
            </div>
            <Link href="/#newsletter" className="btn-outline shrink-0">
              {comingSoon.cta}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
