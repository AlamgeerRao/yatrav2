import { ShieldCheck, Users, Plane, Heart, Languages, Car } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";

const icons = [ShieldCheck, Users, Plane, Heart, Languages, Car];

const labels: Record<"en" | "fr", string[]> = {
  en: ["Visa & travel support", "Small premium groups", "Airport pickup & assistance", "Elderly-friendly planning", "Punjabi & English guides", "Private luxury transport"],
  fr: ["Assistance visa & voyage", "Petits groupes premium", "Accueil & assistance aéroport", "Planning adapté aux seniors", "Guides pendjabi & anglais", "Transport privé de luxe"],
};

export function TrustBadges() {
  const locale = useLocale();
  const items = labels[locale].map((label, i) => ({ icon: icons[i], label }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-card/60 border border-border/60"
        >
          <it.icon className="size-6 text-accent" />
          <span className="text-xs md:text-sm text-primary/80 leading-tight">{it.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
