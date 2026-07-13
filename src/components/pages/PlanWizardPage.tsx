import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Loader2,
  Users, MapPin, Hotel, Plane, ClipboardList, Tag, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateQuote, ADDONS_GBP } from "@/lib/quote";
import type { YatraType, HotelStar, RoomType } from "@/lib/quote";
import { useCurrency, useExchangeRates, formatConverted } from "@/lib/currency";
import { whatsappLink } from "@/lib/site";
import { apiUrl } from "@/lib/api";
import { COUNTRIES, MONTHS } from "@/components/forms/form-utils";
import { MONTH_LABELS } from "@/lib/months";
import { PLAN, type PlanContent } from "@/lib/content/plan";
import { localizedPath, type Locale } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WizardState {
  country: string;
  departureCity: string;
  travellers: number;
  yatra: YatraType | "";
  travelMonth: string;
  travelYear: string;
  nights: number | "";
  hotelStar: HotelStar;
  roomType: RoomType;
  flights: boolean;
  visa: boolean;
  transfers: boolean;
  extraDestinations: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

const NOW = new Date();
const CURRENT_YEAR  = NOW.getFullYear();
const CURRENT_MONTH = NOW.getMonth();

const YEARS = [CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2].map(String);
const NIGHT_OPTIONS = [3, 4, 5, 7, 8, 10, 12, 14];
const YATRA_NIGHTS: Record<YatraType, number> = { kartarpur: 3, nankana: 3, panja: 3, full: 7, custom: 10 };
const YATRA_VALUES: YatraType[] = ["kartarpur", "nankana", "panja", "full", "custom"];

const INITIAL: WizardState = {
  country: "", departureCity: "", travellers: 1,
  yatra: "nankana", travelMonth: "", travelYear: String(CURRENT_YEAR), nights: 3,
  hotelStar: 4, roomType: "double",
  flights: false, visa: false, transfers: true,
  extraDestinations: "",
  name: "", email: "", phone: "", specialRequests: "",
};


// ─── Main component ───────────────────────────────────────────────────────────

export function PlanWizardPage({ locale }: { locale: Locale }) {
  const t = PLAN[locale];
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WizardState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [discountBanner, setDiscountBanner] = useState<{ msg: string; emoji: string } | null>(null);

  const set = <K extends keyof WizardState>(k: K, v: WizardState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setTravellers = (n: number) => {
    const clamped = Math.min(80, Math.max(1, n));
    const prev = form.travellers;
    set("travellers", clamped);
    if (prev < 10 && clamped >= 10) {
      setDiscountBanner({ emoji: "🎊", msg: t.discountBanner.unlocked7 });
      setTimeout(() => setDiscountBanner(null), 4000);
    } else if (prev < 4 && clamped >= 4) {
      setDiscountBanner({ emoji: "🎉", msg: t.discountBanner.unlocked4 });
      setTimeout(() => setDiscountBanner(null), 4000);
    } else if (prev >= 4 && clamped < 4) {
      setDiscountBanner(null);
    }
  };

  const nights = typeof form.nights === "number" ? form.nights : 3;

  const quote = useMemo(
    () => calculateQuote({
      yatra: form.yatra, nights,
      hotelStar: form.hotelStar, roomType: form.roomType,
      travellers: form.travellers,
      flights: form.flights, visa: form.visa, transfers: form.transfers,
    }),
    [form.yatra, nights, form.hotelStar, form.roomType, form.travellers, form.flights, form.visa, form.transfers]
  );

  const canNext = [
    form.yatra && form.travelMonth && form.travelYear && form.nights,
    form.country && form.travellers >= 1,
    true,
    true,
    form.name && form.email,
  ][step];

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/api/enquiry"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quote, submittedAt: new Date().toISOString() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setRef(data.ref);
    } catch (err) {
      const fallbackRef = `YTR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
      setRef(fallbackRef);
      console.warn("API unavailable, using client ref:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (ref) return <Confirmation locale={locale} ref_={ref} form={form} quote={quote} />;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-cream">

      <AnimatePresence>
        {discountBanner && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-20 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
          >
            <div className="inline-flex items-center gap-3 bg-primary text-cream rounded-full px-6 py-3.5 shadow-[var(--shadow-elevated)] text-sm font-medium">
              <span className="text-xl">{discountBanner.emoji}</span>
              {discountBanner.msg}
              <span className="ml-1 px-2 py-0.5 rounded-full bg-gold text-primary text-xs font-bold">
                {discountBanner.msg.includes("7") ? "−7%" : "−5%"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-3">
            <span className="h-px w-8 bg-accent" /> {t.header.eyebrow}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-primary">{t.header.title}</h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{t.header.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {t.steps.map((label, i) => (
              <button
                key={label}
                onClick={() => i < step && setStep(i)}
                className={`flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider transition-colors ${
                  i <= step ? "text-accent" : "text-muted-foreground"
                } ${i < step ? "cursor-pointer" : "cursor-default"}`}
              >
                <span className={`size-7 rounded-full grid place-items-center text-xs font-bold border-2 transition-all ${
                  i < step  ? "bg-accent border-accent text-white" :
                  i === step ? "border-accent text-accent bg-cream" :
                  "border-border text-muted-foreground"
                }`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </div>
          <Progress value={((step) / (t.steps.length - 1)) * 100} className="h-1.5" />
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          <div className="bg-card rounded-3xl border border-border shadow-[var(--shadow-soft)] p-7 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && <StepYatra t={t} locale={locale} form={form} set={set} />}
                {step === 1 && <StepGroup t={t} locale={locale} form={form} set={set} setTravellers={setTravellers} />}
                {step === 2 && <StepAccommodation t={t} locale={locale} form={form} set={set} />}
                {step === 3 && <StepAddons t={t} locale={locale} form={form} set={set} />}
                {step === 4 && <StepDetails t={t} locale={locale} form={form} set={set} />}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <Button
                variant="outline" className="rounded-full"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
              >
                <ArrowLeft className="size-4 mr-1" /> {t.nav.back}
              </Button>
              {step < t.steps.length - 1 ? (
                <Button
                  className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                >
                  {t.nav.continue} <ArrowRight className="size-4 ml-1" />
                </Button>
              ) : (
                <Button
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={submit}
                  disabled={!canNext || submitting}
                >
                  {submitting
                    ? <><Loader2 className="size-4 mr-1 animate-spin" /> {t.nav.submitting}</>
                    : <>{t.nav.submit} <ArrowRight className="size-4 ml-1" /></>}
                </Button>
              )}
            </div>
            {error && <p className="text-destructive text-sm mt-3 text-center">{error}</p>}
          </div>

          <div className="lg:sticky lg:top-24">
            <QuotePanel t={t} locale={locale} quote={quote} form={form} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

type StepProps = {
  t: PlanContent;
  locale: Locale;
  form: WizardState;
  set: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void;
};

function StepGroup({ t, form, set, setTravellers }: StepProps & { setTravellers: (n: number) => void }) {
  return (
    <div className="space-y-6">
      <StepHeading icon={Users} title={t.stepGroup.title} subtitle={t.stepGroup.subtitle} />
      <Field label={t.stepGroup.country}>
        <select value={form.country} onChange={(e) => set("country", e.target.value)} className={inputCls}>
          <option value="">{t.stepGroup.selectCountry}</option>
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label={t.stepGroup.departureCity}>
        <input value={form.departureCity} onChange={(e) => set("departureCity", e.target.value)} className={inputCls} placeholder={t.stepGroup.departureCityPlaceholder} />
      </Field>
      <Field label={t.stepGroup.travellers}>
        <div className="flex items-center gap-3 flex-wrap">
          <button type="button" onClick={() => setTravellers(form.travellers - 1)} className="size-10 rounded-full border border-border hover:bg-cream grid place-items-center text-xl text-primary">−</button>
          <span className="font-display text-3xl text-primary w-12 text-center">{form.travellers}</span>
          <button type="button" onClick={() => setTravellers(form.travellers + 1)} className="size-10 rounded-full border border-border hover:bg-cream grid place-items-center text-xl text-primary">+</button>
          <span className="text-muted-foreground text-sm">
            {form.travellers >= 10 ? t.stepGroup.discount10 :
             form.travellers >= 4  ? t.stepGroup.discount4 :
             t.stepGroup.discountNone}
          </span>
        </div>
        <div className="mt-4 rounded-xl bg-cream border border-border p-3.5 text-xs text-muted-foreground space-y-1.5">
          <div className={`flex items-center gap-2 ${form.travellers >= 4 ? "text-emerald-700 font-medium" : ""}`}>
            <span className={`size-4 rounded-full border grid place-items-center ${form.travellers >= 4 ? "border-emerald-600 bg-emerald-600" : "border-border"}`}>
              {form.travellers >= 4 && <span className="text-white text-[9px]">✓</span>}
            </span>
            {t.stepGroup.discountHint4}
          </div>
          <div className={`flex items-center gap-2 ${form.travellers >= 10 ? "text-emerald-700 font-medium" : ""}`}>
            <span className={`size-4 rounded-full border grid place-items-center ${form.travellers >= 10 ? "border-emerald-600 bg-emerald-600" : "border-border"}`}>
              {form.travellers >= 10 && <span className="text-white text-[9px]">✓</span>}
            </span>
            {t.stepGroup.discountHint10}
          </div>
        </div>
      </Field>
    </div>
  );
}

function StepYatra({ t, locale, form, set }: StepProps) {
  const monthLabels = MONTH_LABELS[locale];
  return (
    <div className="space-y-6">
      <StepHeading icon={MapPin} title={t.stepYatra.title} subtitle={t.stepYatra.subtitle} />
      <div className="grid gap-3">
        {YATRA_VALUES.map((value) => {
          const o = t.stepYatra.options[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => { set("yatra", value); set("nights", YATRA_NIGHTS[value]); }}
              className={`text-left rounded-2xl border-2 p-4 transition-all ${
                form.yatra === value ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">{o.label}</span>
                <span className="text-xs text-muted-foreground">{YATRA_NIGHTS[value]} {t.stepYatra.nightsSuggested}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{o.desc}</p>
            </button>
          );
        })}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 pt-2">
        <Field label={t.stepYatra.travelMonth}>
          <select value={form.travelMonth} onChange={(e) => set("travelMonth", e.target.value)} className={inputCls}>
            <option value="">{t.stepYatra.selectMonth}</option>
            {MONTHS.map((m, i) => {
              const isPast = form.travelYear === String(CURRENT_YEAR) && i < CURRENT_MONTH;
              return isPast ? null : <option key={m} value={m}>{monthLabels[m]}</option>;
            })}
          </select>
        </Field>
        <Field label={t.stepYatra.year}>
          <select value={form.travelYear} onChange={(e) => {
            set("travelYear", e.target.value);
            if (e.target.value === String(CURRENT_YEAR)) {
              const monthIndex = MONTHS.indexOf(form.travelMonth as typeof MONTHS[number]);
              if (monthIndex !== -1 && monthIndex < CURRENT_MONTH) set("travelMonth", "");
            }
          }} className={inputCls}>
            <option value="">{t.stepYatra.selectYear}</option>
            {YEARS.map((y) => <option key={y}>{y}</option>)}
          </select>
        </Field>
      </div>
      <Field label={t.stepYatra.duration}>
        <div className="flex flex-wrap gap-2">
          {NIGHT_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set("nights", n)}
              className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                form.nights === n ? "border-accent bg-accent text-white" : "border-border hover:border-accent/50"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

