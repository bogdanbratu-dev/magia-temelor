import { getSiteContent } from "@/lib/content";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { StickyMobileBar } from "@/components/site/sticky-mobile-bar";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <>
      <Header brand={content.brand} contact={content.contact} />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer brand={content.brand} contact={content.contact} footer={content.footer} />
      <StickyMobileBar phone={content.contact.phone} />
    </>
  );
}
