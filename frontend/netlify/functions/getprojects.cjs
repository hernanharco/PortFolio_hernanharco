const { XataClient } = require("@xata.io/client");

// Variables de entorno para debug (solo para logging)
const apiKeyStatus = process.env.XATA_API_KEY ? 'CONFIGURED' : 'MISSING_KEY';
const dbUrl = process.env.XATA_DATABASE_URL;

console.log("DEBUG: API Key Status:", apiKeyStatus);
console.log("DEBUG: DB URL:", dbUrl);

let xata = null; // Inicializamos a null
let initError = null;

// Intentamos crear el cliente UNA SOLA VEZ al inicio del módulo
try {
    xata = new XataClient({
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL
    });
    console.log("DEBUG: XataClient created successfully.");
} catch (e) {
    // Si falla la inicialización, guardamos el error para usarlo en el handler
    initError = e.message;
    console.error("CRITICAL ERROR: XataClient initialization failed:", initError);
}

// Handler de la Función Netlify
exports.handler = async (event, context) => {
    // 1. Verificar si la inicialización falló
    if (initError) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: `Xata Initialization Error (Check Netlify Environment Vars): ${initError}` 
            }),
        };
    }
    
    // 2. Si la inicialización fue exitosa, procedemos con la consulta
    try {
        const records = await xata.db.accounts_heromodels
            .select(["id", "city", "title", "subtitle", "example_field_name"])
            .getMany();

        console.log("SUCCESS: Data records fetched:", records.length);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(records),
        };
    } catch (error) {
        // 3. Capturamos cualquier error durante la consulta (fetch error)
        console.error("❌ Xata fetch error during run:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: `Xata Fetch Error: ${error.message}`,
            }),
        };
    }
};
