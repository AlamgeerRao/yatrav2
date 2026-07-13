import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { HOME } from "@/lib/content/home";
import heroImg from "@/assets/hero-kartarpur.jpg";

export const Route = createFileRoute("/fr/")({
  head: () => ({
    meta: [
      { title: HOME.fr.meta.title },
      { name: "description", content: HOME.fr.meta.description },
      { property: "og:title", content: HOME.fr.meta.ogTitle },
      { property: "og:description", content: HOME.fr.meta.ogDescription },
      { property: "og:image", content: heroImg },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <HomePage locale="fr" />,
});
