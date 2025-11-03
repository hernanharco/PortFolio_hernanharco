# 🧩 Patrón: Componentes Modulares por Característica

El proyecto utiliza una arquitectura de **Componentes Modulares por Característica** para garantizar un alto grado de cohesión, bajo acoplamiento y fácil escalabilidad en el frontend.

En este patrón, todos los archivos relacionados con una única **característica de la aplicación** se agrupan en un solo directorio, facilitando la navegación, el mantenimiento y la reubicación de código.

## 🌳 Estructura de un Módulo (Ejemplo: Hero)

Cada módulo se encuentra dentro de `frontend/src/components/` y sigue la siguiente estructura:

```text
frontend/src/components/
└── hero/
    ├── components/    <- Componentes de Presentación (Vista)
    │   └── Hero.jsx   
    ├── hooks/         <- Lógica de Estado y Comportamiento (Controlador/Modelo de Vista)
    │   └── useHero.jsx
    ├── service/       <- Lógica de Acceso a Datos (DAO)
    │   └── HeroDAO.js
    ├── lib/           <- Utilidades específicas del módulo
    ├── stories/       <- Archivos de Storybook para testing
    └── index.js       <- Archivo de exportación pública (opcional)