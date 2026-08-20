import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/lib/types";

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section id="top" className="relative overflow-hidden sparkle-bg">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" aria-hidden />
      <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-navy-600/15 blur-3xl" aria-hidden />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-950/5 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-navy-900">
            <Sparkles className="h-4 w-4 text-gold-600" />
            {hero.eyebrow}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-navy-950 max-w-xl">
            {hero.headline}{" "}
            <span className="relative inline-block text-gold-600">
              {hero.highlightWord}
              <Star className="absolute -top-3 -right-6 h-5 w-5 text-gold-500" aria-hidden />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-navy-900/75 leading-relaxed max-w-xl">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
            <Button href={hero.ctaPrimaryLink} variant="primary">
              {hero.ctaPrimaryText}
            </Button>
            <Button href={hero.ctaSecondaryLink} variant="ghost">
              {hero.ctaSecondaryText}
            </Button>
          </div>

          <dl className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 w-full max-w-lg">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center lg:items-start">
                <dt className="font-display text-lg sm:text-2xl text-navy-950">{stat.value}</dt>
                <dd className="text-xs sm:text-sm text-navy-900/60 text-center lg:text-left">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-8 rounded-[3rem] bg-navy-950/90 rotate-3 shadow-[var(--shadow-soft)]" aria-hidden />
          <div className="relative rounded-[2.5rem] bg-cream-50 p-6 sm:p-8 shadow-[var(--shadow-soft)] -rotate-2">
            <Image
              src={hero.imageUrl}
              alt="Magia Temelor"
              width={420}
              height={420}
              priority
              className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
