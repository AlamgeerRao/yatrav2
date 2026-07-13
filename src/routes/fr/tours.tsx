import { createFileRoute } from "@tanstack/react-router";
import { ToursPage } from "@/components/pages/ToursPage";
import { TOURS_LIST } from "@/lib/content/tours-list";

export const Route = createFileRoute("/fr/tours")({
  head: () => ({
    meta: [
      { title: TOURS_LIST.fr.meta.title },
      { name: "description", content: TOURS_LIST.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <ToursPage locale="fr" />,
});
