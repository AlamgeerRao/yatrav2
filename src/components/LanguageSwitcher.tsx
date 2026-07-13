import { Link, useRouterState } from "@tanstack/react-router";
import { swapLocalePath, useLocale } from "@/lib/i18n";

interface Props {
  variant?: "header" | "footer";
}

export function LanguageSwitcher({ variant = "header" }: Props) {
  const locale = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const otherPath = swapLocalePath(pathname);
  const otherLabel = locale === "en" ? "FR" : "EN";
  const otherFlag = locale === "en" ? "🇫🇷" : "🇬🇧";

  return (
    <Link
      to={otherPath}
      className={
        variant === "header"
          ? "inline-flex items-center gap-1.5 h-9 rounded-full border border-primary/15 bg-cream/60 text-xs text-primary px-3 hover:bg-cream transition-colors"
          : "inline-flex items-center gap-1.5 h-9 rounded-full border border-cream/20 bg-transparent text-cream text-xs px-3 hover:bg-cream/10 transition-colors"
      }
      aria-label={locale === "en" ? "Switch to French" : "Passer en anglais"}
    >
      <span aria-hidden>{otherFlag}</span> {otherLabel}
    </Link>
  );
}
