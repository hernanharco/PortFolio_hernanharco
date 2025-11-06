// **Ubicación en el proyecto: frontend/src/components/hero/service/HeroDAO.js**

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
        // Crea una instancia de axios con la URL base predefinida.
        this.api = axios.create({
            baseURL: HERO_API_URL,
            headers: {
                'Content-Type': 'application/json',
                // Ejemplo de Autenticación:
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
            const response = await this.api.get('/'); 
            return response.data; // Retorna un array de héroes
        } catch (error) {
            console.error("Error fetching all heroes:", error.response || error);
            throw error; // Propagar el error para que la capa lógica lo maneje
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
            // Manejo específico del 404: devuelve null si no se encuentra
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
            // Lanza un error genérico o con detalles del backend
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

// Exporta una instancia para que todos los componentes compartan la misma lógica de acceso a datos
export default new HeroDAO();