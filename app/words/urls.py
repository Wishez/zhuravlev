# -*- encoding: utf-8 -*-
from django.conf.urls import url
from .api.views import *
from .views import *

urlpatterns = [
    url(r'^set_user_state/', UserState.as_view(), name='set_user_state'),
    url(r'^add_word/', AddWordAction.as_view(), name='add_word'),
    url(r'^remove_word/', RemoveWordAction.as_view(), name='remove_word'),
    url(r'^thank_you_server/', UserHandshake.as_view(), name='thank_you_server'),
    url(
        r'^api/plugin_user/(?P<uuid>[-\w]+)/$',
        PluginUserView.as_view(),
        name='plugin_user'
    ),
    url(
        r'^api/document_data_user/(?P<uuid>[-\w]+)/$',
        DocumentUserView.as_view(),
        name='document_data_user'
    ),
]