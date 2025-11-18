// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const useAuth = () => {
  // Usuario actual (null si no hay sesión)
  const [currentUser, setCurrentUser] = useState(null);
  // Estado de carga mientras Firebase verifica la sesión
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Observador de cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      setAuthLoading(false); // Finaliza la carga al detectar el estado
    });

    // Limpieza del observador al desmontar
    return unsubscribe;
  }, []);

  return { currentUser, authLoading };
};

export default useAuth;
