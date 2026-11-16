import { faqSection, faqs } from "@/data/siteContent";
import { WithArabic } from "@/components/Arabic";

export function Faq() {
  return (
    <section id="faq" className="border-b border-gold">
      <div className="mx-auto max-w-[52rem] px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{faqSection.overline}</p>
        <h2 className="h-section mt-2">{faqSection.header}</h2>

        <div className="mt-8 border-t border-gold">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-gold">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  className="text-2xl leading-none text-lapis transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-base md:text-lg">
                <WithArabic text={faq.answer} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
