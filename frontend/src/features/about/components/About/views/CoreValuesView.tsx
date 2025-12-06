import React, { useState, useCallback, useEffect } from "react"; // ✅ Importar useState, useEffect
import { Plus, XCircle } from "lucide-react";

import { AboutData, CoreValueItem } from "@/features/about/types/AboutData";

// Definición de Props de la Vista (Sin cambios en las props)
export interface CoreValuesViewProps {
  currentAbout: AboutData | null;
  handleAddValueClick: () => Promise<void>;
  handleUpdateValue: (
    index: number,
    field: keyof CoreValueItem,
    value: string
  ) => Promise<void>;
  // ⭐ AHORA ACEPTA SÓLO EL ÍNDICE
  handleRemoveValue: (index: number) => Promise<void>;
}

const CoreValuesView: React.FC<CoreValuesViewProps> = ({
  currentAbout,
  handleAddValueClick,
  handleUpdateValue,
  handleRemoveValue,
}) => {
  // 1. ESTADO LOCAL: Almacena los valores mientras el usuario edita
  const [localValues, setLocalValues] = useState<CoreValueItem[]>([]);

  // Obtener los valores del estado global para la inicialización
  const remoteValues: CoreValueItem[] = currentAbout?.corevalues || [];
  const sectionTitle =
    currentAbout?.titlecorevalues || "Mis Valores Fundamentales";

  // 2. SINCRONIZACIÓN: Sincronizar el estado local cuando cambie el estado global
  // ESTE EFECTO es el que hace que el nuevo valor aparezca automáticamente.
  useEffect(() => {
    setLocalValues(remoteValues);
  }, [remoteValues]);

  // 3. FUNCIÓN DE CAMBIO (SINCRÓNICA) - Actualiza el estado local inmediatamente
  const handleChange = useCallback(
    (index: number, field: keyof CoreValueItem, value: string) => {
      setLocalValues((prevValues) => {
        const newValues = [...prevValues];
        if (newValues[index]) {
          // Actualiza el campo específico en la copia local
          newValues[index] = {
            ...newValues[index],
            [field]: value,
          } as CoreValueItem;
        }
        return newValues;
      });
    },
    []
  );

  // 4. FUNCIÓN DE GUARDADO (ASÍNCRONA) - Persiste el dato (onBlur)
  const handleBlur = useCallback(
    (index: number, field: keyof CoreValueItem, value: string) => {
      // Llama a la función del Contenedor para enviar la actualización a la API (PUT)
      handleUpdateValue(index, field, value);
    },
    [handleUpdateValue]
  );

  if (!currentAbout) {
    return null;
  }

  return (
    <div>
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-8">
          {sectionTitle}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Usamos localValues para renderizar */}
          {localValues.map((value, index) => (
            <div
              key={index} // Considera usar un ID único si está disponible para React
              className="p-6 border border-gray-100 rounded-lg shadow-sm bg-white relative"
            >
              {/* BOTÓN DE ELIMINAR */}
              <button
                onClick={() => handleRemoveValue(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Eliminar ${value.title}`}
              >
                <XCircle className="w-5 h-5" />
              </button>

              {/* CAMPO DE IMAGEN (ICONO/URL) */}
              <div className="mb-4 flex flex-col items-center">
                <input
                  type="text"
                  value={value.image} // ✅ Valor controlado por el estado local
                  onChange={(e) => handleChange(index, "image", e.target.value)}
                  onBlur={(e) => handleBlur(index, "image", e.target.value)}
                  placeholder="URL o Emoji"
                  className="text-center text-sm text-gray-500 w-full mb-2 border border-dashed p-1 rounded hover:border-blue-400 focus:outline-none"
                />
                <img
                  src={value.image}
                  alt={value.title || "Icono"}
                  className="h-10 w-10 mx-auto object-contain"
                />
              </div>

              {/* CAMPO DE TÍTULO */}
              <input
                type="text"
                value={value.title} // ✅ Valor controlado por el estado local
                onChange={(e) => handleChange(index, "title", e.target.value)}
                onBlur={(e) => handleBlur(index, "title", e.target.value)}
                placeholder="Título del Valor"
                className="text-lg font-semibold text-gray-900 mb-2 w-full text-center border-b hover:border-blue-400 focus:outline-none"
              />

              {/* CAMPO DE TEXTO/DESCRIPCIÓN */}
              <textarea
                value={value.text} // ✅ Valor controlado por el estado local
                onChange={(e) => handleChange(index, "text", e.target.value)}
                onBlur={(e) => handleBlur(index, "text", e.target.value)}
                placeholder="Descripción del Valor"
                rows={3}
                className="text-gray-600 w-full text-center resize-none border-b hover:border-blue-400 focus:outline-none"
              />
            </div>
          ))}

          {/* BOTÓN DE ADICIÓN (sin cambios) */}
          <button
            onClick={handleAddValueClick}
            className="p-6 h-full border-2 border-dashed border-gray-300 text-gray-500 rounded-lg 
                            hover:border-green-500 hover:text-green-600 hover:bg-green-50 
                            transition duration-200 ease-in-out 
                            flex flex-col items-center justify-center cursor-pointer"
            aria-label="Agregar un nuevo valor fundamental"
          >
            <Plus className="w-8 h-8 mb-2 stroke-1" />
            <span className="text-lg font-medium">Añadir Nuevo Valor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoreValuesView;
