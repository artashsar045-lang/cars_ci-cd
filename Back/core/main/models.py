from django.db import models

# Create your models here.
class Car(models.Model):

    model = models.CharField(max_length=60)
    price = models.PositiveIntegerField()
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.model