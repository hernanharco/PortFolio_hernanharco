// Definición de tipos para la estructura de datos 'About'
// Asegúrate de que estos tipos reflejen tu modelo de Mongoose.

/**
 * Define la estructura de un solo elemento dentro del array 'highlights'.
 * Nota: Eliminamos el 'id: number' ya que Mongoose no lo genera si se usa { _id: false }.
 */
export interface HighlightItem{
    // image, color, secondcolor, title, text coinciden con el esquema de Mongoose.
    image: string;
    color: string;
    secondcolor: string;
    title: string;
    text: string;
}

/**
 * Define la estructura de un solo elemento dentro del array 'corevalues'.
 * Renombrado a CoreValueItem para consistencia.
 */
export interface CoreValueItem{ // ✅ RENOMBRADO A CoreValueItem
    image: string;
    text: string;
    title: string;
}

/**
 * Define la estructura completa del documento 'About' tal como viene del backend.
 */
export interface AboutData {
    _id: string; // ID principal de Mongoose
    title: string;
    subtitle: string;
    titlestory: string;
    storycontent1: string;
    storycontent2: string;
    storycontent3: string;
    
    highlights: HighlightItem[]; // Array de subdocumentos
    
    // ✅ Campo simple añadido
    titlecorevalues: string;
    
    // ✅ Array de Core Values
    corevalues: CoreValueItem[]; 
    
    __v?: number; // Versión de Mongoose (opcional)
}

// -------------------------------------------------------------------

/**
 * Tipo para la entrada de datos (sin el ID o campos generados por la DB)
 * Incluye todos los campos excepto _id, ya que es la estructura de datos que se envía.
 */
export type AboutInput = Omit<AboutData, '_id' | '__v'>; 

/**
 * Tipo de error manejado por el hook
 */
export type ErrorType = string | null;