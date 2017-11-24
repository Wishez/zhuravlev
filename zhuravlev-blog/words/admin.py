from django.contrib import admin
from .models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'date_joined',)
    filter_fields = ('username', 'email', 'date_joined',)
    date_hierarchy = 'date_joined'
    ordering = ('date_joined',)
    filter_horizontal = ('words',)

admin.site.register(Word)
admin.site.register(User, UserAdmin)