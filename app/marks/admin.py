# -*- encoding: utf-8 -*-
from myadmin.admin import admin_site
from django.contrib import admin
from .models import *

@admin.register(Mark, site=admin_site)
class MarksAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ('utm_content', 'utm_source','utm_campaign', 'created',)
    date_hierarchy = 'created'
    ordering = ['-created']

