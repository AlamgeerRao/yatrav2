import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}

export function PageHero({ eyebrow, title, description, image }: Props) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
        </>
      )}
      {!image && <div className="absolute inset-0 bg-cream" />}
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="h-px w-8 bg-gold" />
            <span className={`text-xs tracking-[0.25em] uppercase ${image ? "text-gold" : "text-accent"} font-medium`}>{eyebrow}</span>
            <span className="h-px w-8 bg-gold" />
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
          className={`font-display text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02] ${image ? "text-cream" : "text-primary"}`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className={`mt-6 max-w-2xl mx-auto md:text-lg text-pretty ${image ? "text-cream/85" : "text-muted-foreground"}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
