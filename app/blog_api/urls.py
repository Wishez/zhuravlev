from django.conf.urls import url
from .views import *

urlpatterns = [
    url(
        r'^article/$',
        ListArticlesView.as_view(),
        name='articles_list'
    ),
    url(
        r'^article/(?P<slug>[-\w_-]+)/$',
        ArticleView.as_view(),
        name='single_article'
    ),
    url(
        r'^tag/$',
        ListTagView.as_view(),
        name='tag'
    ),
    url(
        r'^year/$',
        ListYearsView.as_view(),
        name='tag'
    ),

]