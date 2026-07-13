import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for all /fr/* paths. The Header and Footer detect locale
// from the URL automatically, so this simply renders child routes.
export const Route = createFileRoute("/fr")({
  component: () => <Outlet />,
});
