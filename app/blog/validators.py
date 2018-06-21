# -*- coding: utf-8 -*-
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import re

def validate_slug_field(value):
    pattern = re.compile('^([A-Za-z_0-9\-]+)$')
    pattern.match(value)
    if pattern.match(value) is None:
        raise ValidationError(
            _('Значение "%(value)s" может содержать латинские буквы, арабские цифры, тире и нижние подчёркивания.'),
            params={'value': value},
        )