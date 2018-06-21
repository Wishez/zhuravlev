# -*- encoding: utf-8 -*-
from django.contrib.admin import AdminSite
from django.contrib.sites.models import Site
from django.contrib.auth.models import User, Group


def count_new_consultants(Model):
    return Model.objects.filter(status='Новый').count()


class MyAdminSite(AdminSite):
    site_header = 'Blog'
    site_title = 'Генератор статей'
    index_title = 'Панель администрирования'


    # def each_context(self, request):
    #     context = super(MyAdminSite, self).each_context(request)
    #
    #     quantity_new_consultants = count_new_consultants(Consultant)
    #     quantity_new_referral_consultants = count_new_consultants(RefferalConsultant)
    #
    #     context['quantity_new_referral_consultants'] = quantity_new_referral_consultants
    #     context['quantity_new_consultants'] = quantity_new_consultants
    #     context['total_new_consultants'] = quantity_new_consultants + quantity_new_referral_consultants
    #
    #     return context

admin_site = MyAdminSite(name='admin')

admin_site.register(Site)
admin_site.register(User)
admin_site.register(Group)