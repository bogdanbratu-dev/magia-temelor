import type { SiteContent } from "./types";

export const DEFAULT_CONTENT: SiteContent = {
  seo: {
    title: "Magia Temelor — Afterschool pentru copii și părinți fericiți | Sector 3, București",
    description:
      "Afterschool Magia Temelor din Sector 3, București: sprijin la teme, supraveghere după programul școlar, activități educative (limbi străine, șah, robotică, pian) pentru copii clasele 0-IV. Înscrieri pe tot parcursul anului.",
    keywords:
      "afterschool sector 3, after school bucuresti, magia temelor, after school copii, meditatii teme, program after school sector 3",
    ogImageUrl: "/images/logo.jpg",
  },
  brand: {
    name: "Magia Temelor",
    tagline: "Afterschool pentru copii și părinți fericiți",
    logoUrl: "/images/logo.jpg",
  },
  hero: {
    eyebrow: "Afterschool Sector 3, București",
    headline: "Un loc unde temele devin",
    highlightWord: "magie",
    subheadline:
      "La Magia Temelor, copilul tău primește sprijin real la teme, activități educative captivante și multă căldură — într-un spațiu liniștit, aproape de școală, unde vine cu drag în fiecare zi.",
    ctaPrimaryText: "Programează o vizită",
    ctaPrimaryLink: "#contact",
    ctaSecondaryText: "Vezi programul și prețurile",
    ctaSecondaryLink: "#program",
    imageUrl: "/images/hero-banner.jpg",
    stats: [
      { value: "6-11 ani", label: "Clasele 0 - IV" },
      { value: "11:30-18:30", label: "Luni - Vineri" },
      { value: "Tot anul", label: "Înscrieri deschise" },
    ],
  },
  about: {
    title: "Despre Magia Temelor",
    text:
      "Magia Temelor este un afterschool gândit ca o a doua casă pentru copii: un spațiu primitor, liniștit, situat într-o zonă nouă și ferită de aglomerația centrului, la câțiva pași de școală. Ne ocupăm cu drag de teme, de mesele copiilor și de tot ce înseamnă rutina de după școală, astfel încât părinții să vină seara acasă și să găsească temele gata făcute și copilul fericit.",
    imageUrl: "/images/logo.jpg",
    highlights: [
      {
        id: "h1",
        icon: "book-heart",
        title: "Sprijin real la teme",
        text: "Fiecare copil este ajutat individual să înțeleagă, nu doar să termine temele.",
      },
      {
        id: "h2",
        icon: "shield",
        title: "Siguranță și liniște",
        text: "Zonă nouă, liniștită, departe de aglomerația din centrul orașului.",
      },
      {
        id: "h3",
        icon: "sparkles",
        title: "Activități variate",
        text: "Limbi străine, șah, aritmetică mentală, robotică și pian, chiar în locație.",
      },
      {
        id: "h4",
        icon: "heart-handshake",
        title: "Echipă apropiată",
        text: "O echipă implicată, condusă de Roxana Trandafir, care cunoaște fiecare copil pe nume.",
      },
    ],
  },
  program: {
    title: "Program",
    description:
      "Preluăm copiii direct de la școală și rămânem alături de ei până seara, într-un ritm calm: masă, teme, joacă și activități.",
    ageGroups: "6-11 ani (clasele Pregătitoare - IV)",
    days: "Luni - Vineri",
    pickupTime: "11:30",
    endTime: "18:30",
    extraNote:
      "Program flexibil în funcție de orarul școlii copilului tău. Ne aflăm aproape de Școala nr. 116, nr. 82 și nr. 149.",
  },
  pricing: {
    title: "Prețuri",
    description: "Tarife transparente, fără costuri ascunse. Înscrieri pe tot parcursul anului școlar.",
    note: "Prețul poate varia în funcție de numărul de zile pe săptămână și de activitățile opționale alese.",
    tiers: [
      {
        id: "t1",
        name: "Program standard",
        price: "1.650",
        period: "lei / lună",
        highlighted: false,
        features: [
          "Preluare de la școală (11:30)",
          "Masă de prânz și gustare",
          "Sprijin la teme",
          "Program până la 18:30",
        ],
      },
      {
        id: "t2",
        name: "Program complet",
        price: "1.850",
        period: "lei / lună",
        highlighted: true,
        features: [
          "Tot ce include programul standard",
          "O activitate opțională inclusă",
          "Monitorizare progres școlar",
          "Comunicare constantă cu părinții",
        ],
      },
    ],
  },
  activities: {
    title: "Activități și ateliere",
    description:
      "Pe lângă sprijinul la teme, copiii pot participa la activități care le dezvoltă abilități noi, chiar în locație sau prin parteneri de încredere.",
    items: [
      {
        id: "a1",
        icon: "languages",
        title: "Limbi străine",
        description: "Engleză și alte limbi străine, prin joc și conversație.",
      },
      {
        id: "a2",
        icon: "piano",
        title: "Pian",
        description: "Primii pași în muzică, la nivel individual, potrivit vârstei.",
      },
      {
        id: "a3",
        icon: "puzzle",
        title: "Șah",
        description: "Gândire strategică și răbdare, printr-un joc iubit de copii.",
      },
      {
        id: "a4",
        icon: "calculator",
        title: "Aritmetică mentală",
        description: "Calcul rapid și concentrare, prin metode moderne, ludice.",
      },
      {
        id: "a5",
        icon: "bot",
        title: "Robotică",
        description: "Primele noțiuni de programare și construcție prin joacă.",
      },
      {
        id: "a6",
        icon: "book-open",
        title: "Sprijin la teme",
        description: "Însoțire zilnică la teme, cu răbdare și explicații clare.",
      },
    ],
  },
  gallery: {
    title: "Galerie foto",
    description: "O privire în universul Magia Temelor.",
    images: [
      {
        id: "g1",
        url: "/images/gallery/gallery-1.jpg",
        caption: "Atelier tematic — ciclul de viață al plantelor",
      },
      {
        id: "g2",
        url: "/images/gallery/gallery-2.jpg",
        caption: "Pictură și creativitate",
      },
      {
        id: "g3",
        url: "/images/gallery/gallery-3.jpg",
        caption: "Lectură și povești",
      },
      {
        id: "g4",
        url: "/images/gallery/gallery-4.jpg",
        caption: "Mândri de lucrările lor",
      },
      {
        id: "g5",
        url: "/images/gallery/gallery-5.jpg",
        caption: "Jocuri și activități de grup",
      },
      {
        id: "g6",
        url: "/images/gallery/gallery-6.jpg",
        caption: "Club de lectură",
      },
      {
        id: "g7",
        url: "/images/gallery/gallery-7.jpg",
        caption: "Atelier creativ — ceasul timpului",
      },
    ],
  },
  testimonials: {
    title: "Ce spun părinții",
    description: "Încrederea părinților este cea mai importantă recomandare.",
    items: [],
  },
  contact: {
    title: "Hai să ne cunoaștem",
    description:
      "Suntem bucuroși să răspundem la orice întrebare și te așteptăm oricând pentru o vizită.",
    address: "Strada Drumul Gura Putnei nr. 118-124, Sector 3, București",
    addressNote: "Zonă nouă și liniștită, aproape de Școala nr. 116, nr. 82 și nr. 149.",
    phone: "0760 385 271",
    email: "roxana.trandafir@scoala86.ro",
    contactPerson: "Roxana Trandafir",
    facebookUrl: "https://www.facebook.com/profile.php?id=61579311051059",
    instagramUrl: "",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Strada+Drumul+Gura+Putnei+118-124+Sector+3+Bucuresti&output=embed",
  },
  footer: {
    text: "Afterschool Magia Temelor · Sector 3, București",
  },
};
