import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icon-map";
import type { AboutContent } from "@/lib/types";

export function About({ about }: { about: AboutContent }) {
  return (
    <section id="despre" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Cine suntem" title={about.title} />
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-6 max-w-3xl text-base sm:text-lg text-navy-900/75 leading-relaxed">
            {about.text}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.highlights.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <div className="h-full rounded-3xl bg-cream-50 p-6 shadow-[var(--shadow-card)] ring-1 ring-navy-950/5 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg text-navy-950">{item.title}</h3>
                <p className="text-sm text-navy-900/70 leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
