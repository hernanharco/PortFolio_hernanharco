// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // **MUY IMPORTANTE:** Debe apuntar a todos tus archivos JSX
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto cubre todos tus componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Si el código usa extensiones de Tailwind de terceros o plugins
    // como '@custom-variant' y '@theme', es posible que necesites
    // agregar el plugin de Tailwind CSS que las proporciona aquí.
    // Por ejemplo, si usas 'tailwindcss-radix' o 'tailwindcss-experimental'
    // deberías incluirlo aquí si tu código lo requiere.
  ],
};