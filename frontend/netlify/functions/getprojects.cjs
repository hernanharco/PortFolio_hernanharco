const xataModule = require('@xata.io/client');
const XataClient = xataModule.default || xataModule.XataClient;

const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.XATA_DATABASE_URL,
});

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
