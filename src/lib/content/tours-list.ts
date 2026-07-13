import type { Locale } from "@/lib/i18n";

interface ToursListContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
}

export const TOURS_LIST: Record<Locale, ToursListContent> = {
  en: {
    meta: {
      title: "Sikh Heritage Tour Packages — YatraPK",
      description: "Explore our premium Sikh heritage and pilgrimage packages: Kartarpur Express, Sikh Heritage of Punjab, Roots & Ancestry, Luxury Private and Gurdwara Group tours.",
    },
    hero: {
      eyebrow: "Curated journeys",
      title: "Heritage & pilgrimage tours",
      description: "Five thoughtfully designed paths — from a short Kartarpur darshan to a fully bespoke ancestral journey for your family.",
    },
  },
  fr: {
    meta: {
      title: "Circuits Patrimoine Sikh — YatraPK",
      description: "Explorez nos circuits premium de patrimoine et pèlerinage sikh : Kartarpur Express, Patrimoine Sikh du Pendjab, Racines et Ascendance, Luxe Privé et Pèlerinage de Groupe.",
    },
    hero: {
      eyebrow: "Voyages conçus sur mesure",
      title: "Circuits patrimoniaux et pèlerinages",
      description: "Cinq itinéraires pensés avec soin — du court darshan à Kartarpur au voyage ancestral entièrement sur mesure pour votre famille.",
    },
  },
};
