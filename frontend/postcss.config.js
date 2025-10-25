// postcss.config.js
export default {
  plugins: {
    // CAMBIO CLAVE: Usa el nuevo paquete de integración
    '@tailwindcss/postcss': {}, 
    // Mantén otros plugins si los tienes, como autoprefixer
    'autoprefixer': {},
  },
};