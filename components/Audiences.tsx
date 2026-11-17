import Image from "next/image";
import { audiences, audiencesSection } from "@/data/siteContent";

export function Audiences() {
  return (
    <section id="who-its-for" className="border-b border-gold">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{audiencesSection.overline}</p>
        <h2 className="h-section mt-2 max-w-[40rem]">{audiencesSection.header}</h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <li key={audience.slug} className="card flex flex-col overflow-hidden">
              {/* 16:10 image slot. Set `image` in data/siteContent.ts to fill it. */}
              <div className="relative aspect-[16/10] bg-stone-200">
                {audience.image && (
                  <Image
                    src={audience.image}
                    alt={audience.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                {audience.logo && (
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1.5 shadow-sm">
                    <Image
                      src={audience.logo.src}
                      alt={audience.logo.alt}
                      width={84}
                      height={28}
                      unoptimized
                      className="h-7 w-auto"
                    />
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug text-ink">
                  {audience.title}
                </h3>
                <p className="mt-2 text-base">{audience.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
