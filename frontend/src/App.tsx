// src/App.tsx

import React from "react"; // Necesario para JSX en archivos TSX/TS
import Navigation from "@/components/Navigation";
import Hero from "@/features/hero/components/HeroContainer";
import About from "@/features/about/components/About/AboutContainer";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Family from "@/components/sections/Family";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

// Importamos el Proveedor de Autenticación y el Hook
import { AuthProvider } from "@/context/AuthContext";

// 🚨 Tipificamos el componente como React.FC (Functional Component)
const App: React.FC = () => {
  // Ahora la lógica de fetch y console.log está dentro del AuthProvider
  return (
    // 🚨 ENVOLVEMOS TODA LA APLICACIÓN CON EL PROVEEDOR
    <AuthProvider>      
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
            <Navigation />
        <main>          
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Family />
            <Contact />
        </main>
            <Footer />
      </div>      
    </AuthProvider>
  );
};

export default App;
