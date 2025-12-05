import React from "react";
// ⭐ CORREGIDO: Eliminamos el estado local `useState` y el hook `useEffect`
import type { HighlightsModalViewProps } from "./HighlightsModalContainer";
import { ArrowUp, ArrowDown, Move } from "lucide-react";

// ⭐ ESTE COMPONENTE ES PURAMENTE DE PRESENTACIÓN.
const HighlightsModal: React.FC<HighlightsModalViewProps> = ({
    tableData,
    handleActionClick,
    handleCloseModal,
    handleReorderClick,
    EditableCell,
    // Handlers de Drag and Drop recibidos como props
    onDragStart, 
    onDragEnd, 
    onDragEnter, 
    onDragLeave, 
    onDrop, 
    onDragOver,
}) => {

    // **GUARDA DE SEGURIDAD:** Asegura que tableData sea un array.
    if (!Array.isArray(tableData)) {
        console.error("HighlightsModal: tableData no es un array y no puede renderizar la tabla.", tableData);
        return (
            <div className="text-center py-8 text-red-600">
                Error de datos: Los highlights no se pudieron cargar correctamente.
            </div>
        );
    }

    return (
        <>
            {/* Estilos para el drag and drop (Se mantienen aquí por ser puramente visuales del drop target) */}
            <style>{`
                .drop-target-highlight {
                    /* Estilo para indicar dónde se soltará el elemento */
                    background-color: #f0f4ff; /* Azul claro */
                    border-top: 3px solid #6366f1; /* Borde superior morado */
                    transition: all 0.1s ease-in-out;
                }
                /* ⭐ Nuevo estilo: Movemos los estilos del elemento arrastrado al CSS global para el Container */
                .dragging-row {
                    opacity: 0.4;
                    border: 2px dashed #6366f1;
                }
            `}</style>

            <div className="w-full overflow-x-auto shadow-lg rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    {/* --- Encabezados de la Tabla (Thead) --- */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mover
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Orden
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Imagen (Ícono)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Color
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Color Fondo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Título
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Texto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Url Imagen
                            </th>
                        </tr>
                    </thead>
                    {/* --- Cuerpo de la Tabla (Tbody) --- */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((row, index) => {
                            const isFirst = index === 0;
                            const isLast = index === tableData.length - 1;

                            return (
                                <tr
                                    key={row.tempId}
                                    className="hover:bg-gray-50 transition duration-150"
                                    draggable
                                    // ⭐ DELEGACIÓN DE TODOS LOS HANDLERS DE D&D AL CONTAINER
                                    onDragStart={(e) => onDragStart(e, row.tempId)}
                                    onDragEnd={(e) => onDragEnd(e, row.tempId)}
                                    onDrop={(e) => onDrop(e, row.tempId)}
                                    onDragOver={onDragOver}
                                    onDragEnter={(e) => onDragEnter(e, row.tempId)}
                                    onDragLeave={(e) => onDragLeave(e, row.tempId)}
                                >
                                    {/* CELDA: Manejador de Arrastre Visual */}
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 cursor-grab hidden">
                                        <div title="Arrastrar para reordenar">
                                            <Move className="w-5 h-5 text-gray-500 hover:text-indigo-600 mx-auto" />
                                        </div>
                                    </td>
                                    {/* CELDA DE ORDEN (Flechas) */}
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 hidden">
                                        <div className="flex flex-col items-center space-y-1">
                                            {/* Flecha Arriba */}
                                            <button
                                                onClick={() => handleReorderClick(row, "up")}
                                                disabled={isFirst}
                                                className={`p-1 rounded-md transition duration-150 ${
                                                    isFirst
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : "text-indigo-600 hover:bg-indigo-100"
                                                }`}
                                                aria-label="Mover arriba"
                                            >
                                                <ArrowUp className="w-4 h-4" />
                                            </button>

                                            <span className="text-xs font-bold">{index + 1}</span>

                                            {/* Flecha Abajo */}
                                            <button
                                                onClick={() => handleReorderClick(row, "down")}
                                                disabled={isLast}
                                                className={`p-1 rounded-md transition duration-150 ${
                                                    isLast
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : "text-indigo-600 hover:bg-indigo-100"
                                                }`}
                                                aria-label="Mover abajo"
                                            >
                                                <ArrowDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                    {/* Campo Acción (+/-) */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleActionClick(row, "add")}
                                                className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition duration-150"
                                                aria-label={`Añadir ${row.title}`}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => handleActionClick(row, "remove")}
                                                className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150"
                                                aria-label={`Eliminar ${row.title}`}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </td>
                                    {/* Campo Imagen (Visual) */}
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center h-full min-h-[5rem]">
                                        <img
                                            src={row.image}
                                            alt={`Imagen para el highlight: ${row.tempId}`}
                                            className="h-10 w-10 rounded-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://placehold.co/40x40/cccccc/000000?text=Icon";
                                            }}
                                        />
                                    </td>
                                    {/* Campos Editables */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <EditableCell row={row} field="color" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <EditableCell row={row} field="secondcolor" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <EditableCell row={row} field="title" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        <EditableCell row={row} field="text" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <EditableCell row={row} field="image" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Botón de Cierre */}
            <div className="mt-4">
                <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition duration-150"
                >
                    Cerrar y Refrescar
                </button>
            </div>
        </>
    );
};

export default HighlightsModal;