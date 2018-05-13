# -*- encoding: utf-8 -*-
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class WordsConfig(AppConfig):
    name = 'words'
    verbose_name=_('Noise Suppressor')