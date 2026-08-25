import { Star, MessageCircleHeart, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { TestimonialsContent } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: TestimonialsContent }) {
  return (
    <section id="testimoniale" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Părerea contează"
            title={testimonials.title}
            description={testimonials.description}
          />
        </Reveal>

        {testimonials.googleReviewUrl ? (
          <Reveal>
            <div className="mt-6 flex justify-center">
              <a
                href={testimonials.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-sm font-medium text-cream-50 shadow-[var(--shadow-card)] transition hover:bg-navy-900"
              >
                <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                Lasă-ne un review pe Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        ) : null}

        {testimonials.items.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-cream-50 ring-1 ring-navy-950/5 p-10 sm:p-16 flex flex-col items-center gap-3 text-center">
            <MessageCircleHeart className="h-8 w-8 text-navy-900/30" />
            <p className="text-sm text-navy-900/60 max-w-sm">
              Testimonialele părinților vor apărea aici de îndată ce sunt adăugate din panoul de
              administrare.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 90}>
                <div className="h-full rounded-3xl bg-cream-50 p-6 shadow-[var(--shadow-card)] ring-1 ring-navy-950/5 flex flex-col gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-4 w-4 ${
                          starIndex < item.rating ? "fill-gold-500 text-gold-500" : "text-navy-950/15"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-navy-900/75 leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                  <div className="mt-auto">
                    <p className="font-display text-base text-navy-950">{item.name}</p>
                    {item.role ? <p className="text-xs text-navy-900/50">{item.role}</p> : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
