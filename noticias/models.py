from django.db import models
from django.utils import timezone

CATEGORIAS = [
    ('rhea', 'Rhea Ripley'),
    ('pinky', 'Pinkchyuwu'),
    ('natty', '6nattynat'),
]

class Artigo(models.Model):
    titulo = models.CharField(max_length=200)
    corpo = models.TextField()
    categoria = models.CharField(max_length=20, choices=CATEGORIAS, default='rhea')
    visualizacoes = models.PositiveIntegerField(default=0)
    data_publicacao = models.DateTimeField(default=timezone.now)
    imagem = models.ImageField(upload_to='artigos/', blank=True, null=True)

    def __str__(self):
        return self.titulo

class Comentario(models.Model):
    artigo = models.ForeignKey(Artigo, on_delete=models.CASCADE, related_name='comentarios')
    texto = models.TextField()
    data_comentario = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comentário em {self.artigo.titulo}'