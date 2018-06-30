# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-06-26 18:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('album', '0001_initial'),
        ('blog', '0016_auto_20180623_1408'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='album.AlbumImage', verbose_name='Album'),
        ),
    ]
