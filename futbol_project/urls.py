"""
URL configuration for futbol_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jugadores.views import JugadorViewSet, EstadisticasGeneralesViewSet, EstadisticasJuegoViewSet  # Asegúrate de importar tus vistas
from django.conf import settings
from django.conf.urls.static import static
# Crea el router y registra las vistas
router = DefaultRouter()
router.register(r'jugadores', JugadorViewSet)
router.register(r'estadisticas-generales', EstadisticasGeneralesViewSet)
router.register(r'estadisticas-juego', EstadisticasJuegoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),                 # Admin de Django
    path('', include(router.urls)),                  # Endpoints de API
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)