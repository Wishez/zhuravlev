# -*- encoding: utf-8 -*-
from django.db import models
from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel

# Create your models here.
# class YandexMark(TimeStampedModel):
#     keyword = models.CharField(
#         _('Ключевая фраза, по которой было показано объявление'),
#         max_length=200,
#
#     )
#     source_type = models.CharField(
#         _('Тип площадки, на которой произведён показ объявления'),
#         max_length=200,
#         blank=True,
#         null=True,
#         help_text="search – поисковая площадка<br/>context – тематическая (РСЯ)"
#
#     )
#     source = models.CharField(
#         _('Домен площадки РСЯ'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#     position = models.CharField(
#         _('Тип блока, если показ произошёл на странице с результатами поиска Яндекса'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#     position_type = models.CharField(
#         _('Ключевая фраза, по которой было показано объявление'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#     addphrases = models.CharField(
#         _('Точная позиция объявления в блоке'),
#         max_length=200,
#         blank=True,
#         null=True,
#         help_text="premium – спецразмещение<br/>other – блок внизу<br/>none – блок не на поиске Яндекса"
#     )
#     campaign_id = models.CharField(
#         _('Номер (ID) рекламной кампании    '),
#         max_length=200,
#         blank=True,
#         null=True,
#         help_text = "номер позиции в блоке<br/>0 – если объявление было показано на тематической площадке РСЯ."
#     )
#     ad_id = models.CharField(
#         _('Номер (ID) объявления'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#     phrase_id = models.CharField(
#         _('	Номер (ID) ключевой фразы'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#     retargeting_id =  models.CharField(
#         _('Номер (ID) условия ретаргетинга'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#
#     gbid = models.CharField(
#         _('Номер (ID) группы'),
#         max_length=200,
#         blank=True,
#         null=True
#     )
#
#
#
#     def __str__(self):
#         return self.keyword
#     class Meta:
#         db_table = 'cosmeticsyou_yandex_utm_mark'
#         verbose_name = _('Яндекс UTM Метка')
#         verbose_name_plural = _('Яндекс UTM Метки')

class Mark(TimeStampedModel):

    utm_content = models.CharField(
        _('Дополнительная информация, которая помогает различать объявления;'),
        max_length=200,
        default="",
        blank=True,
        null=True
    )
    utm_source = models.CharField(
        _('Источник перехода'),
        max_length=200,
        default=""

    )
    utm_campaign = models.CharField(
        _('Название рекламной кампании'),
        max_length=200,
        default="",

    )
    utm_medium = models.CharField(
        _('Тип трафика'),
        max_length=200,
        default="",
        blank=True,
        null=True
    )
    utm_term= models.CharField(
        _('Тип трафика'),
        max_length=200,
        default="",

    )



    def __str__(self):
        return self.utm_source
    class Meta:
        db_table = 'cosmeticsyou_advertising_utm_marks'
        verbose_name = _('UTM Метка')
        verbose_name_plural = _('UTM Метки')