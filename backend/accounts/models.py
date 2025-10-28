from django.db import models

class heroModels(models.Model):
    city = models.CharField(max_length=100)    
    title = models.CharField(max_length=100) 
    subtitle = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100)
    exampletext = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title}"