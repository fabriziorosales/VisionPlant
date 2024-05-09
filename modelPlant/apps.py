from django.apps import AppConfig
import tensorflow as tf


class ModelplantConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'modelPlant'
    
    def ready(self):
        # Cargar el modelo
        self.load_model()

    def load_model(self):
        self.labels = ['Apple Scab Leaf', 'Apple rust leaf', 'Bell_pepper leaf spot', 'Corn Gray leaf spot', 'Corn leaf blight', 'Corn rust leaf', 'Leaf', 'Potato leaf blight', 'Squash Powdery mildew leaf', 'Tomato Septoria leaf spot', 'Tomato blight leaf', 'Tomato leaf bacterial spot', 'Tomato leaf mosaic virus', 'Tomato leaf yellow virus', 'Tomato mold leaf', 'grape leaf black rot']
        
        # Ruta al archivo del modelo
        model_path = 'C:/Users/fabri/IA_BIG-DATA/VisionPlant/backend/model/mdl_ft_V4.h5'

        # Carga el modelo
        self.model = tf.keras.models.load_model(model_path)
        
# Registra la configuración de la aplicación
default_app_config = 'modelPlant.apps.ModelplantConfig'
