✅ PROMPT FINAL COMPLETO (ACTUALIZADO CON BEARER TOKEN)

Quiero que generes una guía extremadamente detallada y paso a paso para lo siguiente:

Tengo un proyecto llamado authcenter, el cual ya tengo desarrollado y funcionando.
Este proyecto tiene:

Backend en Node.js corriendo en localhost:3000.

Frontend en Next.js corriendo en localhost:3001.

Este proyecto maneja la autenticación de usuarios, creación de roles y generación de dos cookies:

authToken

refreshToken

El sistema de autenticación ya funciona perfectamente y no necesita ser modificado.

🚨 Cambio importante en la arquitectura

Quiero que tomes en cuenta que, cuando estos proyectos estén desplegados en servidores diferentes (por ejemplo Vercel, Netlify, Railway, Render, etc.), no es posible utilizar cookies cross-site entre dominios distintos.

Por lo tanto decidí usar una arquitectura donde el portfolio_hernanharco utilizará Bearer Token para comunicarse con el backend Django.

❗ Nuevo flujo de autenticación:

authcenter genera el JWT (authToken).

El frontend de portfolio_hernanharco recibe ese token (vía redirección, localStorage o query param).

Cada request al backend Django se enviará con:

Authorization: Bearer <authToken>


Django decodifica el JWT y extrae el role.

Este enfoque funciona en cualquier proveedor de hosting, sin importar si cada servicio está en dominios completamente distintos.

📌 LO QUE NECESITO QUE GENERES

Quiero que me entregues un documento paso a paso con:

1. Estructura completa de la app Django authUsers

Con sus archivos totalmente escritos en texto plano (sin canvas):

apps.py

models.py

token_utils.py (para validar el Bearer Token)

middleware.py (para extraer el token desde Authorization header)

views.py (endpoint para devolver role)

urls.py

tests.py

Configuraciones necesarias en settings.py

Cambios necesarios en urls.py principal

requirements.txt

Todas las clases deben ser completas y bien comentadas.

2. Explicación completa del proceso

Quiero una explicación detallada de:

Cómo el frontend del portfolio obtiene el token de authcenter.

Cómo Django recibe el token desde el header Authorization.

Cómo validar y decodificar el JWT (HS256).

Cómo extraer el campo role.

Diferencias entre validación local y validación remota (introspection endpoint).

Cómo configurar CORS para permitir envío de Authorization header.

Cómo consumir la API desde el frontend Vite (fetch con Authorization).

Cómo manejar tokens expirados y refresh tokens.

3. Pruebas en Postman

Quiero una sección completa indicando:

Cómo llamar al endpoint de Django enviando el header:

Authorization: Bearer <token>


Cómo probar respuestas válidas e inválidas.

Cómo simular token expirado.

Errores comunes:

Falta de header

Token malformado

Token con firma incorrecta

Token manipulado

4. Pruebas unitarias

Debe incluir tests.py con:

Test para validación del JWT.

Test para el middleware que extrae el Bearer Token.

Test para el endpoint /api/auth/role/.

Test para token inválido, firma incorrecta y expirado.

5. Flujo completo de funcionamiento

Quiero un ejemplo explicado paso a paso:

Usuario inicia sesión en authcenter.

authcenter genera el authToken.

portfolio_hernanharco recibe ese token.

El frontend de portfolio hace una petición GET a Django:

Authorization: Bearer <token>


Django valida y obtiene el rol.

Frontend muestra contenido basado en el rol.

6. Buenas prácticas y advertencias

Incluir detalles sobre:

Por qué las cookies no funcionan cross-domain en producción.

Por qué la arquitectura Bearer Token sí funciona ilimitadamente entre dominios distintos.

Qué hacer si en el futuro se migra a RS256.

Qué pasa si los tokens pasan a ser opacos (requieren introspección).

Seguridad al almacenar tokens en localStorage vs cookies HttpOnly.

❗ Formato requerido

Toda la respuesta debe estar en texto plano, sin canvas.

No debe faltar ningún archivo.

Todo debe estar completamente explicado y listo para copiar/pegar.

___
