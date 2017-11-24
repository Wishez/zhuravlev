# -*- encoding: utf-8 -*-
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser

class UserManager(models.Manager):
    use_for_related_fields = True

    # def remove_word(self, word):
        # self.words.filter(name=word)

    def get_words(self):
        words = []

        for word in self.words.all():
            words.push(word.name)

        return words



class Word(models.Model):
    name = models.CharField(_('Слово'), max_length=20)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'words'
        verbose_name = _('Слово')
        verbose_name_plural = _('Слова')

class User(AbstractBaseUser):
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