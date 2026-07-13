import { createFileRoute } from "@tanstack/react-router";
import { ToursPage } from "@/components/pages/ToursPage";
import { TOURS_LIST } from "@/lib/content/tours-list";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: TOURS_LIST.en.meta.title },
      { name: "description", content: TOURS_LIST.en.meta.description },
    ],
  }),
  component: () => <ToursPage locale="en" />,
});
