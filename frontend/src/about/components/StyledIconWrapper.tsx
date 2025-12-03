// StyledIconWrapper.tsx

import React from "react";
import DynamicIcon from "./DynamicIcon";

interface StyledIconProps {
  source: string; // 💡 CAMBIO CLAVE: Reemplazamos 'size' por 'iconWidth' y 'iconHeight'
  iconWidth?: number | string; // Nuevo: Ancho del ícono dentro del contenedor
  iconHeight?: number | string; // Nuevo: Alto del ícono dentro del contenedor
  className?: string;
  iconClassName?: string;
}

const StyledIconWrapper: React.FC<StyledIconProps> = ({
  source, // 💡 CAMBIO CLAVE: Usamos las nuevas props
  iconWidth = 24, // Establece un valor por defecto
  iconHeight = 24, // Establece un valor por defecto
  className = "",
  iconClassName = "",
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg";

  return (
    <div className={`${baseClasses} ${className}`}>
                       {" "}
      <DynamicIcon
        source={source} // 💡 CAMBIO CLAVE: Pasamos width y height separados
        width={iconWidth}
        height={iconHeight}
        className={iconClassName}
      />
                   {" "}
    </div>
  );
};

export default StyledIconWrapper;
