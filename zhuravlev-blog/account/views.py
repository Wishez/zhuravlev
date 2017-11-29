# -*- encoding: utf-8 -*-
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from words.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import gettext_lazy as _

@csrf_exempt
def register(request):
    if request.method == 'POST':

        data = request.POST

        password = data['password']
        repeated_password = data['repeatedPassword']
        # Проверяем тождество паролей, после чего либо работа продолжается,
        # либо пользователь пойдёт отождествлять пароли.
        if password != repeated_password:
            return HttpResponse(_('Пароли не совпадают'))
        username = data['username']
        email = data['email']

        # Проверка на существуещего пользователя
        if User.objects.filter(username=username).exists():
            # Если есть пользователь с таким именем,
            # возвращается уведомление об этом.
            return HttpResponse(_('Пользователь с таким именем пользователя уже существует'))
        elif User.objects.filter(email=email).exists():
            return HttpResponse(_('Пользователь с таким email-ом уже существует'))
        else:
            # Регистрируется один пользователь
            user = User(
                username=username,
                email=email
            )
            user.set_password(password)
            user.save()

            # В будующем будет реализована отправка сообщения,
            # после регистрации аккаунта пользователя.
            # server = 'Minecraft'
            # subject =  'Успешная регистрация'
            # user.email_user(subject, message)
            # Возвращается ответ об успешной регистрации.
            return HttpResponse(_('Вы успешно прошли регистрацию'))
            # Посылается сообщение об успехе на почту
        return HttpResponse('Что-то пошло не так...')

def log_in(request):
    if request.method == 'GET':
        data = request.GET

        username = data['username']
        password = data['password']

        user = User.objects.filter(username=username)

        if user.exists() and user[0].check_password(password):
            current_user = user[0]
            login(
                request,
                current_user
            )

            # Если есть аккаунт, то не факт, что пользователь
            # логинится на нужном сайте. Он, может быть, очень рассееный
            # или же у него случилось что-то плохое и он решил поиграть
            # в какую-нибудь игру, чтобы на время уйти из реальности.

            # There will be an user's avatar in model in future.

            userData = {
                'username': current_user.username,
                'email': current_user.email,
                'uuid': current_user.uuid
            }
            # Возвращаются данные пользователе

            return JsonResponse(userData)
     # Не удалось залогинисться.
    return HttpResponse(_('Логин или пароль не верны'))

def log_out(request):
    logout(request)
    return HttpResponse(True)

@csrf_exempt
def change_password(request):
    if request.method == 'POST':
        data = request.POST
        # Получаем имя пользователя и пароль,

        oldPassword = data['oldPassword']
        newPassword = data['newPassword']
        user = User.objects.get(id=data['uuid'])

        # На стороне клиента проходит валидация
        # старого пароля.
        # Но всё же, на всякий случай проверяется сатрый пароль,
        #  который ввёл пользователь, с текущим.
        if user is not None and user.check_password(oldPassword):
            # Изменение пароля
            user.set_password(newPassword)
            # Сохраняем изменение.
            user.save()
            return HttpResponse('Пароль был успешно изменён')
        else:
            return HttpResponse('Не удалось изменить пароль')
        # Возвращение об успехе изменения пароля
    # Не удалось поменять пароль
    return HttpResponse(False)

@csrf_exempt
def change_email(request):
    if request.method == 'POST':
        data = request.POST
        # Получаем имя пользователя, пароль и новый email.


        oldPassword = data['password']
        newEmail = data['newEmail']

        user = User.objects.get(id=data['uuid'])

        # На стороне клиента проходит валидация
        # старого пароля.
        # Но всё же, на всякий случай проверяется сатрый пароль,
        # который ввёл пользователь, с текущим.
        if user is not None and user.check_password(oldPassword):
            # Изменение email-a
            user.email = newEmail
            # Сохранение новых данных пользователя.
            user.save()
            # Возвращение сообщение об успехе изменения email-a.
            return HttpResponse('Email успешно изменён')
        else:
            # Возвращение сообщение об не успехе изменения email-a.
            return HttpResponse('Не удалось изменить email')
    # Не удалось поменять email
    return HttpResponse('Не удалось изменить email.')

# Будет арендовать дополнительное место в хранилище слов на сервере.
# @csrf_exempt
# def subscribe(request):
#
#     if request.method == 'POST':
#         data = request.POST
#         # Получаем имя пользователя, пароль и новый email.
#         quantity_monthes = data['quantityMonthes']

#         user = User.objects.get(username=data['uuid'])


        # return JsonResponse(user.subscribe(quantity_monthes))
    # Ошибка сервера?
    # return HttpResponse('Не удалось подписаться на сервер')

# Will change the function's logic. When the user will make request
# to change his password, he will get a code in his email, then
# he could type that code into input field and successfully changing
# his password.

@csrf_exempt
def recover_password(request):
    if request.method == 'POST':
        data = request.POST
        email = data['email']
        site = data['site']
        if User.objects.filter(email=email).exists():
            newPassword = User.objects.make_random_password()
            user = User.objects.get(email=email)

            user.set_password(newPassword)
            subj = 'Новый пароль для %s аккаунта' % site
            message = 'Ваш новый пароль %s' % newPassword

            user.email_user(subj, message)
            return HttpResponse('На почту %s был выслан новый пароль' % email)
        else:
            return HttpResponse('Аккаунта с таким email-ом не существует')
    return HttpResponse('Ошибка' )

# @csrf_exempt
# def change_user_avatar(request):
#     if request.method == 'POST' and request.FILES['newAvatar']:
#         data =  request.POST
#         avatar = request.FILES['newAvatar']

#
#         user = User.objects.get(id=data['uuid'])
#
#         user.avatar.save('user_avatar', avatar)
#         user.save()
#
#         response = {
#             'avatar': user.avatar.url,
#         }
#
#         return JsonResponse(response)
#     return HttpResponse('Не удалось изменить аватар')