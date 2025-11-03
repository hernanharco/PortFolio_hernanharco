# 🏷️ Convenciones de Nomenclatura (Naming)
La consistencia en la nomenclatura es vital para la legibilidad y el mantenimiento del código. Estas convenciones se aplican a todas las carpetas, archivos, componentes y variables del proyecto, especialmente en la capa de frontend.

```text
## 🏷️ Convenciones de Nomenclatura (Naming)

La consistencia en la nomenclatura es vital para la legibilidad y el mantenimiento del código. Estas convenciones se aplican a todas las carpetas, archivos, componentes y variables del proyecto, especialmente en la capa de *frontend*.

---

### 1. Reglas Generales de Casing

| Elemento | Casing Utilizado | Ejemplo |
| :--- | :--- | :--- |
| **Componentes / Tipos** | `PascalCase` | `Hero`, `UserProfile`, `interface User` |
| **Archivos / Módulos de Lógica** | `camelCase` o `PascalCase` (Ver abajo) | `useDataFetcher.js`, `HeroDAO.js` |
| **Funciones / Variables** | `camelCase` | `fetchData`, `isUserLoggedIn` |
| **Constantes Globales** | `SCREAMING_SNAKE_CASE` | `API_BASE_URL`, `MAX_ITEM_COUNT` |

---

### 2. Nomenclatura Específica de Archivos y Carpetas

#### Componentes de React (`.jsx` o `.tsx`)

* **Regla:** Utilizar `PascalCase`. El nombre del archivo debe coincidir con el nombre de la *exportación principal* del componente.
* **Ejemplos:**
    * `Hero.jsx`
    * `ButtonPrimary.jsx`

#### Custom Hooks (`.js` o `.jsx`)

* **Regla:** **Obligatoriamente** deben comenzar con el prefijo `use` y utilizar `camelCase`.
* **Ejemplos:**
    * `useHero.js`
    * `useFormValidation.js`

#### Servicios y DAOs

* **Regla:** Utilizar `PascalCase` y terminar el nombre con su rol.
* **Ejemplos:**
    * `HeroDAO.js`
    * `LoggerService.js`

#### Carpetas de Módulos por Característica

* **Regla:** Utilizar `PascalCase` para el directorio principal de la característica. Los subdirectorios internos (como `components`, `hooks`, `service`) se mantienen en minúsculas.
* **Estructura Ejemplo:**
    ```
    /Hero
    ├── components/
    ├── hooks/
    └── service/
    ```

---

### 3. Funciones y Variables

| Tipo | Regla | Ejemplo |
| :--- | :--- | :--- |
| **Funciones de Manejo de Eventos** | Prefijo `handle` + Evento + Elemento (opcional), usando `camelCase`. | `handleClick`, `handleFormSubmit`, `handleInputChange` |
| **Variables Booleanas** | Prefijo `is`, `has`, `can` o `should`. | `isLoading`, `hasPermission`, `isModalOpen` |
| **Variables de Estado de React** | La función *setter* debe ser `set` + Nombre del Estado. | `const [count, setCount] = useState(0)` |

---

### 4. `docs/guide/structure.md`

```markdown
# Estructura de Directorios: Por Característica

Todos los archivos relacionados con una característica (ejemplo: Hero) se agrupan en una sola carpeta bajo `src/components/`.

```text
src/
└── components/
    └── hero/
        ├── components/
        │   └── Hero.jsx         <- Componente de Presentación (Vista)
        ├── hooks/
        │   └── useHero.jsx      <- Lógica de Estado (Model/Controller)
        └── service/
            └── HeroDAO.js       <- Acceso a Datos (DAO)
```


