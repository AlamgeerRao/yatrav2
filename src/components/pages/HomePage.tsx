import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
import heroImg from "@/assets/hero-kartarpur.jpg";
import roots from "@/assets/roots.jpg";

export function HomePage({ locale }: { locale: Locale }) {
  const t = HOME[locale];
  const packages = getPackages(locale);

  const aboutPath = localizedPath(locale, "/about");
  const planPath = localizedPath(locale, "/plan");

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
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="mt-8">
            <TrustBadges />
          </motion.div>
        </div>
      </section>

      {/* PACKAGES — the primary content of the homepage, shown in full */}
      <section id="packages" className="py-14 md:py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.packagesPreview.eyebrow} title={t.packagesPreview.title} description={t.packagesPreview.description} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {packages.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} showPrice={false} />)}
          </motion.div>

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
