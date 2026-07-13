import { useEffect, useState, useSyncExternalStore } from "react";

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
  country: string;
  flag: string;
}

// Site prices are authored in GBP (base currency). These are the
// currencies we convert into for each target diaspora market.
export const CURRENCIES: CurrencyOption[] = [
  { code: "GBP", symbol: "£", label: "British Pound", country: "United Kingdom", flag: "🇬🇧" },
  { code: "CAD", symbol: "CA$", label: "Canadian Dollar", country: "Canada", flag: "🇨🇦" },
  { code: "USD", symbol: "US$", label: "US Dollar", country: "United States", flag: "🇺🇸" },
  { code: "AUD", symbol: "AU$", label: "Australian Dollar", country: "Australia", flag: "🇦🇺" },
  { code: "EUR", symbol: "€", label: "Euro", country: "France", flag: "🇫🇷" },
];

export const DEFAULT_CURRENCY = "GBP";
const STORAGE_KEY = "phj_currency";

// --- Shared currency store -------------------------------------------------
// A tiny module-level pub/sub store so every component using useCurrency()
// reads and reacts to the SAME selected currency, instead of each holding
// its own private useState seeded once from localStorage.

function readStoredCurrency(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}

let currentCurrency = readStoredCurrency();
const listeners = new Set<() => void>();

function setGlobalCurrency(code: string) {
  if (code === currentCurrency) return;
  currentCurrency = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentCurrency;
}

export function useCurrency() {
  const currency = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_CURRENCY);
  return { currency, setCurrency: setGlobalCurrency };
}

// --- Live exchange rates ----------------------------------------------------

const RATES_CACHE_KEY = "phj_rates_cache";
const RATES_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

type Rates = Record<string, number>; // 1 GBP = rates[code]

interface RatesCache {
  fetchedAt: number;
  rates: Rates;
}

async function fetchLiveRates(): Promise<Rates> {
  const targets = CURRENCIES.filter((c) => c.code !== "GBP")
    .map((c) => c.code)
    .join(",");
  const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=GBP&symbols=${targets}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  const data = await res.json();
  return { GBP: 1, ...data.rates };
}

function readCache(): RatesCache | null {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RatesCache;
    if (Date.now() - parsed.fetchedAt > RATES_CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(rates: Rates) {
  try {
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), rates }));
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
}

// Fallback rates used only if the live API is unreachable (e.g. offline).
// Approximate — updated periodically. Live rates always take priority.
const FALLBACK_RATES: Rates = { GBP: 1, USD: 1.27, CAD: 1.74, AUD: 1.94, EUR: 1.17 };

export function useExchangeRates() {
  const [rates, setRates] = useState<Rates>(() => readCache()?.rates ?? FALLBACK_RATES);
  const [loading, setLoading] = useState(!readCache());
  const [isLive, setIsLive] = useState(!!readCache());

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRates(cached.rates);
      setIsLive(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchLiveRates()
      .then((live) => {
        if (cancelled) return;
        setRates(live);
        setIsLive(true);
        writeCache(live);
      })
      .catch(() => {
        if (cancelled) return;
        setRates(FALLBACK_RATES);
        setIsLive(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { rates, loading, isLive };
}

/** Convert a GBP amount into the target currency and format it for display. */
export function formatConverted(amountGBP: number, code: string, rates: Rates): string {
  const option = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
  const rate = rates[code] ?? 1;
  const converted = amountGBP * rate;
  const step = converted >= 10000 ? 50 : converted >= 1000 ? 10 : 5;
  const rounded = Math.round(converted / step) * step;
  return `${option.symbol}${rounded.toLocaleString()}`;
}

/** Format a from–to GBP price range into the target currency, e.g. "$950 – $1,450". */
export function formatRange(fromGBP: number, toGBP: number | undefined, code: string, rates: Rates): string {
  if (!toGBP || toGBP === fromGBP) return formatConverted(fromGBP, code, rates);
  return `${formatConverted(fromGBP, code, rates)} – ${formatConverted(toGBP, code, rates)}`;
}
