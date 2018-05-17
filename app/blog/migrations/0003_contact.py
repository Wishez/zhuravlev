# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-16 06:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20170508_1240'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30, verbose_name='Имя')),
                ('last_name', models.CharField(max_length=40, verbose_name='Фамилия')),
                ('email', models.CharField(max_length=100, verbose_name='E-mail')),
                ('message', models.TextField(max_length=350, verbose_name='Сообщение')),
                ('contacted_at', models.DateTimeField(auto_now_add=True, verbose_name='Написал')),
            ],
            options={
                'verbose_name': 'Контакт',
                'verbose_name_plural': 'Контакты',
            },
        ),
    ]
