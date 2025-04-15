import os
import tempfile
from datetime import datetime
from textwrap import wrap

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from .models import Jugador
from .graficos import crear_grafico_radar_juego, crear_grafico_radar_generales

def generar_pdf_jugador(jugador_id):
    jugador = Jugador.objects.get(pk=jugador_id)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="reporte_{jugador.nombre_completo}.pdf"'

    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter
    padding = 40

    # --- Foto del jugador (izquierda) ---
    foto_y = height - 190
    if jugador.foto and hasattr(jugador.foto, 'path'):
        try:
            img_reader = ImageReader(jugador.foto.path)
            p.drawImage(img_reader, padding, foto_y, width=100, height=100, preserveAspectRatio=True, mask='auto')
        except Exception as e:
            print("Error cargando la imagen:", e)

    # --- Título centrado ---
    titulo = "Reporte del Jugador"
    p.setFont("Helvetica-Bold", 20)
    titulo_width = p.stringWidth(titulo, "Helvetica-Bold", 20)
    titulo_y = height - 50
    p.drawString((width - titulo_width) / 2, titulo_y, titulo)

    # --- Fecha actual centrada debajo del título ---
    fecha_actual = datetime.now().strftime("%d/%m/%Y")
    p.setFont("Helvetica", 10)
    fecha_width = p.stringWidth(fecha_actual, "Helvetica", 10)
    p.drawString((width - fecha_width) / 2, titulo_y - 15, fecha_actual)

    # --- Línea horizontal debajo del título ---
    line_y = titulo_y - 30
    p.setLineWidth(1)
    p.line((width - 400) / 2, line_y, (width + 400) / 2, line_y)

    # --- Datos personales ---
    texto_x = 170
    datos_y = foto_y + 90
    p.setFont("Helvetica", 12)
    p.drawString(texto_x, datos_y, f"{jugador.nombre_completo}")
    p.drawString(texto_x, datos_y - 20, f"Fecha de nacimiento: {jugador.fecha_nacimiento}")
    p.drawString(texto_x, datos_y - 40, f"Posición: {jugador.get_posicion_display()}")
    p.drawString(texto_x, datos_y - 60, f"Estatura: {jugador.estatura} m")
    p.drawString(texto_x, datos_y - 80, f"Peso: {jugador.peso} kg")

    # --- Gráficos radar ---
    radar_juego = crear_grafico_radar_juego(jugador)
    if radar_juego and os.path.exists(radar_juego):
        try:
            p.drawImage(radar_juego, padding, 320, width=250, height=250, preserveAspectRatio=True)
        except Exception as e:
            print("Error al insertar radar juego:", e)
        finally:
            os.remove(radar_juego)

    radar_gen = crear_grafico_radar_generales(jugador)
    if radar_gen and os.path.exists(radar_gen):
        try:
            p.drawImage(radar_gen, width - padding - 250, 320, width=250, height=250, preserveAspectRatio=True)
        except Exception as e:
            print("Error al insertar radar general:", e)
        finally:
            os.remove(radar_gen)

    # --- Observaciones ---
    if jugador.observaciones:
        p.setFont("Helvetica-Bold", 12)
        p.drawString(padding, 280, "📜 Observaciones:")
        p.setFont("Helvetica", 11)
        lineas = wrap(jugador.observaciones, width=100)
        y_obs = 260
        for linea in lineas:
            p.drawString(padding, y_obs, linea)
            y_obs -= 15

    p.showPage()
    p.save()
    return response