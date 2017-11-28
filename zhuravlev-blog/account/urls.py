# -*- encoding: utf-8 -*-
from django.conf.urls import url
from .views import *
urlpatterns = [
    url(r'^register/$', register, name='register'),
    url(r'^log_in/$', log_in, name='log_in'),
    url(r'^log_out/$', log_out, name='log_out'),
]