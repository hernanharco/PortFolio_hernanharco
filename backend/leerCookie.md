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

# 1️⃣ Resumen del objetivo

- authcenter (Node.js + Next.js) ya genera el JWT (authToken) y funciona correctamente.

- portfolio_hernanharco:

* Backend Django

* Frontend Vite

- Queremos que Django pueda recibir el token vía header Authorization: Bearer <token>, extraer el role y exponerlo a frontend.

___

# 2️⃣ Dependencias / requirements

requirements.txt:

Django>=4.2
djangorestframework>=3.14
PyJWT>=2.8
python-dotenv>=1.0
django-cors-headers>=3.13

Instalación:

```
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```
___

# 3️⃣ Cambios en settings.py

```
import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()  # cargar .env

BASE_DIR = Path(__file__).resolve().parent.parent

AUTHCENTER_JWT_SECRET = os.getenv("AUTHCENTER_JWT_SECRET", "cambia_esto_en_produccion")

INSTALLED_APPS = [
    "corsheaders",
    "rest_framework",
    "authUsers",
    # otras apps...
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "authUsers.middleware.BearerAuthMiddleware",
    # otros middlewares...
]

# --- LECTURA Y PROCESAMIENTO DE CORS ---

# 1. Obtener la cadena de URLs separadas por comas desde la variable de entorno
CORS_URLS_STRING = os.getenv('FRONTEND_URLS_CORS', '')
print ("CORS_URLS_STRING: ", CORS_URLS_STRING)

# 2. Dividir el string en una lista de orígenes permitidos
CORS_ALLOWED_ORIGINS = [
    url.strip() 
    for url in CORS_URLS_STRING.split(',') 
    if url.strip()
]

CORS_ALLOW_HEADERS = ["authorization", "content-type"]
CORS_ALLOW_CREDENTIALS = True
```

