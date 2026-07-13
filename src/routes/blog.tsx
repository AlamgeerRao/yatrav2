import { createFileRoute } from "@tanstack/react-router";
import { BlogListPage } from "@/components/pages/BlogListPage";
import { BLOG_LIST } from "@/lib/content/blog-list";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: BLOG_LIST.en.meta.title },
      { name: "description", content: BLOG_LIST.en.meta.description },
    ],
  }),
  component: () => <BlogListPage locale="en" />,
});
