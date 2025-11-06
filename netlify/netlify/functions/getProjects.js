// functions/getProjects.js

// Importa el cliente de Xata (que debe estar definido en el archivo xata.js)
import { getXataClient } from './xata'; 

// Esta es la función principal de tu Netlify Function
export const handler = async () => {
  try {
    // 1. Obtiene una instancia del cliente Xata
    const xata = getXataClient(); 

    // 2. Realiza la consulta a la base de datos de Xata
    // (Ajusta 'projects' al nombre de tu tabla)
    const records = await xata.db.projects.getAll(); 

    // 3. Devuelve los datos con el formato de respuesta correcto de Netlify Function
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(records),
    };

  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    
    // Devuelve un error si falla la consulta o la conexión
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fallo al obtener los datos de proyectos.' }),
    };
  }
};

// **NOTA IMPORTANTE:**
// Si en esta función necesitas hacer una petición a otra API externa (no a Xata),
// simplemente usa 'fetch' directamente, sin ninguna importación:
// const response = await fetch('URL_EXTERNA');