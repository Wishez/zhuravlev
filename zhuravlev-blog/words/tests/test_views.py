from django.test import TestCase
from django.urls import reverse
from words.models import User
import json
class WordsApi(TestCase):
    def test_add_word(self):
        url = reverse('add_word')
        userId = 1
        word = 'Пони'
        response = self.client.post(url, {
            'word': word,
            'userId': userId
        })
        self.assertEquals(response.status_code, 200)
        # data = json.loads(response.content)

        # self.assertContains(data, "words")

    def test_remove_word(self):
        url = reverse('remove_word')
        userId = 1
        word = 'Животноводство'
        response = self.client.post(url, {
            "word": word,
            "userId": userId
        })
        self.assertEquals(response.status_code, 200)