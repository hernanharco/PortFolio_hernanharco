import React from "react";
import { AboutData } from "../../types/AboutData";

// Vistas de About
import AboutHeaderView from "../About/views/AboutHeaderView";
import StoryContentView from "../About/views/StoryContentView";
import KeyHighlightsView from "../About/views/KeyHighlightsView";
import CoreValuesContainer from "./views/CoreValuesContainer"; // ⬅️ Importamos el Contenedor de Valores

// ⚠️ Definición de Props para AboutView
export interface AboutViewProps {
  currentAbout: AboutData | null;
  abouts: AboutData[] | null;
  fetchAll: () => Promise<void>;
}

const AboutView: React.FC<AboutViewProps> = ({
  currentAbout,
  abouts,
  fetchAll,
}) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AboutHeaderView currentAbout={currentAbout} />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <StoryContentView currentAbout={currentAbout} />        
          {/* Key Highlights */}
          <div>
            <KeyHighlightsView
              currentAbout={currentAbout}
              abouts={abouts}
              fetchAllAbouts={fetchAll}
            />{" "}
                       
          </div>
        </div>

        {/* Values Section - Pasa solo el dato al nuevo Contenedor */}
        <CoreValuesContainer 
          currentAbout={currentAbout} 
          fetchAllAbouts={fetchAll}
          />
      </div>
    </section>
  );
};

export default AboutView;
