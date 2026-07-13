const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const DB_NAME        = "yatra-db";
const CONTAINER_NAME = "leads";

const VALID_KINDS = ["contact", "inquiry", "consultation", "newsletter"];

/**
 * POST /api/lead
 * Saves a general site lead (contact / inquiry / consultation / newsletter
 * signup) to Cosmos DB. This is the counterpart to /api/enquiry, which
 * handles the richer "Plan Your Yatra" quote wizard submissions.
 *
 * This runs as a standalone Azure Function App (not SWA Managed Functions).
 * CORS is configured on the Function App itself (Portal → CORS) rather than
 * handled in code here — see README for the exact origins to allow.
 *
 * Gracefully handles missing Cosmos config (still returns success so the
 * visitor isn't blocked — but logs loudly so a missing connection string
 * is noticed rather than silently losing leads).
 */
app.http("lead", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "lead",
  handler: async (request, context) => {
    const body = await request.json().catch(() => ({}));
    const kind = body.kind;

    if (!VALID_KINDS.includes(kind)) {
      return { status: 400, jsonBody: { error: `kind must be one of: ${VALID_KINDS.join(", ")}` } };
    }

    // Honeypot: bots that fill the hidden field are silently accepted and dropped.
    if (body.honeypot) {
      return { status: 200, jsonBody: { success: true } };
    }

    if (!body.email) {
      return { status: 400, jsonBody: { error: "email is required" } };
    }

    // Newsletter signups don't collect a name; everything else does.
    if (kind !== "newsletter" && !body.name) {
      return { status: 400, jsonBody: { error: "name is required" } };
    }

    const id = generateId();

    const lead = {
      id,
      kind,
      email:            String(body.email),
      name:             body.name ? String(body.name) : null,
      phone:            body.phone ? String(body.phone) : null,
      country:          body.country ? String(body.country) : null,
      message:          body.message ? String(body.message) : null,
      packageInterest:  body.packageInterest ? String(body.packageInterest) : null,
      travelMonth:      body.travelMonth ? String(body.travelMonth) : null,
      travelers:
        body.travelers !== undefined && body.travelers !== null && body.travelers !== ""
          ? Number(body.travelers)
          : null,
      preferredTime:    body.preferredTime ? String(body.preferredTime) : null,
      notes:            body.notes ? String(body.notes) : null,
      submittedAt:      new Date().toISOString(),
      status:           "new",
    };

    // Try to save to Cosmos DB — gracefully degrade if not configured, but log
    // loudly so a missing connection string gets noticed rather than quietly
    // losing every lead submitted through the site.
    const connStr = process.env.COSMOS_CONNECTION_STRING;
    if (connStr) {
      try {
        const client    = new CosmosClient(connStr);
        const database  = client.database(DB_NAME);
        const container = database.container(CONTAINER_NAME);
        await container.items.create(lead);
        context.log(`Lead saved: ${kind} / ${id}`);
      } catch (err) {
        context.error("Cosmos DB write failed:", err.message);
      }
    } else {
      context.error(
        "COSMOS_CONNECTION_STRING not set — lead was NOT persisted, only logged:",
        JSON.stringify(lead),
      );
    }

    return { status: 200, jsonBody: { success: true } };
  },
});

function generateId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let rand = "";
  for (let i = 0; i < 16; i++) rand += chars[Math.floor(Math.random() * chars.length)];
  return rand;
}
