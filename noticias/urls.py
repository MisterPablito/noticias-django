from django.urls import path
from . import views

urlpatterns = [
    path('', views.lista_artigos, name='lista_artigos'),
    path('artigo/<int:artigo_id>/', views.detalhe_artigo, name='detalhe_artigo'),
    path('artigo/<int:artigo_id>/comentarios/', views.comentarios_artigo, name='comentarios_artigo'),
]