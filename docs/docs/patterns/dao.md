Patrón DAO (Data Access Object) con Axios

El Patrón DAO (Data Access Object) es un principio fundamental en este proyecto para gestionar la separación de responsabilidades (SoC) entre la capa de presentación (los componentes de React) y la capa de persistencia de datos (las APIs del Backend).

En este proyecto, hemos elegido utilizar Axios para manejar las peticiones HTTP dentro de la capa DAO.

🎯 Definición y Propósito

Un DAO es una clase o un objeto que:

Aísla la Lógica de Acceso: Encapsula todos los detalles sobre cómo obtener datos (construcción de URLs, métodos HTTP, manejo de headers, y tratamiento de errores de red).

Devuelve Datos Limpios: Se asegura de que, si la llamada es exitosa, siempre devuelva los datos en un formato predecible y listo para ser consumido por la lógica de la aplicación (los Custom Hooks).

Importante: Un componente de React o un Custom Hook NUNCA debe hacer una petición HTTP directamente. Solo debe interactuar con una instancia del DAO.

📁 Ubicación y Nomenclatura

Los archivos DAO se ubican dentro de la carpeta de servicio de cada dominio y se implementan como clases exportadas como una única instancia (export default new [Dominio]DAO();):

src/components/[dominio]/service/[Dominio]DAO.js


Ejemplo: Para la característica del héroe, usamos src/components/hero/service/HeroDAO.js.

🛠️ Estructura de un DAO (Basado en Clase y Axios)

Usamos una clase para crear una instancia de Axios centralizada, lo que nos permite configurar la URL base y los headers (como la autenticación) una sola vez en el constructor.

Ejemplo de Implementación: HeroDAO.js

import axios from 'axios';

// La URL base de tu API (ej: 'http://backend:8000/api/hero')
// En producción, esto vendría de una variable de entorno inyectada por Docker o Vite.
const API_BASE_URL = 'http://localhost:8001/api/hero'; 

/**
 * Clase Data Access Object (DAO) para el recurso 'hero'.
 * Encapsula toda la lógica de las llamadas HTTP a la API.
 */
class HeroDAO {

    constructor() {
        // Crea una instancia de axios con la URL base predefinida.
        // Esto simplifica las llamadas y permite configuraciones globales (ej. tokens de auth)
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                // Si usas autenticación con tokens (ej. JWT), la agregarías aquí
                // 'Authorization': `Bearer ${token}` 
            }
        });
    }

    /**
     * GET /api/hero/ - Obtener todos los héroes
     */
    async getAllHeroes() {
        try {
            // Axios maneja la conversión de JSON automáticamente en la propiedad 'data'
            const response = await this.api.get('/'); 
            return response.data; // Retorna un array de héroes
        } catch (error) {
            // El manejo de errores de axios es consistente
            console.error("Error fetching all heroes:", error.response || error);
            throw error;
        }
    }

    /**
     * POST /api/hero/ - Crear un nuevo héroe
     */
    async createHero(heroData) {
        try {
            const response = await this.api.post('/', heroData);
            return response.data; // Retorna el héroe recién creado
        } catch (error) {
            console.error("Error creating hero:", error.response || error);
            throw new Error(error.response?.data?.detail || error.message);
        }
    }
    
    // ... Implementaciones de getHeroById, updateHero, deleteHero, etc.
}

// Exporta una instancia única de la clase para usarla en los Custom Hooks
export default new HeroDAO();
