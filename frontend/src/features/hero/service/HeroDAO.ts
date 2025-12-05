//service/HeroDao.ts
import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "@/config/apiConfig";
import type { Hero, HeroInput } from "@/hero/types/HeroData";

/**
 * Clase Data Access Object (DAO) para el recurso 'hero'.
 * Encapsula toda la lógica de las llamadas HTTP a la API.
 */
class HeroDAO {
  private api: AxiosInstance;

  constructor() {
    // Crea una instancia de axios con la URL base
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/heroes`,
      headers: {
        "Content-Type": "application/json",
        // Si usas tokens, activa aquí:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  // --- OPERACIONES READ (Lectura) ---

  /** GET /heroes/ - Obtener todos los héroes */
  async getAllHeroes(): Promise<Hero[]> {
    try {
      const response = await this.api.get<Hero[]>("/");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching all heroes:", error.response || error);
      throw error;
    }
  }

  /** GET /heroes/{id}/ - Obtener un héroe por ID */
  async getHeroById(id: number): Promise<Hero | null> {
    try {
      const response = await this.api.get<Hero>(`/${id}/`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching hero with id ${id}:`, error.response || error);
      if (error.response?.status === 404) return null;
      throw error;
    }
  }

  // --- OPERACIONES CREATE (Creación) ---

  /** POST /heroes/ - Crear un nuevo héroe */
  async createHero(heroData: HeroInput): Promise<Hero> {
    try {
      const response = await this.api.post<Hero>("/", heroData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating hero:", error.response || error);
      throw new Error(error.response?.data?.detail || error.message);
    }
  }

  // --- OPERACIONES UPDATE (Actualización) ---

  /** PUT /heroes/{id}/ - Actualizar completamente un héroe */
  async updateHero(id: number, heroData: HeroInput): Promise<Hero> {
    try {
      const response = await this.api.put<Hero>(`/${id}/`, heroData);
      return response.data;
    } catch (error: any) {
      console.error(`Error updating hero with id ${id}:`, error.response || error);
      throw new Error(error.response?.data?.detail || error.message);
    }
  }

  /** PATCH /heroes/{id}/ - Actualizar parcialmente un héroe */
  async patchHero(id: number, partialHeroData: Partial<HeroInput>): Promise<Hero> {
    try {
      const response = await this.api.patch<Hero>(`/${id}/`, partialHeroData);
      return response.data;
    } catch (error: any) {
      console.error(`Error patching hero with id ${id}:`, error.response || error);
      throw new Error(error.response?.data?.detail || error.message);
    }
  }

  // --- OPERACIONES DELETE (Eliminación) ---

  /** DELETE /heroes/{id}/ - Eliminar un héroe */
  async deleteHero(id: number): Promise<boolean> {
    try {
      await this.api.delete(`/${id}/`);
      return true;
    } catch (error: any) {
      console.error(`Error deleting hero with id ${id}:`, error.response || error);
      throw error;
    }
  }
}

// Exporta una instancia
export default new HeroDAO();
