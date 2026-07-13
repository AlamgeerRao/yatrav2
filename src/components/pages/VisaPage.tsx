import { Download, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { VISA } from "@/lib/content/visa";
import type { Locale } from "@/lib/i18n";

export function VisaPage({ locale }: { locale: Locale }) {
  const t = VISA[locale];

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          {t.sections.map((s) => (
            <div key={s.title} className="rounded-3xl bg-card p-7 border border-border">
              <h3 className="font-display text-2xl text-primary">{s.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.checklist.eyebrow} title={t.checklist.title} />
          <ul className="mt-10 rounded-3xl bg-card p-8 border border-border grid sm:grid-cols-2 gap-3">
            {t.checklist.items.map((c) => (
              <li key={c} className="flex gap-2.5 text-sm text-primary/85">
                <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" /> {c}
              </li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <Button asChild className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href={whatsappLink(t.checklist.whatsappMsg)} target="_blank" rel="noreferrer">
                <Download className="size-4 mr-1.5" /> {t.checklist.ctaLabel}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-card border border-border px-2">
            {t.faq.items.map((f, i) => (
              <AccordionItem key={i} value={`v-${i}`}>
                <AccordionTrigger className="text-left text-primary px-4">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
