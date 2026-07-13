import type { Locale } from "@/lib/i18n";

interface GalleryContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string };
  sectionTitles: [string, string, string, string];
}

export const GALLERY: Record<Locale, GalleryContent> = {
  en: {
    meta: {
      title: "Gallery — YatraPK",
      description: "Photographs of gurdwaras, Lahore heritage, family ancestry visits, food and culture from our Sikh heritage tours in Pakistan.",
    },
    hero: { eyebrow: "Through the lens", title: "Moments from the journey" },
    sectionTitles: ["Gurdwaras", "Lahore & Heritage", "Family Ancestry Visits", "Food & Culture"],
  },
  fr: {
    meta: {
      title: "Galerie — YatraPK",
      description: "Photographies de gurdwaras, du patrimoine de Lahore, de visites ancestrales familiales et de la culture de nos circuits.",
    },
    hero: { eyebrow: "À travers l'objectif", title: "Moments du voyage" },
    sectionTitles: ["Gurdwaras", "Lahore & Patrimoine", "Visites ancestrales familiales", "Gastronomie & Culture"],
  },
};
