# Nuevo contenido del Procfile en la raíz del repositorio
web: gunicorn --bind 0.0.0.0:$PORT backend.core.wsgi:application --workers 1 --timeout 90