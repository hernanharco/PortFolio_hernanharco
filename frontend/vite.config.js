/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

// Importaciones de Vitest
// Las importaciones de Storybook se han eliminado (storybookTest, playwright)

// =======================================================
// Lógica para definir __dirname en entornos ESM (Vite)
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// =======================================================

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configuración de alias
      "@": path.resolve(__dirname, "./src")
    }
  },
  // La sección 'test' ahora solo necesita la configuración base de Vitest (si la usas para otras pruebas)
  test: {
    globals: true,
    // Opcional: puedes añadir esto si quieres que las APIs de Vitest sean globales
    environment: 'jsdom' // Si estás probando componentes de React
    // La configuración de 'projects' y 'browser' se ha eliminado por completo,
    // ya que estaba dedicada exclusivamente a las pruebas de Storybook.

    // Si planeas hacer pruebas unitarias o de integración sin navegador:
    // setupFiles: ['./setupTests.js'], // Ejemplo de archivo de configuración de pruebas
    ,
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.js']
      }
    }]
  }
});