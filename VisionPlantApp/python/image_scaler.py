import os
from PIL import Image
def generar_iconos_android(imagen_path, salida_directorio):
    """
    Genera íconos para diferentes densidades de pantalla en Android.

    Parámetros:
    imagen_path (str): La ruta al archivo de la imagen original.
    salida_directorio (str): La carpeta base donde se crearán las subcarpetas de densidades.
    """
    # Densidades y tamaños típicos para íconos de app en Android
    densidades = {
        'mdpi': 48,    # 1x base 48x48 px
        'hdpi': 72,    # 1.5x
        'xhdpi': 96,   # 2x
        'xxhdpi': 144, # 3x
        'xxxhdpi': 192 # 4x
    }

    # Abrir la imagen original
    with Image.open(imagen_path) as img:
        for densidad, tamaño in densidades.items():
            # Crear directorio si no existe
            directorio_destino = os.path.join(salida_directorio, f'mipmap-{densidad}')
            os.makedirs(directorio_destino, exist_ok=True)

            # Redimensionar imagen
            img_resized = img.resize((tamaño, tamaño), Image.LANCZOS)
            
            # Guardar las versiones redimensionadas
            img_resized.save(os.path.join(directorio_destino, 'ic_launcher.png'))
            img_resized.save(os.path.join(directorio_destino, 'ic_launcher_round.png'))

    print(f"Íconos generados en {salida_directorio}")

# Ejemplo de uso del script
imagen_original = './in/logo.png'
directorio_salida = './out'

generar_iconos_android(imagen_original, directorio_salida)
