// composables/useAboutCRUD.ts

// ⚠️ Importa los tipos desde el archivo dedicado (asume la ruta correcta)
import type { AboutData, AboutInput, ErrorType } from "./AboutData";

/**
 * Define la interfaz del objeto que devuelve el custom hook useAboutCRUD.
 */
export interface UseAboutReturn {
    // 1. Estados
    abouts: AboutData[];
    currentAbout: AboutData | null;
    loading: boolean;
    error: string | null;

    // 2. Operaciones CRUD
    fetchAll: () => Promise<void>;
    createAbout: (newAboutData: AboutInput) => Promise<AboutData>;
    updateAbout: (id: string, updatedData: AboutInput) => Promise<AboutData>;
    deleteAbout: (id: string) => Promise<void>; // Devuelve void, ya que la respuesta JSON no importa, solo la eliminación
}
