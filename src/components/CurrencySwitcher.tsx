import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CURRENCIES, useCurrency } from "@/lib/currency";

interface Props {
  variant?: "header" | "footer";
}

export function CurrencySwitcher({ variant = "header" }: Props) {
  const { currency, setCurrency } = useCurrency();
  const active = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger
        className={
          variant === "header"
            ? "h-9 w-[108px] rounded-full border-primary/15 bg-cream/60 text-xs text-primary px-3"
            : "h-9 w-[140px] rounded-full border-cream/20 bg-transparent text-cream text-xs px-3"
        }
        aria-label="Select currency"
      >
        <SelectValue>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden>{active.flag}</span> {active.code}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>{c.flag}</span> {c.country} · {c.code}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
