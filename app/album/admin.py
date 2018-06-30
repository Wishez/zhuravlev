# -*- coding: utf-8 -*-
import uuid
import zipfile
import zhuravlev.settings
from datetime import datetime
from zipfile import ZipFile

from django.contrib import admin
from django.core.files.base import ContentFile
from PIL import Image

from myadmin.admin import admin_site
from album.models import Album, AlbumImage
from album.forms import AlbumForm


@admin.register(Album, site=admin_site)
class AlbumModelAdmin(admin.ModelAdmin):
    form = AlbumForm
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('title', 'created', 'modified',)
    list_filter = ('created', 'modified', 'title',)
    list_per_page = 7
    search_fields = ('title', 'created', 'modified',)
    ordering = ('-created',)
    date_hierarchy = 'created'

    def save_model(self, request, obj, form, change):
        if form.is_valid():
            album = form.save(commit=False)
            album.save()

            if form.cleaned_data['zip'] != None:
                zip = zipfile.ZipFile(form.cleaned_data['zip'])
                for filename in sorted(zip.namelist()):
                    data = zip.read(filename)
                    contentfile = ContentFile(data)

                    img = AlbumImage()
                    img.album = album
                    img.alt = filename
                    filename = '{0}{1}.png'.format(album.slug, str(uuid.uuid4())[-13:])
                    img.image.save(filename, contentfile)

                    filepath = '{0}/albums/{1}'.format(ceiling.settings.MEDIA_ROOT, filename)
                    with Image.open(filepath) as i:
                        img.width, img.height = i.size
                    img.save()

                    #img.thumb.save('thumb-{0}'.format(filename), contentfile)

                zip.close()
            super(AlbumModelAdmin, self).save_model(request, obj, form, change)

# In case image should be removed from album.
@admin.register(AlbumImage, site=admin_site)
class AlbumImageModelAdmin(admin.ModelAdmin):
    list_display = ('alt', 'album')
    list_filter = ('album', 'alt', 'created', 'modified',)
    list_per_page = 7
    search_fields = ('album', 'alt', 'created', 'modified',)
    ordering = ('-created',)
    date_hierarchy = 'created'

