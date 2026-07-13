import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { newsletterSchema, submitLead, type NewsletterInput } from "./form-utils";
import type { Locale } from "@/lib/i18n";

const COPY: Record<Locale, { placeholder: string; join: string; joined: string; success: string; error: string; privacy: string; emailRequired: string }> = {
  en: {
    placeholder: "you@example.com",
    join: "Join",
    joined: "Joined",
    success: "You're subscribed. Welcome to the sangat!",
    error: "Something went wrong. Please try again.",
    privacy: "We respect your privacy. Unsubscribe anytime.",
    emailRequired: "Please enter a valid email",
  },
  fr: {
    placeholder: "vous@exemple.com",
    join: "Rejoindre",
    joined: "Inscrit",
    success: "Vous êtes inscrit. Bienvenue dans la sangat !",
    error: "Un problème est survenu. Veuillez réessayer.",
    privacy: "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
    emailRequired: "Veuillez saisir une adresse e-mail valide",
  },
};

export function NewsletterForm({ variant = "default", locale = "en" }: { variant?: "default" | "footer"; locale?: Locale }) {
  const [done, setDone] = useState(false);
  const c = COPY[locale];
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    try {
      await submitLead("newsletter", data);
      setDone(true);
      reset();
      toast.success(c.success);
      setTimeout(() => setDone(false), 4000);
    } catch {
      toast.error(c.error);
    }
  };

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
      <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} className="hidden" aria-hidden />
      <div className={`flex gap-2 ${isFooter ? "" : "max-w-md"}`}>
        <label htmlFor={`nl-${variant}-${locale}`} className="sr-only">Email address</label>
        <input
          id={`nl-${variant}-${locale}`}
          type="email"
          placeholder={c.placeholder}
          {...register("email")}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent transition ${
            isFooter ? "bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50" : "bg-card border border-border text-primary"
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting || done}
          className="rounded-full bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium hover:bg-accent/90 disabled:opacity-60 inline-flex items-center gap-1.5 transition"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : done ? <Check className="size-4" /> : <Send className="size-4" />}
          <span className="hidden sm:inline">{done ? c.joined : c.join}</span>
        </button>
      </div>
      {errors.email && <p className={`text-xs ${isFooter ? "text-gold" : "text-destructive"}`}>{errors.email.message || c.emailRequired}</p>}
      <p className={`text-[11px] ${isFooter ? "text-cream/50" : "text-muted-foreground"}`}>
        {c.privacy}
      </p>
    </form>
  );
}
