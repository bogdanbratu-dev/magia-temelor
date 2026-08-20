"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BrandContent, ContactContent } from "@/lib/types";

const NAV_LINKS = [
  { href: "#despre", label: "Despre noi" },
  { href: "#program", label: "Program" },
  { href: "#activitati", label: "Activități" },
  { href: "#galerie", label: "Galerie" },
  { href: "#testimoniale", label: "Testimoniale" },
  { href: "#contact", label: "Contact" },
];

export function Header({
  brand,
  contact,
}: {
  brand: BrandContent;
  contact: ContactContent;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-950/5 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <Image
            src={brand.logoUrl}
            alt={brand.name}
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-400"
            priority
          />
          <span className="font-display text-lg sm:text-xl text-navy-950 leading-tight">
            {brand.name}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-navy-900/80 hover:text-navy-950 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${contact.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold text-navy-900"
          >
            <Phone className="h-4 w-4 text-gold-600" />
            {contact.phone}
          </a>
          <Button href="#contact" variant="primary" className="!px-5 !py-2.5 !text-sm">
            Programează o vizită
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/5 text-navy-950"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-navy-950/5 bg-cream-50">
          <nav className="flex flex-col px-5 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-base font-semibold text-navy-900 border-b border-navy-950/5 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 py-3 text-base font-semibold text-navy-900"
            >
              <Phone className="h-4 w-4 text-gold-600" />
              {contact.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
