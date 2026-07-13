import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsPage } from "@/components/pages/TestimonialsPage";
import { TESTIMONIALS_PAGE } from "@/lib/content/testimonials-page";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: TESTIMONIALS_PAGE.en.meta.title },
      { name: "description", content: TESTIMONIALS_PAGE.en.meta.description },
    ],
  }),
  component: () => <TestimonialsPage locale="en" />,
});
