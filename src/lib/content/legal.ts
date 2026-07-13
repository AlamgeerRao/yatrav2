import type { Locale } from "@/lib/i18n";

export interface LegalSection {
  heading: string;
  /** Paragraph HTML — trusted, static content only (may contain e.g. <a> tags). */
  html: string;
}

interface LegalContent {
  meta: { title: string };
  hero: { eyebrow: string; title: string; description: string };
  intro?: string;
  sections: LegalSection[];
  lastUpdated: string;
}

const EMAIL_LINK = '<a href="mailto:journeys@punjabheritage.travel">journeys@punjabheritage.travel</a>';

export const PRIVACY: Record<Locale, LegalContent> = {
  en: {
    meta: { title: "Privacy Policy — YatraPK" },
    hero: { eyebrow: "Legal", title: "Privacy Policy", description: "How we collect, use and protect your information." },
    intro: `YatraPK ("we", "us") respects your privacy. YatraPK is a trading name of NEXT HORIZON GROUP LTD, a company registered in England and Wales (company number 17309052), registered office 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ. We collect only the information you provide via our inquiry, consultation, contact and newsletter forms — your name, email, phone (optional), country and the details of your travel interest.`,
    sections: [
      {
        heading: "How we use your information",
        html: `<ul>
          <li>To respond to your inquiry and prepare itineraries.</li>
          <li>To send you optional updates about heritage tours if you subscribe to our newsletter.</li>
          <li>To comply with legal and accounting obligations.</li>
        </ul>`,
      },
      {
        heading: "Sharing",
        html: `<p>We never sell your details. We share information only with partners required to deliver your trip (hotels, transport, gurdwara liaison) and with payment processors when you book.</p>`,
      },
      {
        heading: "Your rights",
        html: `<p>You may request access, correction or deletion of your data at any time by emailing ${EMAIL_LINK}.</p>`,
      },
      {
        heading: "Cookies",
        html: `<p>This website uses minimal cookies for navigation and analytics only.</p>`,
      },
    ],
    lastUpdated: "Last updated: 2026.",
  },
  fr: {
    meta: { title: "Politique de confidentialité — YatraPK" },
    hero: { eyebrow: "Légal", title: "Politique de confidentialité", description: "Comment nous collectons, utilisons et protégeons vos informations." },
    intro: `YatraPK (« nous ») respecte votre vie privée. YatraPK est un nom commercial de NEXT HORIZON GROUP LTD, société immatriculée en Angleterre et au Pays de Galles (numéro 17309052), siège social 71-75 Shelton Street, Covent Garden, Londres, WC2H 9JQ. Nous collectons uniquement les informations que vous fournissez via nos formulaires — votre nom, e-mail, téléphone (facultatif), pays et détails de votre intérêt de voyage.`,
    sections: [
      {
        heading: "Comment nous utilisons vos informations",
        html: `<ul>
          <li>Pour répondre à votre demande et préparer des itinéraires.</li>
          <li>Pour vous envoyer des mises à jour optionnelles sur les circuits si vous vous abonnez à notre newsletter.</li>
          <li>Pour respecter nos obligations légales et comptables.</li>
        </ul>`,
      },
      {
        heading: "Partage",
        html: `<p>Nous ne vendons jamais vos coordonnées. Nous partageons les informations uniquement avec les partenaires nécessaires à la réalisation de votre voyage (hôtels, transport, liaison gurdwara) et avec les processeurs de paiement lors d'une réservation.</p>`,
      },
      {
        heading: "Vos droits",
        html: `<p>Vous pouvez demander l'accès, la correction ou la suppression de vos données à tout moment en écrivant à ${EMAIL_LINK}. En vertu du RGPD, vous disposez de droits supplémentaires de portabilité et d'opposition au traitement.</p>`,
      },
      {
        heading: "Cookies",
        html: `<p>Ce site utilise des cookies minimaux pour la navigation et l'analyse uniquement.</p>`,
      },
    ],
    lastUpdated: "Dernière mise à jour : 2026.",
  },
};

export const TERMS: Record<Locale, LegalContent> = {
  en: {
    meta: { title: "Terms & Conditions — YatraPK" },
    hero: { eyebrow: "Legal", title: "Terms & Conditions", description: "The terms governing tours booked with YatraPK." },
    intro: `YatraPK is a trading name of NEXT HORIZON GROUP LTD, a company registered in England and Wales (company number 17309052), registered office 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ.`,
    sections: [
      { heading: "Bookings & payments", html: `<p>A non-refundable deposit is required to confirm your tour. Balance payments are due 45 days before departure.</p>` },
      { heading: "Cancellations", html: `<p>Cancellation terms vary by package and time before departure. We recommend comprehensive travel insurance.</p>` },
      { heading: "Visas & travel documents", html: `<p>Guests are responsible for ensuring valid passports and required visas. We provide guidance and invitation letters where applicable, but cannot guarantee visa approval.</p>` },
      { heading: "Itinerary changes", html: `<p>We may adjust itineraries due to security, weather, or gurdwara protocols. Equivalent alternatives will be arranged.</p>` },
      { heading: "Disclaimer", html: `<p>Prices, exchange rates, and visa rules are subject to change without notice. All tours are operated subject to local regulations in Pakistan.</p>` },
      { heading: "Liability", html: `<p>YatraPK is not liable for losses arising from circumstances outside our reasonable control, including but not limited to government actions, natural events, or third-party service failures.</p>` },
    ],
    lastUpdated: "Last updated: 2026.",
  },
  fr: {
    meta: { title: "Conditions générales — YatraPK" },
    hero: { eyebrow: "Légal", title: "Conditions générales", description: "Les conditions régissant les circuits réservés avec YatraPK." },
    intro: `YatraPK est un nom commercial de NEXT HORIZON GROUP LTD, société immatriculée en Angleterre et au Pays de Galles (numéro 17309052), siège social 71-75 Shelton Street, Covent Garden, Londres, WC2H 9JQ.`,
    sections: [
      { heading: "Réservations & paiements", html: `<p>Un acompte non remboursable est requis pour confirmer votre circuit. Le solde est dû 45 jours avant le départ.</p>` },
      { heading: "Annulations", html: `<p>Les conditions d'annulation varient selon le circuit et le délai avant le départ. Nous recommandons une assurance voyage complète.</p>` },
      { heading: "Visas & documents de voyage", html: `<p>Les voyageurs sont responsables de s'assurer qu'ils disposent de passeports valides et des visas requis. Nous fournissons des conseils et des lettres d'invitation le cas échéant, mais ne pouvons garantir l'approbation du visa.</p>` },
      { heading: "Modifications d'itinéraire", html: `<p>Nous pouvons ajuster les itinéraires en raison de la sécurité, de la météo ou des protocoles des gurdwaras. Des alternatives équivalentes seront arrangées.</p>` },
      { heading: "Avertissement", html: `<p>Les prix, taux de change et règles de visa sont susceptibles de changer sans préavis. Tous les circuits sont opérés conformément à la réglementation locale au Pakistan.</p>` },
      { heading: "Responsabilité", html: `<p>YatraPK n'est pas responsable des pertes résultant de circonstances hors de notre contrôle raisonnable, y compris les actions gouvernementales, les événements naturels ou les défaillances de services tiers.</p>` },
    ],
    lastUpdated: "Dernière mise à jour : 2026.",
  },
};
