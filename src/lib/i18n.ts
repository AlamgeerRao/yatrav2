import { useRouterState } from "@tanstack/react-router";

export type Locale = "en" | "fr";

/** Detects the current locale from the URL — any path under /fr is French. */
export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

/**
 * Builds the equivalent path in the given locale. English paths have no
 * prefix; French paths are prefixed with /fr. Pass the *English* canonical
 * path in (e.g. "/tours", "/", "/blog/my-post") and it will be adapted.
 */
export function localizedPath(locale: Locale, enPath: string): string {
  if (locale === "en") return enPath;
  return enPath === "/" ? "/fr" : `/fr${enPath}`;
}

/** Given the current pathname, returns the equivalent URL in the other locale. */
export function swapLocalePath(pathname: string): string {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  return pathname === "/" ? "/fr" : `/fr${pathname}`;
}

interface UIStrings {
  nav: { home: string; tours: string; about: string; visa: string; testimonials: string; gallery: string; blog: string; contact: string; more: string };
  bookConsultation: string;
  whatsappUs: string;
  whatsappChat: string;
  viewItinerary: string;
  viewAllTours: string;
  allTours: string;
  allArticles: string;
  backToJournal: string;
  readArticle: string;
  from: string;
  startingFrom: string;
  loadingPrice: string;
  footer: {
    tagline: string;
    explore: string;
    getInTouch: string;
    stayConnected: string;
    newsletterBlurb: string;
    rights: string;
    pricesNote: string;
  };
  form: {
    name: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    notes: string;
    travelers: string;
    travelMonth: string;
    packageInterest: string;
    preferredTime: string;
    submit: string;
    submitting: string;
    selectCountry: string;
    selectMonth: string;
    selectPackage: string;
    newsletterPlaceholder: string;
    subscribe: string;
  };
  notFound: { title: string; body: string; goHome: string };
}

export const UI: Record<Locale, UIStrings> = {
  en: {
    nav: { home: "Home", tours: "Tours", about: "About", visa: "Visa & Help", testimonials: "Testimonials", gallery: "Gallery", blog: "Blog", contact: "Contact", more: "More" },
    bookConsultation: "Book Consultation",
    whatsappUs: "WhatsApp us",
    whatsappChat: "Chat on WhatsApp",
    viewItinerary: "View itinerary",
    viewAllTours: "View all tours",
    allTours: "All tours",
    allArticles: "All articles",
    backToJournal: "The journal",
    readArticle: "Read article",
    from: "From",
    startingFrom: "Starting from",
    loadingPrice: "Loading price…",
    footer: {
      tagline: "Designed for international Sikh travelers from the UK, Canada, USA, Australia and France.",
      explore: "Explore",
      getInTouch: "Get in touch",
      stayConnected: "Stay connected",
      newsletterBlurb: "Receive heritage stories, tour openings and the free planning checklist.",
      rights: "All rights reserved.",
      pricesNote: "Prices & visa rules subject to change.",
    },
    form: {
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      country: "Country",
      message: "Message",
      notes: "Notes (optional)",
      travelers: "Number of travelers",
      travelMonth: "Preferred travel month",
      packageInterest: "Tour of interest",
      preferredTime: "Preferred call time (optional)",
      submit: "Send",
      submitting: "Sending…",
      selectCountry: "Select your country",
      selectMonth: "Select a month",
      selectPackage: "Select a tour",
      newsletterPlaceholder: "Your email address",
      subscribe: "Subscribe",
    },
    notFound: { title: "Page not found", body: "This path isn't part of our journey. Let's get you home.", goHome: "Go home" },
  },
  fr: {
    nav: { home: "Accueil", tours: "Circuits", about: "À propos", visa: "Visa & Aide", testimonials: "Témoignages", gallery: "Galerie", blog: "Blog", contact: "Contact", more: "Plus" },
    bookConsultation: "Réserver une consultation",
    whatsappUs: "Contactez-nous sur WhatsApp",
    whatsappChat: "Discuter sur WhatsApp",
    viewItinerary: "Voir l'itinéraire",
    viewAllTours: "Voir tous les circuits",
    allTours: "Tous les circuits",
    allArticles: "Tous les articles",
    backToJournal: "Le journal",
    readArticle: "Lire l'article",
    from: "À partir de",
    startingFrom: "À partir de",
    loadingPrice: "Chargement du prix…",
    footer: {
      tagline: "Conçu pour les voyageurs sikhs internationaux du Royaume-Uni, du Canada, des États-Unis, d'Australie et de France.",
      explore: "Explorer",
      getInTouch: "Nous contacter",
      stayConnected: "Restez informé",
      newsletterBlurb: "Recevez nos récits du patrimoine, les ouvertures de circuits et la liste de préparation gratuite.",
      rights: "Tous droits réservés.",
      pricesNote: "Les prix et règles de visa sont susceptibles de changer.",
    },
    form: {
      name: "Nom complet",
      email: "E-mail",
      phone: "Téléphone (facultatif)",
      country: "Pays",
      message: "Message",
      notes: "Notes (facultatif)",
      travelers: "Nombre de voyageurs",
      travelMonth: "Mois de voyage souhaité",
      packageInterest: "Circuit souhaité",
      preferredTime: "Heure d'appel préférée (facultatif)",
      submit: "Envoyer",
      submitting: "Envoi…",
      selectCountry: "Sélectionnez votre pays",
      selectMonth: "Sélectionnez un mois",
      selectPackage: "Sélectionnez un circuit",
      newsletterPlaceholder: "Votre adresse e-mail",
      subscribe: "S'abonner",
    },
    notFound: { title: "Page introuvable", body: "Ce chemin ne fait pas partie de notre voyage. Revenons à l'accueil.", goHome: "Retour à l'accueil" },
  },
};
