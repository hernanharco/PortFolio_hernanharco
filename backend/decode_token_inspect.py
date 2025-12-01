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
