import { brand, contact, whatsappUrl } from "@/data/siteContent";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Contact() {
  return (
    <section id="contact" className="border-b border-gold bg-papyrus-deep">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 md:grid-cols-2 md:gap-14 md:px-6 md:py-20">
        <div>
          <p className="eyebrow">{contact.overline}</p>
          <h2 className="h-section mt-2">{contact.header}</h2>
          <p className="mt-4">{contact.intro}</p>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-6"
          >
            <WhatsAppIcon />
            {contact.whatsappButton}
          </a>

          <p className="mt-5 text-base">
            {brand.contactEmail ? (
              <>
                {contact.emailNote}{" "}
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="font-semibold text-lapis underline"
                >
                  {brand.contactEmail}
                </a>
                .
              </>
            ) : (
              contact.emailNoteFallback
            )}
          </p>
        </div>

        <div className="card p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
