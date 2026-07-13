import { createFileRoute } from "@tanstack/react-router";
import { VisaPage } from "@/components/pages/VisaPage";
import { VISA } from "@/lib/content/visa";

export const Route = createFileRoute("/fr/visa")({
  head: () => ({
    meta: [
      { title: VISA.fr.meta.title },
      { name: "description", content: VISA.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <VisaPage locale="fr" />,
});
