// src/features/about/hooks/useHighlightsData.ts

import { useEffect, useMemo } from "react";
import type { AboutData } from "@/features/about/types/AboutData";
import type { HighlightRow } from "@/features/about/components/modal/Highlights/HighlightsModalContainer"; // Importa la interfaz de la tabla

// Propiedades mínimas para este hook
interface UseHighlightsDataProps {
    abouts: AboutData[];
    loading: boolean;
    error: string | null;
    fetchAll: () => Promise<void>;
}

interface UseHighlightsDataReturn extends UseHighlightsDataProps {
    aboutsDocs: AboutData[]; // Renombre más explícito
    tableData: HighlightRow[];
}

/**
 * Hook que gestiona la lectura de datos, el fetch inicial y el cálculo
 * de la data de la tabla (incluyendo la inyección de tempId y parentAboutId).
 */
export const useHighlightsData = ({
    abouts,
    loading,
    error,
    fetchAll,
}: UseHighlightsDataProps): UseHighlightsDataReturn => {

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    // Cálculo de tableData: Convierte el array anidado (abouts) en una tabla plana (HighlightRow[])
    const tableData: HighlightRow[] = useMemo(() => {
        const safeAbouts = abouts || [];
        if (!Array.isArray(safeAbouts) || safeAbouts.length === 0) {
            return [];
        }
        let tempIdCounter = 0;
        return safeAbouts.flatMap((about) => {
            const safeHighlights = about.highlights || [];
            return safeHighlights.map((highlight) => ({
                ...highlight,
                parentAboutId: about._id,
                tempId: tempIdCounter++,
            }));
        });
    }, [abouts]);

    return {
        aboutsDocs: abouts,
        tableData,
        loading,
        error,
        fetchAll,
        abouts, // Por si alguien usa el nombre original
    };
};