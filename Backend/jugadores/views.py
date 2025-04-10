from rest_framework import viewsets
from .models import Jugador, EstadisticasGenerales, EstadisticasJuego
from .serializers import JugadorSerializer, EstadisticasGeneralesSerializer, EstadisticasJuegoSerializer

class JugadorViewSet(viewsets.ModelViewSet):
    queryset = Jugador.objects.all()
    serializer_class = JugadorSerializer

class EstadisticasGeneralesViewSet(viewsets.ModelViewSet):
    queryset = EstadisticasGenerales.objects.all()
    serializer_class = EstadisticasGeneralesSerializer

class EstadisticasJuegoViewSet(viewsets.ModelViewSet):
    queryset = EstadisticasJuego.objects.all()
    serializer_class = EstadisticasJuegoSerializer
