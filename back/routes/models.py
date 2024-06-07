from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser, models.Model):
    name = models.CharField(max_length=250)
    contact = models.CharField(max_length=250)
    bio = models.CharField(max_length=600, null=True, blank=True)

    class Meta:
        ordering = ['name']


class Place(models.Model):
    """
        Um modelo que representa um lugar disponivel para ser um endpoint.
    """
    name = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    
    class Meta:
        ordering = ['name']


class Route(models.Model):
    """
        Um modelo que representa uma rota.
    """
    name = models.CharField(max_length=150)
    intentions = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='routes')
    arrive_time = models.DateTimeField(null=True, blank=True)
    from_place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='from_routes')
    to_place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='to_routes')

    class Meta:
        ordering = ['name']
