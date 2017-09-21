# -*- coding: utf-8 -*-
from django.conf import settings
if not settings.DEBUG:
    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')
    
from django.db import models
from django.utils.translation import ugettext_lazy as _

class Tag(models.Model):
    tag_name = models.CharField(_('Тэг'), max_length=20)

    def __str__(self):
        return self.tag_name
    class Meta:
        verbose_name = _('Тэг')
        verbose_name_plural = _('Тэги')
# Create your models here.

class Article(models.Model):
    author = models.ForeignKey('auth.User',
                               verbose_name=_('Автор'),
                               blank=True,
                               null=True
                               )
    title = models.CharField(_('Заголовок'), max_length=128)
    created_at = models.DateTimeField(_('Созадано'), auto_now_add=True)
    announce_text = models.TextField(_('Анонс'), max_length=512, blank=True)
    text = models.TextField(_('Текст'), max_length=20000)
    tags = models.ManyToManyField(Tag, verbose_name=_('Теги'))

    def __str__(self):
        return self.title

    @property
    def announce(self):
        return self.anounce_text or self.text[:512].rsplit(' ', 1)[0]

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Статья')
        verbose_name_plural = _('Статьи')


class Contact(models.Model):
    first_name = models.CharField(_('Имя'), max_length=30)
    last_name = models.CharField(_('Фамилия'), max_length=40)
    email = models.CharField(_('E-mail'), max_length=100)
    message = models.TextField(_('Сообщение'), max_length=350)
    contacted_at = models.DateTimeField(_('Написал'), auto_now_add=True)

    def __str__(self):
        return self.first_name
    class Meta:
        verbose_name = _('Контакт')
        verbose_name_plural = _('Контакты')


class Year(models.Model):
    year = models.IntegerField(_('Год'))
    articles = models.ManyToManyField(
        Article,
        verbose_name=_('Статьи')
    )

    def __str__(self):
        return '%s' % self.year
    class Meta:
        verbose_name = _('Год')
        verbose_name_plural = _('Архив')