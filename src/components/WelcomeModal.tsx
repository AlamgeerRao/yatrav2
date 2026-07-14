import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CURRENCIES, useCurrency } from "@/lib/currency";
import { localizedPath, type Locale } from "@/lib/i18n";

// Bump this if the prompt itself ever changes meaningfully — old localStorage
// values won't match the new key, so returning users would be asked again.
const SEEN_KEY = "yatra_prefs_seen_v1";

function toEnPath(pathname: string): string {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3);
  return pathname;
}

export function WelcomeModal() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentLocale: Locale = pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  const { currency, setCurrency } = useCurrency();

  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(currentLocale);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  // Only ask once per browser — checked on mount so it never flashes on
  // subsequent page navigations within the same visit.
  useEffect(() => {
    try {
      if (!localStorage.getItem(SEEN_KEY)) setOpen(true);
    } catch {
      // localStorage unavailable (private browsing, etc.) — skip the prompt
      // rather than break the page.
    }
  }, []);

  const markSeen = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore storage errors
    }
  };

  const confirm = () => {
    setCurrency(selectedCurrency);
    markSeen();
    setOpen(false);
    if (locale !== currentLocale) {
      navigate({ to: localizedPath(locale, toEnPath(pathname)) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { markSeen(); setOpen(false); } }}>
      <DialogContent className="max-w-md rounded-2xl max-h-[88svh] overflow-y-auto gap-4">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">Welcome · Bienvenue</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Choose your language and currency — we'll remember your choice on every page.
            <br />
            Choisissez votre langue et votre devise — nous nous en souviendrons sur toutes les pages.
          </DialogDescription>
        </DialogHeader>

        {/* Language */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">
            Language / Langue
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm border transition-colors ${
                locale === "en"
                  ? "bg-accent/10 border-accent/30 text-accent font-medium"
                  : "border-border text-primary hover:bg-cream"
              }`}
            >
              <span className="flex items-center gap-2">🇬🇧 English</span>
              {locale === "en" && <Check className="size-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setLocale("fr")}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm border transition-colors ${
                locale === "fr"
                  ? "bg-accent/10 border-accent/30 text-accent font-medium"
                  : "border-border text-primary hover:bg-cream"
              }`}
            >
              <span className="flex items-center gap-2">🇫🇷 Français</span>
              {locale === "fr" && <Check className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* Currency */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">
            Currency / Devise
          </p>
          <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {CURRENCIES.map((c) => (
              <button
                type="button"
                key={c.code}
                onClick={() => setSelectedCurrency(c.code)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm border transition-colors ${
                  selectedCurrency === c.code
                    ? "bg-accent/10 border-accent/30 text-accent font-medium"
                    : "border-transparent hover:bg-cream text-primary"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>{c.flag}</span> <span>{c.country}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="font-medium text-primary">{c.symbol}</span>
                  {c.code}
                  {selectedCurrency === c.code && <Check className="size-3.5 text-accent ml-1" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={confirm} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
            Continue · Continuer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
