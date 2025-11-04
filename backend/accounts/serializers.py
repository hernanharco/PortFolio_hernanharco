from rest_framework import serializers
from .models import heroModels

class heroSerializer(serializers.ModelSerializer):
    class Meta:
        model = heroModels
        fields = '__all__'