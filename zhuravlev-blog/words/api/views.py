# -*- encoding: utf-8 -*-
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView
from .serializers import *
# Create your views here.

class PluginUserView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = PluginUserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'uuid'

class DocumentUserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = DocumentUserDataSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'uuid'
# Create your views here.
