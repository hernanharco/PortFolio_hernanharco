// Importamos la clase XataClient del SDK que ya tienes instalado
const { XataClient } = require("@xata.io/client");

// Inicializamos el cliente de Xata.
// Utilizará automáticamente las variables de entorno de Netlify (XATA_API_KEY, XATA_DATABASE_URL).
const xata = new XataClient({});

// Definimos el nombre de la tabla, que es 'accounts_heromodels' en tu base de datos
const TABLE_NAME = "accounts_heromodels";

// Esta es la función principal que Netlify va a ejecutar
exports.handler = async (event, context) => {
  // 1. Aseguramos que solo aceptamos peticiones GET
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    // 2. Consultar a la base de datos Xata
    // Solo seleccionamos los campos que existen en tu tabla: title, subtitle, city, y el campo que parece ser el resumen (exampletext)
    const data = await xata.db[TABLE_NAME]
      .select([
        "city",
        "title", 
        "subtitle", 
        "exampletext",
        "textcody",
        "textfamily",
        "textundertake",
      ])
      .limit(1) // Solo necesitamos el primer registro del perfil
      .getMany();

    // 3. Manejar si no se encuentran datos
    if (!data || data.length === 0) {
      console.log(`No data found in table: ${TABLE_NAME}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Hero data not found" }),
      };
    }

    // 4. Devolver los datos con éxito
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      // Devolvemos el primer (y único) registro encontrado
      body: JSON.stringify(data[0]),
    };
  } catch (error) {
    console.error("Error al interactuar con Xata:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error interno del servidor al cargar los datos del héroe. Verifica logs de Netlify.",
        error: error.message,
      }),
    };
  }
};
