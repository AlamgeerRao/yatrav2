import kartarpur from "@/assets/hero-kartarpur.jpg";
import nankana from "@/assets/nankana.jpg";
import panja from "@/assets/panja.jpg";
import lahore from "@/assets/lahore.jpg";
import roots from "@/assets/roots.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cat: string;
  image: string;
  date: string;
  body: string[]; // paragraphs
}

export const posts: BlogPost[] = [
  {
    slug: "first-time-guide-sikh-heritage-pakistan",
    title: "First-Time Guide to Visiting Sikh Heritage Sites in Pakistan",
    excerpt: "What every diaspora traveller should know before booking their first heritage trip.",
    cat: "Pilgrimage Guides",
    image: nankana,
    date: "May 2026",
    body: [
      "For most diaspora Sikh families, the idea of travelling to Pakistan carries a mix of excitement and uncertainty. Decades of separation, layered with limited information, can make a first trip feel daunting. The good news is that Pakistan has, over the last several years, become considerably more accessible and welcoming for Sikh pilgrims, with dedicated infrastructure built specifically around heritage and religious tourism.",
      "Before you book, it helps to understand the shape of a typical first trip. Most first-time visitors choose a shorter itinerary of three to five days, anchored around Kartarpur Sahib and Lahore, before considering a longer circuit that includes Nankana Sahib and Panja Sahib on a future visit. This staged approach lets you test the experience, the pace, and the logistics before committing to a longer journey.",
      "Visa preparation is the single biggest source of first-time traveller anxiety, and rightly so — it is also the most manageable. Diaspora Sikhs from the UK, Canada, USA and Australia typically apply via an e-visa pathway supported by an invitation letter from a recognised heritage or pilgrimage operator. Processing windows vary, so building in a comfortable buffer before your travel dates is wise.",
      "Once on the ground, the experience itself tends to exceed expectations. Gurdwaras across Punjab are warmly maintained, langar is offered generously, and local guides — many of whom have devoted their careers to Sikh history — bring each site to life with context that goes well beyond what's written on a plaque. Most travellers describe the trip as more emotional than they anticipated, particularly when standing at a site they had only ever heard about from grandparents.",
      "Our advice for first-timers: travel with a small, trusted group or family unit, choose a gentle itinerary rather than an overly ambitious one, and give yourself unstructured time at the sites that matter most to your family's story. The schedule should serve the pilgrimage, not the other way around.",
    ],
  },
  {
    slug: "kartarpur-sahib-international-travellers",
    title: "Kartarpur Sahib: What International Sikh Travellers Should Know",
    excerpt: "Visa, corridor, etiquette, and what to expect during darshan.",
    cat: "Sikh Heritage",
    image: kartarpur,
    date: "April 2026",
    body: [
      "Kartarpur Sahib holds a singular place in Sikh history as the site where Guru Nanak Dev Ji spent his final years, cultivated the land, and established the first Sikh community. For diaspora travellers from outside India, the route into Kartarpur differs meaningfully from the well-known Kartarpur Corridor used by Indian pilgrims — and understanding this distinction early avoids confusion later.",
      "The Kartarpur Corridor itself is a visa-free walking route reserved for pilgrims crossing from Dera Baba Nanak in India. Travellers arriving from the UK, Canada, USA, Australia or elsewhere instead reach Kartarpur Sahib by road from Lahore, roughly two and a half hours each way, after entering Pakistan on a standard tourist or pilgrim e-visa.",
      "On arrival, the atmosphere at the gurdwara complex is unmistakably devotional. Mornings tend to be quieter and cooler, making them the preferred time for darshan, while afternoons see a steady flow of local and international visitors. Langar is served throughout the day, and most pilgrims describe taking part in the community kitchen as one of the most moving parts of the visit.",
      "A few practical notes: modest dress and a head covering are required throughout the complex, photography is generally permitted in outdoor areas but should always be checked site-by-site with your guide, and footwear is removed before entering the main prayer hall. Comfortable, slip-on shoes make this far easier across a full day of visits.",
      "For families travelling with elders, the gentle pace and accessible walkways at Kartarpur make it one of the more comfortable heritage sites in the region, though we always recommend arranging private transport and a flexible schedule so no one feels rushed through what is, for many, a once-in-a-lifetime moment.",
    ],
  },
  {
    slug: "plan-from-uk-canada-usa-australia",
    title: "How to Plan a Sikh Heritage Tour from the UK, Canada, USA, or Australia",
    excerpt: "A country-by-country breakdown of visas, flights and timing.",
    cat: "Pakistan Travel Tips",
    image: lahore,
    date: "March 2026",
    body: [
      "Planning a heritage trip to Pakistan looks slightly different depending on which diaspora community you're travelling from, mainly due to visa processing norms, flight routing, and seasonal timing relative to your home country's holidays. Here's a practical breakdown by region.",
      "From the United Kingdom: flights typically route through the Gulf (Doha, Dubai or Abu Dhabi) or via Istanbul, landing in Lahore or Islamabad. E-visa applications for UK passport holders are generally processed within seven to ten working days, and October to March remains the most popular travel window thanks to milder weather and school holiday alignment.",
      "From Canada: most travellers connect through London, Doha or Istanbul. Given the longer total travel time, we recommend building in at least one rest day on arrival before beginning a heritage circuit, particularly for elderly travellers or large family groups.",
      "From the United States: similar routing applies via Gulf or European hubs, with total travel time often exceeding eighteen hours door to door. American travellers frequently combine a Pakistan heritage trip with a stop in the UK or UAE to break up the journey.",
      "From Australia: this is the longest haul of the four, typically routed through Singapore, Dubai or Doha. Because of the distance, Australian families often plan longer trips — ten days or more — to make the most of the journey once they've arrived.",
      "Across all four regions, the constants are the same: book your e-visa application early, choose a tour partner who manages the invitation letter and supporting documents for you, and build a small buffer into your itinerary in case of flight delays on the way in.",
    ],
  },
  {
    slug: "nankana-sahib-guru-nanak",
    title: "Nankana Sahib and the Birthplace of Guru Nanak Dev Ji",
    excerpt: "The history, the sites, and what makes this town spiritually unforgettable.",
    cat: "Historical Stories",
    image: nankana,
    date: "Feb 2026",
    body: [
      "Nankana Sahib holds the distinction of being the birthplace of Guru Nanak Dev Ji, the founder of Sikhism, born here in 1469. For Sikh pilgrims, it is often described as the spiritual heartland of the faith — the place every other gurdwara, in some sense, points back to.",
      "The town itself is centred around Gurdwara Janam Asthan, built on the site of Guru Nanak's birth home. Several other historically significant gurdwaras sit within close proximity, including sites associated with his childhood and early life, allowing visitors to trace a meaningful arc of his earliest years within a single day or two of unhurried exploration.",
      "Nankana Sahib also carries a more sombre layer of history. The town was the site of the 1921 Saka Nankana Sahib massacre, a pivotal and painful event in the Sikh struggle to reform gurdwara management. Many pilgrims pair their visit with quiet reflection on this history, and some heritage tours intentionally include time for this remembrance alongside the celebratory aspects of the visit.",
      "Practically speaking, Nankana Sahib sees its highest visitor numbers around Guru Nanak Gurpurab in November, when the town transforms into a multi-day festival of kirtan, langar and processions. Travellers seeking a quieter, more contemplative visit often prefer shoulder months, while those wanting the full communal experience plan deliberately around the Gurpurab dates.",
      "Whichever you choose, most travellers describe Nankana Sahib as the emotional high point of a Punjab heritage circuit — the place where the history stops being a story told by grandparents and becomes ground you are standing on yourself.",
    ],
  },
  {
    slug: "roots-ancestry-reconnect-punjab",
    title: "How Roots & Ancestry Tours Help Families Reconnect With Punjab",
    excerpt: "Behind the scenes of how we trace ancestral villages and design private journeys.",
    cat: "Ancestry & Roots",
    image: roots,
    date: "Jan 2026",
    body: [
      "For many diaspora Sikh families, the desire to visit Pakistan isn't only about gurdwaras — it's about a specific village, a specific street, a house that may or may not still be standing. These ancestry journeys are some of the most meaningful trips we design, and they require a different kind of preparation than a standard pilgrimage tour.",
      "The process typically begins well before travel, with families sharing whatever oral history, family names, district records or partition-era documentation they have. Even fragmentary information — a tehsil name, a grandparent's recollection of a nearby landmark — can be enough for an experienced research team to narrow down a probable village or cluster of villages.",
      "Once a likely location is identified, we make contact with local connections — village elders, local historians, or in some cases descendants of families who remained in the area — to confirm details before the family arrives. This groundwork makes an enormous difference: arriving with confirmed context transforms a hopeful guess into a guided, dignified visit.",
      "On the ground, these trips move at a deliberately unhurried pace. Families often spend hours rather than minutes at a single site, walking streets, speaking with locals, and absorbing a place that exists, until that point, only in family stories. It's not unusual for these visits to surface unexpected details — a neighbour who remembers a family name, a building that matches a description passed down for generations.",
      "We've learned that the emotional weight of these trips deserves space. Itineraries built around ancestral villages intentionally leave room for families to stay longer than planned, to sit quietly, or to simply absorb the moment without being moved along to the next stop on a schedule.",
    ],
  },
  {
    slug: "panja-sahib-pilgrimage",
    title: "Panja Sahib: The Sacred Handprint of Guru Nanak at Hasan Abdal",
    excerpt: "An intimate guide to one of Pakistan's most loved Sikh sites.",
    cat: "Sikh Heritage",
    image: panja,
    date: "Dec 2025",
    body: [
      "Gurdwara Panja Sahib, located in Hasan Abdal roughly an hour from Islamabad, holds a uniquely tactile place in Sikh tradition: the handprint of Guru Nanak Dev Ji, said to be pressed into a boulder near the gurdwara's sacred spring. For many pilgrims, this site offers a different kind of connection — a physical trace of the Guru, rather than only a place associated with his presence.",
      "The complex itself centres on a large sarovar fed by the natural spring, with the marked boulder housed within a small shrine at its edge. Pilgrims often pause here longer than at other stops on a Punjab circuit, drawn by the quiet, contemplative atmosphere around the water.",
      "Panja Sahib is also one of the most significant sites during Vaisakhi celebrations each April, when the gurdwara draws large crowds of pilgrims from across Pakistan and the diaspora for several days of kirtan, langar and communal celebration. Travellers planning around this period should expect a livelier, more festival-like atmosphere than a typical visit.",
      "For first-time visitors, we recommend allowing at least half a day here without a rigid schedule. The combination of the spring, the handprint shrine, and the layered history of the site rewards unhurried time far more than a brief stop on a packed itinerary.",
      "As with all our gurdwara visits, modest dress and a head covering are required throughout, and our guides are on hand to explain the etiquette and history specific to Panja Sahib so nothing about the visit feels uncertain.",
    ],
  },
];

export const findPost = (slug: string) => posts.find((p) => p.slug === slug);
