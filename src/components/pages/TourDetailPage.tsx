import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, MapPin, Hotel, Car, Utensils, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { TestimonialsGrid } from "@/components/Testimonials";
import { PackageCard } from "@/components/PackageCard";
import { PriceTag } from "@/components/PriceTag";
import { whatsappLink } from "@/lib/site";
import { TOUR_DETAIL } from "@/lib/content/tour-detail";
import type { Locale } from "@/lib/i18n";
import type { TourPackage } from "@/lib/packages";

export function TourDetailPage({ locale, pkg, related }: { locale: Locale; pkg: TourPackage; related: TourPackage[] }) {
  const t = TOUR_DETAIL[locale];
  const toursPath = locale === "fr" ? "/fr/tours" : "/tours";

  return (
    <>
      {/* HERO */}
      <section className="relative h-[78svh] min-h-[520px] flex items-end overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl w-full px-5 lg:px-8 pb-14 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-cream">
            <Link to={toursPath} className="text-gold text-xs uppercase tracking-[0.25em] hover:opacity-80">{t.allToursLink}</Link>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-4 leading-[1.02] text-balance">{pkg.name}</h1>
            <p className="mt-4 text-cream/85 text-lg max-w-2xl">{pkg.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <Badge>{pkg.duration}</Badge>
              <Badge>{pkg.comfort}</Badge>
              <Badge><PriceTag pkg={pkg} /></Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-12 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Hotel, label: t.quickFacts.hotels, value: pkg.hotel },
            { icon: Car, label: t.quickFacts.transport, value: pkg.transport },
            { icon: Utensils, label: t.quickFacts.meals, value: pkg.meals },
            { icon: ShieldCheck, label: t.quickFacts.comfort, value: pkg.comfort },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl bg-card p-5 border border-border/60">
              <f.icon className="size-5 text-accent mb-3" />
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{f.label}</div>
              <div className="text-primary text-sm font-medium mt-1">{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ITINERARY + SIDEBAR */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-3">{t.itinerary.heading}</h2>
            <p className="text-muted-foreground mb-8">{t.itinerary.blurb}</p>
            <ol className="relative border-l border-gold/40 ml-3 space-y-8">
              {pkg.itinerary.map((step, i) => (
                <motion.li
                  key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="pl-8 relative"
                >
                  <span className="absolute -left-[11px] top-1.5 size-5 rounded-full gradient-warm border-4 border-background" />
                  <div className="text-[11px] tracking-[0.25em] uppercase text-accent">{step.day}</div>
                  <h3 className="font-display text-xl text-primary mt-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{step.details}</p>
                </motion.li>
              ))}
            </ol>

            <h3 className="font-display text-2xl text-primary mt-16 mb-5">{t.destinations}</h3>
            <div className="flex flex-wrap gap-2">
              {pkg.destinations.map((d) => (
                <span key={d} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream border border-border text-sm text-primary"><MapPin className="size-3.5 text-accent" />{d}</span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-16">
              <div>
                <h3 className="font-display text-2xl text-primary mb-4">{t.inclusions}</h3>
                <ul className="space-y-2.5">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="flex gap-2.5 text-sm text-primary/85"><Check className="size-4 text-accent mt-0.5 shrink-0" />{inc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl text-primary mb-4">{t.exclusions}</h3>
                <ul className="space-y-2.5">
                  {pkg.exclusions.map((ex) => (
                    <li key={ex} className="flex gap-2.5 text-sm text-muted-foreground"><X className="size-4 text-destructive mt-0.5 shrink-0" />{ex}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 rounded-3xl bg-cream p-8 grid place-items-center text-center border border-border">
              <MapPin className="size-8 text-accent mb-3" />
              <p className="font-display text-xl text-primary">{t.mapCard.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.mapCard.body}</p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-4">
              <Info title={t.visaInfo.title} body={t.visaInfo.body} />
              <Info title={t.safetyInfo.title} body={t.safetyInfo.body} />
            </div>

            <h3 className="font-display text-2xl text-primary mt-16 mb-5">{t.faqHeading}</h3>
            <Accordion type="single" collapsible className="rounded-2xl bg-card border border-border px-2">
              {pkg.faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left text-primary px-4">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl bg-card border border-border p-7 shadow-[var(--shadow-elevated)]">
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{t.sidebar.startingFrom}</div>
              <div className="font-display text-3xl text-primary mt-1"><PriceTag pkg={pkg} /></div>
              <div className="text-sm text-muted-foreground mt-1">{pkg.duration} · {pkg.target}</div>
              <div className="mt-6"><InquiryForm defaultPackage={pkg.slug} locale={locale} /></div>
              <a href={whatsappLink(t.sidebar.whatsappMsg(pkg.name))} target="_blank" rel="noreferrer" className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border border-[oklch(0.62_0.18_150)] text-[oklch(0.45_0.14_150)] py-3 text-sm font-medium hover:bg-[oklch(0.62_0.18_150)] hover:text-white transition">
                <MessageCircle className="size-4" /> {t.sidebar.whatsapp}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{t.testimonialsHeading}</h2>
          <TestimonialsGrid limit={3} />
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display text-3xl md:text-4xl text-primary">{t.relatedHeading}</h2>
            <Link to={toursPath} className="text-accent text-sm inline-flex items-center gap-1 hover:opacity-80">{t.allTours} <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {related.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1.5 rounded-full glass-panel text-primary text-xs font-medium">{children}</span>;
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-cream p-6 border border-border">
      <h4 className="font-display text-lg text-primary mb-1.5">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
