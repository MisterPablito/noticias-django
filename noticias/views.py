import random
from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.contrib import messages
from django.db.models import Q
from django.http import JsonResponse
from .models import Artigo, Comentario, CATEGORIAS
from .forms import ComentarioForm

FRASES_RODAPE = [
    "Hoje só vestimos preto.",
    "A noite é a nossa tela.",
    "Onde as sombras ganham voz.",
    "A beleza está na escuridão.",
]

def lista_artigos(request):
    categoria_filtro = request.GET.get('categoria')
    termo_pesquisa = request.GET.get('q')

    artigos = Artigo.objects.all().order_by('-data_publicacao')

    if categoria_filtro:
        artigos = artigos.filter(categoria=categoria_filtro)
    if termo_pesquisa:
        artigos = artigos.filter(
            Q(titulo__icontains=termo_pesquisa) | Q(corpo__icontains=termo_pesquisa)
        )

    paginator = Paginator(artigos, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    frase_aleatoria = random.choice(FRASES_RODAPE)

    context = {
        'page_obj': page_obj,
        'categoria_selecionada': categoria_filtro,
        'termo_pesquisa': termo_pesquisa,
        'frase_aleatoria': frase_aleatoria,
    }
    return render(request, 'noticias/lista_artigos.html', context)

def detalhe_artigo(request, artigo_id):
    artigo = get_object_or_404(Artigo, id=artigo_id)
    artigo.visualizacoes += 1
    artigo.save()
    return render(request, 'noticias/detalhe_artigo.html', {'artigo': artigo})

def comentarios_artigo(request, artigo_id):
    artigo = get_object_or_404(Artigo, id=artigo_id)
    if request.method == 'POST':
        form = ComentarioForm(request.POST)
        if form.is_valid():
            comentario = form.save(commit=False)
            comentario.artigo = artigo
            comentario.save()
            messages.success(request, '🖤 O teu comentário ecoou nas sombras...')
            return redirect('comentarios_artigo', artigo_id=artigo.id)
    else:
        form = ComentarioForm()
    return render(request, 'noticias/comentarios_artigo.html', {
        'artigo': artigo,
        'comentarios': artigo.comentarios.all().order_by('-data_comentario'),
        'form': form
    })

def pagina_goticas(request):
    context = {
        'categorias': CATEGORIAS,
        'mensagem_extra': '✨ Em breve mais góticas... O submundo está sempre a crescer. ✨'
    }
    return render(request, 'noticias/goticas.html', context)

def sobre(request):
    return render(request, 'noticias/sobre.html')

def login_falso(request):
    erro = False
    if request.method == 'POST':
        erro = True
    return render(request, 'noticias/login.html', {'erro': erro})

def api_sugestoes(request):
    termo = request.GET.get('q', '')
    if len(termo) < 2:
        return JsonResponse([], safe=False)

    sugestoes = []
    for value, label in CATEGORIAS:
        if termo.lower() in label.lower():
            sugestoes.append({'tipo': 'categoria', 'valor': value, 'label': label})
    artigos = Artigo.objects.filter(titulo__icontains=termo)[:3]
    for a in artigos:
        sugestoes.append({'tipo': 'artigo', 'id': a.id, 'titulo': a.titulo})

    return JsonResponse(sugestoes, safe=False)

def api_goticas(request):
    return JsonResponse([{'valor': v, 'label': l} for v, l in CATEGORIAS], safe=False)