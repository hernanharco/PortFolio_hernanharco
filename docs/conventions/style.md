# 💅 Estilo de Código (ESLint y Prettier)

Para garantizar un código limpio, legible y consistente en todo el proyecto, utilizamos una combinación de ESLint para la calidad del código y Prettier para el formato automático.

La configuración de estas herramientas está diseñada para aplicar los estándares de JavaScript/React modernos y para que el equipo dedique menos tiempo a discutir sobre el formato y más tiempo a la lógica de negocio.

## 1. 🧼 Prettier (Formato Consistente)

Prettier se utiliza para aplicar un formato de código estricto y automático, eliminando las variaciones estilísticas entre desarrolladores.

### ⚙️ Configuración (Ejemplo: .prettierrc.json)

Los siguientes son los parámetros clave utilizados en la configuración de Prettier:

{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}


Opción

Valor

Descripción

printWidth

100

Limita la longitud de la línea a 100 caracteres para mejorar la legibilidad.

tabWidth

## 2 Usa 2 espacios para la indentación.

singleQuote

true

Prefiere el uso de comillas simples (' ') en lugar de comillas dobles.

trailingComma

all

Añade comas finales (trailing commas) en todos los lugares posibles (objetos, arrays, funciones).

### 2. 🛡️ ESLint (Calidad del Código)

ESLint se encarga de analizar estáticamente el código para encontrar patrones problemáticos, forzar las convenciones de estilo específicas (ej. nombres de variables) y prevenir errores comunes.

⚙️ Reglas Clave (Ejemplo: .eslintrc.json)

La configuración se extiende de los estándares de Airbnb o React recomendados, con ajustes específicos para el proyecto:

eslint-plugin-react: Reglas para asegurar el uso correcto de React y Hooks.

eslint-plugin-jsx-a11y: Reglas para accesibilidad en elementos JSX.

eslint-config-prettier: Desactiva las reglas de ESLint que entran en conflicto con Prettier.

Convenciones Obligatorias Reforzadas por ESLint

Convención

Descripción

Regla Relacionada

import/order

Los imports deben estar agrupados y ordenados (ej. primero librerías externas, luego rutas internas, luego estilos).

import/order

react-hooks

Se debe seguir la regla de los Hooks (ej. no llamar Hooks de forma condicional).

react-hooks/rules-of-hooks

no-unused-vars

Se prohíbe dejar variables, funciones o imports definidos que no se utilicen.

no-unused-vars

prefer-const

Se prefiere el uso de const sobre let si la variable nunca se reasigna.

prefer-const

## 3. 🚀 Flujo de Trabajo

Se recomienda configurar el entorno de desarrollo (VS Code, WebStorm, etc.) para que ejecute Prettier on Save.

Además, la aplicación del estilo se realiza en dos puntos clave:

Antes del Commit (Hooks de Git): Se utiliza una herramienta como lint-staged y husky para ejecutar ESLint y Prettier solo en los archivos modificados antes de permitir el commit. Esto garantiza que el código que entra al repositorio siempre es válido.

Integración Continua (CI): Las pipelines de CI deben ejecutar la suite completa de ESLint como un paso de verificación obligatorio antes de permitir la fusión a la rama principal (main/master).