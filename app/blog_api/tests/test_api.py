from django.test import TestCase
from model_mommy import mommy
from django.urls import reverse
from django.utils.timezone import now
import json

class TestBlogApi(TestCase):
    def setUp(self):
        self.article_slug = "test_case_of_the_article"

        self.article = mommy.make(
            "blog.Article",
            _fill_optional=True,
            created=now(),
            modified=now(),
            slug=self.article_slug
        )

        self.tags = mommy.make(
            "blog.Tag",
            _fill_optional=True,
            created=now(),
            modified=now(),
            _quantity=5
        )

        self.year = mommy.make(
            "blog.Year",
            _fill_optional=True,
            make_m2m=True,
            created=now(),
            modified=now()
        )


    def test_articles_list(self):
        url = reverse('articles_list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        data = json.loads(response.content)
        self.assertTrue(len(data) > 0)
        self.assertEquals(len(data[0]), 9)

    def test_single_article(self):
        article_slug = self.article_slug
        url = reverse(
            'single_article',
            kwargs={
                "slug":  article_slug
            }
        )
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(len(data), 7)

    def test_tags_list(self):
        url = reverse('tags_list')

        response = self.client.get(url)
        data = json.loads(response.content)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(data), 5)

    def test_years_list(self):
        url = reverse('years_list')

        response = self.client.get(url)
        data = json.loads(response.content)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(data), 1)
