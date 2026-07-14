import type { Locale } from "@/lib/i18n";
import type { RoomType } from "@/lib/quote";

export interface PlanContent {
  meta: { title: string; description: string };
  header: { eyebrow: string; title: string; subtitle: string };
  steps: string[]; // 5 step labels, in wizard order
  nav: { back: string; continue: string; submitting: string; submit: string };
  discountBanner: { unlocked7: string; unlocked4: string };

  stepYatra: {
    title: string; subtitle: string;
    nightsSuggested: string;
    travelMonth: string; selectMonth: string;
    year: string; selectYear: string;
  };

  stepGroup: {
    title: string; subtitle: string;
    country: string; selectCountry: string;
    departureCity: string; departureCityPlaceholder: string;
    travellers: string;
    discount10: string; discount4: string; discountNone: string;
    discountHint4: string; discountHint10: string;
  };

  stepAccommodation: {
    title: string; subtitle: string;
    hotelStandard: string;
    starTier: { comfortable: string; premium: string; luxury: string };
    starLabel: (s: number) => string;
    roomType: string;
    rooms: Record<RoomType, { label: string; desc: string }>;
  };

  stepAddons: {
    title: string; subtitle: string;
    flights: { label: string; desc: (price: number) => string };
    visa: { label: string; desc: (price: number) => string };
    transfers: { label: string; desc: (price: number) => string };
    extraDestinations: string; extraDestinationsPlaceholder: string;
  };

  stepDetails: {
    title: string; subtitle: string;
    fullName: string; namePlaceholder: string;
    email: string;
    phone: string; phonePlaceholder: string;
    specialRequests: string; specialRequestsPlaceholder: string;
    disclaimer: string;
  };

  quotePanel: {
    liveQuote: string; estimate: string;
    base: (star: number, nights: string | number, pax: number) => string;
    singleSupplement: string; roomSharingSaving: string;
    flightsLine: (pax: number) => string;
    visaLine: (pax: number) => string;
    transfersLine: (pax: number) => string;
    subtotal: string;
    groupDiscount: (pct: string, pax: number) => string;
    estimatedTotal: string; perPerson: string;
    finalPriceNote: (star: number, nights: string | number) => string;
    whatsappCta: string;
    genericYatra: string;
    whatsappMsg: (yatra: string, pax: number, month: string) => string;
  };

  confirmation: {
    title: string; subtitle: string;
    refLabel: string; refNote: string;
    summary: { travellers: string; yatra: string; travelDate: string; duration: string; hotel: string; total: string };
    nightsSuffix: string;
    contactNote: (email: string) => string;
    whatsappCta: string;
    whatsappMsg: (ref: string) => string;
    backHome: string;
  };
}

