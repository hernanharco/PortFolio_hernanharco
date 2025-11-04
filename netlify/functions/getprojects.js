// frontend/netlify/functions/getProjects.js
import { XataClient } from '@xata.io/client';

const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.XATA_DATABASE_URL,
});

export async function handler() {
  try {
    const records = await xata.db.accounts_heromodels.getAll();
    
    console.log("data records: ", records)

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: records.length, data: records }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
