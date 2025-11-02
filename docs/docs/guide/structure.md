Estructura de Carpetas (Modularidad por Dominio)

La estructura del código del frontend está organizada por Dominio de Aplicación (característica) en lugar de por tipo de archivo. Esto facilita la eliminación y el mantenimiento de características completas.

Ejemplo de un Módulo (Hero)

Todos los archivos relacionados con una característica (ejemplo: Hero) se agrupan en una sola carpeta bajo src/components/.

src/
└── components/
    └── hero/
        ├── components/
        │   └── Hero.jsx       <- Componente de Presentación (Vista)
        ├── hooks/
        │   └── useHero.jsx    <- Lógica de Estado (Model/Controller)
        └── service/
            └── HeroDAO.js     <- Acceso a Datos (DAO)


🎯 Por qué esta estructura

Cohesión Alta: Todo lo que necesita la característica hero está en un solo lugar.

Acoplamiento Bajo: Si se elimina la carpeta hero, no afecta a otras características del proyecto.

Fácil Navegación: Los desarrolladores saben exactamente dónde buscar la vista, la lógica y los datos.