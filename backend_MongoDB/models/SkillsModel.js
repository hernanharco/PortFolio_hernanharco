import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  level: String, // Ej: "Básico", "Intermedio", "Avanzado"
});

export default mongoose.model('Skills', skillSchema);
