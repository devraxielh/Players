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
    observaciones = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.nombre_completo
    class Meta:
        verbose_name = "jugador"
        verbose_name_plural = "jugadores"

class EstadisticasGenerales(models.Model):
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    fecha = models.DateField()
    td_puesto = models.FloatField(default=0)
    td_otros_puestos = models.FloatField(default=0)
    ejecucion = models.FloatField(default=0)
    m_defensa = models.FloatField(default=0)
    m_ofensivo = models.FloatField(default=0)

    pph = models.FloatField(default=0)
    ppi = models.FloatField(default=0)
    rph = models.FloatField(default=0)
    rpi = models.FloatField(default=0)
    jcabeza = models.FloatField(default=0)
    conduccion = models.FloatField(default=0)
    controles = models.FloatField(default=0)
    finta_regate = models.FloatField(default=0)

    agilidad = models.FloatField(default=0)
    velocidad = models.FloatField(default=0)
    resistencia = models.FloatField(default=0)
    fuerza = models.FloatField(default=0)
    flexibilidad = models.FloatField(default=0)

    cpsi = models.FloatField(default=0)
    ccog = models.FloatField(default=0)
    crel = models.FloatField(default=0)
    ccomp = models.FloatField(default=0)
    criv = models.FloatField(default=0)
    disci = models.FloatField(default=0)

class EstadisticasJuego(models.Model):
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    fecha = models.DateField()
    pase_corto = models.FloatField(default=0)
    pase_largo = models.FloatField(default=0)
    pase_efectivo = models.FloatField(default=0)
    pase_errado = models.FloatField(default=0)
    control = models.FloatField(default=0)
    conducciones = models.FloatField(default=0)
    remate = models.FloatField(default=0)
    regate = models.FloatField(default=0)
    juego_aereo = models.FloatField(default=0)
    vision = models.FloatField(default=0)
    concentracion = models.FloatField(default=0)
    ritmo_intensidad = models.FloatField(default=0)
    duelos_ofensivos = models.FloatField(default=0)
    duelos_defensivos = models.FloatField(default=0)
