// composables/useAboutCRUD.ts (Adaptado para un entorno con hooks/composables)

import { useState, useCallback, useMemo } from 'react'; // Usando React hooks como ejemplo
import AboutDAO from '@/about/service/AboutDAO'; // Ajusta la ruta de importación

import type {AboutData, AboutInput, ErrorType} from '@/about/types/AboutData'
import type { UseAboutReturn } from '@/about/types/UseAboutReturn';

/**
 * Hook personalizado para manejar la lógica CRUD (Crear, Leer, Actualizar, Eliminar)
 * y el estado asociado (carga, error) para el recurso 'About'.
 */
const useAboutCRUD = (): UseAboutReturn => {
    // 1. Estados reactivos para manejar los datos de la API
    const [abouts, setAbouts] = useState<AboutData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- OPERACIÓN READ (Leer todos) ---
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AboutDAO.getAll(); // Llama al DAO
            setAbouts(data);
        } catch (err: any) {
            console.error("Failed to fetch all abouts:", err);
            setError("Error al cargar los documentos de 'Acerca de'.");
        } finally {
            setLoading(false);
        }
    }, []);

    // --- OPERACIÓN CREATE (Crear) ---
    const createAbout = useCallback(async (newAboutData: AboutInput) => {
        setLoading(true);
        setError(null);
        try {
            const createdItem = await AboutDAO.create(newAboutData);
            
            // Actualiza el estado localmente, asumiendo que el 'about' puede ser un singleton o una lista
            setAbouts(prev => [...prev, createdItem]);
            
            setLoading(false);
            return createdItem;
        } catch (err: any) {
            console.error("Failed to create about:", err);
            setError("Error al crear el documento.");
            setLoading(false);
            throw err; // Re-lanza el error para que el componente lo maneje si es necesario
        }
    }, []);

    // --- OPERACIÓN UPDATE (Actualizar) ---
    const updateAbout = useCallback(async (id: string, updatedData: AboutInput) => {
        setLoading(true);
        setError(null);
        try {
            const updatedItem = await AboutDAO.update(id, updatedData);
            
            // Actualiza el estado local: encuentra y reemplaza el elemento actualizado
            setAbouts(prev => 
                prev.map(item => (item._id === id ? updatedItem : item))
            );
            
            setLoading(false);
            return updatedItem;
        } catch (err: any) {
            console.error(`Failed to update about ${id}:`, err);
            setError("Error al actualizar el documento.");
            setLoading(false);
            throw err;
        }
    }, []);

    // --- OPERACIÓN DELETE (Eliminar) ---
    const deleteAbout = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await AboutDAO.delete(id);
            
            // Elimina el elemento del estado local
            setAbouts(prev => prev.filter(item => item._id !== id));
            
            setLoading(false);
        } catch (err: any) {
            console.error(`Failed to delete about ${id}:`, err);
            setError("Error al eliminar el documento.");
            setLoading(false);
            throw err;
        }
    }, []);

    // Opcional: Si el recurso 'about' es un Singleton (solo hay 1 documento), 
    // puedes exportar el primer elemento directamente.
    const currentAbout = useMemo(() => abouts[0] || null, [abouts]);


    return {
        // Estado
        abouts,
        currentAbout, // Puede ser útil si solo esperas un documento
        loading,
        error,
        
        // Operaciones
        fetchAll,
        createAbout,
        updateAbout,
        deleteAbout,
    };
}

export default useAboutCRUD;