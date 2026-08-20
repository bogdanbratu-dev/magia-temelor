import { Clock, Users, CalendarCheck, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import type { ProgramContent, PricingContent } from "@/lib/types";

export function Program({
  program,
  pricing,
}: {
  program: ProgramContent;
  pricing: PricingContent;
}) {
  const facts = [
    { icon: Users, label: "Vârstă", value: program.ageGroups },
    { icon: CalendarCheck, label: "Zile", value: program.days },
    { icon: Clock, label: "Interval orar", value: `${program.pickupTime} - ${program.endTime}` },
  ];

  return (
    <section id="program" className="py-16 sm:py-24 bg-navy-950 text-cream-50">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Cum funcționează"
            title={program.title}
            description={program.description}
            variant="dark"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 90}>
              <div className="h-full flex items-center gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-navy-950">
                  <fact.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-cream-100/60">{fact.label}</p>
                  <p className="font-display text-lg">{fact.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-sm text-cream-100/70 leading-relaxed">{program.extraNote}</p>

        <div className="mt-16">
          <Reveal>
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                {pricing.title}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl">{pricing.description}</h3>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto sm:mx-0">
            {pricing.tiers.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 100}>
                <div
                  className={`h-full rounded-3xl p-7 flex flex-col gap-5 ${
                    tier.highlighted
                      ? "bg-gold-500 text-navy-950 shadow-[var(--shadow-soft)]"
                      : "bg-white/5 ring-1 ring-white/10"
                  }`}
                >
                  <div>
                    <p className="font-display text-xl">{tier.name}</p>
                    <p className="mt-2 flex items-baseline gap-1.5">
                      <span className="font-display text-3xl">{tier.price}</span>
                      <span className={`text-sm ${tier.highlighted ? "text-navy-950/70" : "text-cream-100/60"}`}>
                        {tier.period}
                      </span>
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm leading-snug">
                        <Check
                          className={`h-4 w-4 mt-0.5 shrink-0 ${
                            tier.highlighted ? "text-navy-950" : "text-gold-400"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="#contact"
                    variant={tier.highlighted ? "secondary" : "primary"}
                    className="mt-auto w-full"
                  >
                    Alege acest program
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-center sm:text-left text-xs text-cream-100/50 max-w-2xl">
            {pricing.note}
          </p>
        </div>
      </div>
    </section>
  );
}
