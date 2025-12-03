import React from "react";
import { AboutData } from "../types/AboutData";

export interface AboutHeaderViewProps {
  currentAbout: AboutData | null;
}

const AboutHeaderView: React.FC<AboutHeaderViewProps> = ({ currentAbout }) => {
  
  return (
    currentAbout && (
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {currentAbout.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {currentAbout.subtitle}
        </p>
      </div>
    )
  );
};

export default AboutHeaderView;
