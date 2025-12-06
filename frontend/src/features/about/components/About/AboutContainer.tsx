import { useEffect, useCallback } from "react";
import useAboutCRUD from "@/features/about/hooks/useAboutCRUD";
import AboutView from "./AboutView";

const AboutContainer = () => {
    // Desestructuramos las operaciones CRUD y el estado
    const { currentAbout, abouts, fetchAll } = useAboutCRUD();

    // 1. Llama a fetchAll cuando el componente se monta
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);    
    
    return (
        <AboutView 
            currentAbout={currentAbout} 
            abouts={abouts} 
            fetchAll={fetchAll}
        />
    );
};

export default AboutContainer;