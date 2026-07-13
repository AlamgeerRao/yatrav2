import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { TERMS } from "@/lib/content/legal";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: TERMS.en.meta.title }] }),
  component: () => <LegalPage {...TERMS.en} />,
});
