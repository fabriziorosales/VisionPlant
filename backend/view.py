from django.shortcuts import render
from django.http import HttpResponse
from django.apps import apps
import json
import base64, numpy as np
import cv2

from django.http import JsonResponse
import tensorflow as tf


def upload_image(request):
    
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        if data:
            # Obtener la instancia de ModelplantConfig y acceder al modelo cargado
            model_instance = apps.get_app_config('modelPlant')
            mdl_v1 = model_instance.model
            
            # Eliminar el encabezado 'data:image/png;base64,' si está presente
            header, encoded = data.split(',', 1) if ',' in data else ('', data)
            
            # Decodificar la imagen base64
            image_data = base64.b64decode(encoded)
            
            # Convertir los datos de la imagen en un array numpy
            image_array = np.frombuffer(image_data, dtype=np.uint8)
            
            # Decodificar la imagen utilizando OpenCV
            image = cv2.imdecode(image_array, flags=cv2.IMREAD_COLOR)
            
            normalized_image = image / 255.0
            
            # Redimensionar la imagen al tamaño deseado
            resized_image = cv2.resize(normalized_image, (150, 150))
            
            # Añadir una dimensión adicional para el tamaño del lote (batch size)
            resized_image = np.expand_dims(resized_image, axis=0)
            
            # Asegurarse de que la imagen tenga 3 canales (RGB)
            if len(resized_image.shape) == 2:
                resized_image = cv2.cvtColor(resized_image, cv2.COLOR_GRAY2RGB)

            prediction = mdl_v1.predict(resized_image)
            
            if model_instance.labels[np.argmax(prediction)] != 'Leaf':
                json = {'infeccion': True, 'enfermedad': model_instance.labels[np.argmax(prediction)]}
            else:
                json = {'infeccion': False}
            
            
        return JsonResponse(json)
        # return HttpResponse(normalized_image)
    else:
        # error
        return HttpResponse("¡Maaaaaaaaaaal!")
    
    