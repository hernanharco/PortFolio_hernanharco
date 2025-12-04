
import { AboutData } from "../types/AboutData";

//Vistas de About
import AboutHeaderView from "./AboutHeaderView";
import StoryContentView from "./StoryContentView";
import KeyHighlightsView from "./KeyHighlightsView";

export interface AboutViewProps {
  currentAbout: AboutData | null;
  abouts: AboutData[] | null;
}

const AboutView: React.FC<AboutViewProps> = ({ currentAbout, abouts }) => {
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AboutHeaderView 
         currentAbout={currentAbout}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <StoryContentView
          currentAbout={currentAbout}
          />        
          
          {/* Key Highlights */}
          <div>
            <KeyHighlightsView
            currentAbout={currentAbout}
            abouts={abouts}
            />            
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Mis Valores Fundamentales
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Aprendizaje Constante
              </h4>
              <p className="text-gray-600">
                La curiosidad y el deseo de mejorar continuamente impulsan cada
                proyecto y decisión en mi carrera.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Familia como Motor
              </h4>
              <p className="text-gray-600">
                Mi familia es mi mayor inspiración y la razón principal que me
                motiva a superarme cada día.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Espíritu Emprendedor
              </h4>
              <p className="text-gray-600">
                La innovación y el emprendimiento me permiten crear soluciones
                que generen impacto positivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutView;
