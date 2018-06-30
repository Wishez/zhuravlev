import os
# import raven
import dj_database_url
from decouple import config, Csv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APPS_DIR = '{0}/static'.format(BASE_DIR)

SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', cast=bool)
IS_PRODUCTION = config('IS_PRODUCTION', cast=bool)

ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    cast=Csv(),
    default='',
)

DJANGO_APPS = [
    'jet.dashboard',
    'jet',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

THIRD_PARTY_APPS = [
    'disqus',
    'rest_framework',
    'corsheaders',
    'oauth2_provider',
    'django_nose',
]

PROJECT_APPS = [
    'blog.apps.BlogConfig',
    'api_v0.apps.ApiV0Config',
    'blog.templatetags.blog_filters',
    'myadmin.apps.MyadminConfig',
    'words.apps.WordsConfig',
    'album.apps.AlbumConfig',
    'account',

]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS


# Application definition
TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
SITE_ID = 1
DISQUS_API_KEY = config('DISQUS_API_KEY')
DISQUS_WEBSITE_SHORTNAME = config('DISQUS_WEBSITE_SHORTNAME')

CORS_ORIGIN_WHITELIST = config('CORS_ORIGIN_WHITELIST', cast=Csv(post_process=tuple), default='')

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'zhuravlev.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'blog/templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'libraries': {
                'blog_filters': 'blog.templatetags.blog_filters'
            }
        },
    },
]

WSGI_APPLICATION = 'zhuravlev.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
    # 'default': dj_database_url.parse(config('DATABASE_URL')),

}

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'greeter@shining-present.ru'
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_FRAMEWORK = {
   'DEFAULT_PERMISSIONS_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
}

# Jet config
# JET_MODULE_GOOGLE_ANALYTICS_CLIENT_SECRETS_FILE = os.path.join(BASE_DIR, 'client_secrets.json')
JET_DEFAULT_THEME = 'default'
JET_SIDE_MENU_COMPACT = True
JET_CHANGE_FORM_SIBLING_LINKS = True
JET_INDEX_DASHBOARD = 'jet.dashboard.dashboard.DefaultIndexDashboard'
# JET_INDEX_DASHBOARD = 'myadmin.dashboard.CustomIndexDashboard'
JET_APP_INDEX_DASHBOARD = 'jet.dashboard.dashboard.DefaultAppIndexDashboard'
JET_THEMES = [
    {
        'theme': 'default', # theme folder name
        'color': '#47bac1', # color of the theme's button in user menu
        'title': 'Default' # theme title
    },
    {
        'theme': 'green',
        'color': '#44b78b',
        'title': 'Green'
    },
    {
        'theme': 'light-green',
        'color': '#2faa60',
        'title': 'Light Green'
    },
    {
        'theme': 'light-violet',
        'color': '#a464c4',
        'title': 'Light Violet'
    },
    {
        'theme': 'light-blue',
        'color': '#5EADDE',
        'title': 'Light Blue'
    },
    {
        'theme': 'light-gray',
        'color': '#222',
        'title': 'Light Gray'
    }
]