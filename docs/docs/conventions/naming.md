Convenciones de Nomenclatura y Archivos

Establecer convenciones de nomenclatura estrictas es fundamental para la mantenibilidad y la escalabilidad del portafolio. Estas reglas deben aplicarse de manera uniforme a través de todos los dominios (hero, about, contact, etc.).

1. Archivos de Componentes (React)

Todos los componentes de React deben usar la convención PascalCase y deben llevar la extensión .jsx o .tsx (si usas TypeScript).

Tipo de Componente

Convención

Ejemplo

Propósito

Dominio Principal

[NombreDominio].jsx

Hero.jsx, Contact.jsx

Componente raíz de una sección/dominio.

Subcomponente

[NombreComponente].jsx

HeroTitle.jsx, ContactForm.jsx

Componente interno que se usa solo dentro del dominio.

Componente UI (Global)

[NombreComponente].jsx

Button.jsx, Card.jsx

Componentes reutilizables que van en la carpeta ui/.

2. Archivos de Lógica y Datos

Estos archivos siguen convenciones específicas para indicar su rol en la arquitectura:

Tipo de Archivo

Convención

Ejemplo

Propósito

Custom Hook

CamelCase con prefijo use

useHero.jsx, usePortfolio.jsx

Encapsula la lógica de estado y llama al DAO.

Data Access Object (DAO)

PascalCase con sufijo DAO

HeroDAO.js, ContactDAO.js

Lógica pura de comunicación con el Backend (Axios).

Servicios / Utilidades

CamelCase con prefijo is o sufijo utils

dateUtils.js, isMobile.js

Funciones auxiliares sin dependencia de React.

Tipos/Interfaces (TS)

PascalCase con sufijo Type

HeroType.ts

Definición de estructuras de datos.

3. Estructura de Carpetas

Las carpetas de cada dominio (hero, about, contact) siguen el mismo patrón para mantener la coherencia (Modular/Domain-Driven):

Carpeta

Contenido

components

Componentes React de presentación (Hero.jsx, HeroCard.jsx).

hooks

Lógica de estado y llamada al DAO (useHero.jsx).

service

Lógica de acceso a datos (HeroDAO.js).

lib (Opcional)

Datos mock o constantes específicas del dominio.

stories

Archivos de Storybook (Hero.stories.jsx).

4. Estilos (CSS)

Aunque usamos Tailwind CSS y preferimos las clases, si se requieren archivos de estilos específicos:

Usar kebab-case y mantener la lógica CSS en el archivo principal del componente o en un archivo hermano: Hero.module.css.

5. Variables de Entorno

Las variables de entorno definidas en el .env o configuradas en Vite deben seguir el prefijo estándar de Vite, VITE_, y usar UPPER_SNAKE_CASE:

VITE_API_URL

VITE_STORYBOOK_THEME

Resumen

La coherencia es más importante que la perfección. Aplicar consistentemente PascalCase para los elementos de React (componentes, clases DAO) y camelCase para la lógica pura (hooks, utilidades) nos da una base de código legible.