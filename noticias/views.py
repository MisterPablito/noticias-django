from django.shortcuts import render, get_object_or_404, redirect
from .models import Artigo, Comentario
from django import forms

class ComentarioForm(forms.ModelForm):
    class Meta:
        model = Comentario
        fields = ['texto']

def lista_artigos(request):
    artigos = Artigo.objects.all()
    return render(request, 'noticias/lista_artigos.html', {'artigos': artigos})

def detalhe_artigo(request, artigo_id):
    artigo = get_object_or_404(Artigo, id=artigo_id)
    return render(request, 'noticias/detalhe_artigo.html', {'artigo': artigo})

def comentarios_artigo(request, artigo_id):
    artigo = get_object_or_404(Artigo, id=artigo_id)

    if request.method == 'POST':
        form = ComentarioForm(request.POST)
        if form.is_valid():
            comentario = form.save(commit=False)
            comentario.artigo = artigo
            comentario.save()
            return redirect('comentarios_artigo', artigo_id=artigo.id)
    else:
        form = ComentarioForm()

    return render(request, 'noticias/comentarios_artigo.html', {
        'artigo': artigo,
        'comentarios': artigo.comentarios.all(),
        'form': form
    })