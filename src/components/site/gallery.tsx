"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ImageOff } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { GalleryContent } from "@/lib/types";

export function Gallery({ gallery }: { gallery: GalleryContent }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-cream-200/60">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Universul nostru"
            title={gallery.title}
            description={gallery.description}
          />
        </Reveal>

        {gallery.images.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-cream-50 ring-1 ring-navy-950/5 p-10 sm:p-16 flex flex-col items-center gap-3 text-center">
            <ImageOff className="h-8 w-8 text-navy-900/30" />
            <p className="text-sm text-navy-900/60 max-w-sm">
              Pozele vor apărea aici de îndată ce sunt adăugate din panoul de administrare.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {gallery.images.map((image, i) => (
              <Reveal key={image.id} delay={(i % 4) * 80}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative block w-full aspect-square overflow-hidden rounded-2xl ring-1 ring-navy-950/5"
                >
                  <Image
                    src={image.url}
                    alt={image.caption || gallery.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[60] bg-navy-950/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Închide"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-w-3xl w-full aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery.images[active].url}
              alt={gallery.images[active].caption || gallery.title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {gallery.images[active].caption ? (
            <p className="absolute bottom-6 text-center text-sm text-cream-100/80 px-6">
              {gallery.images[active].caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
