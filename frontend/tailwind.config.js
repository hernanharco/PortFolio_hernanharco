/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

// Asegúrate de importar el plugin de animación si lo usas
// (Es un paso necesario ya que tu CSS lo importa)
// Si utilizas otro plugin para @custom-variant o @theme, DEBES añadirlo aquí.
import animate from 'tailwindcss-animate'; 

export default {
  // CRÍTICO: Asegura que el contenido escanee TODOS los archivos
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // El resto de tu configuración...
  theme: {
    extend: {},
  },
  plugins: [
    // CRÍTICO: Registra el plugin de animación para que funcione el import
    animate, 
    
    // Si tu proyecto usa @custom-variant o @theme de otra librería (como un preset de Radix UI o un plugin de Shadcn/UI), DEBES añadirlo aquí.
    // Ejemplo (NO descomentar a menos que sepas qué plugin es):
    // require('@nombre/del/otro-plugin'),

    // Si tu CSS utiliza el concepto de layers, déjalo aquí
    plugin(function({ addBase, addUtilities, theme }) {
      addUtilities({
        '.dark': {
          // Esta lógica se suele manejar dentro de un plugin.
          // Si tu tema usa un plugin específico para el dark mode, 
          // debe estar declarado junto a 'animate'.
        }
      });
    }),
  ],
};
