import kartarpur from "@/assets/hero-kartarpur.jpg";
import nankana from "@/assets/nankana.jpg";
import panja from "@/assets/panja.jpg";
import lahore from "@/assets/lahore.jpg";
import roots from "@/assets/roots.jpg";

export interface TourPackage {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  /** Representative nights figure used to pre-fill the Plan Yatra wizard and to derive its per-night quote rate. */
  suggestedNights: number;
  price: string;
  /** Base price in GBP used for live currency conversion. */
  priceFromGBP: number;
  /** Optional upper end of the price range, in GBP. */
  priceToGBP?: number;
  priceUnit: string; // e.g. "/ person" or "/ private group"
  target: string;
  image: string;
  hotel: string;
  transport: string;
  meals: string;
  comfort: string;
  destinations: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: string; title: string; details: string }[];
  faqs: { q: string; a: string }[];
}

export const packages: TourPackage[] = [
  {
    slug: "kartarpur-express",
    name: "Kartarpur Express",
    tagline: "A short, sacred journey for first-time pilgrims",
    duration: "3–4 Days",
    suggestedNights: 4,
    price: "£650 – £950 / person",
    priceFromGBP: 650,
    priceToGBP: 950,
    priceUnit: "/ person",
    target: "First-time visitors, short spiritual trips, families",
    image: kartarpur,
    hotel: "4-star comfort hotels",
    transport: "Private AC vehicles with driver",
    meals: "Daily breakfast + select group meals",
    comfort: "Elderly-friendly itinerary, gentle pace",
    destinations: ["Kartarpur Sahib", "Lahore Heritage Walk", "Wagah Border"],
    inclusions: [
      "Airport pickup & drop-off",
      "Hotel accommodation (twin share)",
      "Daily breakfast & group meals",
      "Private AC transport",
      "Licensed Sikh heritage guide (English/Punjabi)",
      "All gurdwara entry coordination",
      "Visa assistance & invitation letter",
    ],
    exclusions: ["International flights", "Personal expenses", "Travel insurance", "Pakistan visa fee"],
    itinerary: [
      { day: "Day 1", title: "Arrival in Lahore", details: "Airport pickup, welcome briefing, evening rest at hotel." },
      { day: "Day 2", title: "Kartarpur Sahib Darshan", details: "Full-day pilgrimage to Gurdwara Darbar Sahib Kartarpur. Sewa and langar." },
      { day: "Day 3", title: "Lahore Sikh Heritage", details: "Gurdwara Dera Sahib, Samadhi of Maharaja Ranjit Singh, Lahore Fort." },
      { day: "Day 4", title: "Farewell", details: "Optional Wagah border ceremony, airport drop-off." },
    ],
    faqs: [
      { q: "Is this suitable for elderly travelers?", a: "Yes. The pace is gentle and all transport is private with wheelchair-friendly arrangements available on request." },
      { q: "Do you handle the Pakistan visa?", a: "We provide a full invitation letter and step-by-step visa support for all four diaspora countries." },
    ],
  },
  {
    slug: "sikh-heritage-of-punjab",
    name: "Sikh Heritage of Punjab",
    tagline: "Our flagship pilgrimage across historic Punjab",
    duration: "7–10 Days",
    suggestedNights: 7,
    price: "£1,350 – £2,200 / person",
    priceFromGBP: 1350,
    priceToGBP: 2200,
    priceUnit: "/ person",
    target: "Main flagship group tour",
    image: nankana,
    hotel: "4 & 5-star heritage hotels",
    transport: "Private luxury coaches",
    meals: "Full board — breakfast, lunch, dinner",
    comfort: "Small premium groups of 12–18",
    destinations: ["Nankana Sahib", "Kartarpur Sahib", "Panja Sahib", "Lahore", "Eminabad", "Rohri Sahib"],
    inclusions: [
      "All accommodation (twin share)",
      "Full-board meals incl. authentic Punjabi cuisine",
      "Luxury private coach with driver",
      "Expert Sikh historian guide",
      "All site permits & gurdwara coordination",
      "Visa invitation letter & assistance",
      "Bottled water, snacks, on-ground SIM",
      "24/7 trip director",
    ],
    exclusions: ["International flights", "Personal shopping", "Travel insurance", "Pakistan visa fee"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Welcome in Lahore", details: "Pickup, welcome dinner, briefing." },
      { day: "Day 2", title: "Nankana Sahib — Birthplace of Guru Nanak Dev Ji", details: "Visit to Gurdwara Janam Asthan and surrounding historic gurdwaras." },
      { day: "Day 3", title: "Eminabad & Rohri Sahib", details: "Trace early travels of Guru Nanak." },
      { day: "Day 4", title: "Panja Sahib (Hasan Abdal)", details: "Sacred handprint, sarovar, sewa and langar." },
      { day: "Day 5", title: "Kartarpur Sahib", details: "Day of reflection at the site of Guru Nanak's final years." },
      { day: "Day 6", title: "Lahore Sikh Heritage", details: "Gurdwara Dera Sahib, Lahore Fort, Maharaja Ranjit Singh Samadhi." },
      { day: "Day 7", title: "Walled City & Farewell", details: "Heritage walk, farewell dinner, departure prep." },
    ],
    faqs: [
      { q: "How big are the groups?", a: "Small premium groups of 12–18. Larger gurdwara delegations are handled separately." },
      { q: "Can you accommodate dietary needs?", a: "Yes — all meals are vegetarian by default and we cater for jain, gluten-free and senior-friendly diets." },
    ],
  },
  {
    slug: "roots-and-ancestry-tour",
    name: "Roots & Ancestry Tour",
    tagline: "Walk the lanes your grandparents called home",
    duration: "7–14 Days",
    suggestedNights: 10,
    price: "£3,200 – £5,999 / private group",
    priceFromGBP: 3200,
    priceToGBP: 5999,
    priceUnit: "/ private group",
    target: "Families seeking ancestral villages and pre-partition roots",
    image: roots,
    hotel: "Boutique heritage + 5-star city hotels",
    transport: "Private chauffeured SUVs",
    meals: "Full board, family-style",
    comfort: "Fully private, family-paced",
    destinations: ["Your ancestral village", "Lahore", "Amritsar border", "Custom historic stops"],
    inclusions: [
      "Pre-trip ancestry research & village mapping",
      "Private chauffeured SUVs",
      "Boutique & 5-star accommodation",
      "Dedicated family trip director",
      "Local translator & cultural liaison",
      "Documentary-style photo & video (optional)",
      "Visa support for the full family",
    ],
    exclusions: ["International flights", "Personal expenses", "Travel insurance"],
    itinerary: [
      { day: "Day 1–2", title: "Arrival & Lahore briefing", details: "Family welcome, ancestry findings presentation." },
      { day: "Day 3–5", title: "Ancestral village visit", details: "Slow travel to your family village. Meet local elders, visit your old home or land if traceable." },
      { day: "Day 6–8", title: "Sikh heritage circuit", details: "Nankana Sahib, Panja Sahib, Kartarpur Sahib at your own pace." },
      { day: "Day 9+", title: "Custom days", details: "Add Hasan Abdal, Rawalpindi, Multan, or extra time in the village." },
    ],
    faqs: [
      { q: "How do you research the ancestral village?", a: "Based on family name, partition records and oral history we provide before booking, our research team maps probable village(s) and we confirm with you before travel." },
      { q: "Can we bring elderly family members?", a: "Absolutely — this tour was designed for multi-generational families." },
    ],
  },
  {
    slug: "luxury-private-sikh-heritage",
    name: "Luxury Private Sikh Heritage Tour",
    tagline: "Fully bespoke, white-glove pilgrimage",
    duration: "Custom",
    suggestedNights: 10,
    price: "£3,500+ / person",
    priceFromGBP: 3500,
    priceUnit: "/ person",
    target: "High-end private travelers, families, VIP guests",
    image: panja,
    hotel: "5-star and palace hotels",
    transport: "Private luxury sedans / SUVs with security",
    meals: "Curated dining, private chef on request",
    comfort: "Fully private, fully bespoke",
    destinations: ["All major gurdwaras", "Lahore", "Hasan Abdal", "Custom"],
    inclusions: [
      "Personal trip designer",
      "5-star and palace accommodation",
      "Private luxury vehicles + security",
      "Private historians and granthi access where possible",
      "Curated dining experiences",
      "Concierge support 24/7",
      "Full visa & airport white-glove",
    ],
    exclusions: ["International flights", "Personal shopping"],
    itinerary: [
      { day: "Custom", title: "Designed around you", details: "Every itinerary built one-to-one. Sample: 5–14 days across the full Sikh heritage circuit with rest days and family time." },
    ],
    faqs: [
      { q: "How private is it?", a: "Completely. No shared groups, no shared transport, no shared meals." },
    ],
  },
  {
    slug: "gurdwara-group-pilgrimage",
    name: "Gurdwara Group Pilgrimage",
    tagline: "For sangat groups of 15 to 40 yatris",
    duration: "7–10 Days",
    suggestedNights: 8,
    price: "£1,100 – £1,750 / person",
    priceFromGBP: 1100,
    priceToGBP: 1750,
    priceUnit: "/ person",
    target: "Gurdwara-led groups of 15–40 people",
    image: lahore,
    hotel: "4-star group hotels",
    transport: "Private luxury coaches",
    meals: "Full board with langar coordination",
    comfort: "Group-paced, jathedar support",
    destinations: ["Nankana Sahib", "Kartarpur Sahib", "Panja Sahib", "Lahore", "Eminabad"],
    inclusions: [
      "All group accommodation",
      "Full-board meals & langar coordination",
      "Private luxury coaches",
      "Dedicated jathedar liaison",
      "All site permits & gurdwara coordination",
      "Group visa processing",
      "On-ground 24/7 group manager",
    ],
    exclusions: ["International flights", "Personal expenses", "Travel insurance"],
    itinerary: [
      { day: "Day 1", title: "Group arrival in Lahore", details: "Coach pickup, group welcome, sangat dinner." },
      { day: "Day 2–3", title: "Nankana Sahib", details: "Two days at Janam Asthan and nearby historic gurdwaras." },
      { day: "Day 4", title: "Panja Sahib", details: "Full day of sewa, langar and darshan." },
      { day: "Day 5–6", title: "Kartarpur Sahib", details: "Two days for reflection, kirtan and sangat." },
      { day: "Day 7", title: "Lahore heritage", details: "Gurdwara Dera Sahib, Lahore Fort, samadhi of Maharaja Ranjit Singh." },
      { day: "Day 8", title: "Departure", details: "Coach to airport, farewell ardas." },
    ],
    faqs: [
      { q: "Can you handle the full group visa?", a: "Yes — we routinely process group visas for gurdwara delegations from UK, Canada, USA and Australia." },
    ],
  },
];

export const findPackage = (slug: string) => packages.find((p) => p.slug === slug);
