import type { Locale } from "@/lib/i18n";

/** Canonical category keys, matching the `cat` field used in posts.ts/posts.fr.ts. */
export const CATEGORY_KEYS = [
  "Sikh Heritage",
  "Pakistan Travel Tips",
  "Punjabi Culture",
  "Pilgrimage Guides",
  "Historical Stories",
  "Ancestry & Roots",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

interface BlogListContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  allLabel: string;
  categoryLabels: Record<CategoryKey, string>;
}

export const BLOG_LIST: Record<Locale, BlogListContent> = {
  en: {
    meta: {
      title: "Blog — Sikh Heritage, Pakistan Travel Tips & Ancestry Stories",
      description: "Guides on Sikh heritage travel to Pakistan, Kartarpur Sahib, Nankana Sahib, planning tips for the UK, Canada, USA and Australia, and ancestry stories.",
    },
    hero: { eyebrow: "Stories & guides", title: "The journal", description: "Heritage, history, planning and the human stories behind each tour." },
    allLabel: "All",
    categoryLabels: {
      "Sikh Heritage": "Sikh Heritage",
      "Pakistan Travel Tips": "Pakistan Travel Tips",
      "Punjabi Culture": "Punjabi Culture",
      "Pilgrimage Guides": "Pilgrimage Guides",
      "Historical Stories": "Historical Stories",
      "Ancestry & Roots": "Ancestry & Roots",
    },
  },
  fr: {
    meta: {
      title: "Blog — Patrimoine sikh, conseils de voyage et histoires d'ascendance",
      description: "Guides sur le voyage patrimonial sikh au Pakistan, Kartarpur Sahib, Nankana Sahib, conseils de planification pour la France, le Royaume-Uni, le Canada, les États-Unis et l'Australie.",
    },
    hero: { eyebrow: "Journal du patrimoine", title: "Récits, guides et histoires", description: "Ressources pour planifier votre voyage patrimonial sikh au Pakistan." },
    allLabel: "Tous",
    categoryLabels: {
      "Sikh Heritage": "Patrimoine sikh",
      "Pakistan Travel Tips": "Conseils de voyage au Pakistan",
      "Punjabi Culture": "Culture pendjabi",
      "Pilgrimage Guides": "Guides de pèlerinage",
      "Historical Stories": "Récits historiques",
      "Ancestry & Roots": "Racines et ascendance",
    },
  },
};
