# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import *
from myadmin.admin import admin_site
# Register your models here.
@admin.register(User, site=admin_site)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'date_joined',)
    filter_fields = ('username', 'email', 'date_joined',)
    date_hierarchy = 'date_joined'
    ordering = ('date_joined',)
    filter_horizontal = ('words',)

admin_site.register(Word)