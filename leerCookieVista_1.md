# 🛠️ 1. Modificación del Backend (Django Middleware)
Necesitas ajustar tu BearerAuthMiddleware en authUsers/middleware.py para buscar el token en el diccionario request.COOKIES antes de buscar en el encabezado Authorization.

A continuación, te muestro cómo modificar la función process_request para que maneje ambos casos, dando prioridad a la cookie.
```
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpRequest, JsonResponse
from django.conf import settings
import jwt
import sys

# La clase Middleware debe heredar de MiddlewareMixin para compatibilidad
class BearerAuthMiddleware(MiddlewareMixin):
    """
    Middleware unificado para manejar la autenticación JWT.
    Prioriza el token de la cookie HttpOnly ('authToken') y, si no lo encuentra,
    busca en el encabezado 'Authorization: Bearer <token>'.
    
    Expone: request.auth_user = {"payload": payload, "role": role}
    """

    # Posibles claves donde se almacena el rol en el payload JWT
    ROLE_KEYS = ["role", "roles", "user_role", "userRoles"]

    def process_request(self, request: HttpRequest):
        # Inicializa el usuario de la petición a None
        request.auth_user = None
        token = None
        source = "None"
        
        # 1. 🥇 Prioridad: Intentar obtener el token de la cookie HttpOnly
        # Esto requiere que CORS_ALLOW_CREDENTIALS=True esté en settings.py
        token = request.COOKIES.get("authToken")
        if token:
            source = "Cookie"
            
        # 2. 🥈 Alternativa: Si no está en la cookie, buscar en el encabezado Bearer (para clientes API)
        if not token:
            auth_header = request.META.get("HTTP_AUTHORIZATION", "")
            if auth_header.startswith("Bearer "):
                token = auth_header.split("Bearer ")[1].strip()
                source = "Bearer Header"

        # --- Logging para Depuración (Muestra de dónde vino el token) ---
        print("-" * 50)
        print(f"Request path: {request.path}")
        print(f"Token Found in: {source}")
        if source != "None":
            print(f"Token Preview: {token[:15]}...")
        else:
            print("Token Preview: None")
        print("-" * 50)
        
        # Si no se encontró el token en ninguno de los lugares, salimos.
        if not token:
            return

        # --- Lógica de Decodificación y Verificación ---
        try:
            # Verifica que la clave secreta esté configurada
            if not settings.AUTHCENTER_JWT_SECRET:
                raise ValueError("AUTHCENTER_JWT_SECRET no está configurado.")

            # Decodifica JWT
            payload = jwt.decode(
                token,
                settings.AUTHCENTER_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_aud": False}
            )

            # Detectar rol automáticamente
            role_value = None
            for key in self.ROLE_KEYS:
                if key in payload:
                    role_value = payload[key]
                    if isinstance(role_value, list):
                        role_value = role_value[0] if role_value else None
                    break
            
            # Asignación de auth_user (Éxito)
            request.auth_user = {"payload": payload, "role": role_value}

            # Log de éxito (Se usa sys.stderr para asegurar la impresión)
            sys.stderr.write(f"✅ Auth Success: Role={role_value} (Source: {source})\n")
            
        except jwt.ExpiredSignatureError:
            sys.stderr.write("❌ Token expirado.\n")
            # Podrías devolver JsonResponse({"message": "Token expirado."}, status=401)
        
        except jwt.InvalidSignatureError:
            sys.stderr.write("❌ Firma JWT inválida.\n")
            # Podrías devolver JsonResponse({"message": "Token inválido."}, status=403)

        except Exception as e:
            sys.stderr.write(f"❌ Error interno al decodificar token: {type(e).__name__} - {str(e)}\n")
            # Podrías devolver JsonResponse({"message": "Error de autenticación."}, status=500)
        
        # Si la decodificación fue exitosa, el middleware continua el proceso hacia la vista.
        return None # Devuelve None para continuar con la petición normal
```
________
# 💻 2. Modificación del Frontend (Vite/React)
Dado que la cookie es HttpOnly, tu código JavaScript en el frontend no tiene que hacer absolutamente nada para obtener el valor del token, y de hecho, no debe intentar poner el encabezado Authorization.

