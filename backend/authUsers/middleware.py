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
