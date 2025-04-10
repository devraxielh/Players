from django.db import models

class Jugador(models.Model):
    POSICIONES = [
        ('ARQ', 'Arquero'),
        ('LTD', 'Lateral Derecho'),
        ('LTI', 'Lateral Izquierdo'),
        ('DFC', 'Defensa Central'),
        ('MCD', 'Mediocampista Defensivo'),
        ('MC', 'Mediocampista Central'),
        ('MCO', 'Mediocampista Ofensivo'),
        ('EXD', 'Extremo Derecho'),
        ('EXI', 'Extremo Izquierdo'),
        ('DEL', 'Delantero Centro'),
        ('SD', 'Segundo Delantero'),
        ('MP', 'Mediapunta'),
    ]

    nombre_completo = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    posicion = models.CharField(max_length=3, choices=POSICIONES)
    estatura = models.FloatField()
    peso = models.FloatField()
    foto = models.ImageField(upload_to='jugadores_fotos/', blank=True, null=True)
    def __str__(self):
        return self.nombre_completo

class EstadisticasGenerales(models.Model):
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    fecha = models.DateField()
    td_puesto = models.IntegerField(default=0)
    td_otros_puestos = models.IntegerField(default=0)
    ejecucion = models.IntegerField(default=0)
    m_defensa = models.IntegerField(default=0)
    m_ofensivo = models.IntegerField(default=0)

    pph = models.IntegerField(default=0)
    ppi = models.IntegerField(default=0)
    rph = models.IntegerField(default=0)
    rpi = models.IntegerField(default=0)
    jcabeza = models.IntegerField(default=0)
    conduccion = models.IntegerField(default=0)
    controles = models.IntegerField(default=0)
    finta_regate = models.IntegerField(default=0)

    agilidad = models.IntegerField(default=0)
    velocidad = models.IntegerField(default=0)
    resistencia = models.IntegerField(default=0)
    fuerza = models.IntegerField(default=0)
    flexibilidad = models.IntegerField(default=0)

    cpsi = models.IntegerField(default=0)
    ccog = models.IntegerField(default=0)
    crel = models.IntegerField(default=0)
    ccomp = models.IntegerField(default=0)
    criv = models.IntegerField(default=0)
    disci = models.IntegerField(default=0)

class EstadisticasJuego(models.Model):
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    fecha = models.DateField()
    pase_corto = models.IntegerField(default=0)
    pase_largo = models.IntegerField(default=0)
    control = models.IntegerField(default=0)
    conducciones = models.IntegerField(default=0)
    remate = models.IntegerField(default=0)
    regate = models.IntegerField(default=0)
    juego_aereo = models.IntegerField(default=0)
    vision = models.IntegerField(default=0)
    concentracion = models.IntegerField(default=0)
    ritmo_intensidad = models.IntegerField(default=0)
    duelos_ofensivos = models.IntegerField(default=0)
    duelos_defensivos = models.IntegerField(default=0)
