# -*- encoding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import BaseUserManager

from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.signals import pre_save
from django.dispatch import receiver
import uuid as uuid_lib

class Word(models.Model):
    name = models.CharField(_('Слово'), max_length=20)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'words'
        verbose_name = _('Слово')
        verbose_name_plural = _('Слова')

class UserManager(BaseUserManager):
    use_for_related_fields = True

    def remove_word(self, instance, word):

        w = instance.words.filter(name=word)
        if w.exists():
            instance.words.remove(w[0])

    def add_word(self, instance, word):
        w, is_created = Word.objects.get_or_create(name=word)
        if not is_created:
            w.save()
        instance.words.add(w)

    def get_words(self, instance):
        words = []

        for word in instance.words.all():
            words.append(word.name)

        return words



class User(AbstractBaseUser):
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
    was_gotten_new_domain = models.BooleanField(
        _('Последний сайт'),
        max_length=190,
        default=False
    )
    current_site = models.CharField(
        _('Текущий сайт'),
        max_length=190,
        blank=True,
    )
    quantity_words = models.IntegerField(
        _('Последнее количество найденных плохих слов'),
        blank=True,
        null=True
    )
    is_parsed_data = models.BooleanField(
        _('Пропарсил плохие слова'),
        default=False
    )
    words = models.ManyToManyField(
        Word,
        verbose_name=_('Слова'),
        related_name='words',
        blank=True
    )
    date_joined = models.DateTimeField(
        _('Зарегистрировался'),
        auto_now_add=True
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
        db_table = 'liked_users'
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')

@receiver(pre_save, sender=User)
def pre_create_user(sender, instance, **kwargs):
    if instance.is_changing_password:
        instance.set_password(instance.password)
        instance.is_changing_password = False