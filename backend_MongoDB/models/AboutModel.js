import mongoose from 'mongoose';

// ====================================================================
// 1. Define el sub-esquema para los elementos del array 'Highlights'
// ====================================================================
const highlightItemSchema = new mongoose.Schema({
  // Campo 'image' para el código SVG
  image: { type: String, required: true },
  color: { type: String }, 
  secondcolor: { type: String },
  title: { type: String, required: true },
  text: { type: String, required: true },
}, { _id: false }); 

// ====================================================================
// 2. Define el sub-esquema para los elementos del array 'Core Values'
// ====================================================================
const coreValueItemSchema = new mongoose.Schema({
  image: {
    type: String, // URL o path de la imagen/icono
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { _id: false }); // Usamos { _id: false } si no necesitas un ID para cada valor individual

// ====================================================================
// 3. Define el esquema principal 'aboutSchema'
// ====================================================================
const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  titlestory: String,
  storycontent1: String,
  storycontent2: String,
  storycontent3: String,

  // Campo 'Highlights' (Array existente)
  highlights: [highlightItemSchema], 
  
  // ✅ NUEVO CAMPO para el título principal de Core Values
  titlecorevalues: {
    type: String,
    trim: true,
  },

  // ✅ NUEVO CAMPO para el array de Core Values
  corevalues: [coreValueItemSchema],

}, { 
  versionKey: false // Elimina el campo '__v'
});

// ====================================================================
// 4. Exporta el modelo
// ====================================================================
export default mongoose.model('About', aboutSchema);