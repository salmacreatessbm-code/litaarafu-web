import { pathways, pathwaysSection } from "@/data/siteContent";
import { worldStyles } from "@/lib/worlds";
import { BookButton } from "@/components/BookingProvider";

export function Pathways() {
  return (
    <section id="who-its-for" className="border-b border-gold">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{pathwaysSection.overline}</p>
        <h2 className="h-section mt-2 max-w-[40rem]">{pathwaysSection.header}</h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {pathways.map((pathway, index) => {
            const style = worldStyles[pathway.world];
            // Three cards on the first desktop row, two wider ones below.
            const span = index < 3 ? "lg:col-span-2" : "lg:col-span-3";
            return (
              <li key={pathway.slug} className={`card flex flex-col ${span}`}>
                <div className={`h-1.5 rounded-t-[7px] ${style.bar}`} aria-hidden="true" />
                <div className="flex flex-1 flex-col p-6">
                  <p
                    className={`text-sm font-semibold uppercase ${style.text}`}
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {pathway.audience}
                  </p>
                  <h3 className="h-card mt-2">{pathway.headline}</h3>
                  <p className="mt-3 text-base">{pathway.painPoint}</p>
                  <p className="mt-3 text-base">
                    <span className={`font-semibold ${style.text}`}>How we help: </span>
                    {pathway.howWeHelp}
                  </p>
                  <div className="mt-auto pt-5">
                    <BookButton
                      serviceSlug={pathway.serviceSlug}
                      className="btn-outline w-full sm:w-auto"
                    >
                      {pathway.cta}
                    </BookButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