## en la parte de CORS_ALLOWED_ORIGINS se hace el llamado de los datos desde el .env
```
#DATOS DE CORS_ALLOWED_ORIGINS
FRONTEND_URLS_CORS=http://localhost:5175,http://localhost:5173,http://frontend:5175,http://frontend:5173,http://localhost:3001,
```
## Tambien debemos agregar 
- Este dato lo tenemos en proyecto de authcenter en la parte de .env 
# 3. Secreto JWT (Obtenido de la sección JWT Settings)
SUPABASE_JWT_SECRET="hnp7GbFBsgLq6ejR2sc12OEqdYxUK86OFzoWf******va mas informacion.****lMC1wXQ==" # Esta linea de codigo tambien sale de supabase
Es importante que tenga la misma ya que asi podra autorizar la cookie para que sea leida
```
AUTHCENTER_JWT_SECRET=tu_secreto_compartido_con_authcenter
```
____
4️⃣ Estructura de la app authUsers
- Utilizar el comando
```
python manage.py startapp authUsers 
```
- la estructura debe quedar
```
authUsers/
  __init__.py
  apps.py
  models.py
  token_utils.py
  middleware.py
  views.py
  urls.py
  admin.py
  tests.py
```
___
## authUsers/apps.py
```
from django.apps import AppConfig

class AuthUsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "authUsers"
    verbose_name = "Auth Users helper app"
```
__
## authUsers/models.py
```
from django.db import models

class Role(models.Model):
    """
    Modelo opcional para mapear roles si quieres persistir metadatos
    sobre roles (descripciones, permisos, etc.)
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
```
___
## authUsers/token_utils.py
```
import os
from typing import Dict, Optional
import jwt
from jwt import InvalidTokenError
from django.conf import settings

JWT_SECRET = getattr(settings, "AUTHCENTER_JWT_SECRET", os.getenv("AUTHCENTER_JWT_SECRET"))
JWT_ALGORITHM = "HS256"

class TokenDecodeError(Exception):
    pass

def decode_auth_token(token: str) -> Dict:
    if not token:
        raise TokenDecodeError("Token no proporcionado.")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except InvalidTokenError as e:
        raise TokenDecodeError(f"Token inválido o expirado: {str(e)}") from e

def get_role_from_payload(payload: Dict) -> Optional[str]:
    if not payload:
        return None
    role = payload.get("role") or payload.get("roles") or payload.get("user_role")
    if isinstance(role, list):
        return role[0] if role else None
    return role
```
___
## authUsers/middleware.py
```
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpRequest
from django.conf import settings
import jwt

class BearerAuthMiddleware(MiddlewareMixin):
    """
    Middleware para extraer el token desde el header Authorization:
        Authorization: Bearer <token>
    
    Decodifica el JWT usando AUTHCENTER_JWT_SECRET y expone:
        request.auth_user = {"payload": payload, "role": role}
    
    Si el token es inválido o no se proporciona, auth_user = None
    """

    ROLE_KEYS = ["role", "roles", "user_role", "userRoles"]

    def process_request(self, request: HttpRequest):
        request.auth_user = None
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        
        # Log opcional para debugging
        print("HTTP_AUTHORIZATION:", auth_header)

        if not auth_header.startswith("Bearer "):
            return

        token = auth_header.split("Bearer ")[1].strip()
        if not token:
            return

        try:
            # Decodifica JWT usando el secreto y HS256
            # options={"verify_aud": False} para evitar error de audiencia
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

            request.auth_user = {"payload": payload, "role": role_value}

            # Log opcional para debugging
            print("Payload decodificado:", payload)
            print("Rol detectado:", role_value)

        except jwt.ExpiredSignatureError:
            print("Token expirado")
        except jwt.InvalidSignatureError:
            print("Firma inválida")
        except Exception as e:
            print("Error al decodificar token:", str(e))
```
______
## authUsers/views.py
```
from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def get_role_view(request):
    auth_user = getattr(request, "auth_user", None)
    role = auth_user.get("role") if auth_user else None
    return JsonResponse({"role": role})

@require_GET
def get_payload_view(request):
    auth_user = getattr(request, "auth_user", None)
    payload = auth_user.get("payload") if auth_user else None
    return JsonResponse({"payload": payload})
```
___
## authUsers/urls.py
```
from django.urls import path
from . import views

urlpatterns = [
    path("role/", views.get_role_view, name="get_role"),
    path("payload/", views.get_payload_view, name="get_payload"),
]
```
___
## authUsers/admin.py
from django.contrib import admin
from .models import Role

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
__
## authUsers/tests.py
```
from django.test import TestCase, Client
from django.urls import reverse
import jwt
from django.conf import settings
from .token_utils import decode_auth_token, TokenDecodeError

class AuthUsersTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.url_role = reverse("get_role")
        self.payload = {"sub": "user1", "role": "admin"}
        self.token = jwt.encode(self.payload, settings.AUTHCENTER_JWT_SECRET, algorithm="HS256")

    def test_decode_auth_token_valid(self):
        decoded = decode_auth_token(self.token)
        self.assertEqual(decoded.get("role"), "admin")

    def test_decode_auth_token_invalid(self):
        with self.assertRaises(TokenDecodeError):
            decode_auth_token("token_invalido")

    def test_get_role_with_valid_header(self):
        resp = self.client.get(self.url_role, HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json().get("role"), "admin")

    def test_get_role_without_header(self):
        resp = self.client.get(self.url_role)
        self.assertEqual(resp.status_code, 200)
        self.assertIsNone(resp.json().get("role"))
```
___
# 5️⃣ Frontend Vite: ejemplo fetch
```
async function fetchRole(token) {
  const resp = await fetch("https://portfolio-backend.com/api/auth/role/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  return data.role;
}
```
___
# 6️⃣ Pruebas Postman
* Método: GET

* URL: https://portfolio-backend.com/api/auth/role/

* Header: Authorization: Bearer <token>

**Errores comunes:**

* 401 o role: null → Token faltante o malformado

* 403 → Token manipulado o expirado

* 200 con role → Token válido
___
# 7️⃣ Checklist final
1. Instalar dependencias

2. Configurar .env

3. Añadir authUsers en INSTALLED_APPS

4. Añadir BearerAuthMiddleware en MIDDLEWARE

5. Ejecutar servidor Django

6. Probar fetch desde frontend o Postman

7. Ejecutar tests: python manage.py test authUsers
___
# Cosas para tener encuenta
## Modificar urls.py de core
- Para que pueda encontrar la urls.py de authUsers
```
"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),    
    path('api/', include('accounts.urls')),
    path('auth/', include('authUsers.urls')),

     # Documentación Swagger    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```
