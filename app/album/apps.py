# -*- encoding: utf-8 -*-
from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class AlbumConfig(AppConfig):
    name = 'album'
    verbose_name = _('Медиа файлы')
