// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 1. Importa 'path'
import * as path from 'path'; // Asegúrate de tener esta línea

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 2. Añade esta sección
  resolve: {
    alias: {
      // Configura el alias para que '@' apunte a la carpeta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
});