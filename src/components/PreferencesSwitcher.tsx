import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Banknote, ChevronDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CURRENCIES, useCurrency } from "@/lib/currency";
import { swapLocalePath, useLocale } from "@/lib/i18n";

export function PreferencesSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const { currency, setCurrency } = useCurrency();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeCurrency = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
  const frPath = swapLocalePath(pathname);

  // Summary label shown in the trigger button
  const triggerLabel = `${locale === "en" ? "🇬🇧 EN" : "🇫🇷 FR"} · ${activeCurrency.symbol}${activeCurrency.code}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 h-9 rounded-full border border-primary/20 bg-cream/70 hover:bg-cream text-xs text-primary px-3.5 transition-colors"
          aria-label="Language and currency preferences"
        >
          <span className="hidden sm:inline">{triggerLabel}</span>
          <span className="sm:hidden"><Globe className="size-4" /></span>
          <ChevronDown className={`size-3.5 text-primary/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-72 p-0 rounded-2xl shadow-[var(--shadow-elevated)] border border-border overflow-hidden"
      >
        {/* Language section */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5 font-medium">
            <Globe className="size-3.5" /> Language
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* English — current page or link */}
            {locale === "en" ? (
              <div className="flex items-center justify-between rounded-xl bg-accent/10 border border-accent/30 px-3 py-2.5">
                <span className="flex items-center gap-2 text-sm font-medium text-accent">
                  <span>🇬🇧</span> English
                </span>
                <Check className="size-3.5 text-accent" />
              </div>
            ) : (
              <Link
                to={frPath}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm text-primary hover:bg-cream transition-colors"
              >
                <span>🇬🇧</span> English
              </Link>
            )}
            {/* French */}
            {locale === "fr" ? (
              <div className="flex items-center justify-between rounded-xl bg-accent/10 border border-accent/30 px-3 py-2.5">
                <span className="flex items-center gap-2 text-sm font-medium text-accent">
                  <span>🇫🇷</span> Français
                </span>
                <Check className="size-3.5 text-accent" />
              </div>
            ) : (
              <Link
                to={frPath}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm text-primary hover:bg-cream transition-colors"
              >
                <span>🇫🇷</span> Français
              </Link>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mx-4" />

        {/* Currency section */}
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5 font-medium">
            <Banknote className="size-3.5" /> {locale === "fr" ? "Devise" : "Currency"}
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {CURRENCIES.map((c) => {
              const isActive = c.code === currency;
              return (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-accent/10 border border-accent/30 text-accent font-medium"
                      : "border border-transparent hover:bg-cream text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{c.symbol}</span>{c.code}
                    {isActive && <Check className="size-3.5 text-accent ml-1" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
