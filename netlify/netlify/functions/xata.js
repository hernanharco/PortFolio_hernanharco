// functions/xata.js

// **IMPORTACIÓN CORREGIDA**
import XataClient from "@xata.io/client"; 

let instance = undefined;

/**
 * Función helper para inicializar y devolver el cliente Xata.
 * @returns {XataClient}
 */
export const getXataClient = () => {
  if (instance) return instance;

  const databaseURL = process.env.XATA_DATABASE_URL;
  const branch = process.env.XATA_BRANCH;

  if (!databaseURL || !branch) {
    throw new Error("Las variables de entorno XATA_DATABASE_URL o XATA_BRANCH no están definidas.");
  }
  
  instance = new XataClient({
    apiKey: process.env.XATA_API_KEY, 
    db: databaseURL,
    branch: branch,
  });
  
  return instance;
};