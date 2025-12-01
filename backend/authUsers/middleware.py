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