function StepAccommodation({ t, form, set }: StepProps) {
  const stars: HotelStar[] = [3, 4, 5];
  const roomValues: RoomType[] = ["double", "single", "triple"];
  return (
    <div className="space-y-6">
      <StepHeading icon={Hotel} title={t.stepAccommodation.title} subtitle={t.stepAccommodation.subtitle} />
      <Field label={t.stepAccommodation.hotelStandard}>
        <div className="grid grid-cols-3 gap-3">
          {stars.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("hotelStar", s)}
              className={`rounded-2xl border-2 p-4 text-center transition-all ${
                form.hotelStar === s ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
              }`}
            >
              <div className="text-xl mb-1">{"⭐".repeat(s)}</div>
              <div className="font-medium text-primary text-sm">{t.stepAccommodation.starLabel(s)}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {s === 3 ? t.stepAccommodation.starTier.comfortable : s === 4 ? t.stepAccommodation.starTier.premium : t.stepAccommodation.starTier.luxury}
              </div>
            </button>
          ))}
        </div>
      </Field>
      <Field label={t.stepAccommodation.roomType}>
        <div className="grid gap-3">
          {roomValues.map((value) => {
            const r = t.stepAccommodation.rooms[value];
            return (
              <button
                key={value}
                type="button"
                onClick={() => set("roomType", value)}
                className={`text-left rounded-2xl border-2 p-4 transition-all ${
                  form.roomType === value ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                }`}
              >
                <div className="font-medium text-primary">{r.label}</div>
                <div className="text-sm text-muted-foreground">{r.desc}</div>
              </button>
            );
          })}
        </div>
      </Field>
    </div>
  );
}

