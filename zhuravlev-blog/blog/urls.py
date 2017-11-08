from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.BaseView.as_view(), name='index'),
    url(r'^about/$', views.AboutView.as_view(), name='about'),
    url(r'^articles/(?P<pk>[0-9]+)/$', views.ArticleView.as_view(), name='article'),
    url(r'^connect/$', views.connect, name='connect'),
    url(r'^results/$', views.SearchView.as_view(), name='search'),
    url(r'^archive/$', views.ArchiveView.as_view(), name='archive'),
]