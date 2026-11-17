import { howItWorks } from "@/data/siteContent";
import { roots } from "@/data/rootsAndLessons";
import { worldStyles } from "@/lib/worlds";
import { Ar } from "@/components/Arabic";

export function HowItWorks() {
  // The motif uses the first root in data/rootsAndLessons.ts.
  const root = roots[0];

  return (
    <section id="how-it-works" className="border-b border-gold">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{howItWorks.overline}</p>
        <h2 className="h-section mt-2 max-w-[40rem]">{howItWorks.header}</h2>
        <p className="mt-4 max-w-[44rem]">{howItWorks.intro}</p>

        {/* Graphic motif: three root letters branching into three worlds. */}
        <div className="mt-12">
          <div
            className="mx-auto flex w-fit items-center"
            dir="rtl"
            role="img"
            aria-label={`The root ${root.franco}`}
          >
            {root.letters.map((letter, index) => (
              <div key={letter} className="flex items-center" aria-hidden="true">
                {index > 0 && <span className="h-px w-8 bg-gold md:w-14" />}
                <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-gold bg-papyrus-light md:h-20 md:w-20">
                  <Ar sized className="text-[2rem] font-bold text-lapis md:text-[2.5rem] !leading-[1.6]">
                    {letter}
                  </Ar>
                </span>
              </div>
            ))}
          </div>
          <div className="mx-auto h-8 w-px bg-gold" aria-hidden="true" />
          <div
            className="mx-auto hidden h-px bg-gold md:block"
            style={{ width: "calc(66.6667% + 0.8333rem)" }}
            aria-hidden="true"
          />

          <ul className="grid gap-5 md:grid-cols-3">
            {howItWorks.worlds.map((item) => {
              const style = worldStyles[item.world];
              return (
                <li key={item.world} className="flex flex-col items-stretch">
                  <span
                    className="mx-auto hidden h-6 w-px bg-gold md:block"
                    aria-hidden="true"
                  />
                  <div className="card h-full p-6">
                    <p className={`flex items-center gap-2 text-sm font-semibold uppercase ${style.text}`}
                      style={{ letterSpacing: "0.1em" }}>
                      <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} aria-hidden="true" />
                      {item.label}
                    </p>
                    <h3 className={`h-card mt-2 ${style.heading}`}>{item.title}</h3>
                    <p className="mt-2 text-base">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="border-t border-gold pt-5">
              <p className="font-semibold text-lapis" style={{ fontVariantNumeric: "tabular-nums" }}>
                Step {index + 1}
              </p>
              <h3 className="h-card mt-1">{step.title}</h3>
              <p className="mt-2 text-base">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
