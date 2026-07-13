import type { Locale } from "./i18n";
import { packages as packagesEn, findPackage as findPackageEn } from "./packages";
import { packagesFr, findPackageFr } from "./packages.fr";

export function getPackages(locale: Locale) {
  return locale === "fr" ? packagesFr : packagesEn;
}

export function getPackage(locale: Locale, slug: string) {
  return locale === "fr" ? findPackageFr(slug) : findPackageEn(slug);
}
