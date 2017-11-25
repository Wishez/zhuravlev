from django.test import TestCase
from .models import *
# Create your tests here.

class UserTestCase(TestCase):

    def add_new_word(self):
        u = User.objects.get(id=1)
        User.objects.add_word(u, 'Anymore')
        User.objects.add_word(u, 'Another')

    def remove_word(self):
        u = User.objects.get(id=1)
        User.objects.remove_word(u, 'Anymore')
        User.objects.remove_word(u, 'Another')

    def get_user_words(self):
        u = User.objects.get(id=1)

        self.assertIs(User.objects.get_words(u), dict)