from rest_framework import serializers
from .models import Jugador, EstadisticasGenerales, EstadisticasJuego

class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = '__all__'

class EstadisticasGeneralesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadisticasGenerales
        fields = '__all__'

class EstadisticasJuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadisticasJuego
        fields = '__all__'
