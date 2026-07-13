#!/usr/bin/env node
/**
 * Post-build smoke test for the static SPA in dist/.
 *
 * Verifies:
 *  1. dist/index.html exists, references the built JS bundle, and mounts #root.
 *  2. The bundled JS calls the /api/lead and /api/enquiry Azure Functions
 *     (the site's two lead-capture endpoints) and contains no leftover
 *     Supabase references.
 *  3. A static file server can serve dist/ and return 200 for "/" and a deep route
 *     (deep route is rewritten to index.html via staticwebapp.config.json in prod;
 *     here we verify the index payload is intact).
 *
 * Note: this only checks the built static assets. It does not exercise the
 * Azure Functions API itself — run `func start` in api/ (with a real or
 * emulated Cosmos DB) to test the submission endpoints end to end.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createServer } from "node:http";

const DIST = "dist";
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};
const ok = (msg) => console.log(`✓ ${msg}`);

// 1. dist/ basics
if (!existsSync(DIST)) fail(`${DIST}/ not found — did 'bun run build' succeed?`);
const indexPath = join(DIST, "index.html");
if (!existsSync(indexPath)) fail("dist/index.html missing");
const html = readFileSync(indexPath, "utf8");
if (!/<div id="root">/.test(html)) fail('index.html missing <div id="root">');
if (!/<script[^>]+src="[^"]+\.js"/.test(html)) fail("index.html missing built JS bundle reference");
ok("dist/index.html is well-formed");

// 2. Bundled form logic
const walk = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
};
const jsFiles = walk(DIST).filter((f) => f.endsWith(".js"));
if (jsFiles.length === 0) fail("no JS bundles in dist/");
let leadEndpointFound = false;
let enquiryEndpointFound = false;
let supabaseLeftoverFound = false;
for (const f of jsFiles) {
  const src = readFileSync(f, "utf8");
  if (src.includes("/api/lead")) leadEndpointFound = true;
  if (src.includes("/api/enquiry")) enquiryEndpointFound = true;
  if (/supabase/i.test(src)) supabaseLeftoverFound = true;
}
if (!leadEndpointFound) fail("/api/lead call not found in bundled JS (Contact/Inquiry/Consultation/Newsletter forms)");
if (!enquiryEndpointFound) fail("/api/enquiry call not found in bundled JS (Plan Your Yatra wizard)");
if (supabaseLeftoverFound) fail("leftover Supabase reference found in bundled JS — Supabase should be fully removed");
ok("form submit logic (Azure Functions API) shipped in bundle, no Supabase leftovers");

// 3. Static server smoke test
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".json": "application/json",
};
const server = createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let filePath = join(DIST, urlPath);
  try {
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = join(DIST, "index.html"); // SPA fallback
    }
    const ext = filePath.slice(filePath.lastIndexOf("."));
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    res.end(readFileSync(filePath));
  } catch {
    res.writeHead(500);
    res.end("err");
  }
});

await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;

const check = async (path, label) => {
  const r = await fetch(base + path);
  if (r.status !== 200) fail(`${label} returned ${r.status}`);
  const body = await r.text();
  if (!body.includes('id="root"')) fail(`${label} did not serve SPA shell`);
  ok(`${label} → 200 with SPA shell`);
};

try {
  await check("/", "GET /");
  await check("/contact", "GET /contact (SPA fallback)");
  await check("/tours", "GET /tours (SPA fallback)");
} finally {
  server.close();
}

ok("All smoke tests passed");
