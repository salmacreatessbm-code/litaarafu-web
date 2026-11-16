import Link from "next/link";
import { sampleSection } from "@/data/siteContent";
import { RootExplorer } from "@/components/RootExplorer";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { LessonPeek } from "@/components/LessonPeek";

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

        <div className="mt-16">
          <h3 className="h-card">{sampleSection.flashcardsTitle}</h3>
          <p className="mt-1 text-base">{sampleSection.flashcardsHint}</p>
          <div className="mt-6">
            <FlashcardDeck />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="h-card">{sampleSection.peekTitle}</h3>
          <div className="mt-6">
            <LessonPeek />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-lg border border-gold bg-papyrus p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-lg font-semibold md:text-xl">{sampleSection.showcaseCta}</p>
          <Link href="/#newsletter" className="btn-community shrink-0">
            {sampleSection.showcaseButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
