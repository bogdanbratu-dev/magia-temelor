import type { SiteContent } from "@/lib/types";

export function StructuredData({ content }: { content: SiteContent }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://magiatemelor.ro";

  const data = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: content.brand.name,
    description: content.seo.description,
    url: siteUrl,
    image: `${siteUrl}${content.brand.logoUrl}`,
    telephone: content.contact.phone,
    email: content.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.contact.address,
      addressLocality: "București",
      addressRegion: "Sector 3",
      addressCountry: "RO",
    },
    openingHours: `Mo-Fr ${content.program.pickupTime}-${content.program.endTime}`,
    sameAs: [content.contact.facebookUrl, content.contact.instagramUrl].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
