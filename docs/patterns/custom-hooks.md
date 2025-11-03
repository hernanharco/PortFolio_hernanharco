## 🎣 Patrón: Custom Hooks (Lógica de Estado y Orquestación)

Los **Custom Hooks** (`use[Nombre].jsx`) representan la capa de **Lógica de Estado** dentro de nuestra arquitectura modular de React. Residen en la carpeta `hooks/` de cada módulo (`src/components/hero/hooks/useHero.jsx`) y actúan como el **Controlador/Modelo** que gestiona el estado, la lógica de negocio y consume los datos del **DAO**.

---

### 🎯 Rol y Principios

| Aspecto | Rol Principal del Custom Hook |
| :--- | :--- |
| **Lógica de Negocio** | Contiene la lógica compleja (validaciones, cálculos, manejo de formularios). |
| **Gestión de Estado** | Maneja el estado local del módulo, incluyendo `isLoading`, `error` y los datos (`data`). |
| **Orquestación** | Es la única capa que interactúa directamente con el **DAO** para obtener o modificar datos. |
| **Abstracción** | Proporciona una interfaz limpia (estado y funciones) que es consumida por el componente de presentación (la Vista). |

> **Principio Clave:** Un Custom Hook **NO** debe retornar JSX ni tener lógica de renderizado. Solo devuelve la lógica necesaria para que el componente de presentación funcione.

---

### 🔗 Interacción con el DAO

El Custom Hook es la **única entidad** del *frontend* que debe importar y llamar a una instancia del DAO.

```javascript
// El Hook actúa como el orquestador:
import HeroDAO from '../service/HeroDAO'; // Se importa la instancia del DAO

## 📝 Estructura de un Custom Hook (Ejemplo: useHero.jsx)
El siguiente ejemplo muestra un custom hook completo que maneja el estado, el ciclo de vida (con useEffect) y el acceso a datos para el módulo Hero.

```text
// Ubicación en el proyecto: frontend/src/components/hero/hooks/useHero.jsx

import { useState, useEffect } from 'react';
import HeroDAO from '../service/HeroDAO'; // Importa la instancia del DAO

/**
 * Hook de lógica para el componente Hero.
 * Maneja el estado, la carga y la interacción con los datos del héroe.
 */
export function useHero() {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de forma asíncrona
  const fetchHeroData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Llama al DAO: Abstrae la lógica HTTP
      const data = await HeroDAO.getAllHeroes(); 
      
      // 2. Actualiza el estado con los datos obtenidos
      setHeroData(data);
    } catch (err) {
      // 3. Maneja el error que se propagó desde el DAO
      setError("No se pudieron cargar los datos de los héroes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto: Ejecuta la carga inicial de datos al montar el componente
  useEffect(() => {
    fetchHeroData();
  }, []);

  // Función de acción de negocio (ej: para un botón)
  const handleLike = () => {
    console.log("Héroe ha recibido un like. Se podría llamar al DAO aquí.");
    // Lógica adicional de negocio...
  };

  // Interfaz pública: lo que el componente de presentación consume
  return {
    heroData,
    isLoading,
    error,
    handleLike,
    refetch: fetchHeroData // Permite que la vista recargue los datos
  };
}
```

## 🔨 Consumo en la Capa de Presentación
El componente de presentación (Hero.jsx) es delgado y puramente declarativo. Solo consume la interfaz del hook y renderiza la UI.

```text
// frontend/src/components/hero/components/Hero.jsx (Vista)

import React from 'react';
import { useHero } from '../hooks/useHero'; // Importa el Custom Hook

export function Hero() {
  // Desestructuración de la interfaz limpia
  const { heroData, isLoading, error, handleLike } = useHero(); 

  if (isLoading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!heroData || heroData.length === 0) return <p>No hay héroes.</p>;

  return (
    <div className="hero-container">
      {heroData.map(hero => (
          <h1 key={hero.id}>{hero.title}</h1>
      ))}
      <button onClick={handleLike}>Me Gusta</button>
    </div>
  );
}
```