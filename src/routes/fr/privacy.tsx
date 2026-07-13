import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { PRIVACY } from "@/lib/content/legal";

export const Route = createFileRoute("/fr/privacy")({
  head: () => ({ meta: [{ title: PRIVACY.fr.meta.title }, { name: "language", content: "fr" }] }),
  component: () => <LegalPage {...PRIVACY.fr} />,
});
