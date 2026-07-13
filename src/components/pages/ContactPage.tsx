import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SITE, whatsappLink } from "@/lib/site";
import { CONTACT } from "@/lib/content/contact";
import type { Locale } from "@/lib/i18n";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = CONTACT[locale];

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-[1fr_400px] gap-10">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-3xl text-primary mb-2">{t.inquiry.heading}</h2>
            <p className="text-muted-foreground text-sm mb-7">{t.inquiry.blurb}</p>
            <InquiryForm locale={locale} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-cream border border-border p-7">
              <h3 className="font-display text-xl text-primary mb-4">{t.directContact.heading}</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-accent shrink-0" /><a href={`mailto:${SITE.email}`} className="text-primary hover:text-accent break-all">{SITE.email}</a></li>
                <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-accent shrink-0" /><span className="text-primary">{SITE.address}</span></li>
              </ul>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[oklch(0.62_0.18_150)] text-white py-3 text-sm font-medium hover:opacity-90 transition">
                <MessageCircle className="size-4" /> {t.directContact.whatsappCta}
              </a>
            </div>

            <div className="rounded-3xl bg-card border border-border p-7">
              <h3 className="font-display text-xl text-primary mb-3">{t.sendMessage.heading}</h3>
              <ContactForm locale={locale} />
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="aspect-[16/7] rounded-3xl overflow-hidden bg-cream border border-border grid place-items-center text-center px-6">
            <div>
              <MapPin className="size-8 text-accent mx-auto mb-2" />
              <p className="font-display text-xl text-primary">{t.office.heading}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.office.note}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
