// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// Importamos la instancia de auth que exportamos desde firebase.js
import { auth } from '../firebase/firebase';

const useAuth = () => {
  // Estado para guardar la información del usuario logueado (o null)
  const [currentUser, setCurrentUser] = useState(null);
  // Estado para saber si la verificación inicial de Auth ha terminado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged establece un observador que se ejecuta 
    // cada vez que el estado de autenticación cambia (login, logout, etc.).
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Si hay un usuario (objeto user), el usuario está logueado.
      // Si es null, no hay nadie logueado.
      setCurrentUser(user);
      setLoading(false);
    });

    // Esta función de limpieza se ejecuta al desmontar el componente 
    // para detener la suscripción a los cambios de Auth.
    return unsubscribe;
  }, []); // El array vacío asegura que se ejecute solo una vez al montar.

  // Devolvemos el usuario y el estado de carga
  return { currentUser, loading };
};

export default useAuth;