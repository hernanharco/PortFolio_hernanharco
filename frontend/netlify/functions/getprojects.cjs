// Importamos el cliente de Xata
const { XataClient } = require("@xata.io/client");

// Variables de entorno para debug
const apiKey = process.env.XATA_API_KEY ? '******' : 'MISSING_KEY';
const dbUrl = process.env.XATA_DATABASE_URL;

console.log("DEBUG: API Key Status:", apiKey);
console.log("DEBUG: DB URL:", dbUrl);

// Intentamos crear el cliente
let xata;
try {
    xata = new XataClient({
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL
    });
    console.log("DEBUG: XataClient created successfully.");
} catch (e) {
    console.error("CRITICAL ERROR: XataClient initialization failed:", e.message);
    // Si la inicialización falla aquí, devolvemos un error diferente.
    exports.handler = async () => ({
        statusCode: 500,
        body: JSON.stringify({ error: `Initialization Failed: ${e.message}` }),
    });
    return;
}

// Handler de la Función Netlify
exports.handler = async (event, context) => {
    // Si la inicialización falló arriba, el handler no se ejecuta (gracias al return).
    // Si llegamos aquí, 'xata' debería estar definido.
    try {
        // Linea donde falla: xata.db.accounts_heromodels
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
        console.error("❌ Xata fetch error during run:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: `Xata Fetch Error: ${error.message}`,
            }),
        };
    }
};
