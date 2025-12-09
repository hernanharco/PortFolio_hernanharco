import React, { useState, useCallback } from "react";
import useAboutCRUD from "@/features/about/hooks/useAboutCRUD";
import HighlightsModal from "./HighlightsModal";
import type { AboutInput, HighlightItem, AboutData } from "@/features/about/types/AboutData";

// 1. Importar los nuevos hooks (Ajusta las rutas según tu estructura real si es necesario)
import { useHighlightsData } from "@/features/about/hooks/modal/Highlights/useHighlightsData";
import { useHighlightsCRUD } from "@/features/about/hooks/modal/Highlights/useHighlightsCRUD";
import { useHighlightsDragAndDrop } from "@/features/about/hooks/modal/Highlights/useHighlightsDragAndDrop";

// =========================================================
// INTERFACES (Definiciones locales necesarias para el tipado)
// =========================================================

export interface HighlightRow extends HighlightItem {
    parentAboutId: string;
    tempId: number;
}

interface EditingCell {
    tempId: number;
    field: keyof HighlightItem;
}

// ⭐ 1. Propiedades para el Contenedor
interface HighlightsModalContainerProps {
    onCloseAndRefresh: () => void;
}

// ⭐ 2. Propiedades esperadas por el componente de Vista (Necesaria para tipar EditableCell)
export interface HighlightsModalViewProps {
    tableData: HighlightRow[];
    handleActionClick: (
        row: HighlightRow,
        action: "add" | "remove"
    ) => Promise<void>;
    handleCloseModal: () => void;
    handleReorderClick: (
        row: HighlightRow,
        direction: "up" | "down"
    ) => Promise<void>;
    // El tipo de EditableCell usa la interfaz actual para tiparse
    EditableCell: React.FC<{ row: HighlightRow; field: keyof HighlightItem }>;

    // Handlers de D&D
    onDragStart: (e: React.DragEvent<HTMLTableRowElement>, tempId: number) => void;
    onDragEnd: (e: React.DragEvent<HTMLTableRowElement>, tempId: number) => void;
    onDragEnter: (e: React.DragEvent<HTMLTableRowElement>, tempId: number) => void;
    onDragLeave: (e: React.DragEvent<HTMLTableRowElement>, tempId: number) => void;
    onDrop: (e: React.DragEvent<HTMLTableRowElement>, targetTempId: number) => void;
    onDragOver: (e: React.DragEvent<HTMLTableRowElement>) => void;
}


// =========================================================
// COMPONENTE CONTENEDOR (ORQUESTACIÓN)
// =========================================================

const HighlightsModalContainer: React.FC<HighlightsModalContainerProps> = ({
    onCloseAndRefresh,
}) => {
    // 🎣 HOOKS DE ESTADO Y DATOS BASE
    const { abouts, loading, error, fetchAll, updateAbout } = useAboutCRUD();
    
    // ⭐ ADAPTADOR DE FUNCIÓN: Convierte la función de actualización de Promise<AboutData> a Promise<void>
    const updateAboutVoid = useCallback(
        async (id: string, updatedData: AboutInput) => {
            // Llama a la función original, pero no retorna el resultado.
            await updateAbout(id, updatedData); 
        },
        [updateAbout]
    );

    // 1. DATA: Carga y cálculo del formato de tabla
    const { aboutsDocs, tableData } = useHighlightsData({
        abouts,
        loading,
        error,
        fetchAll,
    });
    
    // 2. ESTADO DE UI: Edición en línea
    const [editingCell, setEditingCell] = useState<EditingCell | null>(null);

    // 3. LÓGICA CRUD: Add, Remove y Persistencia de Edición
    const { handleActionClick, handleSaveEdit } = useHighlightsCRUD({
        aboutsDocs,
        tableData, 
        updateAbout: updateAboutVoid, // Usamos el adaptador
        fetchAll,
    });

    // 4. LÓGICA DE REORDENAMIENTO: Botones y Drag & Drop
    const {
        handleReorderClick,
        onDragStart,
        onDragEnd,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop,
    } = useHighlightsDragAndDrop({
        aboutsDocs,
        tableData,
        updateAbout: updateAboutVoid, // Usamos el adaptador
        fetchAll,
    });

    // 5. HANDLERS DE UI
    const handleCellClick = (row: HighlightRow, field: keyof HighlightItem) => {
        setEditingCell({ tempId: row.tempId, field });
    };

    const handleCloseModal = () => {
        onCloseAndRefresh();
    };

    // 6. ⚙️ Componente Helper de Celda Editable (Renderizado)
    const EditableCell: HighlightsModalViewProps["EditableCell"] = ({
        row,
        field,
    }) => {
        // ⭐ Tipado corregido gracias a HighlightsModalViewProps
        const isEditing =
            editingCell?.tempId === row.tempId && editingCell?.field === field;
        const value = (row[field] || "") as string;

        if (isEditing) {
            const InputComponent = field === "text" ? "textarea" : "input";
            return (
                <InputComponent
                    name={field}
                    defaultValue={value}
                    autoFocus
                    onBlur={(e) => {
                        handleSaveEdit(row, field, e.currentTarget.value);
                        // Cerrar la edición después de guardar
                        setEditingCell(null); 
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && field !== "text") {
                            e.currentTarget.blur();
                        } else if (e.key === "Enter" && e.shiftKey && field === "text") {
                            e.currentTarget.blur();
                        }
                    }}
                    className={`block w-full p-1 border rounded ${
                        field === "text" ? "h-20 sm:text-sm" : "sm:text-sm"
                    }`}
                />
            );
        }

        const isColorField = field === "color" || field === "secondcolor";
        return (
            <div
                onClick={() => handleCellClick(row, field)}
                className="cursor-pointer hover:bg-gray-100 p-1 min-h-[2rem] h-full"
            >
                {isColorField ? (
                    <div className="flex items-center space-x-2">
                        <div
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: value }}
                            title={value}
                        />
                        <span className="text-gray-700 text-xs">{value}</span>
                    </div>
                ) : field === "text" ? (
                    <span className="max-w-xs truncate block text-xs">{value}</span>
                ) : (
                    <span className="text-sm">{value}</span>
                )}
            </div>
        );
    };


    // 7. ⏳ Feedback de Carga y Error
    if (loading && tableData.length === 0) {
        return <div className="text-center py-8 text-gray-600">Cargando documentos...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600 font-bold">Error al cargar: {error}</div>;
    }

    if (tableData.length === 0 && !loading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Gestión de Highlights</h2>
                <div className="text-center py-8 text-gray-600">
                    No hay **Highlights** para mostrar.
                    <button
                        onClick={handleCloseModal}
                        className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 block mx-auto"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        );
    }

    // ⭐ RENDERIZADO FINAL: Pasando todos los handlers a la vista
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gestión de Highlights</h2>
            <HighlightsModal
                tableData={tableData}
                handleActionClick={handleActionClick}
                handleCloseModal={handleCloseModal}
                handleReorderClick={handleReorderClick}
                EditableCell={EditableCell}
                // HANDLERS DE D&D DELEGADOS A LA VISTA
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            />
        </div>
    );
};

export default HighlightsModalContainer;