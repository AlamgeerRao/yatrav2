import type { Locale } from "@/lib/i18n";

interface AboutContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  intro: {
    imageAlt: string;
    heading: string;
    paragraphs: string[];
    founderLabel: string;
    founderQuote: string;
    founderAttribution: string;
  };
  values: { eyebrow: string; title: string; items: { t: string; d: string }[] };
  team: { eyebrow: string; title: string; members: { name: string; role: string }[] };
  whyUs: { title: string; partnerships: string };
}

export const ABOUT: Record<Locale, AboutContent> = {
  en: {
    meta: {
      title: "About — YatraPK",
      description: "We help diaspora Sikh families reconnect with their roots in Pakistan through premium, respectful heritage and pilgrimage tours.",
    },
    hero: {
      eyebrow: "Our story",
      title: "Built for diaspora Sikh families",
      description: "A small team of historians, hosts and logistics specialists devoted to gentle, premium heritage travel.",
    },
    intro: {
      imageAlt: "Heritage moment",
      heading: "A bridge built with care.",
      paragraphs: [
        "YatraPK was founded with a single belief: every Sikh family living abroad deserves a safe, dignified, beautifully organised way to return to the land where their faith was born.",
        "From visa support in your home country to Punjabi-speaking guides on the ground, our team handles every detail — quietly, respectfully, premium-first.",
      ],
      founderLabel: "Founder's note",
      founderQuote: "\"My grandfather never returned to his village. We make sure no diaspora family has to carry that regret again.\"",
      founderAttribution: "— Founder, YatraPK",
    },
    values: {
      eyebrow: "What we stand for",
      title: "Heritage. Hospitality. Honesty.",
      items: [
        { t: "Heritage preservation", d: "We work with local historians and gurdwara committees to keep Sikh history honoured, documented and accessible." },
        { t: "Trust & safety", d: "Vetted hotels, private transport, 24/7 trip directors and continuous on-ground coordination — for elders, families and groups." },
        { t: "Local expertise", d: "Lahore-based team, Punjabi & English speaking guides, partnerships across Pakistan's Sikh heritage circuit." },
      ],
    },
    team: {
      eyebrow: "Our team",
      title: "Local hosts, global standards",
      members: [
        { name: "Founder & Heritage Director", role: "Lahore" },
        { name: "Head of Trip Operations", role: "Lahore" },
        { name: "Senior Sikh Historian Guide", role: "Nankana Sahib" },
        { name: "Diaspora Concierge Lead", role: "UK" },
      ],
    },
    whyUs: {
      title: "Why families choose us",
      partnerships: "Partnerships with leading heritage hotels, vetted local operators, and registered tour licences in Pakistan.",
    },
  },
  fr: {
    meta: {
      title: "À propos — YatraPK",
      description: "Nous aidons les familles sikhes de la diaspora à renouer avec leurs racines au Pakistan grâce à des circuits patrimoniaux et de pèlerinage premium et respectueux.",
    },
    hero: {
      eyebrow: "Notre histoire",
      title: "Construit pour les familles sikhes de la diaspora",
      description: "Une petite équipe d'historiens, d'hôtes et de spécialistes de la logistique dédiés à un voyage patrimonial doux et premium.",
    },
    intro: {
      imageAlt: "Moment patrimonial",
      heading: "Un pont construit avec soin.",
      paragraphs: [
        "YatraPK a été fondé avec une conviction : chaque famille sikhe vivant à l'étranger mérite une façon sûre, digne et magnifiquement organisée de retourner sur la terre où leur foi est née.",
        "De l'assistance visa dans votre pays d'origine aux guides parlant pendjabi sur le terrain, notre équipe gère chaque détail — discrètement, respectueusement, avec le premium en priorité.",
      ],
      founderLabel: "Note du fondateur",
      founderQuote: "« Mon grand-père n'est jamais retourné dans son village. Nous faisons en sorte qu'aucune famille de la diaspora n'ait à porter ce regret. »",
      founderAttribution: "— Fondateur, YatraPK",
    },
    values: {
      eyebrow: "Ce pour quoi nous nous engageons",
      title: "Patrimoine. Hospitalité. Honnêteté.",
      items: [
        { t: "Préservation du patrimoine", d: "Nous travaillons avec des historiens locaux et des comités de gurdwara pour que l'histoire sikhe soit honorée, documentée et accessible." },
        { t: "Confiance & sécurité", d: "Hôtels vérifiés, transport privé, directeurs de voyage 24h/24 et coordination continue sur le terrain — pour les seniors, les familles et les groupes." },
        { t: "Expertise locale", d: "Équipe basée à Lahore, guides bilingues pendjabi et anglais, partenariats à travers le circuit du patrimoine sikh du Pakistan." },
      ],
    },
    team: {
      eyebrow: "Notre équipe",
      title: "Hôtes locaux, standards internationaux",
      members: [
        { name: "Fondateur & Directeur du Patrimoine", role: "Lahore" },
        { name: "Responsable des opérations", role: "Lahore" },
        { name: "Guide historien sikh senior", role: "Nankana Sahib" },
        { name: "Responsable concierge diaspora", role: "Royaume-Uni" },
      ],
    },
    whyUs: {
      title: "Pourquoi les familles nous choisissent",
      partnerships: "Partenariats avec des hôtels patrimoniaux de premier plan, des opérateurs locaux vérifiés et des licences de circuits enregistrées au Pakistan.",
    },
  },
};
