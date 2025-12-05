// src/features/about/hooks/useHighlightsDragAndDrop.ts

import React, { useState, useCallback } from "react";
import type { AboutInput, AboutData, HighlightItem } from "@/features/about/types/AboutData";
import type { HighlightRow } from "@/features/about/components/modal/Highlights/HighlightsModalContainer";

interface DragAndDropProps {
    aboutsDocs: AboutData[];
    tableData: HighlightRow[];
    updateAbout: (id: string, data: AboutInput) => Promise<void>;
    fetchAll: () => Promise<void>;
}

export const useHighlightsDragAndDrop = ({
    aboutsDocs,
    tableData,
    updateAbout,
    fetchAll,
}: DragAndDropProps) => {
    
    const [draggedItemTempId, setDraggedItemTempId] = useState<number | null>(null);

    // Función para persistir el reordenamiento después de la lógica
    const persistReorder = useCallback(
        async (parentAboutId: string, updatedHighlights: HighlightItem[]) => {
            const parentAboutDoc = aboutsDocs.find((doc) => doc._id === parentAboutId);
            if (!parentAboutDoc) {
                console.error("Error: Documento padre no encontrado.");
                return;
            }

            try {
                await updateAbout(parentAboutDoc._id, {
                    ...parentAboutDoc,
                    highlights: updatedHighlights,
                } as AboutInput);
                await fetchAll();
            } catch (error) {
                console.error(`Error al reordenar:`, error);
                fetchAll();
            }
        },
        [aboutsDocs, updateAbout, fetchAll]
    );

    // LÓGICA D&D: Maneja el inicio del arrastre (DOM)
    const onDragStart = useCallback((e: React.DragEvent<HTMLTableRowElement>, tempId: number) => {
        e.dataTransfer.setData("text/plain", tempId.toString());
        setDraggedItemTempId(tempId);
        setTimeout(() => {
            e.currentTarget.classList.add('dragging-row');
        }, 0);
    }, []);

    // LÓGICA D&D: Maneja el final del arrastre (DOM)
    const onDragEnd = useCallback((e: React.DragEvent<HTMLTableRowElement>, tempId: number) => {
        setDraggedItemTempId(null);
        e.currentTarget.classList.remove('dragging-row');
        document.querySelectorAll('.drop-target-highlight').forEach(el => {
            el.classList.remove('drop-target-highlight');
        });
    }, []);

    // LÓGICA D&D: Previene el comportamiento por defecto en onDragOver para permitir el drop
    const onDragOver = useCallback((e: React.DragEvent<HTMLTableRowElement>) => {
        e.preventDefault();
    }, []);
    
    // LÓGICA D&D: Resalta el destino (DOM)
    const onDragEnter = useCallback((e: React.DragEvent<HTMLTableRowElement>, tempId: number) => {
        e.preventDefault();
        if (draggedItemTempId !== tempId) {
            e.currentTarget.classList.add('drop-target-highlight');
        }
    }, [draggedItemTempId]);

    // LÓGICA D&D: Limpia el resalte cuando sale (DOM)
    const onDragLeave = useCallback((e: React.DragEvent<HTMLTableRowElement>, tempId: number) => {
        e.currentTarget.classList.remove('drop-target-highlight');
    }, []);

    // LÓGICA D&D: Maneja el soltar y actualiza la base de datos (LÓGICA)
    const onDrop = useCallback(
        async (e: React.DragEvent<HTMLTableRowElement>, targetTempId: number) => {
            e.preventDefault();
            e.currentTarget.classList.remove('drop-target-highlight');

            const draggedIdStr = e.dataTransfer.getData("text/plain");
            const draggedId = parseInt(draggedIdStr, 10);

            if (isNaN(draggedId) || draggedId === targetTempId) return;

            const draggedRow = tableData.find((row) => row.tempId === draggedId);
            const targetRow = tableData.find((row) => row.tempId === targetTempId);

            if (!draggedRow || !targetRow || draggedRow.parentAboutId !== targetRow.parentAboutId) {
                console.error("Error en Drag & Drop: Filas no encontradas o padres diferentes.");
                return;
            }

            const parentAboutDoc = aboutsDocs.find((doc) => doc._id === draggedRow.parentAboutId);
            if (!parentAboutDoc) return;
            
            let updatedHighlights = [...(parentAboutDoc.highlights || [])];

            // Encontrar los índices en el array de highlights de Firestore usando tableData
            // Nota: Aquí se asume que el orden de tableData y parentAboutDoc.highlights es el mismo
            const draggedIndex = tableData.findIndex(row => row.tempId === draggedId);
            const targetIndex = tableData.findIndex(row => row.tempId === targetTempId);
            
            if (draggedIndex === -1 || targetIndex === -1) {
                console.error("Error de índice en Drag & Drop: No se encontró la fila en la tabla de datos.");
                return;
            }

            // Aplicar el movimiento: Quitar y volver a insertar
            const [itemToMove] = updatedHighlights.splice(draggedIndex, 1);
            updatedHighlights.splice(targetIndex, 0, itemToMove);

            await persistReorder(draggedRow.parentAboutId, updatedHighlights);
        },
        [tableData, persistReorder]
    );
    
    // LÓGICA: Reordenar por botones (Up/Down)
    const handleReorderClick = useCallback(
        async (row: HighlightRow, direction: "up" | "down") => {
            const parentAboutDoc = aboutsDocs.find((doc) => doc._id === row.parentAboutId);
            if (!parentAboutDoc) return;

            let updatedHighlights = [...(parentAboutDoc.highlights || [])];

            const currentIndex = updatedHighlights.findIndex(
                // Identificación precisa del item
                (item) =>
                    item.image === row.image &&
                    item.color === row.color &&
                    item.secondcolor === row.secondcolor &&
                    item.title === row.title &&
                    item.text === row.text
            );

            if (currentIndex === -1) return;
            const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
            if (newIndex < 0 || newIndex >= updatedHighlights.length) return;

            // Intercambio de posiciones
            [updatedHighlights[currentIndex], updatedHighlights[newIndex]] = [
                updatedHighlights[newIndex],
                updatedHighlights[currentIndex],
            ];

            await persistReorder(row.parentAboutId, updatedHighlights);
        },
        [aboutsDocs, persistReorder]
    );

    return {
        draggedItemTempId,
        handleReorderClick,
        onDragStart,
        onDragEnd,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop,
    };
};