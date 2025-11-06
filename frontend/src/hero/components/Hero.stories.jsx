import React from 'react';
import Hero from './HeroSection.jsx'; // Asegúrate que esta ruta sea correcta

// --- Mocks para dependencias ---

// Mock del componente Button (ya que usa shadcn/ui o rutas internas)
// Storybook necesita que todos los imports funcionen.
const ButtonMock = ({ children, onClick, className, variant }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-lg font-semibold transition-colors ${className}`}
    style={{ border: variant === 'outline' ? '2px solid' : 'none' }}
  >
    {children}
  </button>
);

// Mock del hook useHero con tres posibles implementaciones
const useHeroMock = ({ mockType = 'data' }) => {
  const mockHeroData = [
    {
      id: 1,
      city: "Medellín, Colombia",
      subtitle: "Ingeniero de Sistemas con pasión por construir soluciones web escalables y eficientes.",
      exampletext: "Me especializo en el stack MERN/PERN y la integración de microservicios con un fuerte enfoque en la calidad del código y la experiencia del usuario.",
    },
  ];

  if (mockType === 'loading') {
    return { heroes: [], isLoading: true, error: null };
  }
  if (mockType === 'error') {
    return { heroes: [], isLoading: false, error: { message: "Fallo de conexión al API." } };
  }
  // Valor por defecto: 'data'
  return { heroes: mockHeroData, isLoading: false, error: null };
};

// --- Componente Hero con inyección de Mocks ---
// Clonamos el componente original para inyectarle los mocks
const HeroWithMocks = (props) => {
  // Aquí reemplazamos los imports originales con nuestros mocks
  const { heroes, isLoading, error } = useHeroMock({ mockType: props.mockType });
  
  const heroData = heroes.length > 0 ? heroes[0] : null;

  const scrollToAbout = () => {
    console.log("Simulating scroll to #about");
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Manejo de Estados de Carga y Error */}
          {isLoading && (
            <p className="text-xl text-blue-500">Cargando datos del héroe...</p>
          )}
          {error && (
            <p className="text-xl text-red-500">
              Error al cargar datos:{" "}
              {error.message || "Verifica la consola para más detalles."}
            </p>
          )}

          {/* Renderizar Contenido Solo Cuando los Datos Estén Listos */}
          {heroData && (
            <>
              {/* Greeting (usa heroData.city) */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  {/* Se requieren los íconos Lucide, asegurate de tenerlos instalados */}
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="3"></circle></svg>
                  {heroData.city}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Hola, soy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Hernan Arango Cortés
                </span>
              </h1>

              {/* Subtitle (usa heroData.subtitle) */}
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto">
                {heroData.subtitle}
              </h2>

              {/* Description (usa heroData.exampletext) */}
              <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                {heroData.exampletext}
              </p>

              {/* Key Points (Estático) */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  <span>Python • React • MySQL</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-.1.4-.2.6-.2.4 0 .7.1 1 .2.3.1.6.4.7.7.2.3.3.6.3 1s-.1.7-.3 1c-.1.3-.4.6-.7.7-.3.1-.6.2-1 .2-.4 0-.7-.1-1-.2-.3-.1-.6-.4-.7-.7-.2-.3-.3-.6-.3-1s.1-.7.3-1z"></path><path d="M12 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"></path><path d="M12 14v8"></path><path d="M14 20H10"></path></svg>
                  <span>Innovación & Emprendimiento</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.87 0-3.13 1.29-4.14 3.06L12 7l-.36-.67C10.63 4.29 9.37 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7z"></path></svg>
                  <span>Familia como inspiración</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <ButtonMock
                  onClick={scrollToAbout}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Conoce mi historia
                </ButtonMock>
                <ButtonMock
                  onClick={() => console.log("Simulating scroll to #projects")}
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                >
                  Ver mis proyectos
                </ButtonMock>
              </div>

              {/* Scroll Indicator */}
              <div className="animate-bounce">
                <button
                  onClick={scrollToAbout}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="M19 12l-7 7-7-7"></path></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};


// -----------------------------------------------------------------
// METADATA DE LA HISTORIA
// -----------------------------------------------------------------

export default {
  title: 'Portfolio/Secciones/Hero',
  component: HeroWithMocks,
  tags: ['autodocs'],
  parameters: {
    // Esto centra el componente en el lienzo de Storybook
    layout: 'fullscreen', 
  },
};

// -----------------------------------------------------------------
// VARIACIONES DE LAS HISTORIAS
// -----------------------------------------------------------------

// Historia 1: Estado por defecto (con datos)
export const DefaultLoadedState = {
  args: {
    mockType: 'data',
  },
  name: '1. Con Datos Cargados',
};

// Historia 2: Estado de Carga
export const LoadingState = {
  args: {
    mockType: 'loading',
  },
  name: '2. En Carga (Loading)',
};

// Historia 3: Estado de Error
export const ErrorState = {
  args: {
    mockType: 'error',
  },
  name: '3. Con Error',
};

// Nota: Reemplacé los íconos de 'lucide-react' con SVGs inline básicos
// para mantener la historia en un solo archivo y evitar problemas de importación
// en Storybook si no están configurados globalmente.
