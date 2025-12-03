// service/AboutDAO.ts
import axios, { AxiosInstance } from "axios";
import type { AboutData, AboutInput } from "@/about/types/AboutData";
import { API_BASE_URL_MONGODB } from "@/config/apiConfig";


/**
 * Clase Data Access Object (DAO) para el recurso 'about'.
 * Encapsula toda la lógica de las llamadas HTTP al backend.
 */
class AboutDAO {
    private api: AxiosInstance;
    
    constructor() {
        // Crea una instancia de axios con la URL base
        this.api = axios.create({
            // La URL base será http://localhost:5000/about
            baseURL: `${API_BASE_URL_MONGODB}/about`,             
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // --- OPERACIONES READ (Lectura) ---

    /** GET /about/ - Obtener todos los documentos 'about' */
    async getAll(): Promise<AboutData[]> {
        try {
            // Utilizamos el endpoint raíz (/) que mapea a http://localhost:5000/about/
            const response = await this.api.get<AboutData[]>("/"); 
            return response.data;
        } catch (error: any) {
            console.error("Error fetching all about documents:", error.response || error);
            throw error;
        }
    }

    // Nota: Tu backend usa PUT/DELETE con ID, pero tu recurso 'about' 
    // a menudo solo tendrá un único registro. Mantendremos el GET by ID 
    // por si acaso, usando el ID de Mongoose (string).
    
    /** GET /about/{id} - Obtener un documento 'about' por su ID de Mongoose */
    async getById(id: string): Promise<AboutData | null> {
        try {
            const response = await this.api.get<AboutData>(`/${id}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching about with id ${id}:`, error.response || error);
            if (error.response?.status === 404) return null;
            throw error;
        }
    }

    // --- OPERACIONES CREATE (Creación) ---

    /** POST /about/ - Crear un nuevo documento 'about' */
    async create(data: AboutInput): Promise<AboutData> {
        try {
            const response = await this.api.post<AboutData>("/", data);
            return response.data;
        } catch (error: any) {
            console.error("Error creating about document:", error.response || error);
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    // --- OPERACIONES UPDATE (Actualización) ---

    /** PUT /about/{id} - Actualizar completamente un documento 'about' por ID */
    async update(id: string, data: AboutInput): Promise<AboutData> {
        try {
            const response = await this.api.put<AboutData>(`/${id}`, data);
            return response.data;
        } catch (error: any) {
            console.error(`Error updating about document with id ${id}:`, error.response || error);
            throw new Error(error.response?.data?.message || error.message);
        }
    }
    
    // Si tu backend usa PATCH, puedes añadir un método PATCH aquí.
    
    // --- OPERACIONES DELETE (Eliminación) ---

    /** DELETE /about/{id} - Eliminar un documento 'about' por ID */
    async delete(id: string): Promise<boolean> {
        try {
            await this.api.delete(`/${id}`);
            return true;
        } catch (error: any) {
            console.error(`Error deleting about document with id ${id}:`, error.response || error);
            throw error;
        }
    }
}

// Exporta una instancia
export default new AboutDAO();