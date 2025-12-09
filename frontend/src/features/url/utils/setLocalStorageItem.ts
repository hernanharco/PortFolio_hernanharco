// src/utils/localStorageUtils.ts

/**
 * Establece un valor en el localStorage.
 * @param key - La clave bajo la cual guardar el valor.
 * @param value - El valor a guardar. Se serializa automáticamente a JSON.
 */
export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    // El valor se serializa a una cadena JSON
    const serializedValue: string = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    // Nota: El error de serialización (ej. circular reference) se captura aquí.
  }
};

/**
 * Obtiene un valor del localStorage.
 * @param key - La clave del valor a obtener.
 * @returns {T | undefined} El valor deserializado o 'undefined' si no existe o si hay un error de parseo.
 */
export const getLocalStorageItem = <T>(key: string): T | undefined => {
  try {
    const serializedValue: string | null = localStorage.getItem(key);
    
    // Si la clave no existe, getItem devuelve null
    if (serializedValue === null) {
      return undefined;
    }
    
    // Deserializa la cadena JSON para obtener el objeto o valor original
    // Usamos T para permitir que el consumidor de la función especifique el tipo que espera.
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error al leer o parsear de localStorage:", error);
    // Un error de parseo (JSON no válido) se captura aquí.
    return undefined;
  }
};