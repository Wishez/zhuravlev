# -*- coding: utf-8 -*-
from django.conf import settings
if settings.IS_PRODUCTION:
    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')
    
from django.test import TestCase
from model_mommy import mommy
from ..models import *
from django.utils.timezone import now
# Create your tests here.


class TestArticleModel(TestCase):
    def setUp(self):

        self.article = mommy.make(
            "blog.Article",
            _fill_optional = True,
            created=now(),
            modified=now(),
            slug="test_article_case"
        )

    def test_increase_article_applouse(self):
        applauseQuantity = 50
        beforeApplause = self.article.applause

        Article.objects.increase_applause(self.article, applauseQuantity)
        afterApplause = self.article.applause
        self.assertEqual(beforeApplause+applauseQuantity, afterApplause)