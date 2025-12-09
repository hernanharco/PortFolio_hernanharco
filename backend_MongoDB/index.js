import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // <-- Importa el módulo CORS

import aboutRoutes from "./routes/AboutRoutes.js";
import skillsRoutes from "./routes/SkillsRoutes.js";

dotenv.config();

const app = express();

// --- LOGGING MIDDLEWARE PERSONALIZADO (Opción 2) ---
// Muestra el método y la URL de cada solicitud entrante
app.use((req, res, next) => {
  // Registra el método HTTP (req.method) y la URL completa (req.originalUrl)
  console.log(`[REQUEST] ➡️ ${req.method}: ${req.originalUrl}`);
  next(); // ¡CRUCIAL! Pasa el control al siguiente middleware/ruta.
});

// --- CONFIGURACIÓN CORS ---
// 1. Define los orígenes permitidos
const allowedOrigins = [
  "http://localhost:5174", // Tu frontend de desarrollo // 'https://tudominio-frontend.com', // Si ya tienes un dominio de producción
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite si el origen está en la lista o si es una solicitud sin origen (e.g., Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Muestra un error si el origen no está permitido
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Permite los métodos que usas en tu CRUD
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
};

// Aplica el middleware CORS con las opciones de seguridad
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
