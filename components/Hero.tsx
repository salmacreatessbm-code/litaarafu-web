import { brand, hero } from "@/data/siteContent";
import { Ar } from "@/components/Arabic";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Hero() {
  return (
    <section className="border-b border-gold">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow">{hero.overline}</p>

          <p className="mt-4">
            <Ar
              sized
              className="inline-block text-[3rem] font-bold text-lapis md:text-[4.25rem] !leading-[1.6]"
            >
              {brand.nameArabic}
            </Ar>
          </p>
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-24 bg-gold" />
            <span className="h-1 w-1 rounded-full bg-carnelian" />
            <span className="h-px w-24 bg-gold" />
          </div>
          <p className="mt-3 text-lg md:text-xl">
            <em>{brand.nameLatin}</em> ·{" "}
            <span className="font-semibold">“{brand.tagline}”</span>{" "}
            <span className="text-base">({brand.verseReference})</span>
          </p>

          <h1 className="h-display mt-8">{hero.headline}</h1>
          <p className="mt-5 max-w-[38rem] text-lg md:text-xl">{hero.subheadline}</p>
        </div>

        <div id="newsletter" className="card scroll-mt-28 p-6 md:p-8">
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-gold bg-lapis text-papyrus">
        <ul className="mx-auto flex max-w-content flex-wrap justify-center gap-x-8 gap-y-2 px-4 py-4 text-base font-semibold md:px-6">
          {hero.trustStrip.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-turquoise" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
