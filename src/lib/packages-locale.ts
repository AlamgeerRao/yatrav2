import type { Locale } from "./i18n";
import type { TourPackage } from "./packages";
import { packages as packagesEn, findPackage as findPackageEn } from "./packages";
import { packagesFr, findPackageFr } from "./packages.fr";

export function getPackages(locale: Locale) {
  return locale === "fr" ? packagesFr : packagesEn;
}

export function getPackage(locale: Locale, slug: string) {
  return locale === "fr" ? findPackageFr(slug) : findPackageEn(slug);
}

/**
 * A single fixed "X Days" figure instead of the marketing range (e.g. shows
 * "3 Days" for a package whose duration is "3–4 Days"), using the minimum —
 * suggestedNights is kept in sync with that minimum in packages.ts.
 * Genuinely undated packages ("Custom" / "Sur mesure") are shown as-is.
 */
export function displayDuration(pkg: TourPackage, locale: Locale): string {
  if (!/\d/.test(pkg.duration)) return pkg.duration;
  const n = pkg.suggestedNights;
  const unit = locale === "fr" ? (n === 1 ? "jour" : "jours") : n === 1 ? "Day" : "Days";
  return `${n} ${unit}`;
}
