import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// 1. Definición de la URL de la API
const API_URL = 'http://localhost:8000/auth/role/';

// 2. Definición de la Interfaz para el estado del Context
interface AuthContextType {
  userRole: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Si añades funciones (ej. login, logout), deben definirse aquí también.
}

// 3. Definición de la Interfaz para las Props del Proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Creación del Context
// Usamos el tipo definido y establecemos un valor inicial por defecto (idealmente vacío/null)
const AuthContext = createContext<AuthContextType | null>(null);

// 5. Custom Hook para consumir el Context fácilmente
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // Verificación de tipo y uso correcto del hook
  if (context === null) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// 6. Componente Proveedor (Provider) que contiene la lógica
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado tipado: userRole puede ser string o null
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        });

        // Aseguramos que la respuesta sea JSON si la petición fue exitosa o no
        const data: { role?: string; message?: string } = await response.json();

        if (response.ok) {
          // Éxito: El token es válido y se recibió el rol
          setUserRole(data.role ?? 'default'); // Usamos 'default' o un rol seguro si 'role' es undefined
          setIsAuthenticated(true);
          console.log("✅ AuthContext: Rol recibido:", data.role);
        } else if (response.status === 401 || response.status === 403) {
          // Error de autenticación/autorización
          setUserRole(null);
          setIsAuthenticated(false);
          console.log("❌ AuthContext: Usuario no autenticado (Status:", response.status, ")");
        } else {
          // Otros errores del servidor
          console.error("❌ AuthContext: Error del servidor:", data.message);
          setUserRole(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        // En un error de red o de parsing, la autenticación se considera fallida.
        console.error("❌ AuthContext: Error de conexión con el backend:", error);
        setUserRole(null);
        setIsAuthenticated(false);
      } finally {
        // Indica que la carga inicial ha terminado
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []); // Se ejecuta solo una vez al montar

  // Valor del Context con el tipo definido
  const contextValue: AuthContextType = {
    userRole,
    isAuthenticated,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportamos solo el proveedor para que se use en App.tsx
export default AuthProvider;