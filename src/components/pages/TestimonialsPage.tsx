import { Play } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TestimonialsGrid } from "@/components/Testimonials";
import { TESTIMONIALS_PAGE } from "@/lib/content/testimonials-page";
import type { Locale } from "@/lib/i18n";
import nankana from "@/assets/nankana.jpg";
import roots from "@/assets/roots.jpg";

export function TestimonialsPage({ locale }: { locale: Locale }) {
  const t = TESTIMONIALS_PAGE[locale];

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <TestimonialsGrid />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{t.videoHeading}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[nankana, roots].map((img, i) => (
              <div key={i} className="relative aspect-video rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] group cursor-pointer">
                <img src={img} alt={t.videoAlt} loading="lazy" className="size-full object-cover" />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition" />
                <button className="absolute inset-0 grid place-items-center" aria-label={t.playAriaLabel}>
                  <span className="size-16 rounded-full gradient-warm grid place-items-center shadow-[var(--shadow-gold)] group-hover:scale-110 transition-transform">
                    <Play className="size-7 text-primary fill-primary ml-0.5" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
