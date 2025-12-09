// composables/useAboutCRUD.ts

import { useState, useCallback, useMemo } from "react"; 
import AboutDAO from "@/features/about/service/AboutDAO"; 
import type {
  AboutData,
  AboutInput,
  ErrorType,
  CoreValueItem, 
  HighlightItem, 
} from "@/features/about/types/AboutData";
import type { UseAboutReturn } from "@/features/about/types/UseAboutReturn";

/**
 * Hook personalizado para manejar la lógica CRUD y el estado asociado 
 * para el recurso 'About'.
 */
const useAboutCRUD = (): UseAboutReturn => {
  // 1. Estados reactivos para manejar los datos de la API
  const [abouts, setAbouts] = useState<AboutData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper para actualizar el estado del array específico (corevalues o highlights)
  const updateAboutArrayLocally = useCallback(
    // Nota: Es mejor tipar 'updatedArray' como un array genérico si es necesario,
    // o usar un tipo más específico (CoreValueItem[] | HighlightItem[])
    (id: string, arrayName: 'corevalues' | 'highlights', updatedArray: any[]) => {
      setAbouts((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, [arrayName]: updatedArray } // Reemplaza solo el array específico
            : item
        )
      );
    },
    []
  );

  // ====================================================================
  // --- OPERACIONES CRUD BÁSICAS (existentes) ---
  // ====================================================================

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AboutDAO.getAll();
      setAbouts(data);
    } catch (err: any) {
      setError("Error al cargar los documentos de 'Acerca de'.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createAbout = useCallback(async (newAboutData: AboutInput) => {
    setLoading(true);
    setError(null);
    try {
      const createdItem = await AboutDAO.create(newAboutData);
      setAbouts((prev) => [...prev, createdItem]);
      setLoading(false);
      return createdItem;
    } catch (err: any) {
      setError("Error al crear el documento.");
      setLoading(false);
      throw err;
    }
  }, []);

  const updateAbout = useCallback(
    async (id: string, updatedData: AboutInput) => {
      setLoading(true);
      setError(null);
      try {
        const updatedItem = await AboutDAO.update(id, updatedData);
        setAbouts((prev) =>
          prev.map((item) => (item._id === id ? updatedItem : item))
        );
        setLoading(false);
        return updatedItem;
      } catch (err: any) {
        setError("Error al actualizar el documento.");
        setLoading(false);
        throw err;
      }
    },
    []
  );

  const deleteAbout = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await AboutDAO.delete(id);
      setAbouts((prev) => prev.filter((item) => item._id !== id));
      setLoading(false);
    } catch (err: any) {
      setError("Error al eliminar el documento.");
      setLoading(false);
      throw err;
    }
  }, []);

  // ====================================================================
  // ✅ NUEVAS OPERACIONES PATCH PARA ARRAYS (CORREGIDAS CON RETURN)
  // ====================================================================

  // --- Core Values ---

  const addCoreValue = useCallback(
    async (id: string, newCoreValue: CoreValueItem) => {
      setLoading(true);
      setError(null);
      try {
        const updatedArray = await AboutDAO.addCoreValue(id, newCoreValue);
        updateAboutArrayLocally(id, 'corevalues', updatedArray);
        setLoading(false);
        return updatedArray; // 🛑 CORREGIDO: Devuelve el array actualizado
      } catch (err: any) {
        setError("Error al agregar Core Value.");
        setLoading(false);
        throw err;
      }
    },
    [updateAboutArrayLocally]
  );

  const removeCoreValue = useCallback(
    async (id: string, title: string) => {
      setLoading(true);
      setError(null);
      try {
        const updatedArray = await AboutDAO.removeCoreValue(id, title);
        updateAboutArrayLocally(id, 'corevalues', updatedArray);
        setLoading(false);
        return updatedArray; // 🛑 CORREGIDO: Devuelve el array actualizado
      } catch (err: any) {
        setError("Error al eliminar Core Value.");
        setLoading(false);
        throw err;
      }
    },
    [updateAboutArrayLocally]
  );
  
  // --- Highlights ---

  const addHighlight = useCallback(
    async (id: string, newHighlight: HighlightItem) => {
      setLoading(true);
      setError(null);
      try {
        const updatedArray = await AboutDAO.addHighlight(id, newHighlight);
        updateAboutArrayLocally(id, 'highlights', updatedArray);
        setLoading(false);
        return updatedArray; // 🛑 CORREGIDO: Devuelve el array actualizado
      } catch (err: any) {
        setError("Error al agregar Highlight.");
        setLoading(false);
        throw err;
      }
    },
    [updateAboutArrayLocally]
  );

  const removeHighlight = useCallback(
    async (id: string, title: string) => {
      setLoading(true);
      setError(null);
      try {
        const updatedArray = await AboutDAO.removeHighlight(id, title);
        updateAboutArrayLocally(id, 'highlights', updatedArray);
        setLoading(false);
        return updatedArray; // 🛑 CORREGIDO: Devuelve el array actualizado
      } catch (err: any) {
        setError("Error al eliminar Highlight.");
        setLoading(false);
        throw err;
      }
    },
    [updateAboutArrayLocally]
  );


  const currentAbout = useMemo(() => abouts[0] || null, [abouts]);

  return {
    // Estado
    abouts,
    currentAbout,
    loading,
    error,

    // Operaciones CRUD
    fetchAll,
    createAbout,
    updateAbout,
    deleteAbout,
    
    // Operaciones de Arrays
    addCoreValue,
    removeCoreValue,
    addHighlight,
    removeHighlight,
  };
};

export default useAboutCRUD;