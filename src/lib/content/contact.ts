import type { Locale } from "@/lib/i18n";

interface ContactContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  inquiry: { heading: string; blurb: string };
  directContact: { heading: string; whatsappCta: string };
  sendMessage: { heading: string };
  office: { heading: string; note: string };
}

export const CONTACT: Record<Locale, ContactContent> = {
  en: {
    meta: {
      title: "Contact — YatraPK",
      description: "Get in touch to plan your Sikh heritage tour. Inquiry form, WhatsApp, email and consultation booking for travellers from the UK, Canada, USA and Australia.",
    },
    hero: { eyebrow: "Get in touch", title: "Plan your heritage journey", description: "Tell us a little about your family and dates — we'll respond personally within 24 hours." },
    inquiry: { heading: "Tour inquiry", blurb: "Request a detailed itinerary for any of our heritage or pilgrimage packages." },
    directContact: { heading: "Direct contact", whatsappCta: "WhatsApp us now" },
    sendMessage: { heading: "Send a message" },
    office: { heading: "Our registered office in London, UK", note: "Interactive map embed available on request." },
  },
  fr: {
    meta: {
      title: "Contact — YatraPK",
      description: "Contactez-nous pour planifier votre circuit du patrimoine sikh. Formulaire, WhatsApp, e-mail et réservation de consultation.",
    },
    hero: { eyebrow: "Nous contacter", title: "Planifiez votre voyage patrimonial", description: "Parlez-nous un peu de votre famille et de vos dates — nous vous répondrons personnellement sous 24 heures." },
    inquiry: { heading: "Demande de circuit", blurb: "Demandez un itinéraire détaillé pour l'un de nos circuits patrimoniaux ou de pèlerinage." },
    directContact: { heading: "Contact direct", whatsappCta: "WhatsApp maintenant" },
    sendMessage: { heading: "Envoyer un message" },
    office: { heading: "Notre bureau enregistré à Londres, Royaume-Uni", note: "Carte interactive disponible sur demande." },
  },
};
