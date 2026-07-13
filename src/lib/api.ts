/**
 * The site's API (Cosmos-backed lead capture) runs as a standalone Azure
 * Function App — NOT as SWA Managed Functions — because Static Web Apps'
 * "Bring your own Functions" linking feature requires the Standard plan,
 * and this site runs on Free. Instead, the frontend calls the Function
 * App's own URL directly, with CORS configured on the Function App itself
 * (see README → "Forms & backend").
 *
 * VITE_API_BASE_URL is set at build time (see .env.production). When unset
 * (e.g. local dev via `bun run dev:full`, which proxies /api/* through the
 * SWA CLI to a locally-running copy of the same functions), paths resolve
 * relative to the current origin instead.
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
