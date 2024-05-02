from django.shortcuts import render
from django.http import HttpResponse
import json
import base64
# from io import BytesIO
# from PIL import Image

def upload_image(request):
    
    if request.method == 'POST':
        data = request.POST.get('imagen')
        if data:
            # Eliminar el encabezado 'data:image/png;base64,' si está presente
            # header, encoded = data.split(',', 1) if ',' in data else ('', data)
            
            # Decodificar la imagen base64
            # image_data = base64.b64decode(encoded)
            
            # Cargar la imagen desde los datos
            # image = Image.open(BytesIO(image_data))
            
            # response = HttpResponse(content_type="image/png")
            # response = HttpResponse("BIENNNNNNNN")
            return HttpResponse("BIENNNNNNNN")
    else:
        # error
        return HttpResponse("¡Maaaaaaaaaaal!")
    