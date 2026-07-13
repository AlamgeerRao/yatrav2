import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { CONTACT } from "@/lib/content/contact";

export const Route = createFileRoute("/fr/contact")({
  head: () => ({
    meta: [
      { title: CONTACT.fr.meta.title },
      { name: "description", content: CONTACT.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <ContactPage locale="fr" />,
});
