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
