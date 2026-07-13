import { createFileRoute } from "@tanstack/react-router";
import { VisaPage } from "@/components/pages/VisaPage";
import { VISA } from "@/lib/content/visa";

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: VISA.en.meta.title },
      { name: "description", content: VISA.en.meta.description },
    ],
  }),
  component: () => <VisaPage locale="en" />,
});
