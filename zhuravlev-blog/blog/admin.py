# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import *

# Register your models here.
class AdminArticleModel(admin.ModelAdmin):
    list_display = ('title', 'created_at',)
    list_filter = ('created_at',)
    date_hirarchy = 'created_at'
    search_fields = ['title', 'text', 'announce_text']
    filter_horizontal = ('tags',)

admin.site.register(Tag)
admin.site.register(Article, AdminArticleModel)
admin.site.register(Contact)