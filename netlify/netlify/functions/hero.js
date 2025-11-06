// functions/hero.js

// Importa el cliente de Xata (si se usa para el héroe)
import { getXataClient } from './xata'; 

// **IMPORTANTE:** Si usabas 'node-fetch' aquí, elimínalo. Usa 'fetch' directamente si lo necesitas.

export const handler = async (event, context) => {
  // Configuración de CORS
  const CORS_HEADERS = {
    // Esto permite que el frontend en localhost:8888 acceda a la función.
    // Usar '*' es seguro para desarrollo local.
    'Access-Control-Allow-Origin': '*', 
    'Content-Type': 'application/json',
  };

  try {
    const xata = getXataClient(); 

    // Aquí iría la lógica para obtener el registro del héroe, por ejemplo:
    // **Ajusta 'hero' al nombre de tu tabla en Xata.**
    const heroRecord = await xata.db.hero.getAll(); // O .filter({id: 'hero'}).getFirst()

    // Respuesta exitosa
    return {
      statusCode: 200,
      headers: CORS_HEADERS, // 🚨 Aplicamos los encabezados CORS
      body: JSON.stringify(heroRecord),
    };

  } catch (error) {
    console.error('Error al obtener datos del héroe:', error);
    
    // Respuesta de error, también con encabezados CORS para que el navegador no lo bloquee.
    return {
      statusCode: 500,
      headers: CORS_HEADERS, // 🚨 Aplicamos los encabezados CORS
      body: JSON.stringify({ error: 'Fallo al obtener los datos del héroe.' }),
    };
  }
};