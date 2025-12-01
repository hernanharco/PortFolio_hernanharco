import Navigation from "@/components/Navigation";
import Hero from "@/hero/components/HeroSection";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Family from "@/components/sections/Family";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

//prueba
import { useEffect } from "react";

// URL de tu endpoint de prueba en Django
const API_URL = 'http://localhost:8000/auth/role/';

function App() {
  useEffect(() => {
    const fetchRole = async () => {
      try {
        // 🚨 ¡IMPORTANTE! Ya NO necesitas getCookie() ni localStorage.getItem()
        // El navegador se encargará de adjuntar la cookie 'authToken'

        const response = await fetch(API_URL, {
          method: "GET",
          // Ya NO incluimos el encabezado 'Authorization' manualmente.
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
          // Asegúrate de que la configuración de CORS en Django (settings.py)
          // permita el envío de credenciales con 'Access-Control-Allow-Credentials: true'
        });

        const data = await response.json();

        if (response.ok) {
          // Si el middleware fue exitoso, verás el rol:
          console.log("✅ Token enviado por Cookie. Rol recibido:", data.role);
        } else {
          // Si el middleware detectó un error (401/403), lo verás aquí:
          console.error("❌ Error de autenticación:", data.message);
        }
      } catch (error) {
        console.error("❌ Error de conexión con el backend:", error);
      }
    };

    fetchRole();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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
  );
}

export default App;
