import type { Locale } from "@/lib/i18n";

interface TourDetailContent {
  allToursLink: string;
  quickFacts: { hotels: string; transport: string; meals: string; comfort: string };
  itinerary: { heading: string; blurb: string };
  destinations: string;
  inclusions: string;
  exclusions: string;
  mapCard: { title: string; body: string };
  visaInfo: { title: string; body: string };
  safetyInfo: { title: string; body: string };
  faqHeading: string;
  sidebar: { startingFrom: string; whatsapp: string; whatsappMsg: (name: string) => string };
  testimonialsHeading: string;
  relatedHeading: string;
  allTours: string;
  notFound: { title: string; back: string };
}

export const TOUR_DETAIL: Record<Locale, TourDetailContent> = {
  en: {
    allToursLink: "← All tours",
    quickFacts: { hotels: "Hotels", transport: "Transport", meals: "Meals", comfort: "Comfort" },
    itinerary: { heading: "Day-by-day itinerary", blurb: "A guided rhythm with rest days, langar time and space for reflection." },
    destinations: "Key destinations",
    inclusions: "Inclusions",
    exclusions: "Exclusions",
    mapCard: { title: "Interactive route map", body: "A live itinerary map for this tour is available on request — we'll send it with your detailed PDF." },
    visaInfo: { title: "Visa support", body: "We provide a personalised invitation letter and step-by-step visa guidance for travellers from the UK, Canada, USA, Australia and beyond." },
    safetyInfo: { title: "Safety note", body: "On-ground 24/7 trip director, private vehicles, vetted hotels and continuous coordination with all gurdwara committees." },
    faqHeading: "Frequently asked",
    sidebar: {
      startingFrom: "Starting from",
      whatsapp: "WhatsApp us",
      whatsappMsg: (name) => `Hi! I'd like detailed info on the ${name} tour.`,
    },
    testimonialsHeading: "What travellers say",
    relatedHeading: "Related journeys",
    allTours: "All tours",
    notFound: { title: "Tour not found", back: "Back to all tours" },
  },
  fr: {
    allToursLink: "← Tous les circuits",
    quickFacts: { hotels: "Hôtels", transport: "Transport", meals: "Repas", comfort: "Confort" },
    itinerary: { heading: "Itinéraire jour par jour", blurb: "Un rythme guidé avec des jours de repos, du temps de langar et de l'espace pour la réflexion." },
    destinations: "Destinations clés",
    inclusions: "Inclus",
    exclusions: "Non inclus",
    mapCard: { title: "Carte de l'itinéraire interactive", body: "Une carte d'itinéraire en direct pour ce circuit est disponible sur demande — nous vous l'enverrons avec votre PDF détaillé." },
    visaInfo: { title: "Assistance visa", body: "Nous fournissons une lettre d'invitation personnalisée et un accompagnement visa étape par étape pour les voyageurs du Royaume-Uni, du Canada, des États-Unis, d'Australie, de France et d'ailleurs." },
    safetyInfo: { title: "Sécurité", body: "Directeur de voyage sur place 24h/24, véhicules privés, hôtels vérifiés et coordination continue avec tous les comités de gurdwara." },
    faqHeading: "Questions fréquentes",
    sidebar: {
      startingFrom: "À partir de",
      whatsapp: "WhatsApp",
      whatsappMsg: (name) => `Bonjour ! Je souhaite des informations détaillées sur le circuit ${name}.`,
    },
    testimonialsHeading: "Ce que disent les voyageurs",
    relatedHeading: "Circuits similaires",
    allTours: "Tous les circuits",
    notFound: { title: "Circuit introuvable", back: "Retour à tous les circuits" },
  },
};
