# -*- encoding: utf-8 -*-
from django.db import models
from django.utils.tranlate import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

class Word(models.Model):
    name = models.CharField(_('Слово'), max_length=20)

    class Meta:
        db_table = 'words'
        verbose_name = _('Слово')
        verbose_name_plural = _('Слова')

class User(AbstractUser):
    words = models.ManyToManyField(
        Word,
        verbose_name=_('Слово'),
        related_name='user_words'
    )

    class Meta:
        db_table = 'liked_users'
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')