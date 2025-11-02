import Hero from './Hero.jsx';

// 1. Metadata: Define cómo se organiza tu componente en Storybook
export default {
  // El título en el menú lateral de Storybook
  title: 'Páginas/Hero', 
  // El componente a documentar
  component: Hero,
  // Etiqueta para generar la documentación de propiedades (aunque Hero no tiene props)
  tags: ['autodocs'], 
  // Parámetros: Hace que Storybook no intente mostrar los controles de props
  parameters: {
    // Si tu componente no usa props, es buena práctica desactivar los controles
    controls: { hideNoControlsWarning: true },
  },
};

// 2. Historia: Un ejemplo simple de cómo se renderiza el componente
// Dado que el componente Hero es auto-contenido (no toma props), 
// lo exportamos directamente sin argumentos.
export const VistaPrincipal = {};
