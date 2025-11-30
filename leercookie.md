✅ PROMPT FINAL COMPLETO

Quiero que generes una guía extremadamente detallada y paso a paso para lo siguiente:

Tengo un proyecto llamado authcenter, el cual ya tengo desarrollado y funcionando.
Este proyecto tiene:

Backend en Node.js corriendo en localhost:3000.

Frontend en Next.js corriendo en localhost:3001.

Este proyecto maneja la autenticación de usuarios, creación de roles y generación de dos cookies:

authToken

refreshToken

El sistema de autenticación ya funciona perfectamente y no necesita ser modificado.

Ahora necesito integrar esto con otro proyecto llamado portfolio_hernanharco, que tiene:

Backend en Django

Frontend en Vite

Lo que necesito es que el proyecto Django pueda leer la cookie authToken enviada por authcenter, decodificarla y obtener el campo role para saber qué rol tiene el usuario autenticado en el proyecto authcenter.

Para esto quiero crear una nueva app en Django llamada authUsers, y dentro de ella todas las clases, middlewares y utilidades necesarias.

❗ Requisitos del trabajo

Quiero que me entregues un documento paso a paso con:

1. Estructura completa de la app Django authUsers

Con sus archivos totalmente escritos, en texto plano, sin canvas:

apps.py

models.py

token_utils.py

middleware.py

views.py

urls.py

tests.py

Configuraciones necesarias en settings.py

Cambios necesarios en urls.py principal

requirements.txt

Todas las clases deben ser completas y bien comentadas, con explicaciones claras en cada bloque.

2. Explicación completa del proceso

Quiero que me expliques paso a paso cómo funciona:

Cómo Django recibe y lee la cookie authToken

Cómo validar y decodificar el JWT (firmado con HS256)

Cómo extraer el campo role

Cómo inyectar la información del usuario en request.auth_user

Cómo exponer un endpoint GET /api/auth/role/ que devuelva { role: "<rol>" }

Cómo configurar CORS y cookies

Cómo manejar HttpOnly, SameSite, domain, secure

Qué configuración debe existir en authcenter para que Django pueda leer la cookie (solo explicación, nada debe cambiar en authcenter)

Cómo consumir esa API desde el frontend Vite (fetch con credentials: "include")

3. PRUEBAS EN POSTMAN

Agregar una sección completa sobre:

Cómo probar correctamente en Postman que Django está leyendo la cookie authToken

Cómo enviar la cookie en la pestaña "Cookies" de Postman

Cómo validar las respuestas desde Postman

Cómo identificar errores comunes (cookie no enviada, dominio incorrecto, SameSite, etc.)

4. Pruebas unitarias

Añadir tests.py:

Test para la decodificación del token

Test para la API /api/auth/role/

Test para verificar que el middleware funciona

5. Ejemplo de flujo completo

Mostrar un escenario de prueba:

Usuario inicia sesión en authcenter.

authcenter genera cookies.

Usuario abre portfolio_hernanharco.

portfolio hace request a Django.

Django decodifica token y devuelve el rol.

Frontend Vite muestra información basada en el rol.

6. Advertencias y buenas prácticas

Quiero que incluyas:

Qué pasa si la cookie está marcada como HttpOnly

Qué hacer si en el futuro se cambia a RS256

Qué pasa si el token es opaco y requiere validación servidor a servidor

❗ Formato requerido

Todo debe entregarse en archivos planos (texto simple).

No quiero ningún contenido en canvas.

No debe haber archivos faltantes.

Quiero toda la implementación totalmente lista para copiar y pegar.

___________________

