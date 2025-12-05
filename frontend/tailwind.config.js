/** @type {import('tailwindcss').Config} */

// 1. Definimos una lista de todos los colores base de Tailwind
const colors = [
  'slate', 'gray', 'zinc', 'neutral', 'stone', 
  'red', 'orange', 'amber', 'yellow', 'lime', 
  'green', 'emerald', 'teal', 'cyan', 'sky', 
  'blue', 'indigo', 'violet', 'purple', 'fuchsia', 
  'pink', 'rose',
];
// 2. Definimos las tonalidades que necesitas dinámicamente
const shades = ['50', '600'];

// Creamos un array vacío para almacenar todas las clases a forzar
const safelistClasses = [];

// Generamos las combinaciones para el fondo del ícono (bg-color-600)
colors.forEach(color => {
  safelistClasses.push({
    pattern: new RegExp(`bg-${color}-(${shades.join('|')})`),
  });
});

// Generamos las combinaciones para los degradados (from/to-color-50)
colors.forEach(color => {
  safelistClasses.push({
    pattern: new RegExp(`(from|to)-${color}-50`),
  });
});


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // 🌟 SECCIÓN MODIFICADA: SAFELIST con TODOS los colores de Tailwind 🌟
  safelist: safelistClasses,
  
  theme: {
    extend: {
      colors: {
        // ... (Tus colores personalizados basados en HSL var(--...)) ...
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}