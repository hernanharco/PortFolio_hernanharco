import { Users, Target, Plane, Code2 } from "lucide-react";
import { AboutData, HighlightItem } from "../types/AboutData";
import StyledIconWrapper from "./StyledIconWrapper";

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
  const highlightsData = abouts[0].Highlights;

  // ⭐ LÓGICA CORREGIDA PARA MANEJAR ARRAY DE STRINGS
  if (Array.isArray(highlightsData) && highlightsData.length > 0) {
    // Accede al primer elemento (que es el string JSON)
    const jsonString = highlightsData[0];

    if (typeof jsonString === "string") {
      try {
        // Parsea el string para obtener el array de objetos real
        highlights = JSON.parse(jsonString) as HighlightItem[];
      } catch (e) {
        console.error(
          "Error al parsear el string JSON de Highlights. Revisa el formato de la DB.",
          e
        );
        highlights = [];
      }
    }
  } else if (Array.isArray(highlightsData)) {
    // Caso ideal: si es un array de objetos directamente (solución permanente en DB)
    highlights = highlightsData as HighlightItem[];
  }

  // Si la data no tiene items, no renderiza la sección dinámica.
  // console.log("Highlights finales a mostrar:", highlights); // Puedes dejar esto para verificar

  return (
    <div>
      {/* --- SECCIÓN DE HIGHLIGHTS DINÁMICOS --- */}
      <div>
        {highlights.length > 0 && ( // Ahora 'highlights' es un array de objetos real
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* ... El resto de tu mapeo está bien, porque 'item' ahora es un objeto HighlightItem */}
            {highlights.map((item: HighlightItem, index: number) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                {/* IMAGEN */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                )}
                {/* Ejemplo de cómo cambiar el tamaño y el color */}
                {/* Contenedor de ícono estilizado */}
                <div className="flex items-start space-x-4">
                  {/* Reemplazado el div manual y el icono <Users /> por StyledIconWrapper */}
                  <StyledIconWrapper
                    source='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>'
                    iconWidth={32}
                    iconHeight={40}
                    className="bg-blue-600 p-3"
                    iconClassName="w-6 h-6 text-white"
                  />
                  <div>
                    {/* Contenido del Ítem 1 */}
                    <h3>Titulo del Item 1</h3>
                    <p>Texto del Item 1</p>
                  </div>
                </div>

                {/* TÍTULO */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                {/* TEXTO */}
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <StyledIconWrapper
            source='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-icon lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
            iconWidth={24}
            iconHeight={24}
            // 💡 CAMBIO CLAVE: Usamos p-2 para hacerlo más compacto (como el verde)
            className="bg-green-600 p-3 rounded-lg"
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
