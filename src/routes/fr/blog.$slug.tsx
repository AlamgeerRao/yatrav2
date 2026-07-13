import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/pages/BlogDetailPage";
import { BLOG_DETAIL } from "@/lib/content/blog-detail";
import { getPost, getPosts } from "@/lib/posts-locale";
import type { BlogPost } from "@/lib/posts";

export const Route = createFileRoute("/fr/blog/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = getPost("fr", params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — YatraPK` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.image },
          { name: "language", content: "fr" },
          { property: "og:locale", content: "fr_FR" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="pt-40 pb-20 text-center">
      <h1 className="font-display text-3xl text-primary">{BLOG_DETAIL.fr.notFound.title}</h1>
      <Link to="/fr/blog" className="text-accent underline mt-3 inline-block">{BLOG_DETAIL.fr.notFound.back}</Link>
    </div>
  ),
  component: () => {
    const { post } = Route.useLoaderData() as { post: BlogPost };
    const related = getPosts("fr").filter((p) => p.slug !== post.slug).slice(0, 3);
    return <BlogDetailPage locale="fr" post={post} related={related} />;
  },
});
