import { createFileRoute } from "@tanstack/react-router";
import { BlogListPage } from "@/components/pages/BlogListPage";
import { BLOG_LIST } from "@/lib/content/blog-list";

export const Route = createFileRoute("/fr/blog")({
  head: () => ({
    meta: [
      { title: BLOG_LIST.fr.meta.title },
      { name: "description", content: BLOG_LIST.fr.meta.description },
      { name: "language", content: "fr" },
    ],
  }),
  component: () => <BlogListPage locale="fr" />,
});
