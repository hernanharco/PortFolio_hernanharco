/**
 * Configuración del manual de arquitectura para el Portafolio de Hernán Harco.
 * Documenta la arquitectura, convenciones de código y patrones de diseño.
 */
export default {
  title: 'Manual de Arquitectura (v1.0)',
  description: 'Documentación oficial del proyecto Portafolio. Define la arquitectura, convenciones y patrones de desarrollo.',
  lang: 'es-ES',

  // 👇 Añadido para evitar que el build falle con enlaces locales
  ignoreDeadLinks: [/^http:\/\/localhost/],
  
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Componentes (Storybook)', link: 'http://localhost:6006/?path=/docs/configure-your-project--docs', target: '_blank' }
    ],

    sidebar: [
      {
        text: 'I. Fundamentos y Setup',
        items: [
          { text: 'Introducción', link: '/guide/introduction' }, // Reemplazará el Hello World
          { text: 'Estructura de Carpetas', link: '/guide/structure' }
        ]
      },
      {
        text: 'II. Patrones de Desarrollo',
        items: [
          { text: 'Componentes Modulares', link: '/patterns/modular-components' },
          { text: 'Patrón DAO (Data Access Object)', link: '/patterns/dao' },
          { text: 'Custom Hooks', link: '/patterns/custom-hooks' }
        ]
      },
      {
        text: 'III. Convenciones de Código',
        items: [
          { text: 'Nomenclatura', link: '/conventions/naming' },
          { text: 'Estilo de Código (ESLint/Prettier)', link: '/conventions/style' }
        ]
      }
    ],

    socialLinks: [
      // Puedes reemplazar esto con tus enlaces de GitHub/LinkedIn
      { icon: 'github', link: 'https://github.com/tu-usuario/tu-repo' },
    ]
  }
}
