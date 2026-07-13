import { PageHero } from "@/components/PageHero";
import type { LegalSection } from "@/lib/content/legal";

interface LegalPageProps {
  hero: { eyebrow: string; title: string; description: string };
  intro?: string;
  sections: LegalSection[];
  lastUpdated: string;
}

export function LegalPage({ hero, intro, sections, lastUpdated }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <section className="py-16 md:py-20 bg-cream">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 prose prose-stone">
          {intro && <p>{intro}</p>}
          {sections.map((s) => (
            <div key={s.heading}>
              <h3>{s.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </div>
          ))}
          <p className="text-sm text-muted-foreground">{lastUpdated}</p>
        </div>
      </section>
    </>
  );
}