function StepAddons({ t, form, set }: StepProps) {
  return (
    <div className="space-y-6">
      <StepHeading icon={Plane} title={t.stepAddons.title} subtitle={t.stepAddons.subtitle} />
      <div className="grid gap-3">
        {([
          { key: "flights",   label: t.stepAddons.flights.label,   desc: t.stepAddons.flights.desc(ADDONS_GBP.flights) },
          { key: "visa",      label: t.stepAddons.visa.label,      desc: t.stepAddons.visa.desc(ADDONS_GBP.visa) },
          { key: "transfers", label: t.stepAddons.transfers.label, desc: t.stepAddons.transfers.desc(ADDONS_GBP.transfers) },
        ] as const).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => set(item.key, !form[item.key])}
            className={`text-left rounded-2xl border-2 p-4 transition-all flex items-start gap-4 ${
              form[item.key] ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
            }`}
          >
            <span className={`mt-0.5 size-5 rounded-full border-2 grid place-items-center shrink-0 ${
              form[item.key] ? "border-accent bg-accent" : "border-border"
            }`}>
              {form[item.key] && <span className="text-white text-[10px]">✓</span>}
            </span>
            <div>
              <div className="font-medium text-primary">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <Field label={t.stepAddons.extraDestinations}>
        <input
          value={form.extraDestinations}
          onChange={(e) => set("extraDestinations", e.target.value)}
          className={inputCls}
          placeholder={t.stepAddons.extraDestinationsPlaceholder}
        />
      </Field>
    </div>
  );
}