## Crear un archivo para hacer pruebas de conexion
- en la raiz del proyecto crear **decode_token_inspect.py**
```
import jwt
import os
from dotenv import load_dotenv

# Cargar variables de .env
load_dotenv()

# ----------------------------
# Pega aquí tu JWT de usuario real
# ----------------------------
token = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkRYYmVYS2J3K0pYU2JUM2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2ttdmRwYnBsenNobGtvd3lzdXRpLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIwZGQ5OThhOS05NmU4LTRkYTctOWQ0ZC0zMzQxZmExYWM2YmUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzY0NDc4MjY4LCJpYXQiOjE3NjQ0NzQ2NjgsImVtYWlsIjoiaGVybmFuLmhhcmNvQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGIwOTJ4NVRrSnhCeEZmaFRMS2szNFJGRVFiNTQ4emdyRFNqNjRKQjFhbDZ1QnBSRT1zOTYtYyIsImVtYWlsIjoiaGVybmFuLmhhcmNvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJIZXJuYW4gQXJhbmdvIENvcnRlcyIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJIZXJuYW4gQXJhbmdvIENvcnRlcyIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xiMDkyeDVUa0p4QnhGZmhUTEtrMzRSRkVRYjU0OHpnckRTajY0SkIxYWw2dUJwUkU9czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwMzk1OTUwNzA4NjY2OTI3MTMwNSIsInN1YiI6IjEwMzk1OTUwNzA4NjY2OTI3MTMwNSJ9LCJyb2xlIjoiYWRtaW4iLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTc2NDQ3NDY2N31dLCJzZXNzaW9uX2lkIjoiMzIzNTYwOWYtY2M5Yy00MmUyLTliMTYtNWI0NTc1MjlmNzkxIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.oCzpT70P7cz0tzDW-RiR6S1fCY28mKuuEYOdR0JcJkM"

# Secreto compartido con authcenter (de .env)
secret = os.getenv("AUTHCENTER_JWT_SECRET")
if not secret:
    raise ValueError("No se encontró AUTHCENTER_JWT_SECRET en .env")

try:
    # Decodificar token sin verificar audiencia
    payload = jwt.decode(token, secret, algorithms=["HS256"], options={"verify_aud": False})
    print("Payload completo:")
    print(payload)
    
    # Detectar automáticamente la key de rol
    role_keys = ["role", "roles", "user_role", "userRoles"]
    role_value = None
    for key in role_keys:
        if key in payload:
            role_value = payload[key]
            if isinstance(role_value, list):
                role_value = role_value[0] if role_value else None
            break
    
    print("\nRol detectado:", role_value)

except jwt.ExpiredSignatureError:
    print("Error: el token ha expirado")
except jwt.InvalidSignatureError:
    print("Error: firma del token inválida")
except Exception as e:
    print("Error al decodificar token:", str(e))
```
- Para ejecutar
```
python decode_token_inspect.py
```
___
# 🔐 DIAGRAMA DE FLUJO COMPLETO DEL TOKEN ENTRE LOS PROYECTOS
```
                 ┌──────────────────────────────┐
                 │       AUTHCENTER BACKEND      │
                 │   (Node.js – localhost:3000)  │
                 └───────────────┬──────────────┘
                                 │
                                 │ 1. Usuario inicia sesión
                                 ▼
                 ┌──────────────────────────────┐
                 │  Genera authToken y refresh  │
                 │  (JWT con rol, id, email)    │
                 └───────────────┬──────────────┘
                                 │
                                 │ 2. Envía tokens
                                 │    - authToken (Bearer)
                                 │    - refreshToken (Cookie/LocalStorage)
                                 ▼
                 ┌──────────────────────────────┐
                 │ AUTHCENTER FRONTEND (Next.js)│
                 │      (localhost:3001)        │
                 └───────────────┬──────────────┘
                                 │
                                 │ 3. Guarda tokens en:
                                 │    - LocalStorage  → authToken
                                 │    - Cookie (opcional)
                                 │
                                 │ 4. Cuando requiere datos protegidos:
                                 │    Hace request a Django:
                                 │
                                 │   Authorization: Bearer <authToken>
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 PORTFOLIO BACKEND (Django REST) – localhost:8000        │
│           Nueva app: authUsers → /api/auth/role/                        │
└─────────────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │
                                 │ 5. Django recibe el token del header
                                 │    - Lo decodifica con la SECRET compartida
                                 │    - Valida firma, expiración, tipo
                                 │    - Extrae el rol del usuario
                                 ▼
                 ┌──────────────────────────────┐
                 │   Respuesta Django API       │
                 │   {
                 │     "role": "admin",
                 │     "email": "x@x.com",
                 │     "userId": 123
                 │   }
                 └───────────────┬──────────────┘
                                 │
                                 │ 6. Frontend Portfolio (Vite)
                                 │    usa esa info para:
                                 │      - Protecciones de rutas
                                 │      - Mostrar contenido según rol
                                 │      - Cargar dashboard, etc.
                                 ▼
        ┌────────────────────────────────────────────────────────────┐
        │      FRONTEND PORTFOLIO (Vite – localhost:5173)            │
        │   Recibe los datos del usuario desde Django                │
        └────────────────────────────────────────────────────────────┘

```

