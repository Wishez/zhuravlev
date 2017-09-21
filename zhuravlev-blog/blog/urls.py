from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^articles/(?P<pk>[0-9]+)/$', views.article, name='article'),
    url(r'^connect/$', views.connect, name='connect'),
    url(r'^results/$', views.search, name='search'),
    url(r'^archive/$', views.archive, name='archive'),
]