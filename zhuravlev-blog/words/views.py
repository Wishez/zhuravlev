# -*- encoding: utf-8 -*-

from django.http import HttpResponse
# Create your views here.

def add_word(request):
    if request.method == 'POST':
        data = request.POST


        return HttpResponse('')
