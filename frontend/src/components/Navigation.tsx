// src/components/Navigation.tsx

import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationItem from "../features/url/NavigationItem";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  href: string;
  label: string;
}

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Usamos los datos del AuthContext
  const { userRole, isLoading } = useAuth();

  const AUTH_URL = "http://localhost:3001/"; // Tu app externa de login

  //console.log("🔍 Navigation detecta userRole:", userRole);

  /* ==========================================================
     Navegación base → siempre visible
     ========================================================== */
  const baseNavItems: NavItem[] = [
    { href: "#home", label: "Inicio" },
    { href: "#about", label: "Sobre mí" },
    { href: "#skills", label: "Habilidades" },
    { href: "#projects", label: "Proyectos" },
    { href: "#experience", label: "Experiencia" },
    { href: "#family", label: "Familia & Valores" },
    { href: "#contact", label: "Contacto" },
  ];

  /* ==========================================================
     Ítem dinámico:
     - Si carga → muestra "Cargando"
     - Si autenticado → Logout
     - Si no → Login
     ========================================================== */
  let authNavItem: NavItem;

  if (isLoading) {
    authNavItem = { href: AUTH_URL, label: "Cargando..." };
  } else if (userRole && userRole !== "default") {
    authNavItem = { href: AUTH_URL + "logout", label: "Logout" };
    //console.log("✔ Navigation: usuario autenticado → Logout");
  } else {
    authNavItem = { href: AUTH_URL, label: "Login" };
  }

  // Lista final de navegación
  const navItems: NavItem[] = [...baseNavItems, authNavItem];

  /* ==========================================================
     Scroll suave a secciones internas (#anchor)
     ========================================================== */
  const scrollToSection = (href: string): void => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barra superior */}
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="shrink-0">
            <span className="text-2xl font-bold text-gray-900">
              Hernan<span className="text-blue-600">AC</span>
            </span>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavigationItem
                  key={item.href}
                  item={item}
                  scrollToSection={scrollToSection}
                  isMobile={false}
                />
              ))}
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navegación móvil */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <NavigationItem
                  key={item.href}
                  item={item}
                  scrollToSection={scrollToSection}
                  closeMenu={closeMenu}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
