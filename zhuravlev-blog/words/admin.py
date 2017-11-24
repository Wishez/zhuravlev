from django.contrib import admin
from .models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    horizontal_fields = ('words',)

admin.register(Word)
admin.register(User, UserAdmin)