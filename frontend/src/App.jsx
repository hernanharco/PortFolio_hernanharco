import Navigation from '@/components/Navigation'
import Hero from '@/hero/components/HeroContainer'
import About from '@/about/components/About';
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Family from '@/components/sections/Family'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

// Importamos el Proveedor de Autenticación y el Hook
import { AuthProvider } from '@/context/AuthContext';

function App() {
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
}

export default App;

