const { app } = require("@azure/functions");

/**
 * GET /api/health
 * Quick sanity check — confirms the Function App is running and reports
 * (without leaking the value) whether COSMOS_CONNECTION_STRING is set.
 */
app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "health",
  handler: async (request, context) => {
    return {
      status: 200,
      jsonBody: {
        ok: true,
        cosmosConfigured: Boolean(process.env.COSMOS_CONNECTION_STRING),
        time: new Date().toISOString(),
      },
    };
  },
});
