import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TourDetailPage } from "@/components/pages/TourDetailPage";
import { TOUR_DETAIL } from "@/lib/content/tour-detail";
import { getPackage, getPackages } from "@/lib/packages-locale";
import type { TourPackage } from "@/lib/packages";

export const Route = createFileRoute("/fr/tours/$slug")({
  loader: ({ params }): { pkg: TourPackage } => {
    const pkg = getPackage("fr", params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.pkg.name} — YatraPK` },
          { name: "description", content: `${loaderData.pkg.tagline}. ${loaderData.pkg.duration}.` },
          { property: "og:title", content: loaderData.pkg.name },
          { property: "og:description", content: loaderData.pkg.tagline },
          { property: "og:image", content: loaderData.pkg.image },
          { name: "language", content: "fr" },
          { property: "og:locale", content: "fr_FR" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="pt-40 pb-20 text-center">
      <h1 className="font-display text-3xl text-primary">{TOUR_DETAIL.fr.notFound.title}</h1>
      <Link to="/fr/tours" className="text-accent underline mt-3 inline-block">{TOUR_DETAIL.fr.notFound.back}</Link>
    </div>
  ),
  component: () => {
    const { pkg } = Route.useLoaderData() as { pkg: TourPackage };
    const related = getPackages("fr").filter((p) => p.slug !== pkg.slug).slice(0, 3);
    return <TourDetailPage locale="fr" pkg={pkg} related={related} />;
  },
});