# Uso de cookie
## ✅ 1. FRONTEND authcenter (Next.js)
Aquí es donde guardas el token después del login.

Ejemplo actual:
```
localStorage.setItem("authToken", token);
```
Si cambias el nombre del token, solo cambias esta línea:
```
localStorage.setItem("nuevoNombreToken", token);
```
Y también cuando lo lees:
```
const token = localStorage.getItem("nuevoNombreToken");
```
___
## ✅ 2. FRONTEND portfolio (Vite)
Este frontend es el que envía el token a Django utilizando Bearer Token.

Ejemplo actual:
```
const token = localStorage.getItem("authToken");

fetch("http://localhost:8000/api/auth/role/", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```
Si cambias el nombre:
```
const token = localStorage.getItem("nuevoNombreToken");
```
**💡 Este es un punto crítico, porque si la variable cambia aquí, Django no recibirá nada.**
___

## ✅ 3. BACKEND Django (app authUsers)

Django no necesita saber el nombre de la cookie o variable,
solo necesita leer el header Authorization.

Ejemplo actual:
```
auth_header = request.headers.get("Authorization")
```
Esto **no cambia** aunque el token se llame diferente.

Lo que Django necesitaría cambiar es **solamente si cambia el contenido del token,** por ejemplo:

* agregas un nuevo campo

* cambias el nombre de "role" a "permissions"

* agregas datos personales

* agregas scopes

* agregas tenant

En ese caso, actualizas la parte donde lo decodificas:

en donde se puede encontrar esto en mi codigo es **views.py**

```
payload = jwt.decode(token, SECRET, algorithms=["HS256"])
role = payload.get("role")
```
Si tu token ahora tiene esto:
```
{
  "permissions": ["admin", "analytics"]
}
```
Entonces lo cambias por:
```
permissions = payload.get("permissions")
```
___
# 🔥 IMPORTANTE
Django NO necesita saber el nombre de la cookie.
Lo único que le importa es esto:
```
Authorization: Bearer <token>
```
Por eso solo necesitas actualizar:

* el frontend Next.js (que guarda el token)

* el frontend Vite (que lo lee y lo envía)
___
# 🧩 ¿Y si agrego un segundo token?
Ejemplo:

* authToken

* permissionsToken

Solo agregas:

En Next.js
```
localStorage.setItem("permissionsToken", tokenDos);
```
En Vite
```
const permisos = localStorage.getItem("permissionsToken");
```
En Django
Lo recibes por otro header o por el mismo payload.
___
# 🎁 **RESUMEN CLARO Y RÁPIDO**

| Capa                     | Debes actualizar si cambia el nombre del token |
|-------------------------|------------------------------------------------|
| **Backend Node (authcenter)** | Opcional, solo si cambias payload             |
| **Frontend Next.js**          | Sí, porque guarda el token                    |
| **Frontend Vite**             | Sí, porque lo lee y lo envía                  |
| **Backend Django**            | No, mientras el token llegue por Authorization |
