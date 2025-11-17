// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Usamos import.meta.env para acceder a las variables de entorno de Vite
// con el prefijo VITE_PUBLIC_
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID, 
};

// Verificar si la configuración es válida
if (!firebaseConfig.apiKey) {
  console.error("Firebase API Key is missing. Check your Vite .env file for the VITE_PUBLIC_FIREBASE_API_KEY variable.");
  // Detener la inicialización si la clave no está presente
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene y exporta la instancia de Auth
export const auth = getAuth(app); 

// Si usas otros servicios, inicialízalos aquí
// import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);