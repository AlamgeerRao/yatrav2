export const SITE = {
  name: "YatraPK",
  tagline: "Sacred Sikh Heritage Tours Across Pakistan",
  url: "https://yatrapk.com",
  email: "journeys@punjabheritage.travel",
  whatsapp: "447364169353", // international format, no + — UK business WhatsApp number
  whatsappMsg: "Sat Sri Akal! I'd like to know more about your Sikh heritage tours.",
  address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  // Legal entity operating this site/brand — required by UK trading disclosure
  // rules since the public brand name differs from the registered company name.
  // Displayed in the site footer and should also appear in email signatures.
  company: {
    legalName: "NEXT HORIZON GROUP LTD",
    number: "17309052",
    jurisdiction: "England and Wales",
    registeredOffice: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
  },
  // Self-hosted video: put the file in public/videos/ and reference it here,
  // e.g. "/videos/kartarpur-preview.mp4". Takes priority over videoYouTubeId
  // if both are set. Set both to null to show a "video coming soon" state.
  videoUrl: "/videos/kartarpur-preview.mp4" as string | null,
  // Alternative: a YouTube video ID instead of a self-hosted file.
  // e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ the ID is "dQw4w9WgXcQ"
  videoYouTubeId: null as string | null,
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg ?? SITE.whatsappMsg)}`;
