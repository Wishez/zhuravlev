# -*- encode: utf-8 -*-
from django.test import TestCase
from django.urls import reverse
from words.models import User
import json
from django.utils.translation import gettext_lazy as _

class AccountAPI(TestCase):
    def setUp(self):
        self.log_in_url = reverse('log_in')
        self.log_out_url = reverse('log_out')
        self.register_url = reverse('register')
        self.change_password_url = reverse('change_password')
        self.change_password_url = reverse('change_email')
        self.change_password_url = reverse('recover_password')

        u, is_created = User.objects.get_or_create(username='username')

        if not is_created:
            u = User(username='username', email='myEmail@mail.ru')
            u.set_password('demonstration')
            u.save()

        self.user = u


    def test_success_log_in(self):
        response = self.client.get(self.log_in_url, {
            "username": "username",
            "password": "demonstration"
        })

        self.assertEquals(response.status_code, 200)
        self.assertEquals(self.user.is_active, True)

    def test_failure_log_in(self):

        response = self.client.get(self.log_in_url, {
            "username": "username",
            "password": "demonstration343"
        })

        self.assertEquals(response.status_code, 200)
    def test_success_register(self):
        self.assertEquals(self.register_url, '/account/register/')
        resp = self.client.post(self.register_url, {
            "password":"demonstration",
            "username": "mr_register",
            "repeatedPassword":
            "demonstration","email": "registration@yandex.ru"
        })

        data = json.loads(resp.content)
        self.assertEquals(resp.status_code, 200)
        self.assertEquals(len(data), 2)



