from django import template
from django.utils import timezone

register = template.Library()

@register.filter
def data_relativa(value):
    if not value:
        return ''
    agora = timezone.now()
    diff = agora - value

    if diff.days > 365:
        anos = diff.days // 365
        return f'há {anos} ano{"s" if anos > 1 else ""}'
    elif diff.days > 30:
        meses = diff.days // 30
        return f'há {meses} mês{"es" if meses > 1 else ""}'
    elif diff.days > 0:
        return f'há {diff.days} dia{"s" if diff.days > 1 else ""}'
    elif diff.seconds > 3600:
        horas = diff.seconds // 3600
        return f'há {horas} hora{"s" if horas > 1 else ""}'
    elif diff.seconds > 60:
        minutos = diff.seconds // 60
        return f'há {minutos} minuto{"s" if minutos > 1 else ""}'
    else:
        return 'agora mesmo'