function StepDetails({ t, form, set }: StepProps) {
  return (
    <div className="space-y-5">
      <StepHeading icon={ClipboardList} title={t.stepDetails.title} subtitle={t.stepDetails.subtitle} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.stepDetails.fullName}>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder={t.stepDetails.namePlaceholder} />
        </Field>
        <Field label={t.stepDetails.email}>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
        </Field>
      </div>
      <Field label={t.stepDetails.phone}>
        <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder={t.stepDetails.phonePlaceholder} />
      </Field>
      <Field label={t.stepDetails.specialRequests}>
        <textarea
          rows={4}
          value={form.specialRequests}
          onChange={(e) => set("specialRequests", e.target.value)}
          className={inputCls}
          placeholder={t.stepDetails.specialRequestsPlaceholder}
        />
      </Field>
      <p className="text-[11px] text-muted-foreground">{t.stepDetails.disclaimer}</p>
    </div>
  );
}

// ─── Quote panel ──────────────────────────────────────────────────────────────

function QuotePanel({ t, locale, quote, form }: { t: PlanContent; locale: Locale; quote: ReturnType<typeof calculateQuote>; form: WizardState }) {
  const { currency } = useCurrency();
  const { rates } = useExchangeRates();
  const fmt = (gbp: number) => formatConverted(gbp, currency, rates);
  const nightsDisplay = typeof form.nights === "number" ? form.nights : "–";
  const yatraLabel = form.yatra ? t.stepYatra.options[form.yatra].label : "";
  const monthLabel = form.travelMonth ? (MONTH_LABELS[locale][form.travelMonth as keyof typeof MONTH_LABELS["en"]] ?? form.travelMonth) : "";

  return (
    <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-elevated)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="size-4 text-accent" />
        <h3 className="font-display text-lg text-primary">{t.quotePanel.liveQuote}</h3>
        {quote.isEstimate && <span className="text-[10px] bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 ml-auto">{t.quotePanel.estimate}</span>}
      </div>

      <div className="space-y-2.5 text-sm">
        <QuoteLine label={t.quotePanel.base(form.hotelStar, nightsDisplay, form.travellers)} value={fmt(quote.baseTotal)} />
        {quote.supplements !== 0 && (
          <QuoteLine label={form.roomType === "single" ? t.quotePanel.singleSupplement : t.quotePanel.roomSharingSaving} value={`${quote.supplements > 0 ? "+" : ""}${fmt(quote.supplements)}`} muted />
        )}
        {form.flights   && <QuoteLine label={t.quotePanel.flightsLine(form.travellers)}   value={`+${fmt(ADDONS_GBP.flights   * form.travellers)}`} muted />}
        {form.visa      && <QuoteLine label={t.quotePanel.visaLine(form.travellers)} value={`+${fmt(ADDONS_GBP.visa  * form.travellers)}`} muted />}
        {form.transfers && <QuoteLine label={t.quotePanel.transfersLine(form.travellers)} value={`+${fmt(ADDONS_GBP.transfers * form.travellers)}`} muted />}

        <div className="border-t border-border pt-2 mt-2">
          <QuoteLine label={t.quotePanel.subtotal} value={fmt(quote.subtotal)} />
        </div>

        {quote.discountRate > 0 && (
          <QuoteLine
            label={t.quotePanel.groupDiscount((quote.discountRate * 100).toFixed(0), form.travellers)}
            value={`−${fmt(quote.discountAmt)}`}
            className="text-emerald-700"
          />
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t.quotePanel.estimatedTotal}</div>
        <div className="font-display text-3xl text-primary">{fmt(quote.total)}</div>
        {form.travellers > 1 && (
          <div className="text-sm text-muted-foreground">{fmt(quote.perPerson)} {t.quotePanel.perPerson}</div>
        )}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed bg-cream rounded-xl p-3">
        {t.quotePanel.finalPriceNote(form.hotelStar, nightsDisplay)}
      </p>

      <a
        href={whatsappLink(t.quotePanel.whatsappMsg(yatraLabel || t.quotePanel.genericYatra, form.travellers, monthLabel || "—"))}
        target="_blank" rel="noreferrer"
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full border border-[oklch(0.62_0.18_150)] text-[oklch(0.45_0.14_150)] py-2.5 text-sm hover:bg-[oklch(0.62_0.18_150)] hover:text-white transition"
      >
        <MessageCircle className="size-4" /> {t.quotePanel.whatsappCta}
      </a>
    </div>
  );
}

