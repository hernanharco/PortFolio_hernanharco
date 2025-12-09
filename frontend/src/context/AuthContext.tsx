// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_URL = "http://localhost:8000/auth/role/";

export interface AuthContextType {
  userRole: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>; // ← NUEVO
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* --------------------------------------------
     FUNCIÓN QUE SE PUEDE LLAMAR DESDE AFUERA
     -------------------------------------------- */
  const refreshAuth = async () => {
    console.log("🔄 Ejecutando refreshAuth()…");
    await fetchRole(); // vuelve a consultar el backend
  };

  /* --------------------------------------------
     FUNCIÓN INTERNA: consulta backend
     -------------------------------------------- */
  const fetchRole = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const role = data.role && data.role !== "null" ? data.role : "default";
        setUserRole(role);
        setIsAuthenticated(true);
        console.log("✔ AuthContext: usuario autenticado con rol:", role);
      } else {
        setUserRole(null);
        setIsAuthenticated(false);
        console.log("❌ AuthContext: no autenticado");
      }
    } catch (error) {
      console.error("❌ Error conectando al backend:", error);
      setUserRole(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  /* --------------------------------------------
     Se ejecuta SOLO una vez al cargar la app
     -------------------------------------------- */
  useEffect(() => {
    fetchRole();
  }, []);

  /* --------------------------------------------
     ESCUCHA MENSAJES DEL POPUP
     -------------------------------------------- */
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // ✅ Validar que el mensaje venga de la URL confiable
      const trustedOrigin = "http://localhost:3001";

      if (event.origin !== trustedOrigin) {
        console.warn("Mensaje ignorado de origen no confiable:", event.origin);
        return; // Ignora mensajes de otros dominios
      }

      // Solo procesar si es el tipo correcto
      if (event.data?.type === "auth:refresh") {
        console.log("📩 Mensaje recibido: auth:refresh");
        refreshAuth(); // Actualiza el AuthContext
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userRole,
        isAuthenticated,
        isLoading,
        refreshAuth, // ← exportado al resto de la app
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
