import { createFileRoute } from "@tanstack/react-router";
import { PlanWizardPage } from "@/components/pages/PlanWizardPage";
import { PLAN } from "@/lib/content/plan";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: PLAN.en.meta.title },
      { name: "description", content: PLAN.en.meta.description },
    ],
  }),
  component: () => <PlanWizardPage locale="en" />,
});
