# -*- encoding: utf-8 -*-
from django.utils import timezone

def loggingData(filename, data):
    file = open(filename+'.log', 'w')
    file.write('%s\n%s' % (timezone.now(), data))
    file.close()


def user_directory_path(instance, filename):
    return 'avatar/user_{0}/{1}'.format(instance.user.id, filename)


