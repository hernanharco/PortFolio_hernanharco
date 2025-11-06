import axios from 'axios';
import { API_BASE_URL } from '@/config/apiConfig';

// La URL base de tu API (ej: el endpoint de tu servicio backend)
const HERO_API_URL = `${API_BASE_URL}/hero`;

/**
 * Clase Data Access Object (DAO) para el recurso 'hero'.
 * Encapsula toda la lógica de las llamadas HTTP a la API.
 */
class HeroDAO {

    constructor() {
        // Crea una instancia de axios con la URL base relativa.
        this.api = axios.create({
            baseURL: HERO_API_URL,
            headers: {
                'Content-Type': 'application/json',
                // Si usas tokens, actívalo aquí:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        });
    }

    // --- OPERACIONES READ (Lectura) ---

    /**
     * GET /api/hero/ - Obtener todos los héroes.
     */
    async getAllHeroes() {
        try {
            // Llama a /api/hero/, que será redirigido a la Netlify Function 'hero'
            const response = await this.api.get('/'); 
            return response.data; // Retorna un array de héroes
        } catch (error) {
            console.error("Error fetching all heroes:", error.response || error);
            // El error 'Network Error' o 'CORS' debería desaparecer si las funciones devuelven el encabezado CORS.
            throw error; 
        }
    }

    /**
     * GET /api/hero/{id}/ - Obtener un héroe por ID.
     */
    async getHeroById(id) {
        try {
            const response = await this.api.get(`/${id}/`);
            return response.data; // Retorna el objeto héroe
        } catch (error) {
            console.error(`Error fetching hero with id ${id}:`, error.response || error);
            if (error.response && error.response.status === 404) {
                return null; 
            }
            throw error;
        }
    }

    // --- OPERACIONES CREATE (Creación) ---

    /**
     * POST /api/hero/ - Crear un nuevo héroe.
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
    
    // --- OPERACIONES UPDATE (Actualización) ---

    /**
     * PUT /api/hero/{id}/ - Actualizar completamente un héroe.
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
     * PATCH /api/hero/{id}/ - Actualizar parcialmente un héroe.
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

    // --- OPERACIONES DELETE (Eliminación) ---

    /**
     * DELETE /api/hero/{id}/ - Eliminar un héroe.
     */
    async deleteHero(id) {
        try {
            await this.api.delete(`/${id}/`); 
            return true; // Éxito en la eliminación
        } catch (error) {
            console.error(`Error deleting hero with id ${id}:`, error.response || error);
            throw error;
        }
    }
}

// Exporta una instancia
export default new HeroDAO();