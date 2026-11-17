import { contact, whatsappUrl } from "@/data/siteContent";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

/** Small floating WhatsApp shortcut, fixed to the bottom-right corner. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={contact.floatingLabel}
      title={contact.floatingLabel}
      className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-malachite text-white shadow-lg ring-1 ring-papyrus/60 transition-colors hover:bg-[#24503A] md:bottom-6 md:right-6 md:h-14 md:w-14"
    >
      <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  );
}
