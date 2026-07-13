import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { GALLERY } from "@/lib/content/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: GALLERY.en.meta.title },
      { name: "description", content: GALLERY.en.meta.description },
    ],
  }),
  component: () => <GalleryPage locale="en" />,
});
