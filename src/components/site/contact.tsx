import { Phone, Mail, MapPin, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/site/contact-form";
import type { ContactContent } from "@/lib/types";

export function Contact({ contact }: { contact: ContactContent }) {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-cream-200/60">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Hai să vorbim" title={contact.title} description={contact.description} />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-3xl bg-cream-50 p-6 sm:p-8 shadow-[var(--shadow-card)] ring-1 ring-navy-950/5 flex flex-col gap-5">
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy-900/50">Telefon</p>
                  <p className="font-display text-lg text-navy-950">{contact.phone}</p>
                </div>
              </a>

              <a href={`mailto:${contact.email}`} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy-900/50">Email</p>
                  <p className="font-display text-lg text-navy-950 break-all">{contact.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy-900/50">Adresă</p>
                  <p className="font-display text-lg text-navy-950">{contact.address}</p>
                  <p className="text-sm text-navy-900/60 mt-1">{contact.addressNote}</p>
                </div>
              </div>

              {contact.contactPerson ? (
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                    <User className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-navy-900/50">Coordonator</p>
                    <p className="font-display text-lg text-navy-950">{contact.contactPerson}</p>
                  </div>
                </div>
              ) : null}
            </div>

            {contact.mapEmbedUrl ? (
              <div className="overflow-hidden rounded-3xl ring-1 ring-navy-950/5 h-64 sm:h-72">
                <iframe
                  src={contact.mapEmbedUrl}
                  title="Locație Magia Temelor"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl bg-cream-50 p-6 sm:p-8 shadow-[var(--shadow-card)] ring-1 ring-navy-950/5">
              <h3 className="font-display text-xl text-navy-950 mb-1">Trimite-ne un mesaj</h3>
              <p className="text-sm text-navy-900/60 mb-6">
                Îți răspundem în cel mai scurt timp, de obicei în aceeași zi.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
