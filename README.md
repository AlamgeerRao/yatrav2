# YatraPK

Premium Sikh Heritage & Pilgrimage Tours website. Static SPA frontend built with Vite + React + TanStack Router, backed by an Azure Functions API and Cosmos DB.

## Local development

Frontend only (forms will hit `/api/...` and fail with a network error, since nothing is serving the API):

```bash
bun install
bun run dev
```

Frontend **and** API together (recommended — this is how you actually test the forms end to end):

```bash
bun install
cd api && npm install && cd ..
cp api/local.settings.json.example api/local.settings.json   # then fill in COSMOS_CONNECTION_STRING
bun run dev:full
```

`dev:full` uses the [Azure Static Web Apps CLI](https://learn.microsoft.com/azure/static-web-apps/local-development) to run Vite and the Azure Functions API together behind one local proxy (defaults to `http://localhost:4280`). It requires the [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local) to be installed (`npm i -g azure-functions-core-tools@4`), and **Node.js 22** installed locally (matching the Function App's runtime).

## Build

```bash
bun run build
```

Output: `dist/`

## Deploy to Azure

The frontend (Static Web App) and the API (standalone Azure Function App) are two separate Azure resources, but **one combined GitHub Actions workflow** (`.github/workflows/deploy.yml`) deploys both whenever you push to `main`. This split exists because Static Web Apps' **Free** plan only supports *Managed Functions* (co-located `api/` folder deployed by the SWA build itself), which have very limited monitoring/logging in the portal. A standalone Function App gives full logs, Log Stream, and an actual Functions blade — **linking** it to the Static Web App via the official "Bring your own Functions" feature requires the *Standard* plan, so instead the frontend just calls the Function App's own URL directly, with CORS configured on the Function App.

The API (`api/`) uses Azure Functions' **v4 programming model** (functions registered in code under `api/src/functions/`, via `@azure/functions`'s `app.http(...)`), not the older `function.json`-per-folder style — this is required to run on **Node.js 22**, since the classic model only supports Node 20 and below.

### 1. Static Web App (frontend)
1. Push this repository to GitHub.
2. In the Azure Portal, create a new **Static Web App** (Free plan is fine) and connect it to your GitHub repo.
3. Build presets: **Custom** — App location `/`, Output location `dist`, **Api location: leave blank**.
4. Azure will create a workflow file — replace it with the one already in this repo (`.github/workflows/deploy.yml`), which has `api_location: ""` (the API is deployed separately, see below).
5. SPA routing fallback is handled by `staticwebapp.config.json` (all unknown routes serve `index.html`).

### 2. Function App (API)
1. In the Azure Portal, create a new **Function App**:
   - Runtime stack: **Node.js**, version **22**
   - Hosting: **Consumption (Serverless)** plan
   - Name: `yatra-prod-func` (or update `AZURE_FUNCTIONAPP_NAME` in `.github/workflows/deploy.yml` and `VITE_API_BASE_URL` in `.env.production` if you pick a different name)
2. **Configuration → Application settings** → add `COSMOS_CONNECTION_STRING` (see Cosmos DB setup below).
3. **CORS** (left sidebar, under Settings, or under **API → CORS** depending on portal version) → add the Static Web App's origin(s), e.g. `https://your-swa-name.azurestaticapps.net` and any custom domain you add later. (Enabled origins need the full scheme, no trailing slash, no path.)
4. **Overview → Get publish profile** → download the file, then in your GitHub repo go to **Settings → Secrets and variables → Actions** and add it as a secret named `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`.
5. Push to `main` (or run the workflow manually) — `.github/workflows/deploy.yml`'s `deploy_functions` job builds and deploys `api/` to this Function App on every push.
6. Sanity check: `GET https://yatra-prod-func.azurewebsites.net/api/health` should return `{ "ok": true, "cosmosConfigured": true, ... }`.

### Cosmos DB
1. Create an **Azure Cosmos DB (Core/SQL API)** account — **Serverless** capacity mode is the cheapest option for low-volume lead capture.
2. Create database `yatra-db` with two containers, both partitioned on `/id`: **`leads`** and **`enquiries`**.
3. Copy the **primary connection string** (Keys blade) into the Function App's `COSMOS_CONNECTION_STRING` setting above.

## Forms & backend

There is no third-party form service (no Supabase, no mailto-based forms). All leads are saved to **Cosmos DB** via three Azure Functions in `api/src/functions/`, running on the standalone Function App described above:

- **`POST /api/lead`** (`lead.js`) — used by the Contact, Inquiry, Consultation and Newsletter forms (`src/components/forms/`). Client-side entry point: `submitLead()` in `src/components/forms/form-utils.ts`.
- **`POST /api/enquiry`** (`enquiry.js`) — used by the "Plan Your Yatra" wizard (`src/routes/plan.tsx`), which posts a richer payload including the live quote breakdown.
- **`GET /api/health`** (`health.js`) — no-auth sanity check, reports whether `COSMOS_CONNECTION_STRING` is set (without revealing its value).

The frontend targets the Function App's absolute URL via `apiUrl()` in `src/lib/api.ts`, driven by the `VITE_API_BASE_URL` build-time env var (set in `.env.production`). When that variable is unset — e.g. local dev via `bun run dev:full` — API calls resolve as relative paths instead, proxied locally by the SWA CLI.

If `COSMOS_CONNECTION_STRING` is not set, both `lead` and `enquiry` still return a success response to the visitor (so the UI doesn't break) but **log an error and do not persist the lead** — check the Function App's Log stream / Application Insights if leads seem to be going missing.

The site has no client-side secrets — `VITE_API_BASE_URL` is just a public URL, and everything sensitive (the Cosmos connection string) lives server-side on the Function App.
