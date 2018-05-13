# -*- encoding: utf-8 -*-
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, JsonResponse
from words.models import User
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import string
import random

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

@method_decorator(csrf_exempt, name='dispatch')
class BaseController(View):
    def __init__(self):
        self.user = False
        self.data = False
        self.uuid = None

    def post_callback(self, request):
        pass
    def get_callback(self, request):
        pass
    def post(self, request):
        # Data have current_site, quantity_word, and uuid for getting user.

        self.data = request.POST
        self.uuid = self.data['uuid']
        self.user = get_object_or_404(User, uuid=self.uuid)

        return self.post_callback(request)

    def get(self, request):
        # Data have current_site, quantity_word, and uuid for getting user.

        self.data = request.GET
        self.uuid = self.data['uuid']
        self.user = get_object_or_404(User, uuid=self.uuid)

        return self.get_callback(request)

# Set data about current user position and quantity
# words were found on a page.
class SetUserStateController(BaseController):
    def post_callback(self, request):
        user = self.user
        data = self.data

        if "current_site" in data:
            user.was_gotten_new_domain = True
            user.current_site = data['current_site']
        else:
            user.quantity_words = data['quantity_words']
            user.is_parsed_data = True

        return HttpResponse(True)

# Set boolean field of user by default for
# parsing a next page.
class ThankYouServerController(BaseController):
    def post_callback(self, request):
        # Cache an user for convenient.
        user = self.user
        user.is_parsed_data = False
        user.was_gotten_new_domain = False
        user.save()

        return HttpResponse(True)


class UserAction(BaseController):
    def post_callback(self, request):
        user = self.user
        # Remove or add word using user manager.
        getattr(User.objects, self.user_action)(user, self.data[self.property])
        # Return array with rest words.
        return JsonResponse({
            'words': User.objects.get_m2m_array(user, 'words'),
            'domains': User.objects.get_m2m_array(user, 'domains'),
        })
# Remove word in a needed user.
class RemoveWordController(UserAction):
    def __init__(self):
        self.user_action = 'remove_word'
        self.property = 'word'

class AddWordController(UserAction):
    def __init__(self):
        self.property = 'word'
        self.user_action = 'add_word'

class RemoveDomainController(UserAction):
    def __init__(self):
        self.user_action = 'remove_domain'
        self.property = 'domain'

class AddDomainController(UserAction):
    def __init__(self):
        self.property = 'domain'
        self.user_action = 'add_domain'

class SendTemporaryCodeController(View):
    def post(self, request):
        data = request.POST
        email = data['email']
        user = User.objects.filter(email=email)

        if user.exists():
            user = user[0]

            temporary_code = id_generator()
            user.temporary_code = temporary_code

            user.email_user(
                'Код восстановления пароля',
                'Ваш код: %s.' % temporary_code,
                getattr(settings, 'DEFAULT_FROM_EMAIL')
            )
            user.save()

            return JsonResponse({
                "message": _('Мы выслали на вашу почту письмо с кодом для восстановления пароля.'),
                "status": False
            })
        else:
            return JsonResponse({
                "message": _('Мы не нашли пользователя с данным именнем почтового ящика'),
                "status": False
            })


class CheckCodeForRecoveringPasswordController(View):
    def post(self, request):
        data = request.POST
        email = data['email']
        user = User.objects.filter(email=email)

        if user.exists():

            user = user[0]

            if user.temporary_code == data['temporary_code']:
                user.temporary_code = None
                user.save()

                return JsonResponse({
                    "message": _('Введите новый пароль'),
                    "status": True
                })

            return JsonResponse({
                "message": _('Вы ввели неправильнй код для восстановления пароля.'),
                "status": False
            })
        else:
            return JsonResponse({
                "message": _('Мы не нашли пользователя с данным именнем почтового ящика'),
                "status": False
            })


class RecoverPasswordController(View):
    def post(self, request):
        data = request.POST
        email = data['email']
        user = User.objects.filter(email=email)

        if user.exists():
            user = user[0]
            password = data['password']
            user.set_password(password)
            user.save()

            return JsonResponse({
                "message": _('Успех!'),
                "status": True,
                "password": password,
                "username": user.username
            })
        else:
            return JsonResponse({
                "message": _('Мы не нашли пользователя с данным именнем почтового ящика'),
                "status": False
            })


class IncreaseQuantityController(View):
    def post(self, request):
        data = request.POST
        email = data['email']
        
        user = User.objects.filter(email=email)

        if user.exists():
            user = user[0]
            password = data['password']
            user.set_password(password)
            user.save()

            return JsonResponse({
                "message": _('Успех!'),
                "status": True,
                "password": password,
                "username": user.username
            })
        else:
            return JsonResponse({
                "message": _('Мы не нашли пользователя с данным именнем почтового ящика'),
                "status": False
            })