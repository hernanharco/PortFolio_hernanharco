// frontend/src/components/ui/button.jsx

import React from 'react';

// El nombre del componente DEBE coincidir con la exportación esperada (Button)
export const Button = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};
// Esta exportación nominal 'export const Button' es la que necesita Contact.jsx