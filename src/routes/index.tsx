import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { HOME } from "@/lib/content/home";
import heroImg from "@/assets/hero-kartarpur.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME.en.meta.title },
      { name: "description", content: HOME.en.meta.description },
      { property: "og:title", content: HOME.en.meta.ogTitle },
      { property: "og:description", content: HOME.en.meta.ogDescription },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: () => <HomePage locale="en" />,
});
