import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getPosts } from "@/lib/posts-locale";
import { BLOG_LIST, CATEGORY_KEYS, type CategoryKey } from "@/lib/content/blog-list";
import { UI, type Locale } from "@/lib/i18n";

export function BlogListPage({ locale }: { locale: Locale }) {
  const t = BLOG_LIST[locale];
  const ui = UI[locale];
  const posts = getPosts(locale);
  const [active, setActive] = useState<CategoryKey | "all">("all");

  const filtered = active === "all" ? posts : posts.filter((p) => p.cat === active);

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setActive("all")}
              className={`px-4 py-1.5 rounded-full text-xs border transition ${active === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-primary/80 hover:border-accent hover:text-accent"}`}
            >
              {t.allLabel}
            </button>
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`px-4 py-1.5 rounded-full text-xs border transition ${active === key ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-primary/80 hover:border-accent hover:text-accent"}`}
              >
                {t.categoryLabels[key]}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="group rounded-3xl overflow-hidden bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {locale === "fr" ? (
                    <Link to="/fr/blog/$slug" params={{ slug: p.slug }}>
                      <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                    </Link>
                  ) : (
                    <Link to="/blog/$slug" params={{ slug: p.slug }}>
                      <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                    </Link>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="text-accent uppercase tracking-wider">{t.categoryLabels[p.cat as CategoryKey] ?? p.cat}</span>
                    <span>{p.date}</span>
                  </div>
                  {locale === "fr" ? (
                    <Link to="/fr/blog/$slug" params={{ slug: p.slug }}>
                      <h3 className="font-display text-xl text-primary leading-tight hover:text-accent transition-colors">{p.title}</h3>
                    </Link>
                  ) : (
                    <Link to="/blog/$slug" params={{ slug: p.slug }}>
                      <h3 className="font-display text-xl text-primary leading-tight hover:text-accent transition-colors">{p.title}</h3>
                    </Link>
                  )}
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                  {locale === "fr" ? (
                    <Link to="/fr/blog/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 mt-4 text-accent text-sm font-medium hover:gap-2 transition-all">
                      {ui.readArticle} <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 mt-4 text-accent text-sm font-medium hover:gap-2 transition-all">
                      {ui.readArticle} <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
