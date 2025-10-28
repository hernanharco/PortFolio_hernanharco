# views.py
from rest_framework.viewsets import ModelViewSet
from .models import heroModels
from .serializers import heroSerializer

class heroViewSet(ModelViewSet):
    queryset = heroModels.objects.all()
    serializer_class = heroSerializer