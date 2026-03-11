from django.shortcuts import render
from main.models import Car
from rest_framework import viewsets
from main.serializers import CarSerializer
# Create your views here.


class CarApi(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer