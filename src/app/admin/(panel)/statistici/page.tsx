import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statistici",
  robots: { index: false, follow: false },
};

const CARDS = [
  {
    title: "Vizitatori acum (Realtime)",
    description: "Câți oameni sunt pe site chiar acum și ce pagini văd.",
    href: "https://analytics.google.com/analytics/web/#/realtime/overview",
  },
  {
    title: "Vizitatori pe zi / interval custom",
    description:
      "Numărul de vizitatori și afișări de pagină. Sus-dreapta poți alege orice interval de date sau compara două perioade.",
    href: "https://analytics.google.com/analytics/web/#/report/visitors-overview",
  },
  {
    title: "De unde vine traficul",
    description:
      "Google (căutare), Facebook, direct pe site, alte site-uri, cine trimite cei mai mulți vizitatori.",
    href: "https://analytics.google.com/analytics/web/#/report/acquisition-channels",
  },
  {
    title: "Căutări Google (Search Console)",
    description:
      "Ce cuvinte caută oamenii pe Google când ajung la tine, câte click-uri și afișări are site-ul.",
    href: "https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain:magiatemelor.ro",
  },
];

export default function StatisticiPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin"
          className="text-sm text-navy-900/60 hover:text-navy-950 underline underline-offset-2"
        >
          ← Panou conținut
        </Link>
        <h1 className="mt-2 font-display text-2xl text-navy-950">Statistici</h1>
        <p className="mt-1 text-sm text-navy-900/60 max-w-xl">
          Datele complete sunt în Google Analytics și Google Search Console. Mai jos ai
          linkuri directe către cele mai utile rapoarte, se deschid într-o filă nouă (necesită
          să fii logat cu contul Google conectat la site).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-cream-50 p-5 ring-1 ring-navy-950/5 shadow-[var(--shadow-card)] hover:ring-navy-950/15 transition"
          >
            <p className="font-display text-base text-navy-950">{card.title}</p>
            <p className="mt-1.5 text-sm text-navy-900/65 leading-relaxed">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
