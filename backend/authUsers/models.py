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
