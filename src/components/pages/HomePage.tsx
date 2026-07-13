import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustBadges } from "@/components/TrustBadges";
import { PackageCard } from "@/components/PackageCard";
import { TestimonialsGrid } from "@/components/Testimonials";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { getPackages } from "@/lib/packages-locale";
import { whatsappLink } from "@/lib/site";
import { HOME } from "@/lib/content/home";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { TourPackage } from "@/lib/packages";
import heroImg from "@/assets/hero-kartarpur.jpg";
import roots from "@/assets/roots.jpg";

type FilterKey = "all" | "short" | "weekPlus" | "custom";

const FILTER_TESTS: Record<FilterKey, (p: TourPackage) => boolean> = {
  all: () => true,
  short: (p) => p.duration.trim().startsWith("3"),
  weekPlus: (p) => p.duration.trim().startsWith("7"),
  custom: (p) => !/^\d/.test(p.duration.trim()),
};

export function HomePage({ locale }: { locale: Locale }) {
  const t = HOME[locale];
  const packages = getPackages(locale);
  const [filter, setFilter] = useState<FilterKey>("all");
  const filteredPackages = packages.filter(FILTER_TESTS[filter]);

  const contactPath = localizedPath(locale, "/contact");
  const aboutPath = localizedPath(locale, "/about");
  const planPath = localizedPath(locale, "/plan");

  const filterChips: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.packagesPreview.filters.all },
    { key: "short", label: t.packagesPreview.filters.short },
    { key: "weekPlus", label: t.packagesPreview.filters.weekPlus },
    { key: "custom", label: t.packagesPreview.filters.custom },
  ];

  return (
    <>
      {/* HERO — compact, so the packages below are visible within a screen or two on mobile */}
      <section className="relative min-h-[52svh] md:min-h-[62svh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Kartarpur Sahib at sunrise" width={1920} height={1080} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative w-full mx-auto max-w-7xl px-5 lg:px-8 pb-10 md:pb-14 pt-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t.hero.eyebrow}</span>
            </div>
            <h1 className="font-display text-cream text-4xl md:text-6xl lg:text-7xl leading-[1] text-balance">
              {t.hero.titlePrefix}<em className="not-italic text-gold">{t.hero.titleEm}</em>{t.hero.titleSuffix}
            </h1>
            <p className="mt-5 text-cream/85 text-base md:text-xl max-w-2xl text-pretty">{t.hero.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-7 h-12 text-base shadow-[var(--shadow-gold)]">
                <a href="#packages">{t.hero.exploreTours} <ArrowRight className="size-4 ml-1" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 border-cream/40 text-cream bg-cream/5 hover:bg-cream hover:text-primary backdrop-blur">
                <Link to={contactPath}>{t.hero.bookConsultation}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP — condensed, no heavy heading, just quick reassurance before browsing */}
      <section className="py-8 md:py-10 bg-cream border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* PACKAGES — the primary content of the homepage, shown in full with quick filter chips */}
      <section id="packages" className="py-14 md:py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.packagesPreview.eyebrow} title={t.packagesPreview.title} description={t.packagesPreview.description} />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filterChips.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                  filter === c.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-primary/80 border-border hover:border-accent hover:text-accent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filteredPackages.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to={planPath}>{t.packagesPreview.customCtaLabel} <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* EMOTIONAL STORY — condensed teaser, links out to the full About page */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative aspect-[16/10] lg:aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-[var(--shadow-elevated)]">
            <img src={roots} alt="Sikh family reunion in ancestral Punjab village" loading="lazy" className="size-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 glass-panel rounded-xl p-4">
              <p className="font-display text-primary text-base leading-snug">{t.story.quote}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{t.story.quoteAttribution}</p>
            </div>
          </motion.div>
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium">{t.story.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-primary leading-[1.1] text-balance">
              {t.story.titlePrefix}<em className="not-italic text-accent">{t.story.titleEm}</em>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.story.paragraphs[0]}</p>
            <Button asChild variant="link" className="mt-2 px-0 text-accent">
              <Link to={aboutPath}>{t.story.cta} <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — condensed to 2, links implied via Testimonials nav item for the full set */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
          <div className="mt-10"><TestimonialsGrid limit={2} /></div>
        </div>
      </section>

      {/* FINAL CTA — lead magnet + consultation combined into one compact section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl gradient-deep p-7 md:p-9 text-cream relative overflow-hidden">
            <div className="absolute -top-12 -right-12 size-48 rounded-full bg-gold/15 blur-2xl" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold">{t.leadMagnet.eyebrow}</span>
            <h3 className="font-display text-2xl md:text-3xl mt-2 leading-tight">{t.leadMagnet.title}</h3>
            <p className="text-cream/75 mt-3 max-w-md text-sm">{t.leadMagnet.description}</p>
            <Button asChild className="mt-5 bg-gold text-gold-foreground hover:bg-gold/90 rounded-full">
              <a href={whatsappLink(t.leadMagnet.whatsappMsg)} target="_blank" rel="noreferrer">
                <Download className="size-4 mr-1.5" /> {t.leadMagnet.cta}
              </a>
            </Button>
          </div>
          <div className="rounded-2xl bg-card p-6 md:p-8 border border-border shadow-[var(--shadow-soft)]">
            <span className="text-xs uppercase tracking-[0.25em] text-accent">{t.consultation.eyebrow}</span>
            <h3 className="font-display text-2xl mt-2 text-primary">{t.consultation.title}</h3>
            <p className="text-muted-foreground text-sm mt-2 mb-4">{t.consultation.description}</p>
            <ConsultationForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
