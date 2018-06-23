from django.contrib.auth.models import BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    use_for_related_fields = True

class ApplauseManager(models.Manager):
    use_for_related_fields = True

    def increase_applause(self, instance, quantity):
        try:
            instance.applause += quantity
            instance.save()
        except Exception as e:
            raise "Something going wrong: %s" % e

class ArticleManager(ApplauseManager):
    pass

class CommentManager(ApplauseManager):
    pass

class ExtraApplauseManager(models.Model):
    extra_manager = ApplauseManager()

    class Meta:
        abstract = True