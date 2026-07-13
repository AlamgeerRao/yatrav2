import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/AboutPage";
import { ABOUT } from "@/lib/content/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: ABOUT.en.meta.title },
      { name: "description", content: ABOUT.en.meta.description },
    ],
  }),
  component: () => <AboutPage locale="en" />,
});
