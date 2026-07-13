import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { inquirySchema, submitLead, COUNTRIES, MONTHS, type InquiryInput } from "./form-utils";
import { MONTH_LABELS } from "@/lib/months";
import { getPackages } from "@/lib/packages-locale";
import { UI, type Locale } from "@/lib/i18n";

const COPY: Record<Locale, {
  successTitle: string; successBody: string; sendAnother: string;
  namePlaceholder: string; emailPlaceholder: string; phonePlaceholder: string;
  countryOfResidence: string; selectTour: string; customTour: string; selectMonthOption: string; flexible: string;
  notesPlaceholder: string; submitLabel: string; disclaimer: string; sendError: string; sendSuccess: string;
}> = {
  en: {
    successTitle: "Sat Sri Akal — thank you.",
    successBody: "Your inquiry has been received. Our heritage specialist will reach out within 24 hours.",
    sendAnother: "Send another",
    namePlaceholder: "Harpreet Singh",
    emailPlaceholder: "you@example.com",
    phonePlaceholder: "+44 7...",
    countryOfResidence: "Country of residence",
    selectTour: "Select a tour…",
    customTour: "Custom / I'm not sure",
    selectMonthOption: "Select…",
    flexible: "Flexible",
    notesPlaceholder: "Anything we should know — accessibility needs, ancestral villages, group size…",
    submitLabel: "Request Detailed Itinerary",
    disclaimer: "By submitting you agree to be contacted by our team. We never share your details.",
    sendError: "We couldn't send your inquiry. Please try again or WhatsApp us.",
    sendSuccess: "Inquiry received — we'll be in touch within 24 hours.",
  },
  fr: {
    successTitle: "Sat Sri Akal — merci.",
    successBody: "Votre demande a bien été reçue. Notre spécialiste du patrimoine vous contactera sous 24 heures.",
    sendAnother: "Envoyer une autre demande",
    namePlaceholder: "Harpreet Singh",
    emailPlaceholder: "vous@exemple.com",
    phonePlaceholder: "+33 6...",
    countryOfResidence: "Pays de résidence",
    selectTour: "Sélectionnez un circuit…",
    customTour: "Sur mesure / Je ne suis pas sûr(e)",
    selectMonthOption: "Sélectionnez…",
    flexible: "Flexible",
    notesPlaceholder: "Tout ce que nous devrions savoir — besoins d'accessibilité, villages ancestraux, taille du groupe…",
    submitLabel: "Demander un itinéraire détaillé",
    disclaimer: "En soumettant ce formulaire, vous acceptez d'être contacté(e) par notre équipe. Nous ne partageons jamais vos données.",
    sendError: "Nous n'avons pas pu envoyer votre demande. Veuillez réessayer ou nous contacter sur WhatsApp.",
    sendSuccess: "Demande reçue — nous vous contacterons sous 24 heures.",
  },
};

export function InquiryForm({ defaultPackage, locale = "en" }: { defaultPackage?: string; locale?: Locale }) {
  const [success, setSuccess] = useState(false);
  const c = COPY[locale];
  const ui = UI[locale].form;
  const packages = getPackages(locale);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { packageInterest: defaultPackage ?? "", travelers: 2, country: "United Kingdom" },
  });

  const onSubmit = async (data: InquiryInput) => {
    try {
      await submitLead("inquiry", data);
      setSuccess(true);
      reset({ packageInterest: defaultPackage ?? "", travelers: 2, country: "United Kingdom" });
      toast.success(c.sendSuccess);
    } catch {
      toast.error(c.sendError);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-cream p-8 text-center">
        <CheckCircle2 className="size-12 text-accent mx-auto mb-4" />
        <h3 className="font-display text-2xl text-primary">{c.successTitle}</h3>
        <p className="text-muted-foreground mt-2">{c.successBody}</p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6 rounded-full">{c.sendAnother}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} className="hidden" aria-hidden />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={ui.name} error={errors.name?.message}>
          <input {...register("name")} className={inputCls} placeholder={c.namePlaceholder} />
        </Field>
        <Field label={ui.email} error={errors.email?.message}>
          <input type="email" {...register("email")} className={inputCls} placeholder={c.emailPlaceholder} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={ui.phone} error={errors.phone?.message}>
          <input {...register("phone")} className={inputCls} placeholder={c.phonePlaceholder} />
        </Field>
        <Field label={c.countryOfResidence} error={errors.country?.message}>
          <select {...register("country")} className={inputCls}>
            {COUNTRIES.map((cc) => <option key={cc} value={cc}>{cc}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={ui.packageInterest} error={errors.packageInterest?.message}>
          <select {...register("packageInterest")} className={inputCls}>
            <option value="">{c.selectTour}</option>
            {packages.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            <option value="custom">{c.customTour}</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label={ui.travelers} error={errors.travelers?.message}>
            <input type="number" min={1} max={80} {...register("travelers")} className={inputCls} />
          </Field>
          <Field label={ui.travelMonth} error={errors.travelMonth?.message}>
            <select {...register("travelMonth")} className={inputCls}>
              <option value="">{c.selectMonthOption}</option>
              {MONTHS.map((m) => <option key={m} value={m}>{MONTH_LABELS[locale][m]}</option>)}
              <option>{c.flexible}</option>
            </select>
          </Field>
        </div>
      </div>

      <Field label={ui.notes} error={errors.notes?.message}>
        <textarea rows={4} {...register("notes")} className={inputCls} placeholder={c.notesPlaceholder} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full py-6 text-base">
        {isSubmitting ? <><Loader2 className="size-4 animate-spin mr-2" /> {ui.submitting}</> : c.submitLabel}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">{c.disclaimer}</p>
    </form>
  );
}

const inputCls = "w-full rounded-xl bg-card border border-input px-4 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-accent transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive mt-1">{error}</span>}
    </label>
  );
}
