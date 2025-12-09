import { Users, Target, Plane, Code2 } from "lucide-react";
import { AboutData, HighlightItem } from "@/features/about/types/AboutData";
import StyledIconWrapper from "@/components/ui/icons/StyledIconWrapper";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import HighlightsModalContainer from "@/features/about/components/modal/Highlights/HighlightsModalContainer";

export interface KeyHighlightsViewProps {
  abouts: AboutData[] | null;
  currentAbout: AboutData | null;
  fetchAllAbouts: () => void; // Propiedad para refrescar la data principal
}

const KeyHighlightsView: React.FC<KeyHighlightsViewProps> = ({
  currentAbout,
  abouts,
  fetchAllAbouts,
}) => {
  const hasData = abouts && abouts.length > 0;
  if (!hasData) {
    return null;
  }

  let highlights: HighlightItem[] = [];
  const highlightsData = abouts[0]?.highlights;

  if (Array.isArray(highlightsData) && highlightsData.length > 0) {
    highlights = highlightsData as HighlightItem[];
  } else {
    highlights = [];
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  // ⭐ Lógica de Cierre y Refresco
  // La función se activa con (true) solo después de una operación de guardado exitosa o al cerrar.
  const handleCloseModal = (shouldRefresh: boolean = false) => {
    setIsModalOpen(false);
    if (shouldRefresh) {
      // Esto garantiza que la UI se actualice con los datos más frescos después del cierre.
      fetchAllAbouts();
    }
  };

  //console.log("highlight", highlights)

  return (
    <div className="space-y-6">
      {/* --- BOTÓN PARA ABRIR EL MODAL --- */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleOpenModal}
          className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Abrir Panel de Detalles
        </button>
      </div>

      {/* --- EL COMPONENTE MODAL --- */}
      <Modal
        isOpen={isModalOpen}
        // Cierre externo (X o clic fuera) ejecuta el cierre y refresh
        onClose={() => handleCloseModal(true)}
        title={"Creación de Highlights"}
      >
        {/* ✅ CORRECCIÓN DE ANIDACIÓN: Usamos <div> en lugar de <p> */}
        <div className="text-gray-700 mb-4">
          <HighlightsModalContainer
            // ⭐ CALLBACK PARA CERRAR Y REFRESCAR AL FINALIZAR LA OPERACIÓN DE GUARDADO
            onCloseAndRefresh={() => handleCloseModal(true)}
          />
        </div>
      </Modal>

      {/* --- SECCIÓN DE HIGHLIGHTS DINÁMICOS --- */}
      {highlights.length > 0 && (
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-${highlight.color}-50 to-${highlight.secondcolor}-50 p-6 rounded-xl`}
            >
              <div className="flex items-start space-x-4">
                <StyledIconWrapper
                  source={highlight.image}
                  iconWidth={24}
                  iconHeight={24}
                  className={`bg-${highlight.color}-600 p-3 rounded-lg`}
                  iconClassName="w-6 h-6 text-white"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-700">{highlight.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyHighlightsView;
