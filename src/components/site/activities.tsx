import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icon-map";
import type { ActivitiesContent } from "@/lib/types";

export function Activities({ activities }: { activities: ActivitiesContent }) {
  return (
    <section id="activitati" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Peste sprijinul la teme"
            title={activities.title}
            description={activities.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90}>
              <div className="h-full rounded-3xl bg-cream-50 p-6 shadow-[var(--shadow-card)] ring-1 ring-navy-950/5 flex flex-col gap-4 hover:-translate-y-1 transition-transform">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg text-navy-950">{item.title}</h3>
                <p className="text-sm text-navy-900/70 leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