export const PLAN: Record<Locale, PlanContent> = {
  en: {
    meta: {
      title: "Plan Your Yatra — YatraPK",
      description: "Build your personalised Sikh heritage tour to Pakistan in minutes. Get a live price estimate and submit your enquiry.",
    },
    header: {
      eyebrow: "Personalised yatra planner",
      title: "Plan Your Yatra",
      subtitle: "Answer a few questions and get an instant price estimate. We'll confirm the final quote within 24 hours.",
    },
    steps: ["Your Yatra", "Your Group", "Accommodation", "Add-ons", "Your Details"],
    nav: { back: "Back", continue: "Continue", submitting: "Submitting…", submit: "Submit Enquiry" },
    discountBanner: {
      unlocked7: "7% group discount unlocked — 10 or more travellers!",
      unlocked4: "5% group discount unlocked — 4 or more travellers!",
    },
    stepYatra: {
      title: "Your Yatra", subtitle: "Which sacred sites would you like to visit?",
      nightsSuggested: "nights suggested",
      travelMonth: "Travel month *", selectMonth: "Select month…",
      year: "Year *", selectYear: "Select year…",
    },
    stepGroup: {
      title: "Your Group", subtitle: "Tell us who's travelling so we can tailor the quote.",
      country: "Country of departure *", selectCountry: "Select your country…",
      departureCity: "Departure city (optional)", departureCityPlaceholder: "e.g. London, Toronto, Houston",
      travellers: "Number of travellers *",
      discount10: "🎊 7% group discount applies",
      discount4: "🎉 5% group discount applies",
      discountNone: "Add 4+ travellers to unlock a group discount",
      discountHint4: "4–9 travellers — 5% group discount",
      discountHint10: "10+ travellers — 7% group discount",
    },
    stepAccommodation: {
      title: "Accommodation", subtitle: "Choose your comfort level.",
      hotelStandard: "Hotel standard *",
      starTier: { comfortable: "Comfortable", premium: "Premium", luxury: "Luxury" },
      starLabel: (s) => `${s}-Star`,
      roomType: "Room type *",
      rooms: {
        double: { label: "Twin / Double", desc: "Shared room (best value)" },
        single: { label: "Single Room", desc: "+35% single supplement" },
        triple: { label: "Triple / Family", desc: "3 sharing, small saving" },
      },
    },
    stepAddons: {
      title: "Add-ons & Extras", subtitle: "Select any additional services you need.",
      flights: { label: "International flights", desc: (p) => `Economy estimate included (+£${p}/person)` },
      visa: { label: "Visa assistance", desc: (p) => `We prepare your invitation letter & docs (+£${p}/person)` },
      transfers: { label: "Airport transfers", desc: (p) => `Private pickup & drop-off (+£${p}/person)` },
      extraDestinations: "Extra destinations or sites (optional)",
      extraDestinationsPlaceholder: "e.g. Eminabad, Rohtas Fort, Islamabad sightseeing…",
    },
    stepDetails: {
      title: "Your Details", subtitle: "We'll use these to send your enquiry confirmation.",
      fullName: "Full name *", namePlaceholder: "Harpreet Singh",
      email: "Email *",
      phone: "Phone (optional)", phonePlaceholder: "+44 7…",
      specialRequests: "Special requests or notes (optional)",
      specialRequestsPlaceholder: "Accessibility needs, ancestral village to visit, dietary requirements, group composition…",
      disclaimer: "By submitting you agree to be contacted by our team. We never share your details with third parties.",
    },
    quotePanel: {
      liveQuote: "Live Quote", estimate: "Estimate",
      base: (star, nights, pax) => `Base (${star}★, ${nights} nights × ${pax} pax)`,
      singleSupplement: "Single supplement", roomSharingSaving: "Room sharing saving",
      flightsLine: (pax) => `Flights (${pax}×)`,
      visaLine: (pax) => `Visa assistance (${pax}×)`,
      transfersLine: (pax) => `Airport transfers (${pax}×)`,
      subtotal: "Subtotal",
      groupDiscount: (pct, pax) => `Group discount (${pct}% · ${pax} travellers)`,
      estimatedTotal: "Estimated total", perPerson: "/ person",
      finalPriceNote: (star, nights) => `Final price confirmed after full quotation. Estimate based on ${star}★ accommodation, ${nights} nights.`,
      whatsappCta: "Prefer to WhatsApp us?",
      genericYatra: "heritage",
      whatsappMsg: (yatra, pax, month) => `Hi! I'd like help planning a ${yatra} yatra for ${pax} people in ${month}.`,
    },
    confirmation: {
      title: "Sat Sri Akal — thank you!", subtitle: "Your yatra enquiry has been received.",
      refLabel: "Enquiry reference", refNote: "Please quote this when contacting us.",
      summary: { travellers: "Travellers", yatra: "Yatra", travelDate: "Travel date", duration: "Duration", hotel: "Hotel", total: "Est. total" },
      nightsSuffix: "nights",
      contactNote: (email) => `A heritage specialist will contact ${email} within 24 hours to confirm your personalised quote.`,
      whatsappCta: "WhatsApp us now",
      whatsappMsg: (ref) => `My enquiry ref is ${ref}. I'd like to discuss my yatra plans.`,
      backHome: "Back to home",
    },
  },
  fr: {
    meta: {
      title: "Planifiez votre Yatra — YatraPK",
      description: "Composez votre circuit patrimonial sikh personnalisé au Pakistan en quelques minutes. Obtenez une estimation de prix en direct et envoyez votre demande.",
    },
    header: {
      eyebrow: "Planificateur de yatra personnalisé",
      title: "Planifiez votre Yatra",
      subtitle: "Répondez à quelques questions et obtenez une estimation de prix instantanée. Nous confirmerons le devis final sous 24 heures.",
    },
    steps: ["Votre Yatra", "Votre Groupe", "Hébergement", "Options", "Vos Coordonnées"],
    nav: { back: "Retour", continue: "Continuer", submitting: "Envoi…", submit: "Envoyer la demande" },
    discountBanner: {
      unlocked7: "Remise groupe de 7 % débloquée — 10 voyageurs ou plus !",
      unlocked4: "Remise groupe de 5 % débloquée — 4 voyageurs ou plus !",
    },
    stepYatra: {
      title: "Votre Yatra", subtitle: "Quels sites sacrés souhaitez-vous visiter ?",
      nightsSuggested: "nuits suggérées",
      travelMonth: "Mois du voyage *", selectMonth: "Sélectionnez le mois…",
      year: "Année *", selectYear: "Sélectionnez l'année…",
    },
    stepGroup: {
      title: "Votre Groupe", subtitle: "Dites-nous qui voyage afin que nous puissions adapter le devis.",
      country: "Pays de départ *", selectCountry: "Sélectionnez votre pays…",
      departureCity: "Ville de départ (facultatif)", departureCityPlaceholder: "ex. Paris, Londres, Toronto",
      travellers: "Nombre de voyageurs *",
      discount10: "🎊 Remise groupe de 7 % applicable",
      discount4: "🎉 Remise groupe de 5 % applicable",
      discountNone: "Ajoutez 4 voyageurs ou plus pour débloquer une remise groupe",
      discountHint4: "4 à 9 voyageurs — remise groupe de 5 %",
      discountHint10: "10 voyageurs ou plus — remise groupe de 7 %",
    },
    stepAccommodation: {
      title: "Hébergement", subtitle: "Choisissez votre niveau de confort.",
      hotelStandard: "Catégorie d'hôtel *",
      starTier: { comfortable: "Confortable", premium: "Premium", luxury: "Luxe" },
      starLabel: (s) => `${s} étoiles`,
      roomType: "Type de chambre *",
      rooms: {
        double: { label: "Twin / Double", desc: "Chambre partagée (meilleur rapport qualité-prix)" },
        single: { label: "Chambre individuelle", desc: "+35 % de supplément single" },
        triple: { label: "Triple / Familiale", desc: "3 personnes partagées, petite économie" },
      },
    },
    stepAddons: {
      title: "Options & Suppléments", subtitle: "Sélectionnez les services supplémentaires dont vous avez besoin.",
      flights: { label: "Vols internationaux", desc: (p) => `Estimation classe économique incluse (+£${p}/personne)` },
      visa: { label: "Assistance visa", desc: (p) => `Nous préparons votre lettre d'invitation et vos documents (+£${p}/personne)` },
      transfers: { label: "Transferts aéroport", desc: (p) => `Prise en charge et dépose privées (+£${p}/personne)` },
      extraDestinations: "Destinations ou sites supplémentaires (facultatif)",
      extraDestinationsPlaceholder: "ex. Eminabad, Fort de Rohtas, visite d'Islamabad…",
    },
    stepDetails: {
      title: "Vos Coordonnées", subtitle: "Nous les utiliserons pour vous envoyer la confirmation de votre demande.",
      fullName: "Nom complet *", namePlaceholder: "Harpreet Singh",
      email: "E-mail *",
      phone: "Téléphone (facultatif)", phonePlaceholder: "+33 6…",
      specialRequests: "Demandes particulières ou notes (facultatif)",
      specialRequestsPlaceholder: "Besoins d'accessibilité, village ancestral à visiter, régime alimentaire, composition du groupe…",
      disclaimer: "En soumettant ce formulaire, vous acceptez d'être contacté(e) par notre équipe. Nous ne partageons jamais vos données avec des tiers.",
    },
    quotePanel: {
      liveQuote: "Devis en direct", estimate: "Estimation",
      base: (star, nights, pax) => `Base (${star}★, ${nights} nuits × ${pax} pers.)`,
      singleSupplement: "Supplément single", roomSharingSaving: "Économie chambre partagée",
      flightsLine: (pax) => `Vols (${pax}×)`,
      visaLine: (pax) => `Assistance visa (${pax}×)`,
      transfersLine: (pax) => `Transferts aéroport (${pax}×)`,
      subtotal: "Sous-total",
      groupDiscount: (pct, pax) => `Remise groupe (${pct} % · ${pax} voyageurs)`,
      estimatedTotal: "Total estimé", perPerson: "/ personne",
      finalPriceNote: (star, nights) => `Prix final confirmé après devis complet. Estimation basée sur un hébergement ${star} étoiles, ${nights} nuits.`,
      whatsappCta: "Vous préférez WhatsApp ?",
      genericYatra: "patrimoniale",
      whatsappMsg: (yatra, pax, month) => `Bonjour ! Je souhaite de l'aide pour planifier une yatra ${yatra} pour ${pax} personnes en ${month}.`,
    },
    confirmation: {
      title: "Sat Sri Akal — merci !", subtitle: "Votre demande de yatra a bien été reçue.",
      refLabel: "Référence de la demande", refNote: "Merci de mentionner cette référence lorsque vous nous contactez.",
      summary: { travellers: "Voyageurs", yatra: "Yatra", travelDate: "Date du voyage", duration: "Durée", hotel: "Hôtel", total: "Total est." },
      nightsSuffix: "nuits",
      contactNote: (email) => `Un spécialiste du patrimoine contactera ${email} sous 24 heures pour confirmer votre devis personnalisé.`,
      whatsappCta: "WhatsApp maintenant",
      whatsappMsg: (ref) => `Ma référence de demande est ${ref}. Je souhaite discuter de mes plans de yatra.`,
      backHome: "Retour à l'accueil",
    },
  },
};
