import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { contactSchema, submitLead, COUNTRIES, type ContactInput } from "./form-utils";
import { UI, type Locale } from "@/lib/i18n";

const COPY: Record<Locale, { thankYouTitle: string; thankYouBody: string; sendAnother: string; messagePlaceholder: string; sendError: string; sendSuccess: string }> = {
  en: {
    thankYouTitle: "Thank you — your message is on its way.",
    thankYouBody: "We'll respond within one business day.",
    sendAnother: "Send another",
    messagePlaceholder: "How can we help with your heritage journey?",
    sendError: "Could not send. Please try again.",
    sendSuccess: "Message sent. We'll reply soon.",
  },
  fr: {
    thankYouTitle: "Merci — votre message est en route.",
    thankYouBody: "Nous vous répondrons sous un jour ouvré.",
    sendAnother: "Envoyer un autre message",
    messagePlaceholder: "Comment pouvons-nous vous aider dans votre voyage patrimonial ?",
    sendError: "Impossible d'envoyer. Veuillez réessayer.",
    sendSuccess: "Message envoyé. Nous répondrons bientôt.",
  },
};

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const [done, setDone] = useState(false);
  const c = COPY[locale];
  const ui = UI[locale].form;
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { country: "United Kingdom" },
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      await submitLead("contact", data);
      setDone(true);
      reset({ country: "United Kingdom" });
      toast.success(c.sendSuccess);
    } catch {
      toast.error(c.sendError);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-cream p-8 text-center border border-border">
        <CheckCircle2 className="size-12 text-accent mx-auto mb-3" />
        <p className="font-display text-2xl text-primary">{c.thankYouTitle}</p>
        <p className="text-muted-foreground mt-2 text-sm">{c.thankYouBody}</p>
        <Button onClick={() => setDone(false)} variant="outline" className="mt-5 rounded-full">{c.sendAnother}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} className="hidden" aria-hidden />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={ui.name} error={errors.name?.message}>
          <input {...register("name")} className={inputCls} />
        </Field>
        <Field label={ui.email} error={errors.email?.message}>
          <input type="email" {...register("email")} className={inputCls} />
        </Field>
      </div>
      <Field label={ui.country} error={errors.country?.message}>
        <select {...register("country")} className={inputCls}>
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label={ui.message} error={errors.message?.message}>
        <textarea rows={5} {...register("message")} className={inputCls} placeholder={c.messagePlaceholder} />
      </Field>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 rounded-full py-6">
        {isSubmitting ? <><Loader2 className="size-4 animate-spin mr-2" /> {ui.submitting}</> : ui.submit}
      </Button>
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
