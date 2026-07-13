import type { Locale } from "@/lib/i18n";

interface TestimonialsContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  videoHeading: string;
  videoAlt: string;
  playAriaLabel: string;
}

export const TESTIMONIALS_PAGE: Record<Locale, TestimonialsContent> = {
  en: {
    meta: {
      title: "Testimonials — YatraPK",
      description: "Stories from diaspora Sikh families and gurdwara groups who travelled with us.",
    },
    hero: { eyebrow: "Sangat stories", title: "The journeys, in their words", description: "Reviews from yatris across the UK, Canada, USA and Australia." },
    videoHeading: "Video testimonials",
    videoAlt: "Video testimonial",
    playAriaLabel: "Play video",
  },
  fr: {
    meta: {
      title: "Témoignages — YatraPK",
      description: "Témoignages de familles sikhes de la diaspora et de groupes de gurdwara qui ont voyagé avec nous.",
    },
    hero: { eyebrow: "Témoignages de la sangat", title: "Le voyage, en leurs mots", description: "Avis de yatris du Royaume-Uni, du Canada, des États-Unis, d'Australie et de France." },
    videoHeading: "Témoignages vidéo",
    videoAlt: "Témoignage vidéo",
    playAriaLabel: "Lire le témoignage vidéo",
  },
};
