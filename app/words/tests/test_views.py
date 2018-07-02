# -*- coding: utf-8 -*-
from django.test import TestCase
from django.urls import reverse
from words.models import User
import json

class WordsApi(TestCase):
    def setUp(self):
        user_1, is_created = User.objects.get_or_create(username='username')

        self.user_1 = user_1

        self.remove_word_url = reverse('remove_word')
        self.add_word_url = reverse('add_word')
        self.uuid = self.user_1.uuid
        self.word = 'Животноводство'

    def test_add_word(self):

        self.assertEquals(self.uuid,  self.user_1.uuid)
        response = self.client.post(self.add_word_url, {
            'word': self.word,
            'uuid': self.uuid
        })

        data = json.loads(response.content)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(data), 1)

    def test_remove_word(self):
        self.assertEquals(self.uuid, self.user_1.uuid)
        response = self.client.post(self.remove_word_url, {
             'word': self.word,
             'uuid': self.uuid
        })

        data = json.loads(response.content)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(data), 1)