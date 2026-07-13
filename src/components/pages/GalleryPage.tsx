import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { GALLERY } from "@/lib/content/gallery";
import type { Locale } from "@/lib/i18n";
import kartarpur from "@/assets/hero-kartarpur.jpg";
import nankana from "@/assets/nankana.jpg";
import panja from "@/assets/panja.jpg";
import lahore from "@/assets/lahore.jpg";
import roots from "@/assets/roots.jpg";
import food from "@/assets/food.jpg";

const IMAGE_SETS = [
  [kartarpur, nankana, panja, kartarpur],
  [lahore, lahore, panja],
  [roots, roots, roots],
  [food, food, food],
];

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = GALLERY[locale];
  const sections = t.sectionTitles.map((title, i) => ({ title, images: IMAGE_SETS[i] }));

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-20">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">{sec.title}</h2>
              <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
                {sec.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-[var(--shadow-soft)]"
                  >
                    <img src={img} alt={sec.title} loading="lazy" className="w-full h-auto" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
