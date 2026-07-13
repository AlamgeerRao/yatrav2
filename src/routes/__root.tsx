import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import { Layout } from "@/components/Layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <span className="font-display text-7xl text-accent">404</span>
        <h2 className="mt-4 font-display text-2xl text-primary">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This path isn't part of our journey. Let's get you home.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-accent text-accent-foreground px-6 py-2.5 text-sm font-medium hover:bg-accent/90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-primary">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again, or contact us on WhatsApp.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input px-5 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

// Client-side document head manager (replaces TanStack Start's HeadContent).
function useDocumentHead(meta?: { title?: string; description?: string }) {
  useEffect(() => {
    if (meta?.title) document.title = meta.title;
    if (meta?.description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", meta.description);
    }
  }, [meta?.title, meta?.description]);
}

export { useDocumentHead };

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
