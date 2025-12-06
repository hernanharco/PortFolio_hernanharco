// service/AboutDAO.ts
import axios, { AxiosInstance } from "axios";
// ASUMIMOS que estos tipos están definidos correctamente en tu proyecto:
import type { 
    AboutData, 
    AboutInput, 
    HighlightItem, 
    CoreValueItem 
} from "@/features/about/types/AboutData"; 
import { API_BASE_URL_MONGODB } from "@/config/apiConfig";

/**
 * Clase Data Access Object (DAO) para el recurso 'about'.
 * Encapsula toda la lógica de las llamadas HTTP al backend.
 */
class AboutDAO {
  private api: AxiosInstance;

  constructor() {
    // Configura la instancia de axios con la URL base del backend
    this.api = axios.create({
      // La URL base será http://localhost:5000/api/about (o similar, ajusta 'api/about' según tu index.js)
      baseURL: `${API_BASE_URL_MONGODB}/about`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // ====================================================================
  // --- OPERACIONES CRUD BÁSICAS ---
  // ====================================================================

  /** GET /about/ - Obtener todos los documentos 'about' */
  async getAll(): Promise<AboutData[]> {
    try {
      const response = await this.api.get<AboutData[]>("/");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching all about documents:", error.response || error);
      throw error;
    }
  }

  /** GET /about/{id} - Obtener un documento 'about' por su ID */
  async getById(id: string): Promise<AboutData | null> {
    try {
      const response = await this.api.get<AboutData>(`/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  }
  
  /** POST /about/ - Crear un nuevo documento 'about' */
  async create(data: AboutInput): Promise<AboutData> {
    try {
      const response = await this.api.post<AboutData>("/", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  /** PUT /about/{id} - Actualizar completamente un documento 'about' por ID */
  async update(id: string, data: AboutInput): Promise<AboutData> {
    try {
      const response = await this.api.put<AboutData>(`/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
  
  /** DELETE /about/{id} - Eliminar un documento 'about' por ID */
  async delete(id: string): Promise<boolean> {
    try {
      await this.api.delete(`/${id}`);
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  // ====================================================================
  // ✅ NUEVOS MÉTODOS PATCH PARA CORE VALUES Y HIGHLIGHTS
  // ====================================================================

  // --- CORE VALUES ---

  /** PATCH /about/{id}/corevalues/add - Añadir un Core Value */
  async addCoreValue(id: string, newCoreValue: CoreValueItem): Promise<CoreValueItem[]> {
    try {
      // El backend devuelve el objeto { message, data: CoreValueItem[] }
      const response = await this.api.patch<{ data: CoreValueItem[], message: string }>(
        `/${id}/corevalues/add`,
        newCoreValue
      );
      // Devolvemos solo el array actualizado
      return response.data.data; 
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  /** PATCH /about/{id}/corevalues/remove - Eliminar un Core Value por título */
  async removeCoreValue(id: string, title: string): Promise<CoreValueItem[]> {
    try {
      const response = await this.api.patch<{ data: CoreValueItem[], message: string }>(
        `/${id}/corevalues/remove`,
        { title } // El backend espera { title: string }
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  // --- HIGHLIGHTS ---

  /** PATCH /about/{id}/highlights/add - Añadir un Highlight */
  async addHighlight(id: string, newHighlight: HighlightItem): Promise<HighlightItem[]> {
    try {
      const response = await this.api.patch<{ data: HighlightItem[], message: string }>(
        `/${id}/highlights/add`,
        newHighlight
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  /** PATCH /about/{id}/highlights/remove - Eliminar un Highlight por título */
  async removeHighlight(id: string, title: string): Promise<HighlightItem[]> {
    try {
      const response = await this.api.patch<{ data: HighlightItem[], message: string }>(
        `/${id}/highlights/remove`,
        { title }
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}

// Exporta una instancia
export default new AboutDAO();