from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    heroViewSet,    
)

router = DefaultRouter()
router.register(r'heroes', heroViewSet)

urlpatterns = [
    path('', include(router.urls)),
]