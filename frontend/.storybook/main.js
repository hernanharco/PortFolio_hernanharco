/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    // 1. Patrón predeterminado de ejemplo (si existe)
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",

    // 2. NUEVO PATRÓN AÑADIDO: Busca dentro de la estructura de componentes
    // Esto cubrirá archivos como src/components/hero/Hero.stories.jsx
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // Indica a Storybook que la carpeta 'docs' que está en la raíz de 'frontend'
  // debe ser tratada como un directorio estático y debe ser accesible.
  staticDirs: ['../docs'],
};
export default config;
