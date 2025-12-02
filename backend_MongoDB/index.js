import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import aboutRoutes from './routes/about.js';
import skillsRoutes from './routes/skills.js';

dotenv.config();

const app = express();

app.use('/about', aboutRoutes);
app.use('/skills', skillsRoutes);

// Middlewares
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
