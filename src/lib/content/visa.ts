import type { Locale } from "@/lib/i18n";

interface VisaContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  sections: { title: string; body: string }[];
  checklist: { eyebrow: string; title: string; items: string[]; ctaLabel: string; whatsappMsg: string };
  faq: { eyebrow?: string; title: string; items: { q: string; a: string }[] };
}

export const VISA: Record<Locale, VisaContent> = {
  en: {
    meta: {
      title: "Visa & Travel Help — YatraPK",
      description: "Pakistan visa guidance, Kartarpur Corridor permits, airport assistance, elderly traveller support, packing checklist and safety FAQs.",
    },
    hero: { eyebrow: "Travel help", title: "Visa & travel preparation", description: "Everything diaspora families need to plan a smooth, safe heritage journey." },
    sections: [
      { title: "Pakistan visa guidance", body: "We don't arrange visa for you however assist all travellers from the UK, Canada, USA and Australia with a personalised invitation letter, recommended visa pathway (e-visa or tourist visa), supporting documents checklist, and embassy submission guidance. Our team has supported thousands of diaspora yatris." },
      { title: "Kartarpur Corridor & permits", body: "Kartarpur Sahib can be accessed via the corridor (subject to current government openings) or via a full Pakistan tourist visa. Our team monitors current eligibility daily and arranges the appropriate route for your group." },
      { title: "Airport assistance", body: "From the moment you land at Lahore or Islamabad, our on-ground host meets you airside (where permitted) or kerbside with a name placard, escorts you through customs guidance, and brings you to a private vehicle." },
      { title: "Elderly traveller support", body: "Wheelchair coordination, mobility-friendly hotels, gentle daily pace, dietary accommodations and a dedicated trip director ensure elders are cared for throughout the journey." },
    ],
    checklist: {
      eyebrow: "Pack smart",
      title: "Travel preparation checklist",
      items: [
        "Valid passport (6+ months validity)",
        "Confirmed return flights",
        "Modest gurdwara-appropriate attire",
        "Patkas / head coverings",
        "Comfortable walking shoes (slip-on preferred)",
        "Light shawl / scarf",
        "Personal medications + doctor's note",
        "Multi-pin universal adapter (Type C/D)",
        "Cash in USD or GBP for exchange",
        "Camera (allowed in most heritage sites)",
      ],
      ctaLabel: "Request downloadable checklist",
      whatsappMsg: "Please send me the downloadable travel checklist.",
    },
    faq: {
      title: "Safety & practical FAQs",
      items: [
        { q: "Is Pakistan safe for Sikh heritage travel?", a: "Yes — the heritage circuit is well-trodden, the government welcomes Sikh pilgrims, and our team operates with continuous on-ground risk monitoring." },
        { q: "What currency is used? Can I use cards?", a: "Pakistani Rupee (PKR). USD/GBP are easy to exchange. Cards work in major hotels and restaurants; carry some cash for langar donations and small purchases." },
        { q: "Is the food safe and Sikh-appropriate?", a: "All hotels and partners we use serve vegetarian options. Langar is provided at every gurdwara visit." },
        { q: "Can I take photos at gurdwaras?", a: "Mostly yes, with respect. Some inner sanctums prohibit photography — our guides will advise you site-by-site." },
        { q: "What's the best time of year to travel?", a: "October to March offers the most comfortable weather. Gurpurab dates (Guru Nanak Jayanti) are exceptionally meaningful but book early." },
      ],
    },
  },
  fr: {
    meta: {
      title: "Visa & Aide au voyage — YatraPK",
      description: "Conseils pour le visa pakistanais, permis du corridor de Kartarpur, assistance aéroport et aide pour les voyageurs seniors.",
    },
    hero: { eyebrow: "Aide au voyage", title: "Visa & préparation du voyage", description: "Tout ce dont les familles de la diaspora ont besoin pour planifier un voyage patrimonial fluide et sécurisé." },
    sections: [
      { title: "Conseils pour le visa pakistanais", body: "Nous ne faisons pas le visa à votre place mais assistons tous les voyageurs de France, du Royaume-Uni, du Canada, des États-Unis et d'Australie avec une lettre d'invitation personnalisée, le parcours visa recommandé (e-visa ou visa touristique), la liste des documents justificatifs et des conseils pour la soumission à l'ambassade. Notre équipe a accompagné des milliers de yatris de la diaspora." },
      { title: "Corridor de Kartarpur & permis", body: "Kartarpur Sahib est accessible via le corridor (selon les ouvertures gouvernementales actuelles) ou via un visa touristique pakistanais complet. Notre équipe surveille l'éligibilité au quotidien et organise la voie appropriée pour votre groupe." },
      { title: "Assistance aéroport", body: "Dès votre atterrissage à Lahore ou Islamabad, notre hôte sur le terrain vous accueille côté piste (si autorisé) ou au trottoir avec un panonceau nominatif, vous accompagne pour les formalités douanières et vous emmène vers un véhicule privé." },
      { title: "Accompagnement des voyageurs seniors", body: "Coordination fauteuil roulant, hôtels accessibles, rythme journalier doux, accommodements alimentaires et directeur de voyage dédié pour que les seniors soient accompagnés tout au long du voyage." },
    ],
    checklist: {
      eyebrow: "Avant de partir",
      title: "Liste de préparation pour le voyage",
      items: [
        "Passeport valide (6+ mois de validité restante)",
        "Vols de retour confirmés",
        "Tenue modeste appropriée aux gurdwaras",
        "Patkas / couvre-chefs",
        "Chaussures confortables (à enfiler de préférence)",
        "Châle / foulard léger",
        "Médicaments personnels + ordonnance médicale",
        "Adaptateur universel multi-prises (Type C/D)",
        "Espèces en USD, GBP ou EUR pour le change",
        "Appareil photo (autorisé sur la plupart des sites)",
      ],
      ctaLabel: "Obtenir la liste complète par WhatsApp",
      whatsappMsg: "Je souhaite recevoir la liste de préparation complète pour le voyage patrimonial sikh.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions fréquentes sur le voyage",
      items: [
        { q: "Combien de temps à l'avance dois-je demander mon visa ?", a: "Nous recommandons de commencer le processus au moins 6 à 8 semaines avant la date de départ pour avoir une marge confortable." },
        { q: "Les ressortissants français peuvent-ils visiter le Pakistan ?", a: "Oui. Les ressortissants français peuvent demander un e-visa en ligne. Notre équipe vous fournit la lettre d'invitation et vous guide pas à pas." },
        { q: "Voyager au Pakistan est-il sûr pour les familles sikhes ?", a: "Oui. Des milliers de pèlerins de la diaspora visitent chaque année sans incident. Nos circuits utilisent des véhicules privés, des hôtels vérifiés et un directeur de voyage 24h/24." },
        { q: "Gérez-vous les visas de groupe pour les délégations de gurdwara ?", a: "Absolument — nous traitons régulièrement les visas de groupe pour des délégations de 15 à 40 personnes." },
      ],
    },
  },
};
