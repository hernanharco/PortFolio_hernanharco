// DataTable.tsx
import React from "react";

// 1. Definición de la interfaz de datos para la seguridad de tipos
interface DataRow {
  id: number;
  image: string; // URL de la imagen o path
  color: string; // e.g., 'bg-blue-500', 'bg-red-500' para Tailwind
  title: string;
  text: string;
}

interface DataTableProps {
  data: DataRow[];
  onActionClick: (id: number, action: "add" | "remove") => void; // Función para manejar los clics
}

const HighlightsModal: React.FC<DataTableProps> = ({ data, onActionClick }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        {/* --- Encabezados de la Tabla (Thead) --- */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Imagen
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Color
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
          {data.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {/* Campo # */}
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>

              {/* Campo Acción (+/-) */}
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onActionClick(row.id, "add")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition duration-150"
                    aria-label={`Añadir ${row.title}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => onActionClick(row.id, "remove")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150"
                    aria-label={`Eliminar ${row.title}`}
                  >
                    -
                  </button>
                </div>
              </td>

              {/* Campo Imagen */}
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={row.image}
                  alt={`Item ${row.id}`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>

              {/* Campo Color (Representado visualmente) */}
              <td className="px-6 py-4 whitespace-nowrap">
                {/* 🚨 CORRECCIÓN CLAVE: Concatenar el prefijo 'bg-' y la intensidad '-500' */}
                <div
                  className={`h-6 w-6 rounded-full bg-${row.color}-500`}
                ></div>
              </td>

              {/* Campo Título */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.title}
              </td>

              {/* Campo Texto */}
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {row.text}
              </td>

              {/* Campo Url de la Imagen */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.image}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighlightsModal;
