// composables/useAboutCRUD.ts

// ⚠️ Importa los tipos desde el archivo dedicado (asume la ruta correcta)
import type { 
    AboutData, 
    AboutInput, 
    ErrorType, 
    CoreValueItem, // ✅ Importa el tipo para el elemento del array
    HighlightItem, // ✅ Importa el tipo para el elemento del array
} from "./AboutData"; // Asegúrate de que esta ruta sea correcta

/**
 * Define la interfaz del objeto que devuelve el custom hook useAboutCRUD.
 * Incluye las operaciones CRUD estándar y las operaciones específicas para arrays.
 */
export interface UseAboutReturn {
    // 1. Estados
    abouts: AboutData[];
    currentAbout: AboutData | null;
    loading: boolean;
    error: string | null;

    // 2. Operaciones CRUD Básicas
    fetchAll: () => Promise<void>;
    createAbout: (newAboutData: AboutInput) => Promise<AboutData>;
    updateAbout: (id: string, updatedData: AboutInput) => Promise<AboutData>;
    deleteAbout: (id: string) => Promise<void>; 

    // 3. ✅ Operaciones Específicas para Core Values (PATCH)
    
    /** Añade un nuevo Core Value al array en el documento About. */
    addCoreValue: (id: string, newCoreValue: CoreValueItem) => Promise<CoreValueItem[]>;
    
    /** Elimina un Core Value del array por su título. */
    removeCoreValue: (id: string, title: string) => Promise<CoreValueItem[]>;

    // 4. ✅ Operaciones Específicas para Highlights (PATCH)
    
    /** Añade un nuevo Highlight al array en el documento About. */
    addHighlight: (id: string, newHighlight: HighlightItem) => Promise<HighlightItem[]>;

    /** Elimina un Highlight del array por su título. */
    removeHighlight: (id: string, title: string) => Promise<HighlightItem[]>;
}