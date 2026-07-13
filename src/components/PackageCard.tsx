import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/PriceTag";
import { whatsappLink } from "@/lib/site";
import { useLocale, localizedPath, UI } from "@/lib/i18n";
import type { TourPackage } from "@/lib/packages";

export function PackageCard({ pkg, index = 0 }: { pkg: TourPackage; index?: number }) {
  const locale = useLocale();
  const t = UI[locale];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col rounded-3xl overflow-hidden bg-card border border-border/70 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          width={1280}
          height={896}
          className="size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-panel text-[11px] uppercase tracking-[0.18em] text-primary font-medium">
          {pkg.duration}
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-cream">
          <h3 className="font-display text-2xl md:text-3xl leading-tight">{pkg.name}</h3>
          <p className="text-sm text-cream/85 mt-1">{pkg.tagline}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-accent" />
          <span className="line-clamp-1">{pkg.destinations.slice(0, 4).join(" · ")}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-cream p-3">
            <div className="text-muted-foreground uppercase tracking-wider">{locale === "fr" ? "Hôtel" : "Hotel"}</div>
            <div className="text-primary font-medium mt-0.5">{pkg.hotel}</div>
          </div>
          <div className="rounded-xl bg-cream p-3">
            <div className="text-muted-foreground uppercase tracking-wider">{locale === "fr" ? "Transport" : "Transport"}</div>
            <div className="text-primary font-medium mt-0.5">{pkg.transport}</div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2 mt-auto">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.from}</div>
            <div className="font-display text-xl text-primary"><PriceTag pkg={pkg} /></div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {pkg.duration}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button asChild className="flex-1 bg-primary hover:bg-primary/90 rounded-full">
            {locale === "fr" ? (
              <Link to="/fr/tours/$slug" params={{ slug: pkg.slug }}>
                {t.viewItinerary} <ArrowRight className="size-4 ml-1" />
              </Link>
            ) : (
              <Link to="/tours/$slug" params={{ slug: pkg.slug }}>
                {t.viewItinerary} <ArrowRight className="size-4 ml-1" />
              </Link>
            )}
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            aria-label="WhatsApp us about this tour"
          >
            <a href={whatsappLink(`Hi! I'd like more details about the ${pkg.name} tour.`)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
