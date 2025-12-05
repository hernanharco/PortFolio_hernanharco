import { useEffect } from "react";
import useAboutCRUD from "@/features/about/hooks/useAboutCRUD";
import AboutView from "./AboutView";

const AboutContainer = () => {
  const { currentAbout, abouts, fetchAll } = useAboutCRUD();

  // 1. 🚀 Llama a fetchAll cuando el componente se monta
  useEffect(() => {
    fetchAll();
  }, [fetchAll]); // El useCallback asegura que fetchAll no cambie innecesariamente

  return <AboutView 
    currentAbout={currentAbout} 
    abouts={abouts} 
    fetchAll={fetchAll}
    />;
};

export default AboutContainer;
