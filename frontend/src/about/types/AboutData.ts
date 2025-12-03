// Definición de tipos para la estructura de datos 'About'
// Asegúrate de que estos tipos reflejen tu modelo de Mongoose (title, description)

export interface HighlightItem{
    image: string;
    title: string;
    text: string;
}

export interface AboutData {
    _id: string; // Mongoose ID
    title: string;
    subtitle: string;
    titlestory: string;
    storycontent1: string;
    storycontent2: string;
    storycontent3: string;
    // ⭐ CAMBIO: Ahora es un array de HighlightItem
    Highlights: HighlightItem[];
    __v?: number;
}

// Tipo para la entrada de datos (sin el ID o campos generados por la DB)
export type AboutInput = Omit<AboutData, '_id'>; 

/**
 * Tipo de error manejado por el hook
 */
export type ErrorType = string | null;

/*🔍 Pick<Type, Keys> (Seleccionar)
El utility type Pick construye un nuevo tipo seleccionando un conjunto de propiedades (Keys) de un tipo existente (Type). Es como decir: "De este objeto grande, solo necesito estas llaves".

💡 Sintaxis:
TypeScript

Pick<TipoOriginal, 'propiedad1' | 'propiedad2' | ...>*/

/*✂️ Omit<Type, Keys> (Omitir/Excluir)
El utility type Omit construye un nuevo tipo tomando todas las propiedades de un tipo existente (Type) y luego eliminando un conjunto específico de propiedades (Keys). Es como decir: "Dame todas las llaves, excepto estas".

💡 Sintaxis:
TypeScript

Omit<TipoOriginal, 'propiedadA' | 'propiedadB' | ...>*/