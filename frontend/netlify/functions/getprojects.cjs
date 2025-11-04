// Importamos el cliente de Xata.
// Utilizamos una estrategia de importación robusta para asegurar que Netlify encuentre la clase XataClient
// y evitar el error "XataClient is not a constructor".
const clientModule = require("@xata.io/client");
const XataClient = clientModule.XataClient || clientModule.default?.XataClient || clientModule.default;

// --- Variables de Debug ---
// (Estas variables nos ayudan a confirmar que Netlify está leyendo las variables de entorno)
const apiKeyStatus = process.env.XATA_API_KEY ? 'CONFIGURADA' : 'CLAVE_FALTANTE';
const dbUrl = process.env.XATA_DATABASE_URL;

console.log("DEBUG: Estado de API Key:", apiKeyStatus);
console.log("DEBUG: URL de Base de Datos:", dbUrl);

let xata = null; // Inicializamos el cliente a null
let initError = null; // Variable para almacenar errores de inicialización

// 🚨 Paso 1: Verificación de la Clase y Creación del Cliente
if (typeof XataClient !== 'function' || !XataClient.prototype.constructor) {
    initError = "La clase XataClient no se pudo cargar correctamente (Problema de Importación/Bundler)";
    console.error("ERROR CRÍTICO:", initError);
} else {
    try {
        // Intentamos crear el cliente UNA SOLA VEZ al inicio del módulo.
        xata = new XataClient({
            apiKey: process.env.XATA_API_KEY,
            databaseURL: process.env.XATA_DATABASE_URL
        });
        console.log("DEBUG: XataClient creado exitosamente.");
    } catch (e) {
        // Si la inicialización falla (por ej. falta una variable), guardamos el error.
        initError = e.message;
        console.error("ERROR CRÍTICO: Fallo en la inicialización de XataClient:", initError);
    }
}

// Handler principal de la Función Netlify
exports.handler = async (event, context) => {
    // 1. Verificar si la inicialización falló
    if (initError) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: `Error de Inicialización de Xata (Fatal): ${initError}` 
            }),
        };
    }
    
    // 2. Si la inicialización fue exitosa, procedemos con la consulta.
    try {
        // Consulta a Xata. Al no usar .select(), traeremos *todos* los campos de la tabla.
        const records = await xata.db.accounts_heromodels
            // .select(["id", "city", "title", "subtitle", "example_field_name"]) // <-- Línea de .select() comentada/eliminada
            .getMany(); // El método getMany() sin select trae todos los campos.

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
