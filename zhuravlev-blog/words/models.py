# -*- encoding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import BaseUserManager

from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.signals import pre_save
from django.dispatch import receiver
import uuid as uuid_lib


class TimeStampedModel(models.Model):
    created = models.DateTimeField(_('Созданна'), auto_now_add=True)
    modified = models.DateTimeField(_('Последнее редактирование'), auto_now=True)

    class Meta:
        abstract = True
class Word(models.Model):
    word_name = models.CharField(_('Слово'), max_length=20)

    def __str__(self):
        return self.word_name
    class Meta:
        db_table = 'words'
        verbose_name = _('Слово')
        verbose_name_plural = _('Слова')

class UserDomain(TimeStampedModel):
    domain_name = models.CharField(
        _('Доменное имя'),
        max_length=250
    )

    def __str__(self):
        return self.domain_name
    class Meta:
        db_table = 'restricted_domains'
        verbose_name = _('Доменное имя')
        verbose_name_plural = _('Доменные имена')

class UserManager(BaseUserManager):
    use_for_related_fields = True
    def remove_domain(self, instance, domain):

        user_domain = instance.user_domains.filter(name=domain)
        if user_domain .exists():
            instance.words.remove(domain[0])

    def add_domain(self, instance, domain):
        user_domain, is_created = Word.objects.get_or_create(name=domain)
        if not is_created:
            user_domain.save()
        instance.user_domain.add(domain)

    def remove_word(self, instance, word):

        w = instance.words.filter(name=word)
        if w.exists():
            instance.words.remove(w[0])

    def add_word(self, instance, word):
        w, is_created = Word.objects.get_or_create(name=word)
        if not is_created:
            w.save()
        instance.words.add(w)

    def get_m2m_array(self, instance, m2m_relation_name):
        return [entity for entity in getattr(instance, m2m_relation_name)]



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
    allowed_quantity_words = models.IntegerField(
        _('Ограничение количество добавленных слов'),
        default=15,
    )
    balance = models.DecimalField(
        _('Баланс пользователя'),
        default=0,
        decimal_places=2,
        max_digits=7,
        blank=True,
        null=True
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

    user_domains = models.ManyToManyField(
        UserDomain,
        verbose_name=_('Доменные имена'),
        related_name='user_allowed_domains',
        blank=True
    )
    date_joined = models.DateTimeField(
        _('Зарегистрировался'),
        auto_now_add=True
    )
    modified = models.DateTimeField(
        _('Последняя активность'),
        auto_now=True
    )
    is_active = models.BooleanField(
        _('Активный'),
        default=True
    )

    temporary_code = models.CharField(
        _('Временный код для восстановления пароля'),
        max_length=6,
        null=True,
        blank=True
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