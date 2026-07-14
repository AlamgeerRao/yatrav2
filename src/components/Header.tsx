import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PreferencesSwitcher } from "@/components/PreferencesSwitcher";
import { SITE } from "@/lib/site";
import { localizedPath, useLocale, UI } from "@/lib/i18n";

const primaryPaths = ["/", "/plan", "/about", "/contact"] as const;
const morePaths = ["/visa", "/gallery", "/blog"] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const locale = useLocale();
  const t = UI[locale];

  const primaryLabels = [t.nav.home, locale === "fr" ? "Planifier" : "Plan Yatra", t.nav.about, t.nav.contact];
  const moreLabels = [t.nav.visa, t.nav.gallery, t.nav.blog];

  const primaryNav = primaryPaths.map((p, i) => ({ to: localizedPath(locale, p), label: primaryLabels[i], exact: p === "/" }));
  const moreNav = morePaths.map((p, i) => ({ to: localizedPath(locale, p), label: moreLabels[i] }));

  const contactPath = localizedPath(locale, "/contact");
  const homePath = localizedPath(locale, "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open, so the hero
  // underneath can't be dragged/scrolled behind the (now opaque) panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Let Escape close the mobile menu, same as tapping the X.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        open
          ? "bg-background shadow-[var(--shadow-soft)]"
          : scrolled
            ? "glass-panel shadow-[var(--shadow-soft)]"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">

          {/* Logo */}
          <Link to={homePath} className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <span className="size-9 rounded-full gradient-warm grid place-items-center font-display text-primary text-lg shadow-[var(--shadow-gold)]" aria-hidden>
              ੴ
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg text-primary">{SITE.name}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:block">
                {locale === "fr" ? "Voyages du Patrimoine Sacré" : "Sacred Heritage Tours"}
              </span>
            </span>
          </Link>

          {/* Desktop nav — hidden below lg, shrinks font at xl to avoid wrapping.
              All items share one readable default style (a small text shadow
              keeps them legible over any hero photo); the current page gets
              a solid filled pill, the same "selected" look used elsewhere
              on the site (e.g. the package filter chips). */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 min-w-0 flex-1 justify-center">
            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-[13px] xl:text-sm font-medium text-primary [text-shadow:0_1px_3px_rgba(0,0,0,0.25)] hover:text-accent transition-colors whitespace-nowrap px-3 py-1.5 rounded-full"
                activeProps={{ className: "!text-primary-foreground [text-shadow:none] bg-primary hover:!text-primary-foreground" }}
                activeOptions={{ exact: n.exact }}
              >
                {n.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[13px] xl:text-sm font-medium text-primary [text-shadow:0_1px_3px_rgba(0,0,0,0.25)] hover:text-accent transition-colors whitespace-nowrap px-3 py-1.5 outline-none">
                {t.nav.more} <ChevronDown className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[10rem]">
                {moreNav.map((n) => (
                  <DropdownMenuItem key={n.to} asChild>
                    <Link to={n.to} className="cursor-pointer">{n.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language + currency — desktop only, now with its own row's worth of breathing room */}
            <div className="hidden md:block">
              <PreferencesSwitcher />
            </div>

            {/* Hamburger — mobile/tablet only */}
            <button
              className="lg:hidden p-2 text-primary"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Second row — Book Consultation, right-aligned, desktop only */}
        <div className="hidden md:flex justify-end pb-3">
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-5 whitespace-nowrap">
            <Link to={contactPath}>{t.bookConsultation}</Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu — solid, fixed, full-height overlay (not translucent) so
          the hero image/text behind it can never show through or overlap. */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background overflow-y-auto border-t border-border">
          <div className="px-5 py-4 flex flex-col gap-1 min-h-full">

            {/* Preferences at top of mobile menu — full width, clearly labelled */}
            <div className="mb-3 pb-3 border-b border-border/60">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {locale === "fr" ? "Langue & Devise" : "Language & Currency"}
              </p>
              <PreferencesSwitcher />
            </div>

            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="self-start py-2.5 px-3 rounded-full text-primary/90 hover:text-accent whitespace-nowrap"
                activeProps={{ className: "!text-primary-foreground bg-primary hover:!text-primary-foreground font-medium" }}
                activeOptions={{ exact: n.exact }}
              >
                {n.label}
              </Link>
            ))}

            {/* Collapsible "More" group keeps the default mobile menu short */}
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="py-2.5 flex items-center justify-between text-primary/90"
              aria-expanded={moreOpen}
            >
              {t.nav.more}
              <ChevronDown className={`size-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="pl-3 ml-1 border-l border-border/60 flex flex-col gap-1 mb-1">
                {moreNav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm text-primary/75 hover:text-accent whitespace-nowrap"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            )}

            <Button asChild className="mt-3 bg-accent text-accent-foreground rounded-full">
              <Link to={contactPath} onClick={() => setOpen(false)}>{t.bookConsultation}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
