import { sampleSection } from "@/data/siteContent";
import { RootExplorer } from "@/components/RootExplorer";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { NewsletterForm } from "@/components/NewsletterForm";

export function SampleSection() {
  return (
    <section id="sample-lesson" className="border-b border-gold bg-papyrus-deep">
      <div className="mx-auto max-w-content px-4 py-14 md:px-6 md:py-20">
        <p className="eyebrow">{sampleSection.overline}</p>
        <h2 className="h-section mt-2 max-w-[44rem]">{sampleSection.header}</h2>
        <p className="mt-4 max-w-[46rem]">{sampleSection.subheader}</p>

        <div className="mt-10">
          <RootExplorer />
        </div>

        <div className="mt-14">
          <h3 className="h-card">{sampleSection.flashcardsTitle}</h3>
          <p className="mt-1 text-base">{sampleSection.flashcardsHint}</p>
          <div className="mt-6">
            <FlashcardDeck />
          </div>
        </div>

        <details
          id="newsletter"
          className="group mt-12 scroll-mt-28 rounded-lg border border-gold bg-papyrus"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block font-semibold md:text-xl">
                {sampleSection.newsletterTitle}
              </span>
              <span className="block text-base">{sampleSection.newsletterBody}</span>
            </span>
            <span
              className="text-2xl leading-none text-lapis transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="max-w-[34rem] px-5 pb-6 md:px-6">
            <NewsletterForm />
          </div>
        </details>
      </div>
    </section>
  );
}
