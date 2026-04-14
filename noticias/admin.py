from django.contrib import admin
from .models import Artigo, Comentario

class ArtigoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'visualizacoes', 'data_publicacao', 'imagem')
    list_filter = ('categoria', 'data_publicacao')
    search_fields = ('titulo', 'corpo')
    fieldsets = (
        (None, {
            'fields': ('titulo', 'corpo', 'categoria', 'imagem')
        }),
        ('Estatísticas', {
            'fields': ('visualizacoes', 'data_publicacao'),
            'classes': ('collapse',)
        }),
    )

admin.site.register(Artigo, ArtigoAdmin)
admin.site.register(Comentario)