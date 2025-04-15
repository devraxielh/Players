import os
import tempfile
import numpy as np
import matplotlib.pyplot as plt

from datetime import datetime
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader

from .models import Jugador, EstadisticasJuego, EstadisticasGenerales

def promedio_stats(queryset, campos):
    return [np.mean([getattr(e, campo) for e in queryset]) if queryset else 0 for campo in campos]


def crear_grafico_radar(etiquetas, valores1, valores2, titulo, color1='blue', color2='red'):
    valores1 += valores1[:1]
    valores2 += valores2[:1]
    angulos = np.linspace(0, 2 * np.pi, len(etiquetas), endpoint=False).tolist()
    angulos += angulos[:1]

    fig, ax = plt.subplots(figsize=(5, 5), subplot_kw=dict(polar=True))
    ax.set_ylim(0, 10)

    ax.plot(angulos, valores1, linewidth=2, marker='o', label="Jugador 1", color=color1)
    ax.plot(angulos, valores2, linewidth=2, marker='o', label="Jugador 2", color=color2)

    ax.set_thetagrids(np.degrees(angulos[:-1]), etiquetas, fontsize=8)
    ax.set_title(titulo, size=16)
    ax.grid(True)

    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    plt.savefig(temp.name, bbox_inches='tight')
    plt.close()
    return temp.name


def crear_grafico_radar_juego_comparativo(jugador1, jugador2):
    stats_labels = [
        "pase_corto", "pase_largo", "pase_efectivo", "pase_errado", "control",
        "conducciones", "remate", "regate", "juego_aereo", "vision",
        "concentracion", "ritmo_intensidad", "duelos_ofensivos", "duelos_defensivos"
    ]
    etiquetas = [campo.replace("_", " ").title() for campo in stats_labels]
    stats1 = EstadisticasJuego.objects.filter(jugador=jugador1).order_by('-fecha')[:5]
    stats2 = EstadisticasJuego.objects.filter(jugador=jugador2).order_by('-fecha')[:5]

    valores1 = promedio_stats(stats1, stats_labels)
    valores2 = promedio_stats(stats2, stats_labels)

    return crear_grafico_radar(etiquetas, valores1, valores2, "Estadísticas de Juego")


def crear_grafico_radar_generales_comparativo(jugador1, jugador2):
    categorias = {
        "Táctica": ['td_puesto', 'td_otros_puestos', 'ejecucion', 'm_defensa', 'm_ofensivo'],
        "Técnica": ['pph', 'ppi', 'rph', 'rpi', 'jcabeza', 'conduccion', 'controles', 'finta_regate'],
        "Física": ['agilidad', 'velocidad', 'resistencia', 'fuerza', 'flexibilidad'],
        "Psicológica": ['cpsi', 'ccog', 'crel', 'ccomp', 'criv', 'disci']
    }

    stats1 = EstadisticasGenerales.objects.filter(jugador=jugador1).order_by('-fecha')[:5]
    stats2 = EstadisticasGenerales.objects.filter(jugador=jugador2).order_by('-fecha')[:5]

    def promedio_categoria(queryset, campos):
        return np.mean([getattr(e, campo) for e in queryset for campo in campos]) if queryset else 0

    etiquetas = list(categorias.keys())
    valores1 = [promedio_categoria(stats1, campos) for campos in categorias.values()]
    valores2 = [promedio_categoria(stats2, campos) for campos in categorias.values()]

    return crear_grafico_radar(etiquetas, valores1, valores2, "Estadísticas Generales", color1='green', color2='orange')


def generar_comparativo_pdf(jugador1_id, jugador2_id):
    jugador1 = Jugador.objects.get(pk=jugador1_id)
    jugador2 = Jugador.objects.get(pk=jugador2_id)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename=comparativo_{jugador1.nombre_completo}_vs_{jugador2.nombre_completo}.pdf'

    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter
    padding = 40
    y = height - 50

    # Título principal
    p.setFont("Helvetica-Bold", 16)
    p.drawString((width - p.stringWidth("Comparativo de Jugadores", "Helvetica-Bold", 16)) / 2, y, "Comparativo de Jugadores")
    y -= 30

    # Encabezados
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Campo")
    p.drawString(250, y, jugador1.nombre_completo)
    p.drawString(450, y, jugador2.nombre_completo)
    y -= 20

    # Datos personales
    p.setFont("Helvetica", 11)
    campos = [
        ("Fecha de nacimiento", jugador1.fecha_nacimiento, jugador2.fecha_nacimiento),
        ("Posición", jugador1.get_posicion_display(), jugador2.get_posicion_display()),
        ("Estatura (m)", jugador1.estatura, jugador2.estatura),
        ("Peso (kg)", jugador1.peso, jugador2.peso),
    ]
    for campo, val1, val2 in campos:
        p.drawString(50, y, str(campo))
        p.drawString(250, y, str(val1))
        p.drawString(450, y, str(val2))
        y -= 20

    p.line(padding, y, width - padding, y)
    y -= 20

    # --- Gráficos lado a lado en la misma hoja ---
    ruta_juego = crear_grafico_radar_juego_comparativo(jugador1, jugador2)
    ruta_generales = crear_grafico_radar_generales_comparativo(jugador1, jugador2)

    if os.path.exists(ruta_juego):
        p.drawImage(ImageReader(ruta_juego), 40, y - 280, width=250, height=250)
        os.remove(ruta_juego)

    if os.path.exists(ruta_generales):
        p.drawImage(ImageReader(ruta_generales), 320, y - 280, width=250, height=250)
        os.remove(ruta_generales)

    p.showPage()
    p.save()
    return response