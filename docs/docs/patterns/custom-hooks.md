Patrón Custom Hooks (Lógica de Estado)

Los Custom Hooks (use...) son la capa que conecta los Componentes de Presentación (la vista) con la Capa de Acceso a Datos (el DAO). Representan la lógica de negocio y gestión de estado de cada dominio.

🎯 Definición y Propósito

Un Custom Hook tiene la siguiente responsabilidad:

Llamar al DAO: Invocan los métodos del DAO (HeroDAO.getAllHeroes()) para obtener, crear o modificar datos.

Gestión de Estado: Utilizan useState y useEffect para manejar el ciclo de vida de los datos, los estados de carga (isLoading), y los estados de error (error).

Proveer Interfaz: Devuelven un objeto simple que contiene los datos y las funciones que el componente de React necesita para renderizar la interfaz.

Regla de Oro: Los componentes de presentación (ej. Hero.jsx) no deben tener lógica compleja de estado o useEffect. Solo deben llamar a un Custom Hook y renderizar lo que este les proporciona.

📁 Ubicación y Nomenclatura

Los Custom Hooks se ubican dentro de la carpeta hooks de cada dominio:

src/components/[dominio]/hooks/use[Dominio].jsx


Ejemplo: Para la característica del héroe, usamos src/components/hero/hooks/useHero.jsx.

🛠️ Estructura de un Custom Hook

Un Custom Hook típico sigue un patrón de inicialización, carga de datos y retorno de interfaz.

Ejemplo: useHero.jsx

// src/components/hero/hooks/useHero.jsx
import { useState, useEffect } from 'react';
import HeroDAO from '../service/HeroDAO'; // Importamos la instancia del DAO

/**
 * Hook personalizado para manejar el estado y la lógica de la sección Hero.
 * Se encarga de: Cargar datos, gestionar loading y errores.
 * @returns {{ heroData: Object | null, isLoading: boolean, error: string | null }}
 */
export const useHero = () => {
    const [heroData, setHeroData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Llama al método del DAO, que sabe cómo comunicarse con la API
                const data = await HeroDAO.getHeroInfo(); 
                setHeroData(data);
            } catch (err) {
                // Captura y setea el error proporcionado por el DAO
                setError(err.message || "Fallo al obtener datos del héroe.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeroData();
    }, []); 

    // Este objeto es el único punto de contacto con el componente Hero.jsx
    return { 
        heroData, 
        isLoading, 
        error,
        // (Aquí se añadirían funciones para interactuar, ej: updateHero() )
    };
};


🟢 Beneficios Clave del Custom Hook

Beneficio

Descripción

Reusabilidad

La lógica de carga de datos puede ser reutilizada en múltiples componentes sin duplicación.

SoC (Separación)

La vista (Hero.jsx) se vuelve "tonta" (solo renderiza), y la lógica queda en un archivo dedicado.

Pruebas de Unidad

Se puede probar el Custom Hook de forma aislada, simulando la respuesta del DAO sin necesidad de montar la UI.