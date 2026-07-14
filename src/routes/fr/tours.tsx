import { createFileRoute, redirect } from "@tanstack/react-router";

// The standalone Tours listing is folded into the Home page's packages
// section — redirect any direct links/bookmarks there instead of 404ing.
export const Route = createFileRoute("/fr/tours")({
  beforeLoad: () => {
    throw redirect({ to: "/fr", hash: "packages" });
  },
});
