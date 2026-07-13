import type { Locale } from "@/lib/i18n";
import { BLOG_LIST } from "@/lib/content/blog-list";

interface BlogDetailContent {
  backLabel: string;
  notFound: { title: string; back: string };
  cta: { heading: string; blurb: string; exploreTours: string; whatsapp: string; whatsappMsg: (title: string) => string };
  moreHeading: string;
  allArticles: string;
  ogLocale?: string;
}

export const BLOG_DETAIL: Record<Locale, BlogDetailContent> = {
  en: {
    backLabel: "The journal",
    notFound: { title: "Article not found", back: "Back to the journal" },
    cta: {
      heading: "Planning a journey of your own?",
      blurb: "Speak with a heritage specialist about your family, dates and dreams.",
      exploreTours: "Explore tours",
      whatsapp: "WhatsApp us",
      whatsappMsg: (title) => `I just read "${title}" and I'd like to know more.`,
    },
    moreHeading: "More from the journal",
    allArticles: "All articles",
  },
  fr: {
    backLabel: "Le journal",
    notFound: { title: "Article introuvable", back: "Retour au journal" },
    cta: {
      heading: "Vous planifiez votre propre voyage ?",
      blurb: "Parlez à un spécialiste du patrimoine de votre famille, vos dates et vos rêves.",
      exploreTours: "Voir les circuits",
      whatsapp: "WhatsApp",
      whatsappMsg: (title) => `Bonjour ! Je viens de lire "${title}" et je souhaite en savoir plus.`,
    },
    moreHeading: "Plus dans le journal",
    allArticles: "Tous les articles",
    ogLocale: "fr_FR",
  },
};

/** Category label lookup, shared with the blog listing page. */
export const categoryLabel = (locale: Locale, cat: string) =>
  BLOG_LIST[locale].categoryLabels[cat as keyof (typeof BLOG_LIST)[typeof locale]["categoryLabels"]] ?? cat;
