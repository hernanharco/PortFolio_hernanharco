import React from "react";
import { AboutData } from "../types/AboutData";

export interface StoryContentViewProps {
  currentAbout: AboutData | null;
}

const StoryContentView: React.FC<StoryContentViewProps> = ({
  currentAbout,
}) => {
  return (
    currentAbout && (
      <div className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {currentAbout.titlestory}
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6 text-justify">
            {currentAbout.storycontent1}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6 text-justify">
            {currentAbout.storycontent2}
          </p>

          <p className="text-gray-700 leading-relaxed text-justify">
            {currentAbout.storycontent3}
          </p>
        </div>
      </div>
    )
  );
};

export default StoryContentView;
