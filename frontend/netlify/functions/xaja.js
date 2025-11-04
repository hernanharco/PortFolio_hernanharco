// frontend/netlify/functions/xata.js
import { XataClient as BaseXataClient } from "@xata.io/client";

export class XataClient extends BaseXataClient {
  constructor() {
    super({
      databaseURL: "https://harco-h1m35r.eu-west-1.xata.tech/db/portfolioHarco:main",
      apiKey: process.env.XATA_API_KEY, // Tu API Key debe estar en Netlify Environment Variables
    });
    this.db = this.branch("main");
  }
}
