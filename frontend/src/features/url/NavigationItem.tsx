// src/features/url/NavigationItem.tsx

import React from "react";

/* ==========================================================
   Props del componente NavigationItem
   ========================================================== */
interface NavigationItemProps {
  item: {
    href: string;
    label: string;
  };
  scrollToSection: (href: string) => void;
  closeMenu?: () => void; // Solo usado en móvil
  isMobile: boolean;
}

/* ==========================================================
   Componente que renderiza cada ítem del menú
   ========================================================== */
const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  scrollToSection,
  closeMenu,
  isMobile,
}) => {
  //console.log("📌 NavigationItem:", item);

  // Determina si es ancla interna (#)
  const isInternalLink = item.href.startsWith("#");

  // Clases compartidas
  const baseClasses = isMobile
    ? "text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
    : "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  /* ==========================================================
     Función: abrir ventana de login con tracking
     ========================================================== */
  const openSmallWindow = () => {
    
    // Datos que quieres enviar al sistema externo
    const trackingData = {
      sourceApp: "HernanAC_Portfolio",
      timestamp: new Date().toISOString(),
      status: "login_redirected",
    };

    // Convertimos a JSON → luego codificamos para URL
    const encodedData = encodeURIComponent(JSON.stringify(trackingData));

    // Armamos URL final
    const targetUrl = `${item.href}?tracking=${encodedData}`;

    // Abrimos ventana pequeña
    const windowFeatures = "width=600,height=400,resizable=yes,scrollbars=yes";
    window.open(targetUrl, "_blank", windowFeatures);

    // Cerrar menú móvil
    if (closeMenu) closeMenu();
  };

  /* ==========================================================
     Si es ancla interna (#) → scroll suave
     ========================================================== */
  if (isInternalLink) {
    return (
      <button onClick={() => scrollToSection(item.href)} className={baseClasses}>
        {item.label}
      </button>
    );
  }

  /* ==========================================================
     Si NO es interna → abrir login/ logout en ventana pequeña
     ========================================================== */
  return (
    <button onClick={openSmallWindow} className={baseClasses}>
      {item.label}
    </button>
  );
};

export default NavigationItem;
