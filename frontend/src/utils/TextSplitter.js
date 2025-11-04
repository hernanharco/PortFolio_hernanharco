/**
 * Clase de utilidad para manejar la lógica de división de cadenas.
 */
class TextSplitter {

    /**
     * Divide una cadena completa en dos partes: el prefijo solicitado y el resto del texto.
     * La lógica busca el prefijo al inicio de la cadena y lo separa del resto.
     *
     * @param {string} fullText - La cadena de texto completa (ej: "Hola, soy Hernan Arango Cortes").
     * @param {string} prefix - La parte inicial que se quiere separar (ej: "Hola, soy ").
     * @returns {{prefixPart: string, restPart: string}} Un objeto con las dos partes separadas.
     * Retorna el texto completo en restPart si el prefijo no se encuentra.
     */
    static splitByPrefix(fullText, prefix) {
        if (!fullText || !prefix) {
            return { prefixPart: '', restPart: fullText || '' };
        }

        // Verifica si la cadena comienza con el prefijo, ignorando mayúsculas/minúsculas para seguridad
        const startsWithPrefix = fullText.toLowerCase().startsWith(prefix.toLowerCase());

        if (startsWithPrefix) {
            // Calcula la longitud del prefijo
            const prefixLength = prefix.length;
            
            // La primera parte es el prefijo solicitado
            const prefixPart = fullText.substring(0, prefixLength);
            
            // La segunda parte es el resto del texto
            const restPart = fullText.substring(prefixLength).trimStart();
            
            return { prefixPart, restPart };
        } else {
            // Si el texto no empieza con el prefijo, devuelve el prefijo vacío 
            // y el texto completo en la segunda parte.
            console.warn(`[TextSplitter] El texto no comienza con el prefijo: "${prefix}"`);
            return { prefixPart: '', restPart: fullText };
        }
    }

    /**
     * (Bonus para abordar la segunda parte de tu pregunta)
     * Divide una cadena en múltiples partes usando un delimitador.
     *
     * @param {string} fullText - La cadena de texto completa.
     * @param {string} delimiter - El carácter o cadena a usar como punto de corte (ej: ',').
     * @returns {string[]} Un array con todas las partes de la cadena.
     */
    static splitByDelimiter(fullText, delimiter = ',') {
        if (!fullText) {
            return [];
        }
        return fullText.split(delimiter).map(part => part.trim());
    }

}

export default TextSplitter;