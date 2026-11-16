import { BookingProvider } from "@/components/BookingProvider";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pathways } from "@/components/Pathways";
import { Pricing } from "@/components/Pricing";
import { SampleSection } from "@/components/SampleSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getViewer } from "@/lib/viewer";

export default async function HomePage() {
  const viewer = await getViewer();

  return (
    <BookingProvider viewer={viewer}>
      <SiteHeader viewer={viewer} />
      <main id="main">
        <Hero />
        <HowItWorks />
        <SampleSection />
        <Pathways />
        <Pricing signedIn={Boolean(viewer)} />
        <Faq />
      </main>
      <SiteFooter />
    </BookingProvider>
  );
}
