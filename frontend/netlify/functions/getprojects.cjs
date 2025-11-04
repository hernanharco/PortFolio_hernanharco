// Importamos el cliente de Xata.
// Usamos la importación con 'require' para asegurar la compatibilidad en el entorno Node.js de Netlify.
const { XataClient } = require("@xata.io/client");

// --- Variables de Debug ---
// (Estas variables nos ayudan a confirmar que Netlify está leyendo las variables de entorno)
const apiKeyStatus = process.env.XATA_API_KEY ? 'CONFIGURADA' : 'CLAVE_FALTANTE';
const dbUrl = process.env.XATA_DATABASE_URL;

console.log("DEBUG: Estado de API Key:", apiKeyStatus);
console.log("DEBUG: URL de Base de Datos:", dbUrl);

let xata = null; // Inicializamos el cliente a null
let initError = null; // Variable para almacenar errores de inicialización

// Intentamos crear el cliente UNA SOLA VEZ al inicio del módulo.
try {
    xata = new XataClient({
        // La clave y la URL se leen automáticamente del entorno.
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL
    });
    console.log("DEBUG: XataClient creado exitosamente.");
} catch (e) {
    // Si la inicialización falla (por ej. falta una variable), guardamos el error.
    initError = e.message;
    console.error("ERROR CRÍTICO: Fallo en la inicialización de XataClient:", initError);
}

// Handler principal de la Función Netlify
exports.handler = async (event, context) => {
    // 1. Verificar si la inicialización falló
    if (initError) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: `Error de Inicialización de Xata (Revisar Variables de Entorno de Netlify): ${initError}` 
            }),
        };
    }
    
    // 2. Si la inicialización fue exitosa, procedemos con la consulta.
    try {
        // Asegúrate de que 'accounts_heromodels' sea el nombre correcto de tu tabla, 
        // según lo que vimos en la captura de Xata.
        const records = await xata.db.accounts_heromodels
            .select(["id", "city", "title", "subtitle", "example_field_name"])
            .getMany();

        console.log("ÉXITO: Registros de datos obtenidos:", records.length);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(records),
        };
    } catch (error) {
        // 3. Capturamos cualquier error durante la consulta a la base de datos (fetch error)
        console.error("❌ Error de consulta a Xata durante la ejecución:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: `Error de Consulta a Xata: ${error.message}`,
            }),
        };
    }
};
