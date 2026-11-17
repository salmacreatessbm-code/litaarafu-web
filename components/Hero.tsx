import { brand, hero, whatsappUrl } from "@/data/siteContent";
import { Ar } from "@/components/Arabic";
import { BookButton } from "@/components/BookingProvider";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Hero() {
  return (
    <section className="border-b border-gold">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow">{hero.overline}</p>
          <h1 className="h-display mt-4 text-[2rem] md:text-[2.75rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-[40rem] text-lg">{hero.subheadline}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div>
              <BookButton serviceSlug="assessment" className="btn-cta w-full sm:w-auto">
                {hero.primaryButton}
              </BookButton>
              <p className="mt-2 text-center text-sm sm:text-left">
                {hero.primaryNote}
              </p>
            </div>
            <a
              href={whatsappUrl(hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon />
              {hero.secondaryButton}
            </a>
          </div>
        </div>

        <div className="card hidden p-8 text-center lg:block">
          <Ar
            sized
            className="inline-block text-[3.5rem] font-bold text-lapis !leading-[1.6]"
          >
            {brand.nameArabic}
          </Ar>
          <div className="mx-auto flex w-fit items-center gap-3" aria-hidden="true">
            <span className="h-px w-20 bg-gold" />
            <span className="h-1 w-1 rounded-full bg-carnelian" />
            <span className="h-px w-20 bg-gold" />
          </div>
          <p className="mt-4 text-lg">
            <em>{brand.nameLatin}</em>
          </p>
          <p className="mt-1 text-lg font-semibold">“{brand.tagline}”</p>
          <p className="text-base">{brand.verseReference}</p>
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
