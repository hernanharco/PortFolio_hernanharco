// frontend/netlify/functions/getprojects.js
import { XataClient } from "./xata.js";

const xata = new XataClient();

export async function handler() {
  try {
    const records = await xata.db.accounts_heromodels.getMany();

    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (error) {
    console.error("ERROR CRÍTICO:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
