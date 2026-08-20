import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";
import type { BrandContent, ContactContent, FooterContent } from "@/lib/types";

export function Footer({
  brand,
  contact,
  footer,
}: {
  brand: BrandContent;
  contact: ContactContent;
  footer: FooterContent;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-cream-100">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={brand.logoUrl}
              alt={brand.name}
              width={44}
              height={44}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-400"
            />
            <span className="font-display text-lg">{brand.name}</span>
          </div>
          <p className="text-sm text-cream-100/70 leading-relaxed">{brand.tagline}</p>
          <div className="flex items-center gap-3 pt-1">
            {contact.facebookUrl ? (
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition-colors"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            ) : null}
            {contact.instagramUrl ? (
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base text-gold-300">Navigare</h3>
          <a href="#despre" className="text-sm text-cream-100/80 hover:text-white">
            Despre noi
          </a>
          <a href="#program" className="text-sm text-cream-100/80 hover:text-white">
            Program & prețuri
          </a>
          <a href="#activitati" className="text-sm text-cream-100/80 hover:text-white">
            Activități
          </a>
          <a href="#contact" className="text-sm text-cream-100/80 hover:text-white">
            Contact
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base text-gold-300">Contact</h3>
          <a
            href={`tel:${contact.phone.replace(/\s+/g, "")}`}
            className="flex items-start gap-2 text-sm text-cream-100/80 hover:text-white"
          >
            <Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold-400" />
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-start gap-2 text-sm text-cream-100/80 hover:text-white break-all"
          >
            <Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold-400" />
            {contact.email}
          </a>
          <p className="flex items-start gap-2 text-sm text-cream-100/80">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold-400" />
            {contact.address}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:flex-row sm:justify-between">
          <p className="text-xs text-cream-100/60">
            © {year} {footer.text}
          </p>
          <div className="flex items-center gap-4 text-xs text-cream-100/60">
            <Link href="/termeni-si-conditii" className="hover:text-white">
              Termeni și condiții
            </Link>
            <Link href="/confidentialitate" className="hover:text-white">
              Confidențialitate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
