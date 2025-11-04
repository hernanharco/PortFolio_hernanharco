import { XataClient } from '@xata.io/client';

const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.XATA_DATABASE_URL,
});

export async function handler() {
  try {
    const records = await xata.db.accounts_heromodels.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (error) {
    console.error('Error fetching data from Xata:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
