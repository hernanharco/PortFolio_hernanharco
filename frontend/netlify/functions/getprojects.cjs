// Importamos el cliente de Xata.
// Utilizamos la importación genérica, pero la combinaremos con un ajuste en netlify.toml.
const clientModule = require("@xata.io/client");
const XataClient = clientModule.XataClient || clientModule.default?.XataClient || clientModule.default;


// --- Variables de Debug ---
const apiKeyStatus = process.env.XATA_API_KEY ? 'CONFIGURADA' : 'CLAVE_FALTANTE';
const dbUrl = process.env.XATA_DATABASE_URL;

console.log("DEBUG: Estado de API Key:", apiKeyStatus);
console.log("DEBUG: URL de Base de Datos:", dbUrl);

let xata = null; // Inicializamos el cliente a null
let initError = null; // Variable para almacenar errores de inicialización

// 🚨 Paso 1: Creación del Cliente
try {
    // Si la clase se cargó, la inicializamos.
    if (typeof XataClient === 'function' && XataClient.prototype.constructor) {
        xata = new XataClient({
            apiKey: process.env.XATA_API_KEY,
            databaseURL: process.env.XATA_DATABASE_URL
        });
        console.log("DEBUG: XataClient creado exitosamente.");
    } else {
        initError = "Error interno: XataClient no se resolvió como constructor.";
        console.error("ERROR CRÍTICO:", initError);
    }
} catch (e) {
    // Si la inicialización falla (por ej. falta una variable), guardamos el error.
    initError = `Fallo en la inicialización: ${e.message}`;
    console.error("ERROR CRÍTICO:", initError);
}


// Handler principal de la Función Netlify
exports.handler = async (event, context) => {
    // 1. Verificar si la inicialización falló
    if (initError) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: `Error de Inicialización de Xata (FATAL): ${initError}` 
            }),
        };
    }
    
    // 2. Si la inicialización fue exitosa, procedemos con la consulta.
    try {
        // Consulta a Xata. Traemos *todos* los campos de la tabla.
        const records = await xata.db.accounts_heromodels
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
