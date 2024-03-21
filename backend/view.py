from django.shortcuts import render
from django.http import HttpResponse

def upload_image(request):
    if request.method == 'POST' and request.FILES['image']:
        # Guardar la imagen en algún lugar si es necesario
        uploaded_image = request.FILES['image']
        # Agregar aquí el código para guardar la imagen en algún lugar si es necesario

        # Devolver un mensaje de confirmación
        return HttpResponse("¡Hemos recibido la imagen!")
    else:
        # error
        return HttpResponse("¡Maaaaaaaaaaal!")
    