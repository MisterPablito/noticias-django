from django.urls import path
from . import views

urlpatterns = [
    path('', views.lista_artigos, name='lista_artigos'),
    path('artigo/<int:artigo_id>/', views.detalhe_artigo, name='detalhe_artigo'),
    path('artigo/<int:artigo_id>/comentarios/', views.comentarios_artigo, name='comentarios_artigo'),
    path('goticas/', views.pagina_goticas, name='goticas'),
    path('sobre/', views.sobre, name='sobre'),
    path('login/', views.login_falso, name='login'),
    path('api/sugestoes/', views.api_sugestoes, name='api_sugestoes'),
    path('api/goticas/', views.api_goticas, name='api_goticas'),
]