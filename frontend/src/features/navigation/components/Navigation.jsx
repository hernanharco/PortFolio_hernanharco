import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    // 1. URL completa para la navegación externa
    { href: "http://localhost:3000/signup", label: "login" },
    { href: "#home", label: "Inicio" },
    { href: "#about", label: "Sobre mí" },
    { href: "#skills", label: "Habilidades" },
    { href: "#projects", label: "Proyectos" },
    { href: "#experience", label: "Experiencia" },
    { href: "#family", label: "Familia & Valores" },
    { href: "#contact", label: "Contacto" },
  ];

  // Función para hacer scroll solo a anclas (secciones internas)
  const scrollToSection = (href) => {
    // 2. Verificamos que sea un ancla
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Cerramos el menú móvil si está abierto
    setIsMenuOpen(false);
  };
  
  // Nueva función para manejar tanto el scroll como la navegación externa
  const handleNavigation = (href) => {
    if (href.startsWith("#")) {
      // Navegación interna (scroll)
      scrollToSection(href);
    } else {
      // Navegación externa (redirección)
      window.location.href = href;
    }
    setIsMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <span className="text-2xl font-bold text-gray-900">
              Hernan<span className="text-blue-600">AC</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  // 4. Usamos handleNavigation
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  // 4. Usamos handleNavigation
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;