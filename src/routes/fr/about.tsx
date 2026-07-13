import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/AboutPage";
import { ABOUT } from "@/lib/content/about";

export const Route = createFileRoute("/fr/about")({
  head: () => ({
    meta: [
      { title: ABOUT.fr.meta.title },
      { name: "description", content: ABOUT.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <AboutPage locale="fr" />,
});
