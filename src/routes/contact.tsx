import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { CONTACT } from "@/lib/content/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: CONTACT.en.meta.title },
      { name: "description", content: CONTACT.en.meta.description },
    ],
  }),
  component: () => <ContactPage locale="en" />,
});
