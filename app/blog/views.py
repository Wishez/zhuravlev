# -*- encoding: utf-8 -*-
from django.shortcuts import render
from .models import *
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.views.generic.base import TemplateView
# Create your views here.

template = 'index.html'
class BaseView(TemplateView):
    template_name = 'index.html'

    def __init__(self):
        self.component = 'Blog.js'
        self.title = 'Филипп Журавлёв'
        self.meta = 'React/Django разработчик Филипп Журавлёв подаёт в своём блоге блюда из своей прктики для приготовления веб-приложений, веб-интерфейсов и всего остального.'
        self.props = {
            "search": ""
        }
        self.isArticle = False


    def get_context_data(self, **kwargs):
        context = super(BaseView, self).get_context_data(**kwargs)
        context['props'] = self.props

        context['meta'] = self.meta
        context['title'] = self.title
        context['component'] = self.component

        if self.isArticle:
            context['isArticle'] = True

        return context



class AboutView(BaseView):
    def __init__(self):
        super(AboutView, self).__init__()
        self.title = 'Обо мне'
        self.component = 'About.js'



class ArchiveView(BaseView):
    def __init__(self):
        super(ArchiveView, self).__init__()
        self.title = 'Архив'
        self.component = 'Archive.js'



class ArticleView(BaseView):
    def __init__(self):
        super(ArticleView, self).__init__()
        self.component = 'Article.js'
        self.isArticle = True

    def get(self, request, pk):
        article = Article.objects.get(pk=pk)
        self.title = article.title
        self.props['article_id'] = pk
        self.meta = article.announce_text

        return render(
            request,
            self.template_name,
            super(ArticleView, self).get_context_data()
        )


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

        orderMsg = '%s\n%s\n%s\n%s' % (data['first_name'], data['last_name'], data['email'], data['message'])
        # EmailMessage('filipp-zhuravlev.ru Message', orderMsg, to=['shiningfinger@list.ru']).send()

        html = '<p class="text-center paragraph" style="padding: 0;text-align: center; max-width: none; font-size: 1.5em;">Сообщение достигло моего почтового ящика!</p>'

        return HttpResponse(html)

    context = {
        'title':'Связь',
        'component': 'Connect.js',
        'props': ''
    }

    return render(request, template, context)

class SearchView(BaseView):
    def __init__(self):
        super(SearchView, self).__init__()


    component = 'Blog.js'

    def get(self, request):
        value = request.GET['search']

        self.title = value
        self.props['search'] = value

        return render(
            request,
            self.template_name,
            super(SearchView, self).get_context_data()
        )

entities = {
    "article": Article,
    "comment": Comment
}

def change_applause(request):
    if request.method == "POST":
        data = request.POST
        action = data.action
        Entity = entities.get(data.entity)
        quantity = data.quantity

        Entity.models.change_quantity_applause(action, quantity)



