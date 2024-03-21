from django.shortcuts import render
from django.http import HttpResponse
import json
def upload_image(request):
    
    
    if request.method == 'POST' and request:
        # Guardar la imagen en algún lugar si es necesario
        uploaded_image = request
        # Agregar aquí el código para guardar la imagen en algún lugar si es necesario
        print(json.loads(request.body))
        # Devolver un mensaje de confirmación
        return HttpResponse("¡Hemos recibido la imagen!")
    else:
        # error
        return HttpResponse("¡Maaaaaaaaaaal!")
    