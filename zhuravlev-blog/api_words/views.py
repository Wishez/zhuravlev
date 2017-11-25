# -*- encoding: utf-8 -*-
from rest_framework import viewsets

from .serializers import *
# Create your views here.

class PluginUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = PluginUserSerializer

class DocumentUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = DocumentUserDataSerializer

# Create your views here.
