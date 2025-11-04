const xataClient = require('@xata.io/client');

const createClient = xataClient.getXataClient || xataClient.XataClient || xataClient.default;
const xata = typeof createClient === "function"
  ? createClient({
      apiKey: process.env.XATA_API_KEY,
      databaseURL: process.env.XATA_DATABASE_URL,
    })
  : createClient;

exports.handler = async () => {
  try {
    const records = await xata.db.accounts_heromodels.getAll();

    console.log("✅ Data fetched:", records);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: records.length, data: records }),
    };
  } catch (error) {
    console.error("❌ Xata fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
