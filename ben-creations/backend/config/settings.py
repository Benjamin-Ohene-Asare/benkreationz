"""
Django settings for BenKreations.

Local development: SQLite
Production: Supabase PostgreSQL
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ==========================================
# ENVIRONMENT HELPERS
# ==========================================


def env_bool(name, default=False):
    return os.getenv(name, str(default)).strip().lower() in ("true", "1", "yes", "on")


def env_list(name, default=""):
    return [
        item.strip() for item in os.getenv(name, default).split(",") if item.strip()
    ]


# ==========================================
# SECURITY
# ==========================================

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "")

if not SECRET_KEY:
    raise ImproperlyConfigured("DJANGO_SECRET_KEY must be configured.")

DEBUG = env_bool("DJANGO_DEBUG", False)

ALLOWED_HOSTS = env_list(
    "DJANGO_ALLOWED_HOSTS",
    "localhost,127.0.0.1",
)


# ==========================================
# APPLICATIONS
# ==========================================

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "core",
]


# ==========================================
# MIDDLEWARE
# ==========================================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "config.urls"


# ==========================================
# TEMPLATES
# ==========================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# ==========================================
# DATABASE
# ==========================================

# Local development uses SQLite.
# Production uses Supabase PostgreSQL when
# DB_HOST is configured.

DB_HOST = os.getenv("DB_HOST", "").strip()

if DB_HOST:
    # Production: Supabase PostgreSQL
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("DB_NAME", "postgres"),
            "USER": os.getenv("DB_USER", "postgres"),
            "PASSWORD": os.getenv("DB_PASSWORD", ""),
            "HOST": DB_HOST,
            "PORT": os.getenv("DB_PORT", "5432"),
            "OPTIONS": {
                "sslmode": os.getenv("DB_SSLMODE", "require"),
                "prepare_threshold": None,
            },
            "CONN_MAX_AGE": 0,
        }
    }

    if not DATABASES["default"]["PASSWORD"]:
        raise ImproperlyConfigured("DB_PASSWORD is required for Supabase PostgreSQL.")

else:
    # Development: existing SQLite database
    if not DEBUG:
        raise ImproperlyConfigured("Production requires Supabase DB_HOST.")

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# ==========================================
# PASSWORD VALIDATION
# ==========================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": ("django.contrib.auth.password_validation." "MinimumLengthValidator"),
    },
    {
        "NAME": ("django.contrib.auth.password_validation." "CommonPasswordValidator"),
    },
    {
        "NAME": ("django.contrib.auth.password_validation." "NumericPasswordValidator"),
    },
]


# ==========================================
# INTERNATIONALIZATION
# ==========================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Africa/Accra"

USE_I18N = True

USE_TZ = True


# ==========================================
# STATIC FILES
# ==========================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# ==========================================
# CORS
# ==========================================

CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:5173," "http://127.0.0.1:5173," "https://benkreationz.vercel.app",
)

CORS_ALLOW_CREDENTIALS = False


# ==========================================
# DJANGO REST FRAMEWORK
# ==========================================

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "30/hour",
        "user": "300/hour",
        "ai_chat": "10/hour",
    },
}


# ==========================================
# EMAIL
# ==========================================

EMAIL_BACKEND = os.getenv(
    "EMAIL_BACKEND",
    "django.core.mail.backends.console.EmailBackend",
)

EMAIL_HOST = os.getenv("EMAIL_HOST", "")

EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))

EMAIL_USE_TLS = env_bool("EMAIL_USE_TLS", True)

EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")

EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")

DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL",
    "BenKreations <noreply@example.com>",
)

CONTACT_NOTIFICATION_EMAIL = os.getenv("CONTACT_NOTIFICATION_EMAIL", "")


# ==========================================
# BMS SMS
# ==========================================

BMS_API_KEY = os.getenv("BMS_API_KEY", "")

BMS_SENDER_ID = os.getenv("BMS_SENDER_ID", "Benkreation")

BMS_API_URL = os.getenv(
    "BMS_API_URL",
    "https://api.mnotify.com/api/sms/quick",
)

BMS_NOTIFICATION_PHONE = os.getenv("BMS_NOTIFICATION_PHONE", "")


# ==========================================
# GEMINI AI
# ==========================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")


# ==========================================
# PRODUCTION SECURITY
# ==========================================

SECURE_CONTENT_TYPE_NOSNIFF = True

SESSION_COOKIE_HTTPONLY = True

CSRF_COOKIE_HTTPONLY = True

X_FRAME_OPTIONS = "DENY"

SECURE_SSL_REDIRECT = env_bool("DJANGO_SECURE_SSL_REDIRECT", False)

SESSION_COOKIE_SECURE = not DEBUG

CSRF_COOKIE_SECURE = not DEBUG

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)

CSRF_TRUSTED_ORIGINS = env_list(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    "https://benkreationz.vercel.app",
)
