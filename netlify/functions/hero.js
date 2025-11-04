// Importamos la clase XataClient del SDK que acabas de instalar
const { XataClient } = require("@xata.io/client");

// Inicializamos el cliente de Xata.
// El cliente automáticamente busca XATA_API_KEY y XATA_DATABASE_URL
// en las variables de entorno de Netlify.
const xata = new XataClient({});

// Definimos el nombre de la tabla en Xata
const TABLE_NAME = "heroes";

// Esta es la función principal que Netlify va a ejecutar
exports.handler = async (event, context) => {
  // Aseguramos que solo aceptamos peticiones GET
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    // 1. Consultar a la base de datos Xata
    // Buscamos el primer registro de la tabla 'heroes'.
    const data = await xata.db[TABLE_NAME].select([
      "title",
      "subtitle",
      "jobTitle",
      "city",
      "summary",
      "profilePic.url", // Asumiendo que guardaste la URL de la imagen aquí
    ])
      .limit(1) // Solo necesitamos un registro (el perfil principal)
      .getMany();

    // 2. Manejar si no se encuentran datos
    if (!data || data.length === 0) {
      console.log(`No data found in table: ${TABLE_NAME}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Hero data not found" }),
      };
    }

    // 3. Devolver los datos con éxito
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      // Devolvemos el primer (y único) registro
      body: JSON.stringify(data[0]),
    };
  } catch (error) {
    console.error("Error al interactuar con Xata:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error interno del servidor al cargar los datos del héroe.",
        error: error.message,
      }),
    };
  }
};