function QuoteLine({ label, value, muted, className }: { label: string; value: string; muted?: boolean; className?: string }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${muted ? "text-muted-foreground text-xs" : ""} ${className ?? ""}`}>
      <span className="truncate">{label}</span>
      <span className="shrink-0 font-medium tabular-nums">{value}</span>
    </div>
  );
}

// ─── Confirmation ─────────────────────────────────────────────────────────────

function Confirmation({ locale, ref_, form, quote }: { locale: Locale; ref_: string; form: WizardState; quote: ReturnType<typeof calculateQuote> }) {
  const t = PLAN[locale];
  const { currency } = useCurrency();
  const { rates } = useExchangeRates();
  const yatraLabel = form.yatra ? t.stepYatra.options[form.yatra].label : form.yatra;
  const monthLabel = form.travelMonth ? (MONTH_LABELS[locale][form.travelMonth as keyof typeof MONTH_LABELS["en"]] ?? form.travelMonth) : form.travelMonth;

  return (
    <div className="min-h-screen pt-28 pb-16 bg-cream">
      <div className="mx-auto max-w-xl px-5 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
          <CheckCircle2 className="size-16 text-accent mx-auto mb-6" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl text-primary">{t.confirmation.title}</h1>
        <p className="text-muted-foreground mt-4 text-lg">{t.confirmation.subtitle}</p>

        <div className="mt-8 rounded-3xl bg-card border border-border p-7 text-left">
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">{t.confirmation.refLabel}</div>
          <div className="font-display text-3xl text-primary">{ref_}</div>
          <p className="text-sm text-muted-foreground mt-1">{t.confirmation.refNote}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              [t.confirmation.summary.travellers, form.travellers],
              [t.confirmation.summary.yatra, yatraLabel],
              [t.confirmation.summary.travelDate, `${monthLabel} ${form.travelYear}`],
              [t.confirmation.summary.duration, `${form.nights} ${t.confirmation.nightsSuffix}`],
              [t.confirmation.summary.hotel, `${form.hotelStar}★`],
              [t.confirmation.summary.total, formatConverted(quote.total, currency, rates)],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-xl bg-cream p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="font-medium text-primary mt-0.5">{String(v)}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-6">
          {t.confirmation.contactNote(form.email)}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Button asChild className="rounded-full bg-accent text-accent-foreground">
            <a href={whatsappLink(t.confirmation.whatsappMsg(ref_))} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4 mr-1.5" /> {t.confirmation.whatsappCta}
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to={localizedPath(locale, "/")}>{t.confirmation.backHome}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StepHeading({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-5 text-accent" />
        <h2 className="font-display text-2xl text-primary">{title}</h2>
      </div>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputCls = "w-full rounded-xl bg-cream border border-input px-4 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-accent transition";
