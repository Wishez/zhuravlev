# -*- encoding: utf-8 -*-
from rest_framework import viewsets

from .serializers import *
# Create your views here.

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticlePreviewSerializer
        return ArticleDetailSerializer


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

