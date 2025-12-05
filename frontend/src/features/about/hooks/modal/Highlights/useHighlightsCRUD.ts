// src/features/about/hooks/useHighlightsCRUD.ts

import { useCallback } from "react";
import type { AboutInput, HighlightItem, AboutData } from "@/features/about/types/AboutData";
import type { HighlightRow } from "@/features/about/components/modal/Highlights/HighlightsModalContainer";

interface HighlightsCRUDProps {
    aboutsDocs: AboutData[]; // Data de AboutDAO (incluye _id)
    tableData: HighlightRow[]; // Data plana con tempId y parentId
    updateAbout: (id: string, data: AboutInput) => Promise<void>;
    fetchAll: () => Promise<void>;
}

/**
 * Hook que encapsula la lógica de C(R)UD (Add, Remove, Edit) para los highlights.
 * Asume que el hook principal (useAboutCRUD) retorna Promise<AboutData> pero este hook
 * usa el wrapper Promise<void> para la función updateAbout.
 */
export const useHighlightsCRUD = ({
    aboutsDocs,
    updateAbout,
    fetchAll,
}: HighlightsCRUDProps) => {

    /**
     * Función genérica para encontrar y actualizar el array de highlights dentro del documento About.
     */
    const updateHighlightsInDB = useCallback(
        async (row: HighlightRow, callback: (highlights: HighlightItem[]) => HighlightItem[]) => {
            const parentAboutDoc = aboutsDocs.find((doc) => doc._id === row.parentAboutId);
            if (!parentAboutDoc) {
                console.error("Error: Documento padre no encontrado.");
                return;
            }

            const updatedHighlights = callback([...(parentAboutDoc.highlights || [])]);

            try {
                await updateAbout(parentAboutDoc._id, {
                    ...parentAboutDoc,
                    highlights: updatedHighlights,
                } as AboutInput);
                await fetchAll();
            } catch (err) {
                console.error("Fallo la operación CRUD:", err);
                fetchAll(); 
            }
        },
        [aboutsDocs, updateAbout, fetchAll]
    );

    // LÓGICA: Agregar/Eliminar Highlight
    const handleActionClick = useCallback(
        async (row: HighlightRow, action: "add" | "remove") => {
            // Lógica idéntica a la original, delegando a updateHighlightsInDB
            await updateHighlightsInDB(row, (highlights) => {
                // Se copia la lógica original aquí
                const { tempId, parentAboutId, ...rowWithoutTempId } = row;

                if (action === "add") {
                    highlights.push(rowWithoutTempId as HighlightItem);
                } else if (action === "remove") {
                    let deleted = false;
                    return highlights.filter((item) => {
                        if (deleted) return true;
                        if (
                            item.image === row.image &&
                            item.color === row.color &&
                            item.secondcolor === row.secondcolor &&
                            item.title === row.title &&
                            item.text === row.text
                        ) {
                            deleted = true;
                            return false; 
                        }
                        return true;
                    });
                }
                return highlights;
            });
        },
        [updateHighlightsInDB]
    );

    // LÓGICA: Edición en línea
    const handleSaveEdit = useCallback(
        async (row: HighlightRow, field: keyof HighlightItem, newValue: string) => {
            // Lógica idéntica a la original, delegando a updateHighlightsInDB
            await updateHighlightsInDB(row, (highlights) => {
                // Buscamos el índice por coincidencia exacta de valores (ya que tempId no está en DB)
                const oldIndex = highlights.findIndex(
                    (item) =>
                        item.image === row.image &&
                        item.color === row.color &&
                        item.secondcolor === row.secondcolor &&
                        item.title === row.title &&
                        item.text === row.text
                );

                if (oldIndex === -1) {
                    console.error("Error: Highlight no encontrado para editar.");
                    return highlights;
                }

                const updatedHighlightItem: HighlightItem = {
                    ...highlights[oldIndex],
                    [field]: newValue,
                } as HighlightItem;

                highlights[oldIndex] = updatedHighlightItem;
                return highlights;
            });
        },
        [updateHighlightsInDB]
    );

    return {
        handleActionClick,
        handleSaveEdit,
    };
};