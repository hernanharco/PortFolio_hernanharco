from django.urls import path
from . import views

urlpatterns = [
    path("role/", views.get_role_view, name="get_role"),
    path("payload/", views.get_payload_view, name="get_payload"),
]
