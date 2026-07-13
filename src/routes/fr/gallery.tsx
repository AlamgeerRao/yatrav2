import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { GALLERY } from "@/lib/content/gallery";

export const Route = createFileRoute("/fr/gallery")({
  head: () => ({
    meta: [
      { title: GALLERY.fr.meta.title },
      { name: "description", content: GALLERY.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <GalleryPage locale="fr" />,
});
