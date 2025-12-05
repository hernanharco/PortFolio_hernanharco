import mongoose from 'mongoose';

// 1. Define el sub-esquema para los elementos del array 'Highlights'
const highlightItemSchema = new mongoose.Schema({
  // Campo 'image' para el código SVG
  image: { type: String, required: true },
  // Incluimos 'color' que estaba en tu objeto de ejemplo
  color: { type: String }, 
  secondcolor: { type: String },
  title: { type: String, required: true },
  text: { type: String, required: true },
}, { _id: false }); 

// 2. Define el esquema principal 'aboutSchema'
const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  titlestory: String,
  storycontent1: String,
  storycontent2: String,
  storycontent3: String,

  // El campo 'Highlights' es un array de objetos.
  highlights: [highlightItemSchema], 
  
}, { 
  // Omitimos el _id explícito; Mongoose lo añade automáticamente.
  versionKey: false // Opcional: Elimina el campo '__v' para un modelo más limpio.
});

// 3. Exporta el modelo
export default mongoose.model('About', aboutSchema);