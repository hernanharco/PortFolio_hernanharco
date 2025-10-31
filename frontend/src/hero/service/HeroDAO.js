import axios from 'axios';

// La URL base de tu API
const API_BASE_URL = 'http://localhost:8001/api/hero'; 

/**
 * Clase Data Access Object (DAO) para el recurso 'hero'.
 * Encapsula toda la lógica de las llamadas HTTP a la API.
 */
class HeroDAO {

    constructor() {
        // Opcional: Crear una instancia de axios con la URL base predefinida
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
            // axios maneja la conversión de JSON automáticamente en la propiedad 'data'
            const response = await this.api.get('/'); 
            return response.data; // Retorna un array de héroes
        } catch (error) {
            // El manejo de errores de axios es consistente
            console.error("Error fetching all heroes:", error.response || error);
            throw error;
        }
    }

    /**
     * GET /api/hero/{id}/ - Obtener un héroe por ID
     */
    async getHeroById(id) {
        try {
            const response = await this.api.get(`/${id}/`);
            return response.data; // Retorna el objeto héroe
        } catch (error) {
            console.error(`Error fetching hero with id ${id}:`, error.response || error);
            
            // Opcional: Manejar específicamente el caso 404
            if (error.response && error.response.status === 404) {
                return null; 
            }
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
            // Puedes lanzar el error con detalles específicos del servidor
            throw new Error(error.response?.data?.detail || error.message);
        }
    }

    /**
     * PUT /api/hero/{id}/ - Actualizar completamente un héroe
     */
    async updateHero(id, heroData) {
        try {
            const response = await this.api.put(`/${id}/`, heroData);
            return response.data; // Retorna el héroe actualizado
        } catch (error) {
            console.error(`Error updating hero with id ${id}:`, error.response || error);
            throw new Error(error.response?.data?.detail || error.message);
        }
    }

    /**
     * PATCH /api/hero/{id}/ - Actualizar parcialmente un héroe
     */
    async patchHero(id, partialHeroData) {
        try {
            const response = await this.api.patch(`/${id}/`, partialHeroData);
            return response.data; // Retorna el héroe actualizado
        } catch (error) {
            console.error(`Error patching hero with id ${id}:`, error.response || error);
            throw new Error(error.response?.data?.detail || error.message);
        }
    }

    /**
     * DELETE /api/hero/{id}/ - Eliminar un héroe
     */
    async deleteHero(id) {
        try {
            // Para DELETE, el cuerpo de la respuesta suele estar vacío (código 204 No Content)
            await this.api.delete(`/${id}/`); 
            return true; // Retorna éxito
        } catch (error) {
            console.error(`Error deleting hero with id ${id}:`, error.response || error);
            throw error;
        }
    }
}

// Exporta una instancia para que todos los componentes compartan la misma lógica de acceso a datos
export default new HeroDAO();