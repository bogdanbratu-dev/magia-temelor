import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Termeni și condiții",
};

export default async function TermsPage() {
  const { contact, brand } = await getSiteContent();

  return (
    <Container className="py-16 sm:py-24 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl text-navy-950 mb-8">
        Termeni și condiții
      </h1>

      <div className="flex flex-col gap-6 text-navy-900/80 leading-relaxed">
        <p>
          Acești termeni și condiții reglementează utilizarea site-ului {brand.name} și
          descriu condițiile generale ale serviciilor noastre de afterschool.
        </p>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Serviciile noastre</h2>
          <p>
            {brand.name} oferă servicii de tip afterschool pentru copii, incluzând sprijin la
            teme, supraveghere, masă și activități educative opționale, conform programului și
            tarifelor afișate pe site. Informațiile despre program și prețuri au caracter
            orientativ și pot fi confirmate direct cu echipa noastră înainte de înscriere.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Înscrierea</h2>
          <p>
            Înscrierea unui copil în program se face în urma discuției directe cu echipa
            {" " + brand.name}, telefonic, prin email sau în cadrul unei vizite la locație.
            Detaliile contractuale specifice (tarife, program, condiții de anulare) se
            stabilesc separat, în relația directă cu părintele sau tutorele legal.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Conținutul site-ului</h2>
          <p>
            Textele, imaginile și elementele grafice de pe acest site aparțin {brand.name} și
            nu pot fi reproduse fără acord, cu excepția cazurilor permise de lege.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Contact</h2>
          <p>
            Pentru orice întrebare legată de acești termeni, ne poți scrie la{" "}
            <a href={`mailto:${contact.email}`} className="text-navy-950 underline">
              {contact.email}
            </a>{" "}
            sau suna la {contact.phone}.
          </p>
        </section>
      </div>
    </Container>
  );
}
