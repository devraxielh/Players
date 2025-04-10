from django.contrib import admin
from .models import Jugador, EstadisticasGenerales, EstadisticasJuego
from django.utils.safestring import mark_safe
# Inline para Estadísticas Generales con fieldsets
class EstadisticasGeneralesInline(admin.StackedInline):
    model = EstadisticasGenerales
    extra = 1
    readonly_fields = (
        'titulo_tactica',
        'titulo_tecnica',
        'titulo_fisica',
        'titulo_psicologica',
    )
    fieldsets = (
        ('Marca de Tiempo', {
            'fields': ('fecha',)
        }),
        (None, {
            'fields': (
                'titulo_tactica',
                ('td_puesto'),
                ('td_otros_puestos'),
                ('ejecucion',),
                ('m_defensa'),
                ('m_ofensivo'),
                'titulo_tecnica',
                ('pph', 'ppi'),
                ('rpi','rph'),
                ('jcabeza', 'conduccion'),
                ('controles', 'finta_regate'),
                'titulo_fisica',
                ('agilidad', 'velocidad'),
                ('resistencia', 'fuerza'),
                ('flexibilidad',),
                'titulo_psicologica',
                ('cpsi', 'ccog'),
                ('crel', 'ccomp'),
                ('criv', 'disci'),
            )
        }),
    )

    def get_formset(self, request, obj=None, **kwargs):
        formset = super().get_formset(request, obj, **kwargs)
        form = formset.form
        form.base_fields['td_puesto'].label = 'Toma de decisión en su posición'
        form.base_fields['td_otros_puestos'].label = 'Toma de decisión en otras posiciones'
        form.base_fields['ejecucion'].label = 'ejecución'
        form.base_fields['m_defensa'].label = 'Momento defensivo'
        form.base_fields['m_ofensivo'].label = 'Momento Ofensivo '
        return formset

    # Métodos para encabezados visuales
    def titulo_tactica(self, obj=None):
        return mark_safe("<h4 style='color:#007bff; margin-top: 1em;'>⚽ TÁCTICA</h3>")
    
    def titulo_tecnica(self, obj=None):
        return mark_safe("<h4 style='color:#28a745; margin-top: 1em;'>🎯 TÉCNICA</h3>")
    
    def titulo_fisica(self, obj=None):
        return mark_safe("<h4 style='color:#17a2b8; margin-top: 1em;'>💪 FÍSICA</h3>")
    
    def titulo_psicologica(self, obj=None):
        return mark_safe("<h4 style='color:#6f42c1; margin-top: 1em;'>🧠 PSICOLÓGICA</h3>")

    # Evitamos mostrar nombres de campo en la tabla
    titulo_tactica.short_description = ''
    titulo_tecnica.short_description = ''
    titulo_fisica.short_description = ''
    titulo_psicologica.short_description = ''

# Inline para Estadísticas por Juego
class EstadisticasJuegoInline(admin.StackedInline):
    model = EstadisticasJuego
    extra = 1
    fieldsets = (
        ('ESTADÍSTICAS DE JUEGO', {
            'fields': (
                'fecha','pase_corto', 'pase_largo', 'control', 'conducciones', 'remate', 'regate', 
                'juego_aereo', 'vision', 'concentracion', 'ritmo_intensidad', 
                'duelos_ofensivos', 'duelos_defensivos'
            )
        }),
    )

# Admin completo de Jugador con todo organizado dentro
@admin.register(Jugador)
class JugadorAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'fecha_nacimiento', 'posicion')
    search_fields = ('nombre_completo', 'posicion')
    fieldsets = (
        ('Datos personales', {
            'fields': ('nombre_completo', 'fecha_nacimiento', 'posicion','estatura', 'peso', 'foto')
        }),
    )
    inlines = [EstadisticasGeneralesInline, EstadisticasJuegoInline]
    class Media:
        css = {
            'all': ('/static/jugadores/css/admin_custom.css',)
        }

