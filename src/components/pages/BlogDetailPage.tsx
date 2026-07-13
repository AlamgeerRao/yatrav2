import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { BLOG_DETAIL, categoryLabel } from "@/lib/content/blog-detail";
import type { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/posts";

export function BlogDetailPage({ locale, post, related }: { locale: Locale; post: BlogPost; related: BlogPost[] }) {
  const t = BLOG_DETAIL[locale];
  const blogPath = locale === "fr" ? "/fr/blog" : "/blog";
  const toursPath = locale === "fr" ? "/fr/tours" : "/tours";

  return (
    <>
      {/* HERO */}
      <section className="relative h-[60svh] min-h-[420px] flex items-end overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-4xl w-full px-5 lg:px-8 pb-14 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-cream">
            {locale === "fr" ? (
              <Link to="/fr/blog" className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.25em] hover:opacity-80">
                <ArrowLeft className="size-3.5" /> {t.backLabel}
              </Link>
            ) : (
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-[0.25em] hover:opacity-80">
                <ArrowLeft className="size-3.5" /> {t.backLabel}
              </Link>
            )}
            <div className="mt-5 flex items-center gap-3 text-xs text-cream/70">
              <span className="text-gold uppercase tracking-wider">{categoryLabel(locale, post.cat)}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-3 leading-[1.05] text-balance">{post.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic">{post.excerpt}</p>
          <div className="space-y-6">
            {post.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-primary/85 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-cream p-8 border border-border text-center">
            <h3 className="font-display text-2xl text-primary mb-2">{t.cta.heading}</h3>
            <p className="text-muted-foreground text-sm mb-5">{t.cta.blurb}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to={toursPath} className="inline-flex items-center gap-1.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2.5 text-sm font-medium">
                {t.cta.exploreTours} <ArrowRight className="size-4" />
              </Link>
              <a href={whatsappLink(t.cta.whatsappMsg(post.title))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-primary text-primary px-6 py-2.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition">
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display text-3xl md:text-4xl text-primary">{t.moreHeading}</h2>
            <Link to={blogPath} className="text-accent text-sm inline-flex items-center gap-1 hover:opacity-80">{t.allArticles} <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {related.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="group rounded-3xl overflow-hidden bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
              >
                {locale === "fr" ? (
                  <Link to="/fr/blog/$slug" params={{ slug: p.slug }}>
                    <BlogCardBody p={p} locale={locale} />
                  </Link>
                ) : (
                  <Link to="/blog/$slug" params={{ slug: p.slug }}>
                    <BlogCardBody p={p} locale={locale} />
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogCardBody({ p, locale }: { p: BlogPost; locale: Locale }) {
  return (
    <>
      <div className="aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="text-accent uppercase tracking-wider">{categoryLabel(locale, p.cat)}</span>
          <span>{p.date}</span>
        </div>
        <h3 className="font-display text-xl text-primary leading-tight">{p.title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
      </div>
    </>
  );
}
