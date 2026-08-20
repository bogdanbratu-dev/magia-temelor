import { getSiteContent } from "@/lib/content";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Program } from "@/components/site/program";
import { Activities } from "@/components/site/activities";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { StructuredData } from "@/components/site/structured-data";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <StructuredData content={content} />
      <Hero hero={content.hero} />
      <About about={content.about} />
      <Program program={content.program} pricing={content.pricing} />
      <Activities activities={content.activities} />
      <Gallery gallery={content.gallery} />
      <Testimonials testimonials={content.testimonials} />
      <Contact contact={content.contact} />
    </>
  );
}
