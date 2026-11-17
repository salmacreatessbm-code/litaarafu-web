import { Audiences } from "@/components/Audiences";
import { BookingProvider } from "@/components/BookingProvider";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { SampleSection } from "@/components/SampleSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Tracks } from "@/components/Tracks";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getViewer } from "@/lib/viewer";

export default async function HomePage() {
  const viewer = await getViewer();

  return (
    <BookingProvider viewer={viewer}>
      <SiteHeader viewer={viewer} />
      <main id="main">
        <Hero />
        <Tracks />
        <HowItWorks />
        <SampleSection />
        <Audiences />
        <Pricing signedIn={Boolean(viewer)} />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </BookingProvider>
  );
}
