import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { consultationSchema, submitLead, COUNTRIES, type ConsultationInput } from "./form-utils";
import type { Locale } from "@/lib/i18n";

const COPY: Record<Locale, {
  namePlaceholder: string; emailPlaceholder: string; preferredTimePlaceholder: string; messagePlaceholder: string;
  submitLabel: string; submitting: string; requestedTitle: string; requestedBody: string; sendError: string; sendSuccess: string;
}> = {
  en: {
    namePlaceholder: "Your name",
    emailPlaceholder: "Email",
    preferredTimePlaceholder: "Preferred call time (optional)",
    messagePlaceholder: "What would you like to discuss?",
    submitLabel: "Book Free Consultation",
    submitting: "Submitting…",
    requestedTitle: "Consultation requested.",
    requestedBody: "We'll confirm a time within 24 hours.",
    sendError: "Could not submit. Please try again.",
    sendSuccess: "Consultation requested.",
  },
  fr: {
    namePlaceholder: "Votre nom",
    emailPlaceholder: "E-mail",
    preferredTimePlaceholder: "Heure d'appel préférée (facultatif)",
    messagePlaceholder: "De quoi souhaitez-vous discuter ?",
    submitLabel: "Réserver une consultation gratuite",
    submitting: "Envoi…",
    requestedTitle: "Consultation demandée.",
    requestedBody: "Nous confirmerons un horaire sous 24 heures.",
    sendError: "Impossible d'envoyer. Veuillez réessayer.",
    sendSuccess: "Consultation demandée.",
  },
};

export function ConsultationForm({ locale = "en" }: { locale?: Locale }) {
  const [done, setDone] = useState(false);
  const c = COPY[locale];
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { country: "United Kingdom" },
  });

  const onSubmit = async (data: ConsultationInput) => {
    try {
      await submitLead("consultation", data);
      setDone(true);
      reset({ country: "United Kingdom" });
      toast.success(c.sendSuccess);
    } catch {
      toast.error(c.sendError);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-cream p-6 text-center border border-border">
        <CheckCircle2 className="size-10 text-accent mx-auto mb-2" />
        <p className="font-display text-xl text-primary">{c.requestedTitle}</p>
        <p className="text-muted-foreground text-sm mt-1">{c.requestedBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} className="hidden" aria-hidden />
      <input {...register("name")} placeholder={c.namePlaceholder} className={inputCls} />
      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      <input type="email" {...register("email")} placeholder={c.emailPlaceholder} className={inputCls} />
      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      <select {...register("country")} className={inputCls}>
        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input {...register("preferredTime")} placeholder={c.preferredTimePlaceholder} className={inputCls} />
      <textarea rows={3} {...register("message")} placeholder={c.messagePlaceholder} className={inputCls} />
      <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
        {isSubmitting ? <><Loader2 className="size-4 animate-spin mr-2" /> {c.submitting}</> : c.submitLabel}
      </Button>
    </form>
  );
}

const inputCls = "w-full rounded-xl bg-card border border-input px-4 py-2.5 text-sm text-primary outline-none focus:ring-2 focus:ring-accent transition";
