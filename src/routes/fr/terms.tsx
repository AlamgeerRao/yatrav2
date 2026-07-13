import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { TERMS } from "@/lib/content/legal";

export const Route = createFileRoute("/fr/terms")({
  head: () => ({ meta: [{ title: TERMS.fr.meta.title }, { name: "language", content: "fr" }] }),
  component: () => <LegalPage {...TERMS.fr} />,
});
