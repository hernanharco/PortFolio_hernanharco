import { XataClient } from "@xata.io/client";

const xata = new XataClient({
  apiKey: process.env.XATA_API_KEY,
  databaseURL: process.env.XATA_DATABASE_URL,
});

export default async function handler(req, res) {
  try {
    const projects = await xata.db.portfolioHarco.getAll(); // 👈 nombre de tu tabla
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener proyectos" });
  }
}
