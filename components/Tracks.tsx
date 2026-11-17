import { tracks, tracksSection } from "@/data/siteContent";
import { worldStyles } from "@/lib/worlds";
import { BookButton } from "@/components/BookingProvider";

export function Tracks() {
  return (
    <section id="tracks" className="border-b border-gold bg-papyrus-deep">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{tracksSection.overline}</p>
        <h2 className="h-section mt-2 max-w-[40rem]">{tracksSection.header}</h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {tracks.map((track) => {
            const style = worldStyles[track.world];
            return (
              <li key={track.value} className="card flex flex-col">
                <div className={`h-1.5 rounded-t-[7px] ${style.bar}`} aria-hidden="true" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className={`h-card ${style.heading}`}>{track.title}</h3>
                  <p className="mt-3 text-base">{track.body}</p>
                  <div className="mt-auto pt-5">
                    <BookButton
                      serviceSlug="assessment"
                      track={track.value}
                      className="btn-outline w-full"
                    >
                      {tracksSection.cta}
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
