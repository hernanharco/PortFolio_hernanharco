"""
Django settings for core project.
"""

from pathlib import Path
import os
from urllib.parse import urlparse
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# --- Configuración Crítica de Entorno ---

# SECURITY WARNING: keep the secret key used in production secret!
# Lee de la variable de entorno 'SECRET_KEY' (necesaria en Render)
SECRET_KEY = os.getenv('SECRET_KEY', 'default-key-para-desarrollo')

# SECURITY WARNING: don't run with debug turned on in production!
# Lee la variable de entorno 'DEBUG' y la convierte a booleano
DEBUG_STRING = os.getenv('DEBUG', 'True').lower()
DEBUG = DEBUG_STRING in ('true', '1', 't', 'y')

# Hosts Permitidos:
# Lee 'ALLOWED_HOSTS' desde la variable de entorno (portfolio-hernanharco.onrender.com en prod)
# o usa valores locales como fallback (localhost, backend en dev).
ALLOWED_HOSTS_RAW = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1,backend').split(',')
ALLOWED_HOSTS = [h.strip() for h in ALLOWED_HOSTS_RAW if h.strip()]

# Si DEBUG es True, permitimos todos los hosts
if DEBUG:
    ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles', # Necesario para WhiteNoise
    'corsheaders',
    'rest_framework',
    'drf_spectacular',
    'accounts',
]

MIDDLEWARE = [
    # WhiteNoise debe estar al inicio, después de SecurityMiddleware
    'django.middleware.security.SecurityMiddleware',
    # Middleware de WhiteNoise para servir archivos estáticos en Render
    'whitenoise.middleware.WhiteNoiseMiddleware',
    
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # CORS debe estar muy arriba para manejar headers
    'corsheaders.middleware.CorsMiddleware',        
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# --- Database Configuration (XATA) ---
# Lee de la variable de entorno 'DATABASE_URL_POSTGRES'
DATABASE_URL = os.getenv('DATABASE_URL_POSTGRES')

if DATABASE_URL:
    # Usa dj_database_url para parsear la URL completa de XATA
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True # Para XATA, es fundamental
        )
    }
else:
    # Fallback a SQLite para desarrollo si no hay variable .env
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# Password validation (se mantiene igual)
# ...
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization (se mantiene igual)
# ...
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# --- ARCHIVOS ESTÁTICOS Y MEDIOS (Static Files and Media) ---
# Se necesita 'STATIC_ROOT' para el comando 'collectstatic' en producción

STATIC_URL = '/static/'
# Directorio donde se recolectarán los archivos estáticos en producción (fundamental)
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Configuración de WhiteNoise para servir los archivos estáticos de forma eficiente
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# --- LECTURA Y PROCESAMIENTO DE CORS ---

# 1. Obtener la cadena de URLs separadas por comas desde la variable de entorno
CORS_URLS_STRING = os.getenv('FRONTEND_URLS_CORS', '')

# 2. Dividir el string en una lista de orígenes permitidos
CORS_ALLOWED_ORIGINS = [
    url.strip() 
    for url in CORS_URLS_STRING.split(',') 
    if url.strip()
]

# 3. Advertencia si está vacío (útil para recordar configurar la variable en Render)
if not CORS_ALLOWED_ORIGINS and not DEBUG:
    print("WARNING: CORS_ALLOWED_ORIGINS está vacío. Revisa la variable FRONTEND_URLS_CORS.")

# 4. En producción, siempre debe ser False.
CORS_ALLOW_ALL_ORIGINS = False


# Información agregada para que funcione la creación de la documentación
REST_FRAMEWORK = {
    # Tu configuración actual...
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Seguros Nana API',
    'VERSION': '1.0.0',
}

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'