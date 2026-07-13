import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { PRIVACY } from "@/lib/content/legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: PRIVACY.en.meta.title }] }),
  component: () => <LegalPage {...PRIVACY.en} />,
});
