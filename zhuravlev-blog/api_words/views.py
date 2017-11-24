# -*- encoding: utf-8 -*-
from rest_framework import viewsets

from .serializers import *
# Create your views here.

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = AwesomeUserSerizlier


# Create your views here.
