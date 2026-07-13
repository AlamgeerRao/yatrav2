import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsPage } from "@/components/pages/TestimonialsPage";
import { TESTIMONIALS_PAGE } from "@/lib/content/testimonials-page";

export const Route = createFileRoute("/fr/testimonials")({
  head: () => ({
    meta: [
      { title: TESTIMONIALS_PAGE.fr.meta.title },
      { name: "description", content: TESTIMONIALS_PAGE.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <TestimonialsPage locale="fr" />,
});
