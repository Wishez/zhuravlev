# -*- encoding: utf-8 -*-
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import *


class ListArticlesView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticlePreviewSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'slug'

class ArticleView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = 'slug'

class ListTagView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'uuid'

class ListYearsView(ListAPIView):
    queryset = Year.objects.all()
    serializer_class = YearSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'uuid'