# -*- coding: utf-8 -*-
from django.conf import settings
if not settings.DEBUG:
    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from model_utils.models import TimeStampedModel
import uuid as uuid_lib
from django.contrib.auth.models import AbstractBaseUser
from .validators import validate_slug_field
from .managers import *


class Tag(TimeStampedModel):
    tag_name = models.CharField(_('Тэг'), max_length=20)
    uuid = models.UUIDField(
        _('ID'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    def __str__(self):
        return self.tag_name

    class Meta:
        verbose_name = _('Тэг')
        verbose_name_plural = _('Тэги')
# Create your models here.

class Article(TimeStampedModel):
    author = models.ForeignKey('auth.User',
       verbose_name=_('Автор'),
       blank=True,
       null=True
    )
    title = models.CharField(_('Заголовок'), max_length=128)
    preview = models.ForeignKey(
        'album.AlbumImage',
        verbose_name=_('Album'),
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(_('Созадано'), default=timezone.now)
    announce_text = models.TextField(_('Анонс'), max_length=512, blank=True)
    text = models.TextField(_('Текст'), max_length=20000)
    tags = models.ManyToManyField(Tag, verbose_name=_('Теги'))
    slug = models.SlugField(
        _('Ссылка на статью'),
        help_text=_('К примеру, "new-share-for_2018"'),
        max_length=150,
        validators=[validate_slug_field],
        blank=True,
        null=True
    )
    applause = models.IntegerField(
        _('Количество аплодисментов'),
        default=0
    )
    comments = models.ManyToManyField(
        "Comment",
        verbose_name=_('Комментарии'),
        related_name='article_comments',
        blank=True
    )
    objects = ArticleManager()


    def __str__(self):
        return self.title

    @property
    def announce(self):
        return self.anounce_text or self.text[:512].rsplit(' ', 1)[0]

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Статья')
        verbose_name_plural = _('Статьи')


class Contact(TimeStampedModel):
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


class Year(TimeStampedModel):
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




class BlogUser(AbstractBaseUser):
    is_changing_password = models.BooleanField(
        _('Изменить пароль?'),
        default=False
    )
    username = models.CharField(
        _('Имя пользователя'),
        max_length=140,
        default=None,
        unique=True
    )

    email = models.EmailField(
        _('Email'),
        max_length=190,
        unique=True
    )

    uuid = models.UUIDField(
        _('ID'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )


    is_active = models.BooleanField(
        _('Активный'),
        default=True
    )

    objects = UserManager()
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'blog_user'
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')

@receiver(pre_save, sender=BlogUser)
def pre_create_user(sender, instance, **kwargs):
    if instance.is_changing_password:
        instance.set_password(instance.password)
        instance.is_changing_password = False


class Comment(TimeStampedModel):
    author = models.ForeignKey(
        "BlogUser",
        verbose_name=_('Автор'),
        on_delete=models.PROTECT
    )
    text = models.TextField(
        _('Год'),
        max_length=2048
    )
    applause = models.IntegerField(
        _('Количество аплодисментов'),
        default=0
    )
    uuid = models.UUIDField(
        _('ID'),
        db_index=True,
        default=uuid_lib.uuid4,
        editable=True
    )

    objects = CommentManager()

    def __str__(self):
        return self.author.username

    class Meta:
        db_table = 'blog_comment'
        verbose_name = _('Комментарий')
        verbose_name_plural = _('Комментарии')