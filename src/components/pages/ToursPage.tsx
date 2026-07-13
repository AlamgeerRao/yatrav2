import { PageHero } from "@/components/PageHero";
import { PackageCard } from "@/components/PackageCard";
import { TrustBadges } from "@/components/TrustBadges";
import { getPackages } from "@/lib/packages-locale";
import { TOURS_LIST } from "@/lib/content/tours-list";
import type { Locale } from "@/lib/i18n";

export function ToursPage({ locale }: { locale: Locale }) {
  const t = TOURS_LIST[locale];
  const packages = getPackages(locale);

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} description={t.hero.description} />
      <section className="pb-20 md:pb-28 -mt-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {packages.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}
          </div>
        </div>
      </section>
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <TrustBadges />
        </div>
      </section>
    </>
  );
}
