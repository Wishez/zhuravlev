# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-13 16:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_auto_20170608_1118'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_name', models.CharField(max_length=20, verbose_name='Тэг')),
            ],
            options={
                'verbose_name': 'Тэг',
                'verbose_name_plural': 'Тэги',
            },
        ),
        migrations.RemoveField(
            model_name='article',
            name='tag_1',
        ),
        migrations.RemoveField(
            model_name='article',
            name='tag_2',
        ),
        migrations.RemoveField(
            model_name='article',
            name='tag_3',
        ),
        migrations.RemoveField(
            model_name='article',
            name='tag_4',
        ),
        migrations.RemoveField(
            model_name='article',
            name='tag_5',
        ),
        migrations.AddField(
            model_name='article',
            name='tags',
            field=models.ManyToManyField(to='blog.Tag'),
        ),
    ]
