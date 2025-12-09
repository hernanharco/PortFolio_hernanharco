// DynamicIcon.tsx
import React from 'react';

export interface DynamicIconProps {
  // ... (otras props)
  source: string; 
  className?: string; 
  width?: number | string;
  height?: number | string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  source, 
  className = '', 
  width, 
  height,
}) => {
  // 1. Detección de código SVG en línea
  const isSvgCode = source.trim().startsWith('<svg');
  // 2. Detección de Base64 de tipo SVG
  const isSvgBase64 = source.startsWith('data:image/svg+xml;base64,');

  let svgContent: string | null = null;

  if (isSvgCode) {
    // Caso 1: Es código SVG completo (string)
    svgContent = source;
  } else if (isSvgBase64) {
    // Caso 2: Es Base64 de tipo SVG. ¡Decodificamos!
    try {
      // Extrae la parte Base64 después de la coma
      const base64String = source.split(',')[1];
      // Decodifica la cadena Base64 a un string normal de SVG
      svgContent = atob(base64String);
    } catch (e) {
      console.error("Error al decodificar Base64:", e);
      // Si falla la decodificación, podemos seguir con el fallback de <img>
    }
  }

  if (svgContent) {
    // Usamos dangerouslySetInnerHTML para inyectar el código SVG decodificado o en línea
    // Esto permite que el SVG sea parte del DOM y reciba estilos como 'text-white'
    return (
      <div 
        className={className} 
        style={{ width, height, display: 'inline-block' }}
        // Inyectamos el contenido SVG.
        // ADVERTENCIA: Asegúrate de que la fuente es confiable.
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  } else {
    // Caso 3: Es una URL o Base64 que no es SVG (PNG, JPG, etc.)
    return (
      <img
        src={source}
        alt="Icono dinámico"
        className={className}
        width={width}
        height={height}
        onError={(e) => {
          // ... (manejo de errores)
        }}
      />
    );
  }
};

export default DynamicIcon;