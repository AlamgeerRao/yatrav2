import type { Locale } from "@/lib/i18n";

interface HomeContent {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: { eyebrow: string; titlePrefix: string; titleEm: string; titleSuffix: string; description: string; exploreTours: string; bookConsultation: string };
  trust: { eyebrow: string; title: string; description: string };
  destinations: {
    eyebrow: string; title: string; pakistanLabel: string;
    items: { name: string; desc: string }[];
  };
  packagesPreview: {
    eyebrow: string; title: string; description: string;
    customCtaLabel: string;
  };
  story: {
    quote: string; quoteAttribution: string;
    eyebrow: string; titlePrefix: string; titleEm: string;
    paragraphs: string[];
    cta: string;
  };
  video: { eyebrow: string; title: string; description: string; playLabel: string; comingSoon: string; posterAlt: string };
  testimonials: { eyebrow: string; title: string };
  leadMagnet: { eyebrow: string; title: string; description: string; cta: string; whatsappMsg: string };
  consultation: { eyebrow: string; title: string; description: string };
}

export const HOME: Record<Locale, HomeContent> = {
  en: {
    meta: {
      title: "YatraPK — Reconnect With Your Sikh Heritage in Pakistan",
      description: "Premium Sikh heritage and pilgrimage tours to Kartarpur Sahib, Nankana Sahib, Panja Sahib & Lahore. For Sikh communities in the UK, Canada, USA and Australia.",
      ogTitle: "Reconnect With Your Sikh Heritage in Pakistan",
      ogDescription: "Sacred pilgrimage and ancestral roots tours for diaspora Sikh families.",
    },
    hero: {
      eyebrow: "Est. for diaspora Sikh families",
      titlePrefix: "Reconnect With Your ",
      titleEm: "Sikh Heritage",
      titleSuffix: " in Pakistan",
      description: "Premium pilgrimage and heritage journeys for Sikh communities across the UK, Canada, USA and Australia.",
      exploreTours: "Explore Tours",
      bookConsultation: "Book Consultation",
    },
    trust: { eyebrow: "Why Travel With Us", title: "A heritage journey, designed with care", description: "Every detail is handled — so your family can focus on the moments that matter." },
    destinations: {
      eyebrow: "Sacred destinations",
      title: "Where your heritage lives",
      pakistanLabel: "Pakistan",
      items: [
        { name: "Kartarpur Sahib", desc: "Where Guru Nanak Dev Ji spent his final years." },
        { name: "Nankana Sahib", desc: "The birthplace of Guru Nanak Dev Ji." },
        { name: "Panja Sahib", desc: "Sacred handprint of Guru Nanak at Hasan Abdal." },
        { name: "Lahore Heritage", desc: "Gurdwara Dera Sahib & the Samadhi of Maharaja Ranjit Singh." },
      ],
    },
    packagesPreview: {
      eyebrow: "Curated journeys",
      title: "Find your Yatra",
      description: "From a 3-day Kartarpur darshan to a private 14-day roots journey — every package below is ready to book.",
      customCtaLabel: "Can't find the right fit? Build a custom Yatra",
    },
    story: {
      quote: "\"My father set foot in his village for the first time in 76 years.\"",
      quoteAttribution: "— Roots & Ancestry traveller, Canada",
      eyebrow: "Our purpose",
      titlePrefix: "Punjab is not just a place. ",
      titleEm: "It is your family's story.",
      paragraphs: [
        "For seventy-five years, an invisible line has separated diaspora Sikh families from the soil where their faith was born and their grandparents grew up. We exist to gently bridge that line — through pilgrimage, history, and the quiet act of standing where they once stood.",
        "Our journeys are crafted for elders, for families, for first-time visitors and for sangat groups. They are unhurried, deeply respectful, and held together by Punjabi-speaking guides who treat your story as their own.",
      ],
      cta: "Read our story",
    },
    video: { eyebrow: "Watch", title: "A glimpse of Kartarpur Sahib", description: "See the sacred courtyard your journey will lead you to.", playLabel: "Play video", comingSoon: "Video coming soon", posterAlt: "YatraPK — Kartarpur Sahib preview" },
    testimonials: { eyebrow: "Sangat stories", title: "Travellers from across the diaspora" },
    leadMagnet: {
      eyebrow: "Free lead magnet",
      title: "Sikh Heritage Travel Planning Checklist",
      description: "Everything diaspora families need to plan a heritage trip to Pakistan — visa steps, what to pack, what to expect at each gurdwara.",
      cta: "Get the checklist",
      whatsappMsg: "I'd like the free Sikh Heritage Travel Planning Checklist please.",
    },
    consultation: { eyebrow: "Free 30-minute call", title: "Book a consultation", description: "Speak with a heritage specialist about your family, dates and dreams." },
  },
  fr: {
    meta: {
      title: "YatraPK — Renouez avec votre patrimoine sikh au Pakistan",
      description: "Circuits premium de patrimoine et de pèlerinage sikh vers Kartarpur Sahib, Nankana Sahib, Panja Sahib et Lahore, pour les communautés sikhes du Royaume-Uni, du Canada, des États-Unis, d'Australie et de France.",
      ogTitle: "Renouez avec votre patrimoine sikh au Pakistan",
      ogDescription: "Pèlerinage sacré et circuits de racines ancestrales pour les familles sikhes de la diaspora.",
    },
    hero: {
      eyebrow: "Conçu pour les familles sikhes de la diaspora",
      titlePrefix: "Renouez avec votre ",
      titleEm: "patrimoine sikh",
      titleSuffix: " au Pakistan",
      description: "Voyages de pèlerinage et de patrimoine premium pour les communautés sikhes du Royaume-Uni, du Canada, des États-Unis, d'Australie et de France.",
      exploreTours: "Explorer les circuits",
      bookConsultation: "Réserver une consultation",
    },
    trust: { eyebrow: "Pourquoi voyager avec nous", title: "Un voyage patrimonial, pensé avec soin", description: "Chaque détail est pris en charge — pour que votre famille puisse se concentrer sur ce qui compte vraiment." },
    destinations: {
      eyebrow: "Destinations sacrées",
      title: "Là où vit votre patrimoine",
      pakistanLabel: "Pakistan",
      items: [
        { name: "Kartarpur Sahib", desc: "Où Guru Nanak Dev Ji a passé ses dernières années." },
        { name: "Nankana Sahib", desc: "Le lieu de naissance de Guru Nanak Dev Ji." },
        { name: "Panja Sahib", desc: "L'empreinte de main sacrée de Guru Nanak à Hasan Abdal." },
        { name: "Patrimoine de Lahore", desc: "Gurdwara Dera Sahib et la Samadhi du Maharaja Ranjit Singh." },
      ],
    },
    packagesPreview: {
      eyebrow: "Voyages conçus sur mesure",
      title: "Trouvez votre Yatra",
      description: "D'un darshan de 3 jours à Kartarpur à un voyage privé de 14 jours sur les traces de vos racines — chaque circuit ci-dessous est prêt à réserver.",
      customCtaLabel: "Vous ne trouvez pas votre bonheur ? Créez votre Yatra sur mesure",
    },
    story: {
      quote: "« Mon père a posé le pied dans son village pour la première fois depuis 76 ans. »",
      quoteAttribution: "— Voyageur du circuit Racines et Ascendance, Canada",
      eyebrow: "Notre mission",
      titlePrefix: "Le Pendjab n'est pas seulement un lieu. ",
      titleEm: "C'est l'histoire de votre famille.",
      paragraphs: [
        "Depuis soixante-quinze ans, une frontière invisible sépare les familles sikhes de la diaspora de la terre où leur foi est née et où leurs grands-parents ont grandi. Nous existons pour combler doucement cette distance — par le pèlerinage, l'histoire, et le geste discret de se tenir là où ils se sont tenus autrefois.",
        "Nos voyages sont conçus pour les seniors, pour les familles, pour les primo-visiteurs et pour les groupes de sangat. Ils sont menés sans hâte, avec un profond respect, et portés par des guides parlant pendjabi qui font de votre histoire la leur.",
      ],
      cta: "Découvrir notre histoire",
    },
    video: { eyebrow: "Regarder", title: "Un aperçu de Kartarpur Sahib", description: "Découvrez la cour sacrée où vous mènera votre voyage.", playLabel: "Lire la vidéo", comingSoon: "Vidéo à venir", posterAlt: "YatraPK — aperçu de Kartarpur Sahib" },
    testimonials: { eyebrow: "Témoignages de la sangat", title: "Des voyageurs de toute la diaspora" },
    leadMagnet: {
      eyebrow: "Ressource gratuite",
      title: "Liste de préparation du voyage patrimonial sikh",
      description: "Tout ce dont les familles de la diaspora ont besoin pour planifier un voyage patrimonial au Pakistan — démarches de visa, quoi emporter, à quoi s'attendre à chaque gurdwara.",
      cta: "Obtenir la liste",
      whatsappMsg: "Je souhaite recevoir la liste de préparation gratuite du voyage patrimonial sikh.",
    },
    consultation: { eyebrow: "Appel gratuit de 30 minutes", title: "Réserver une consultation", description: "Parlez à un spécialiste du patrimoine de votre famille, vos dates et vos rêves." },
  },
};
