import os
import tempfile
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def colorear_segmentos(ax, labels, valores, titulo):
    angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=False).tolist()
    valores += valores[:1]
    angles += angles[:1]

    ax.set_thetagrids(np.degrees(angles[:-1]), labels, fontsize=8)
    ax.set_ylim(1, 10)
    ax.set_title(titulo, size=15, pad=30)
    ax.grid(True)

    for i in range(len(labels)):
        valor = valores[i]
        color = 'red' if valor <= 5 else 'orange' if valor <= 7 else 'green'
        segmento_valores = [valor, valores[i + 1]]
        segmento_angulos = [angles[i], angles[i + 1]]
        ax.plot(segmento_angulos, segmento_valores, color=color, linewidth=2)
        ax.fill(segmento_angulos, segmento_valores, color=color, alpha=0.3)

def crear_grafico_radar_juego(jugador):
    estadisticas = jugador.estadisticasjuego_set.all().order_by('-fecha')[:5]
    if not estadisticas:
        return None

    campos = [
        'pase_corto', 'pase_largo', 'pase_efectivo', 'pase_errado',
        'control', 'conducciones', 'remate', 'regate',
        'juego_aereo', 'vision', 'concentracion', 'ritmo_intensidad',
        'duelos_ofensivos', 'duelos_defensivos'
    ]

    labels = [campo.replace('_', ' ').title() for campo in campos]
    promedios = []

    for campo in campos:
        valores = [getattr(e, campo, 0) for e in estadisticas]
        promedio = sum(valores) / len(valores) if valores else 0
        promedios.append(promedio)

    fig, ax = plt.subplots(figsize=(5.5, 5.5), subplot_kw=dict(polar=True))
    colorear_segmentos(ax, labels, promedios, "Estadísticas de Juego")
    plt.subplots_adjust(top=0.85)

    temp_img = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    plt.savefig(temp_img.name, bbox_inches=None)
    plt.close(fig)
    return temp_img.name

def crear_grafico_radar_generales(jugador):
    estadisticas = jugador.estadisticasgenerales_set.all().order_by('-fecha')[:5]
    if not estadisticas:
        return None

    categorias = {
        'Táctica': ['td_puesto', 'td_otros_puestos', 'ejecucion', 'm_defensa', 'm_ofensivo'],
        'Técnica': ['pph', 'ppi', 'rpi', 'rph', 'jcabeza', 'conduccion', 'controles', 'finta_regate'],
        'Física': ['agilidad', 'velocidad', 'resistencia', 'fuerza', 'flexibilidad'],
        'Psicológica': ['cpsi', 'ccog', 'crel', 'ccomp', 'criv', 'disci'],
    }

    labels = list(categorias.keys())
    promedios = []

    for campos in categorias.values():
        valores_categoria = []
        for campo in campos:
            valores = [getattr(e, campo, 0) for e in estadisticas]
            if valores:
                valores_categoria.extend(valores)
        promedio_categoria = sum(valores_categoria) / len(valores_categoria) if valores_categoria else 0
        promedios.append(promedio_categoria)

    fig, ax = plt.subplots(figsize=(5.5, 5.5), subplot_kw=dict(polar=True))
    colorear_segmentos(ax, labels, promedios, "Estadísticas Generales")
    plt.subplots_adjust(top=0.85)

    temp_img = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    plt.savefig(temp_img.name, bbox_inches=None)
    plt.close(fig)
    return temp_img.name