El navegador se encarga de enviar la cookie automáticamente. Tu componente src/App.jsx se simplifica:
```
import Navigation from "@/components/Navigation";
import Hero from "@/hero/components/HeroSection";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Family from "@/components/sections/Family";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

//prueba
import { useEffect } from "react";

// URL de tu endpoint de prueba en Django
const API_URL = 'http://localhost:8000/auth/role/';

function App() {
  useEffect(() => {
    const fetchRole = async () => {
      try {
        // 🚨 ¡IMPORTANTE! Ya NO necesitas getCookie() ni localStorage.getItem()
        // El navegador se encargará de adjuntar la cookie 'authToken'

        const response = await fetch(API_URL, {
          method: "GET",
          // Ya NO incluimos el encabezado 'Authorization' manualmente.
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
          // Asegúrate de que la configuración de CORS en Django (settings.py)
          // permita el envío de credenciales con 'Access-Control-Allow-Credentials: true'
        });

        const data = await response.json();

        if (response.ok) {
          // Si el middleware fue exitoso, verás el rol:
          console.log("✅ Token enviado por Cookie. Rol recibido:", data.role);
        } else {
          // Si el middleware detectó un error (401/403), lo verás aquí:
          console.error("❌ Error de autenticación:", data.message);
        }
      } catch (error) {
        console.error("❌ Error de conexión con el backend:", error);
      }
    };

    fetchRole();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Family />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

```

# REVISAR .env
```
#DATOS DE CORS_ALLOWED_ORIGINS
FRONTEND_URLS_CORS=http://localhost:5175,http://localhost:5173,http://frontend:5175,http://frontend:5173,http://localhost:3001,
```
# TENER ENCUENTA EN EL PROYECTO DONDE SE CREA LA COOKIE QUE ESTE CASO SERIA AUTHCENTER
en la src/service/authService.ts

se deber revisar
``` 
sameSite: "lax",
```
ya que cuando se tiene lax permite comunicarse entre diferentes 

## 🔑 SameSite: El Guardaespaldas de tus Cookies

La bandera SameSite se introdujo para proteger a los usuarios de un ataque común llamado CSRF (Cross-Site Request Forgery, o Falsificación de Petición entre Sitios).

El objetivo es simple: Controlar si el navegador debe adjuntar una cookie de autenticación (como tu authToken) cuando la petición se origina desde un sitio web diferente al que estableció la cookie.

### 1. SameSite=Strict (El más Estricto)

Analogía: Es como un club nocturno donde la entrada solo es válida si la usas directamente para entrar. Si un amigo te pasa la tarjeta de entrada desde fuera para que la uses en otra puerta (un sitio web diferente), no funciona.

Comportamiento:

¿Se envía la cookie? NO, a menos que la petición se origine exactamente desde el mismo sitio (mismo dominio, mismo puerto, mismo protocolo).

¿Cuándo falla? Falla incluso en acciones legítimas, como:

Hacer un fetch con credenciales de tu frontend (localhost:5173) a tu backend (localhost:8000).

Hacer clic en un enlace que va de un email a tu sitio.

Seguridad: Máxima. Bloquea casi cualquier posibilidad de CSRF, pero a costa de la usabilidad.

### 2. SameSite=Lax (El Equilibrio Recomendado)

Analogía: Es un club que te permite entrar con la tarjeta de entrada de tu amigo, solo si vienes caminando desde el exterior (es decir, a través de una navegación de nivel superior, como hacer clic en un enlace o ingresar la URL). Pero si un amigo intenta usar tu tarjeta para abrir una puerta lateral sin tu permiso (una petición AJAX/fetch discreta), no funciona.

Comportamiento:

¿Se envía la cookie? SÍ, pero solo en navegaciones de nivel superior que usan los métodos GET (como hacer clic en un enlace <a href="..."> o usar window.location.href).

¿Cuándo falla? Bloquea el envío de la cookie en peticiones discretas (AJAX, fetch con POST, PUT, etc.) cuando la petición es Cross-Site.

Seguridad: Muy alta. Es el valor por defecto recomendado para la mayoría de las cookies de sesión, ya que ofrece un buen equilibrio entre seguridad y experiencia de usuario.

### 3. SameSite=None (Usado con Precaución)

Comportamiento: La cookie siempre se envía en peticiones Cross-Site.

Requisito: DEBE ir acompañado de la bandera Secure (es decir, solo funciona con HTTPS) para que el navegador la acepte. Si lo usas con HTTP local, el navegador lo ignorará.
```
## Tabla de Comparación


| Característica                         | SameSite=Strict                                   | SameSite=Lax                                               | SameSite=None + Secure                              |
|----------------------------------------|----------------------------------------------------|-------------------------------------------------------------|------------------------------------------------------|
| **Peticiones Cross-Site (fetch, AJAX)** | Bloqueada.                                         | Bloqueada. (A menos que sea GET de nivel superior)          | Permitida. (Requiere HTTPS)                         |
| **Navegación (Clic en enlace GET)**     | Bloqueada.                                         | Permitida.                                                   | Permitida.                                           |
| **Seguridad**                           | Máxima.                                            | Alta (Recomendada).                                          | Baja/Nula contra CSRF (Usar tokens CSRF).           |
| **Uso Principal**                       | Cookies muy sensibles (ej: datos de autenticación crítica). | La mayoría de las cookies de sesión/autenticación. | Widgets de terceros, tracking, apps en distintos dominios. |

