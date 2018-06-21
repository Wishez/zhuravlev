# -*- encoding: utf-8 -*-
from django.contrib import admin

from .models import *

# Register your models here.
class AdminArticleModel(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'slug',)
    list_filter = ('created_at',)
    date_hirarchy = 'created_at'
    search_fields = ['title', 'text', 'announce_text']
    filter_horizontal = ('tags',)

class AdminYearModel(admin.ModelAdmin):
    list_filter = ('year',)
    date_hirarchy = 'year'
    filter_fields = ('year',)
    search_fields = ['year']
    ordering = ('year',)
    filter_horizontal = ('articles',)

admin.site.register(Year, AdminYearModel)
admin.site.register(Tag)
admin.site.register(Article, AdminArticleModel)
admin.site.register(Contact)
admin.site.register(Comment)