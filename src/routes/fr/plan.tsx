import { createFileRoute } from "@tanstack/react-router";
import { PlanWizardPage } from "@/components/pages/PlanWizardPage";
import { PLAN } from "@/lib/content/plan";

export const Route = createFileRoute("/fr/plan")({
  head: () => ({
    meta: [
      { title: PLAN.fr.meta.title },
      { name: "description", content: PLAN.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <PlanWizardPage locale="fr" />,
});
