from django.contrib import admin
from django.utils.safestring import mark_safe
from django.urls import path
from django.shortcuts import get_object_or_404
from django.utils.html import format_html
from .models import Jugador, EstadisticasGenerales, EstadisticasJuego
from .pdf_report import generar_pdf_jugador, generar_excel_jugador, generar_comparativo_pdf
from django import forms
from django.shortcuts import render, redirect
from .forms import CompararJugadorForm
from django.contrib import admin

admin.site.site_header = "⚽ Panel de Gestión de Jugadores"
admin.site.site_title = "⚽ Administración"
admin.site.index_title = "🏟️ Bienvenido al Sistema de Análisis Deportivo"
class CompararJugadorForm(forms.Form):
    jugador_comparado = forms.ModelChoiceField(queryset=Jugador.objects.all(), label="Comparar con")
# --- Inline: Estadísticas de Juego ---
class EstadisticasJuegoInline(admin.StackedInline):
    model = EstadisticasJuego
    extra = 1
    classes = ('collapse',)
    fieldsets = (
        ('ESTADÍSTICAS DE JUEGO', {
            'fields': (
                'fecha', 'pase_corto', 'pase_largo','pase_efectivo','pase_errado', 'control', 'conducciones', 'remate', 'regate',
                'juego_aereo', 'vision', 'concentracion', 'ritmo_intensidad',
                'duelos_ofensivos', 'duelos_defensivos'
            )
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).order_by('-fecha')

# --- Inline: Estadísticas Generales ---
class EstadisticasGeneralesInline(admin.StackedInline):
    model = EstadisticasGenerales
    extra = 1
    classes = ('collapse',)
    readonly_fields = (
        'titulo_tactica', 'titulo_tecnica', 'titulo_fisica', 'titulo_psicologica',
    )
    fieldsets = (
        ('Marca de Tiempo', {'fields': ('fecha',)}),
        (None, {
            'fields': (
                'titulo_tactica',
                ('td_puesto'), ('td_otros_puestos'), ('ejecucion',),
                ('m_defensa'), ('m_ofensivo'),
                'titulo_tecnica',
                ('pph', 'ppi'), ('rpi','rph'),
                ('jcabeza', 'conduccion'), ('controles', 'finta_regate'),
                'titulo_fisica',
                ('agilidad', 'velocidad'), ('resistencia', 'fuerza'),
                ('flexibilidad',),
                'titulo_psicologica',
                ('cpsi', 'ccog'), ('crel', 'ccomp'), ('criv', 'disci'),
            )
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).order_by('-fecha')

    def get_formset(self, request, obj=None, **kwargs):
        formset = super().get_formset(request, obj, **kwargs)
        form = formset.form
        form.base_fields['td_puesto'].label = 'Toma de decisión en su posición'
        form.base_fields['td_otros_puestos'].label = 'Toma de decisión en otras posiciones'
        form.base_fields['ejecucion'].label = 'Ejecución'
        form.base_fields['m_defensa'].label = 'Momento defensivo'
        form.base_fields['m_ofensivo'].label = 'Momento ofensivo'
        return formset

    def titulo_tactica(self, obj=None):
        return mark_safe("<h4 style='color:#007bff; margin-top: 1em;'>⚽ TÁCTICA</h4>")
    def titulo_tecnica(self, obj=None):
        return mark_safe("<h4 style='color:#28a745; margin-top: 1em;'>🎯 TÉCNICA</h4>")
    def titulo_fisica(self, obj=None):
        return mark_safe("<h4 style='color:#17a2b8; margin-top: 1em;'>💪 FÍSICA</h4>")
    def titulo_psicologica(self, obj=None):
        return mark_safe("<h4 style='color:#6f42c1; margin-top: 1em;'>🧠 PSICOLÓGICA</h4>")

    titulo_tactica.short_description = ''
    titulo_tecnica.short_description = ''
    titulo_fisica.short_description = ''
    titulo_psicologica.short_description = ''

# --- Admin de Jugador ---
@admin.register(Jugador)
class JugadorAdmin(admin.ModelAdmin):
    list_display = (
        'mostrar_foto', 'nombre_completo', 'fecha_nacimiento', 'posicion',
        'estatura', 'peso', 'boton_pdf', 'boton_excel', 'boton_comparar'
    )
    search_fields = ('nombre_completo', 'posicion')
    fieldsets = (
        ('Datos personales', {
            'fields': ('nombre_completo', 'fecha_nacimiento', 'posicion', 'estatura', 'peso', 'foto', 'observaciones')
        }),
    )
    inlines = [EstadisticasJuegoInline, EstadisticasGeneralesInline]

    def mostrar_foto(self, obj):
        if obj.foto and hasattr(obj.foto, 'url'):
            return mark_safe(f'<img src="{obj.foto.url}" style="height:60px; border-radius:6px;" />')
        return "(sin foto)"
    mostrar_foto.short_description = 'Foto'

    def boton_pdf(self, obj):
        return format_html('<a class="button" href="{}/reporte_pdf/">📄 PDF</a>', obj.id)
    def boton_excel(self, obj):
        return format_html('<a class="button" href="{}/reporte_excel/">📥 Excel</a>', obj.id)
    def boton_comparar(self, obj):
        return format_html('<a class="button" href="{}/comparar/">⚖️ Comparar</a>', obj.id)
    boton_pdf.short_description = "PDF"
    boton_excel.short_description = "Excel"
    boton_comparar.short_description = "Comparar"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<int:jugador_id>/reporte_pdf/', self.admin_site.admin_view(self.reporte_pdf), name='jugador_reporte_pdf'),
            path('<int:jugador_id>/reporte_excel/', self.admin_site.admin_view(self.reporte_excel), name='jugador_reporte_excel'),
            path('<int:jugador_id>/comparar/', self.admin_site.admin_view(self.comparar_view), name='jugador_comparar'),
            path('comparar/<int:jugador1_id>/<int:jugador2_id>/', self.admin_site.admin_view(self.reporte_comparativo), name='jugador_comparativo'),
        ]
        return custom_urls + urls

    def reporte_pdf(self, request, jugador_id):
        return generar_pdf_jugador(jugador_id)

    def reporte_excel(self, request, jugador_id):
        return generar_excel_jugador(jugador_id)

    def comparar_view(self, request, jugador_id):
        jugador_base = get_object_or_404(Jugador, pk=jugador_id)

        if request.method == 'POST':
            form = CompararJugadorForm(request.POST)
            if form.is_valid():
                jugador2 = form.cleaned_data['jugador_comparado']
                return redirect(f'/admin/jugadores/jugador/comparar/{jugador_base.id}/{jugador2.id}/')
        else:
            form = CompararJugadorForm()

        context = {
            'form': form,
            'jugador': jugador_base,
            'opts': self.model._meta,
            'title': f"Comparar {jugador_base.nombre_completo}",
            'jugador_id': jugador_base.id,
        }
        return render(request, 'admin/comparar_jugadores.html', context)

    def reporte_comparativo(self, request, jugador1_id, jugador2_id):
        return generar_comparativo_pdf(jugador1_id, jugador2_id)

    class Media:
        js = ('jugadores/js/inline_empty_first.js',)
        css = {
            'all': ('/static/jugadores/css/admin_custom.css',)
        }
