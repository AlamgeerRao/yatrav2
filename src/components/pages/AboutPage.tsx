import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { TrustBadges } from "@/components/TrustBadges";
import { SectionHeading } from "@/components/SectionHeading";
import { ABOUT } from "@/lib/content/about";
import type { Locale } from "@/lib/i18n";
import roots from "@/assets/roots.jpg";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = ABOUT[locale];

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[var(--shadow-elevated)]">
            <img src={roots} alt={t.intro.imageAlt} loading="lazy" className="size-full object-cover" />
          </motion.div>
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl text-primary leading-[1.05]">{t.intro.heading}</h2>
            {t.intro.paragraphs.map((p) => (
              <p key={p} className="text-muted-foreground leading-relaxed">{p}</p>
            ))}
            <div className="rounded-2xl bg-cream p-6 border border-border">
              <div className="text-[11px] uppercase tracking-[0.25em] text-accent mb-2">{t.intro.founderLabel}</div>
              <p className="font-display text-xl text-primary leading-snug">{t.intro.founderQuote}</p>
              <div className="text-sm text-muted-foreground mt-3">{t.intro.founderAttribution}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.values.eyebrow} title={t.values.title} />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {t.values.items.map((v) => (
              <div key={v.t} className="rounded-3xl bg-card p-7 border border-border">
                <h3 className="font-display text-xl text-primary">{v.t}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.team.eyebrow} title={t.team.title} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.team.members.map((m) => (
              <div key={m.name} className="rounded-3xl bg-cream p-6 text-center border border-border">
                <div className="size-20 mx-auto rounded-full gradient-warm grid place-items-center font-display text-2xl text-primary mb-4">{m.name[0]}</div>
                <div className="font-display text-lg text-primary">{m.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading title={t.whyUs.title} />
          <div className="mt-12"><TrustBadges /></div>
          <p className="text-center text-sm text-muted-foreground mt-10">{t.whyUs.partnerships}</p>
        </div>
      </section>
    </>
  );
}
