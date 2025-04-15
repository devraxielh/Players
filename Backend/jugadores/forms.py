from django import forms
from .models import Jugador

class CompararJugadorForm(forms.Form):
    jugador = forms.ModelChoiceField(
        queryset=Jugador.objects.all(),
        label="Jugador a comparar",
        widget=forms.Select(attrs={
            'class': 'select2',  # Activado por JS en la plantilla
            'style': 'width: 100%;'
        })
    )