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
