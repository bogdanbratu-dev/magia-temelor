import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
};

export default async function PrivacyPage() {
  const { contact, brand } = await getSiteContent();

  return (
    <Container className="py-16 sm:py-24 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl text-navy-950 mb-8">
        Politica de confidențialitate
      </h1>

      <div className="flex flex-col gap-6 text-navy-900/80 leading-relaxed">
        <p>
          Această pagină explică ce date cu caracter personal colectăm prin site-ul{" "}
          {brand.name} și cum le folosim, în conformitate cu Regulamentul (UE) 2016/679
          (GDPR).
        </p>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Cine suntem</h2>
          <p>
            Operatorul de date este {brand.name}, cu sediul de desfășurare la {contact.address}.
            Pentru orice întrebare legată de datele tale personale, ne poți contacta la{" "}
            <a href={`mailto:${contact.email}`} className="text-navy-950 underline">
              {contact.email}
            </a>{" "}
            sau la telefon {contact.phone}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Ce date colectăm</h2>
          <p>
            Prin formularul de contact de pe site colectăm: numele tău, numărul de telefon,
            adresa de email (opțional) și mesajul transmis. Aceste date sunt folosite exclusiv
            pentru a-ți răspunde la solicitare și pentru a discuta despre înscrierea copilului
            tău la programul nostru de afterschool.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">
            Cum folosim și stocăm datele
          </h2>
          <p>
            Datele transmise prin formular sunt trimise direct pe adresa noastră de email și nu
            sunt vândute, închiriate sau folosite în scopuri de marketing fără acordul tău
            explicit. Le păstrăm doar atât timp cât este necesar pentru a răspunde solicitării
            tale sau pentru derularea relației contractuale, dacă aceasta se concretizează.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Drepturile tale</h2>
          <p>
            Conform GDPR, ai dreptul de a solicita accesul la datele tale, rectificarea sau
            ștergerea acestora, restricționarea prelucrării, precum și dreptul de a te opune
            prelucrării. Pentru a-ți exercita oricare dintre aceste drepturi, scrie-ne la{" "}
            <a href={`mailto:${contact.email}`} className="text-navy-950 underline">
              {contact.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-navy-950 mb-2">Module cookie</h2>
          <p>
            Site-ul nostru nu folosește module cookie de urmărire sau publicitate. Pot fi
            folosite doar cookie-uri strict necesare funcționării site-ului.
          </p>
        </section>
      </div>
    </Container>
  );
}
