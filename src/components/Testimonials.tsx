import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n";

const testimonialsEn = [
  { name: "Harpreet Kaur", location: "Birmingham, UK", text: "Standing at Nankana Sahib with my parents brought tears we'd waited a lifetime for. Every detail — the visa, the hotels, the gentle pace for my mother — was handled with grace.", rating: 5 },
  { name: "Jagdeep Singh", location: "Brampton, Canada", text: "I led our gurdwara's jatha of 32 yatris. The team coordinated flawlessly. Langar at Panja Sahib will stay with us forever.", rating: 5 },
  { name: "Manjit Sandhu", location: "Fremont, USA", text: "We finally visited my grandfather's village outside Lahore. The local liaison even found an elder who remembered our family name. Indescribable.", rating: 5 },
  { name: "Ravinder Gill", location: "Melbourne, Australia", text: "Premium without being flashy. Spiritual without being rushed. The guide's knowledge of Sikh history was extraordinary.", rating: 5 },
  { name: "Simran Bedi", location: "London, UK", text: "Booking from London felt nerve-wracking until we hopped on a consultation call. From that moment everything was warm and clear.", rating: 5 },
  { name: "Tarlochan Singh", location: "Toronto, Canada", text: "Kartarpur Sahib at sunrise — I cannot describe what those minutes meant. The whole journey honoured our faith.", rating: 5 },
];

const testimonialsFr = [
  { name: "Harpreet Kaur", location: "Birmingham, Royaume-Uni", text: "Se tenir à Nankana Sahib avec mes parents a provoqué des larmes que nous attendions depuis toute une vie. Chaque détail — le visa, les hôtels, le rythme doux pour ma mère — a été géré avec grâce.", rating: 5 },
  { name: "Jagdeep Singh", location: "Brampton, Canada", text: "J'ai dirigé la jatha de notre gurdwara avec 32 yatris. L'équipe a coordonné à la perfection. Le langar à Panja Sahib restera à jamais dans nos mémoires.", rating: 5 },
  { name: "Manjit Sandhu", location: "Fremont, États-Unis", text: "Nous avons enfin visité le village de mon grand-père près de Lahore. Le correspondant local a même trouvé un ancien qui se souvenait de notre nom de famille. Indescriptible.", rating: 5 },
  { name: "Ravinder Gill", location: "Melbourne, Australie", text: "Premium sans ostentation. Spirituel sans précipitation. Les connaissances du guide en histoire sikhe étaient extraordinaires.", rating: 5 },
  { name: "Simran Bedi", location: "Paris, France", text: "Réserver depuis Paris semblait intimidant jusqu'à notre appel de consultation. À partir de ce moment, tout était chaleureux et clair.", rating: 5 },
  { name: "Tarlochan Singh", location: "Toronto, Canada", text: "Kartarpur Sahib à l'aube — je ne peux pas décrire ce que ces minutes ont signifié. Tout le voyage a honoré notre foi.", rating: 5 },
];

const data: Record<Locale, typeof testimonialsEn> = { en: testimonialsEn, fr: testimonialsFr };

export function TestimonialsGrid({ limit }: { limit?: number }) {
  const locale = useLocale();
  const items = (limit ? data[locale].slice(0, limit) : data[locale]);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((t, i) => (
        <motion.figure
          key={t.name + i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
          className="rounded-3xl bg-card p-7 border border-border/70 shadow-[var(--shadow-soft)] flex flex-col gap-4"
        >
          <Quote className="size-7 text-gold" />
          <div className="flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, idx) => (
              <Star key={idx} className="size-4 fill-gold text-gold" />
            ))}
          </div>
          <blockquote className="text-primary/85 leading-relaxed text-[15px]">{t.text}</blockquote>
          <figcaption className="mt-auto pt-4 border-t border-border/70">
            <div className="font-display text-lg text-primary">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.location}</div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

// Keep named export for backward compat
export const testimonials = testimonialsEn;
