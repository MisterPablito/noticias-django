from django import forms
from .models import Comentario

class ComentarioForm(forms.ModelForm):
    class Meta:
        model = Comentario
        fields = ['texto']
        widgets = {
            'texto': forms.Textarea(attrs={
                'rows': 4,
                'placeholder': 'Partilha a tua opinião... Será que a Rhea Ripley aprovaria este look? 🖤⚡'
            }),
        }