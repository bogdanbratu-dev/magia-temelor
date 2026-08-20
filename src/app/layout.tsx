import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { StickyMobileBar } from "@/components/site/sticky-mobile-bar";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { seo, brand } = content;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://magiatemelor.ro"),
    title: {
      default: seo.title,
      template: `%s · ${brand.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImageUrl }],
      locale: "ro_RO",
      type: "website",
      siteName: brand.name,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImageUrl],
    },
    icons: {
      icon: brand.logoUrl,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();

  return (
    <html
      lang="ro"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100 text-navy-950">
        <Header brand={content.brand} contact={content.contact} />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer brand={content.brand} contact={content.contact} footer={content.footer} />
        <StickyMobileBar phone={content.contact.phone} />
      </body>
    </html>
  );
}
