import React, { useCallback } from "react";
// ✅ Importación corregida: CoreValuesViewProps ya no se importa aquí, CoreValuesView solo por defecto.
import CoreValuesView from "./CoreValuesView";
import useAboutCRUD from "@/features/about/hooks/useAboutCRUD";
import { AboutData, CoreValueItem } from "@/features/about/types/AboutData";

// ⭐ 1. Interfaz de Props para el Contenedor
export interface CoreValuesContainerProps {
  currentAbout: AboutData | null;
  fetchAllAbouts: () => void; // Propiedad para refrescar la data principal
}

const CoreValuesContainer: React.FC<CoreValuesContainerProps> = ({
  currentAbout,
  fetchAllAbouts,
}) => {
  const { addCoreValue, removeCoreValue, updateAbout } = useAboutCRUD();

  // --------------------------------------------------------
  // LÓGICA 1: AÑADIR NUEVO VALOR (PATCH /add)
  // --------------------------------------------------------

  const handleAddValueClick = useCallback(async () => {
    if (!currentAbout || !currentAbout._id) {
      console.error(
        "No se puede añadir valor: currentAbout o ID no disponibles."
      );
      return;
    }

    const newCoreValue: CoreValueItem = {
      title: "Nuevo Valor Fundamental",
      text: "Haz click para editar la descripción.",
      image: "💡",
    };

    try {
      await addCoreValue(currentAbout._id, newCoreValue);

      // 🚨 CLAVE: Volver a cargar los datos completos del servidor
      fetchAllAbouts();
      console.log(
        "currentAbout en Container (Recibido como prop): ",
        currentAbout
      );
    } catch (error) {
      console.error("Error al guardar el nuevo valor:", error);
    }
  }, [currentAbout, addCoreValue]);

  // --------------------------------------------------------
  // LÓGICA 2: ACTUALIZAR VALOR EXISTENTE (PUT - Envía documento completo)
  // --------------------------------------------------------

  const handleUpdateValue = useCallback(
    async (index: number, field: keyof CoreValueItem, value: string) => {
      if (!currentAbout || !currentAbout._id) {
        console.error(
          "No se puede actualizar valor: currentAbout o ID no disponibles."
        );
        return;
      } // 1. Crea una copia del array de Core Values

      const updatedCoreValues: CoreValueItem[] = [
        ...(currentAbout.corevalues || []),
      ];

      if (updatedCoreValues[index]) {
        // 2. Modifica el valor localmente (basándose en la versión más reciente, que es currentAbout)
        updatedCoreValues[index] = {
          ...updatedCoreValues[index],
          [field]: value,
        } as CoreValueItem;
      } else {
        console.error(`Índice ${index} fuera de rango.`);
        return;
      } // 3. Recrea el objeto AboutData completo

      const updatedAboutData = {
        ...currentAbout,
        corevalues: updatedCoreValues,
      };

      // 4. Envía la actualización (PUT) excluyendo _id y __v
      const { _id, __v, ...dataToSend } = updatedAboutData;

      try {
        await updateAbout(currentAbout._id, dataToSend);

        // 🚨 CLAVE: Volver a cargar los datos completos del servidor
        fetchAllAbouts();
      } catch (error) {
        console.error("Error al actualizar el valor:", error);
      }
    },
    [currentAbout, updateAbout]
  );

  // --------------------------------------------------------
  // LÓGICA 3: ELIMINAR VALOR (PATCH /remove)
  // --------------------------------------------------------
  const handleRemoveValue = useCallback(
    // ⭐ AHORA RECIBE EL ÍNDICE
    async (index: number) => {
      if (!currentAbout || !currentAbout._id || !currentAbout.corevalues) {
        console.error(
          "No se puede eliminar valor: currentAbout, ID o Core Values no disponibles."
        );
        return;
      }

      // 1. Obtener el título a partir del índice para usarlo en la confirmación y la API.
      const titleToDelete = currentAbout.corevalues[index]?.title;

      if (!titleToDelete) {
        console.error(`Índice ${index} fuera de rango o valor no encontrado.`);
        return;
      }

      if (
        !window.confirm(
          // Usamos el título que acabamos de encontrar
          `¿Estás seguro de que quieres eliminar el valor "${titleToDelete}"?`
        )
      ) {
        return;
      }
      try {
        // La API generalmente espera el título (o un ID de subdocumento), no el índice
        await removeCoreValue(currentAbout._id, titleToDelete); // 🚨 CLAVE: Volver a cargar los datos completos del servidor

        fetchAllAbouts();
      } catch (error) {
        console.error("Error al eliminar el valor:", error);
      }
    }, // ⭐ AÑADIR fetchAllAbouts a las dependencias
    [currentAbout, removeCoreValue, fetchAllAbouts]
  );

  return (
    <CoreValuesView
      currentAbout={currentAbout}
      handleAddValueClick={handleAddValueClick}
      handleUpdateValue={handleUpdateValue}
      handleRemoveValue={handleRemoveValue}
    />
  );
};

export default CoreValuesContainer;
