import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { localizedPath, useLocale, UI } from "@/lib/i18n";

export function Footer() {
  const locale = useLocale();
  const t = UI[locale];
  const p = (path: string) => localizedPath(locale, path);

  return (
    <footer className="gradient-deep text-cream mt-24">
      <div className="ornament-divider" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-12 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="size-9 rounded-full gradient-warm grid place-items-center font-display text-primary text-lg">ੴ</span>
            <span className="font-display text-xl">{SITE.name}</span>
          </div>
          <p className="text-cream/70 text-sm leading-relaxed">{SITE.tagline}. {t.footer.tagline}</p>
          <div className="flex gap-3 pt-2">
            <a href={SITE.social.instagram} aria-label="Instagram" className="size-9 grid place-items-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"><Instagram className="size-4" /></a>
            <a href={SITE.social.facebook} aria-label="Facebook" className="size-9 grid place-items-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"><Facebook className="size-4" /></a>
            <a href={SITE.social.youtube} aria-label="YouTube" className="size-9 grid place-items-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"><Youtube className="size-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.2em] mb-4">{t.footer.explore}</h4>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link to={p("/tours")} className="hover:text-gold">{t.allTours}</Link></li>
            <li><Link to={p("/about")} className="hover:text-gold">{t.nav.about}</Link></li>
            <li><Link to={p("/visa")} className="hover:text-gold">{t.nav.visa}</Link></li>
            <li><Link to={p("/gallery")} className="hover:text-gold">{t.nav.gallery}</Link></li>
            <li><Link to={p("/blog")} className="hover:text-gold">{t.nav.blog}</Link></li>
            <li><Link to={p("/testimonials")} className="hover:text-gold">{t.nav.testimonials}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.2em] mb-4">{t.footer.getInTouch}</h4>
          <ul className="space-y-3 text-sm text-cream/80">
            <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-gold shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-gold break-all">{SITE.email}</a></li>
            <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-gold shrink-0" />{SITE.address}</li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-block mt-1 px-4 py-2 rounded-full bg-[oklch(0.62_0.18_150)] text-white text-xs hover:opacity-90">{t.whatsappChat}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.2em] mb-4">{t.footer.stayConnected}</h4>
          <p className="text-sm text-cream/70 mb-4">{t.footer.newsletterBlurb}</p>
          <NewsletterForm variant="footer" locale={locale} />
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} {SITE.name}. {t.footer.rights}</p>
          <div className="flex flex-wrap gap-5">
            <Link to={p("/privacy")} className="hover:text-gold">{locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}</Link>
            <Link to={p("/terms")} className="hover:text-gold">{locale === "fr" ? "Conditions" : "Terms"}</Link>
            <span>{t.footer.pricesNote}</span>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pb-6 text-[11px] text-cream/45 leading-relaxed">
          {locale === "fr" ? (
            <>
              {SITE.name} est un nom commercial de {SITE.company.legalName}, société immatriculée en {SITE.company.jurisdiction} sous le numéro {SITE.company.number}. Siège social : {SITE.company.registeredOffice}.
            </>
          ) : (
            <>
              {SITE.name} is a trading name of {SITE.company.legalName}, registered in {SITE.company.jurisdiction}, company number {SITE.company.number}. Registered office: {SITE.company.registeredOffice}.
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
