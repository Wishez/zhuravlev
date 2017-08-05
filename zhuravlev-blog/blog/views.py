# -*- coding: utf-8 -*-
# for server
# import sys
# encoding = 'utf-8'
# sys.reload()
# sys.setdefaultencoding(encoding)

from django.shortcuts import render
from .models import *
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

template = 'index.html'
def index(request):
    context = {
        'title': 'Филипп Журавлёв',
        'component': 'Blog.js',
        'props': {
            'search': ''
        },
    }
    return render(request, template, context)

def about(request):
    context = {
        'title': 'Обо мне',
        'component': 'About.js',
        'props': '',
    }
    return render(request, template, context)

def article(request, pk):
    article = Article.objects.get(pk=pk)
    #'article': {
      #  'title': article.title,
     #   'created_at': str(article.created_at),
     #   'text': article.text
    #}
    props = {
        'article_id': pk
    }

    context = {
        'title': article.title,
        'component': 'Article.js',
        'props': props,
    }
    return render(request, template, context)

@csrf_exempt
def connect(request):
    if request.method == 'POST':
        data = request.POST
        contact = Contact(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            message=data['message']
        )
        contact.save()

        html = '<p class="text-center paragraph" style="padding: 0;">Спасибо! Скоро я отвечу вам.</p>'

        return HttpResponse(html)

    context = {
        'title':'Связь',
        'component': 'Connect.js',
        'props': ''
    }

    return render(request, template, context)

def search(request):
    if request.method == 'GET' :

        value = request.GET['search']

        context = {
            'title': value,
            'component': 'Blog.js',
            'props': {
                'search': value,
            },
        }
        return render(request, template, context)