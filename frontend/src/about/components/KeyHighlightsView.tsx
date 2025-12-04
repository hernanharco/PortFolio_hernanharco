import { Users, Target, Plane, Code2 } from "lucide-react";
import { AboutData, HighlightItem } from "../types/AboutData";
import StyledIconWrapper from "./StyledIconWrapper";
import Modal from '../../components/ui/Modal';
import { useState } from "react";
import HighlightsModal from "./modal/HighlightsModal";

export interface KeyHighlightsViewProps {
  abouts: AboutData[] | null;
  currentAbout: AboutData | null;
  
}

const KeyHighlightsView: React.FC<KeyHighlightsViewProps> = ({
  currentAbout,
  abouts,  
}) => {
  const hasData = abouts && abouts.length > 0;  

  if (!hasData) {
    return null;
  }

  let highlights: HighlightItem[] = [];
  const highlightsData = abouts[0].highlights;

  /// ✅ LÓGICA CORREGIDA Y LIMPIA PARA DATOS NATIVOS DE MONGOOSE
  if (Array.isArray(highlightsData) && highlightsData.length > 0) {
    // Si la DB ya almacena un array de objetos (el formato Mongoose ideal),
    // lo usamos directamente sin ningún parsing.
    highlights = highlightsData as HighlightItem[];
  } else {
    // Si highlightsData no es un array o está vacío, highlights queda como []
    highlights = [];
  }

  // O una versión más concisa:
  // highlights = Array.isArray(highlightsData) ? (highlightsData as HighlightItem[]) : [];

  // Si la data no tiene items, no renderiza la sección dinámica.
  //console.log("Highlights finales a mostrar:", highlights);  
  const highlightColor = highlights[0].color;

  // 1. Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 2. Nueva función para manejar las acciones de la tabla
  const handleHighlightAction = (id: number, action: 'add' | 'remove') => {
      // Implementa la lógica CRUD aquí (Crear o Eliminar un Highlight)
      console.log(`Acción '${action}' solicitada para el Highlight ID: ${id}`);
      // Ejemplo: si es 'add', podrías abrir un formulario para crear uno nuevo.
      // si es 'remove', podrías llamar a una API para eliminarlo.
  };

  return (
    
    <div className="space-y-6">

      {/* -------------------------------------- */}
      {/* --- BOTÓN PARA ABRIR EL MODAL (NUEVO) --- */}
      {/* -------------------------------------- */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleOpenModal} // ⬅️ Llama a la función para abrir
          className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Abrir Panel de Detalles
        </button>
      </div>

      {/* ----------------------------------- */}
      {/* --- EL COMPONENTE MODAL (NUEVO) --- */}
      {/* ----------------------------------- */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // ⬅️ Llama a la función para cerrar
        title={"Creacion de Highlights"}
      >
        
        <p className="text-gray-700 mb-4">          
          <HighlightsModal
            data={highlights} 
            onActionClick={handleHighlightAction} // Usamos la nueva función
        />        
        </p>
        <button
          onClick={handleCloseModal}
          className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Cerrar
        </button>
      </Modal>
    

      {/* --- SECCIÓN DE HIGHLIGHTS DINÁMICOS --- */}

      <div className={`bg-gradient-to-br from-${highlightColor}-50 to-indigo-50 p-6 rounded-xl`}>
        <div className="flex items-start space-x-4">
          <StyledIconWrapper
            source={highlights[0].image}
            iconWidth={24}
            iconHeight={24}
            // 💡 CAMBIO CLAVE: Usamos p-2 para hacerlo más compacto (como el verde)
            className={`bg-${highlightColor}-600 p-3 rounded-lg`}
            iconClassName="w-6 h-6 text-white"
          />

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {highlights[0].title}
            </h4>
            <p className="text-gray-700">
              {highlights[0].text}
            </p>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE HIGHLIGHTS  --- */}

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <StyledIconWrapper
            source='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>'
            iconWidth={24}
            iconHeight={24}
            // 💡 CAMBIO CLAVE: Usamos p-2 para hacerlo más compacto (como el verde)
            className="bg-blue-600 p-3 rounded-lg"
            iconClassName="w-6 h-6 text-white"
          />

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Liderazgo y Trabajo en Equipo
            </h4>
            <p className="text-gray-700">
              14 años liderando equipos de 5 personas, desarrollando habilidades
              de gestión y comunicación efectiva.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="bg-green-600 p-3 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Enfoque en Resultados
            </h4>
            <p className="text-gray-700">
              Experiencia sólida en análisis de mediciones y manejo de sistemas
              internos empresariales.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-600 p-3 rounded-lg">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Adaptabilidad Global
            </h4>
            <p className="text-gray-700">
              Transición exitosa de Colombia a España, adaptándome a nuevos
              entornos y culturas profesionales.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="bg-orange-600 p-3 rounded-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Transformación Tecnológica
            </h4>
            <p className="text-gray-700">
              Evolución profesional hacia el desarrollo Full Stack, combinando
              experiencia previa con nuevas tecnologías.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyHighlightsView;
