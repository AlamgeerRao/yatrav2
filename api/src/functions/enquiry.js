const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const DB_NAME        = "yatra-db";
const CONTAINER_NAME = "enquiries";

/**
 * POST /api/enquiry
 * Saves a yatra enquiry to Cosmos DB and returns a reference number.
 * Gracefully handles missing Cosmos config (returns ref anyway so the
 * user always gets a confirmation — data is in the request logs).
 *
 * This runs as a standalone Azure Function App (not SWA Managed Functions).
 * CORS is configured on the Function App itself (Portal → CORS) rather than
 * handled in code here — see README for the exact origins to allow.
 */
app.http("enquiry", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "enquiry",
  handler: async (request, context) => {
    const body = await request.json().catch(() => null);

    if (!body || !body.email || !body.name) {
      return { status: 400, jsonBody: { error: "name and email are required" } };
    }

    // Generate a short human-friendly reference
    const ref = generateRef();

    const enquiry = {
      id:          ref,
      ref,
      name:        body.name,
      email:       body.email,
      phone:       body.phone        ?? "",
      country:     body.country      ?? "",
      departureCity: body.departureCity ?? "",
      travellers:  body.travellers   ?? 1,
      yatra:       body.yatra        ?? "",
      travelMonth: body.travelMonth  ?? "",
      travelYear:  body.travelYear   ?? "",
      nights:      body.nights       ?? 0,
      hotelStar:   body.hotelStar    ?? 4,
      roomType:    body.roomType     ?? "double",
      flights:     body.flights      ?? false,
      visa:        body.visa         ?? false,
      transfers:   body.transfers    ?? false,
      extraDestinations: body.extraDestinations ?? "",
      specialRequests:   body.specialRequests   ?? "",
      quoteTotal:  body.quote?.total ?? 0,
      quotePerPerson: body.quote?.perPerson ?? 0,
      submittedAt: body.submittedAt  ?? new Date().toISOString(),
      status:      "new",
    };

    // Try to save to Cosmos DB — gracefully degrade if not configured
    const connStr = process.env.COSMOS_CONNECTION_STRING;
    if (connStr) {
      try {
        const client    = new CosmosClient(connStr);
        const database  = client.database(DB_NAME);
        const container = database.container(CONTAINER_NAME);
        await container.items.create(enquiry);
        context.log(`Enquiry saved: ${ref}`);
      } catch (err) {
        // Log but don't fail — user gets their ref regardless
        context.error("Cosmos DB write failed:", err.message);
      }
    } else {
      context.error(
        "COSMOS_CONNECTION_STRING not set — enquiry was NOT persisted, only logged:",
        JSON.stringify(enquiry),
      );
    }

    return { status: 200, jsonBody: { ref, success: true } };
  },
});

/** YTR-A3F8K2 style reference */
function generateRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let rand = "";
  for (let i = 0; i < 6; i++) rand += chars[Math.floor(Math.random() * chars.length)];
  return `YTR-${rand}`;
}
