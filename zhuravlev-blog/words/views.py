# -*- encoding: utf-8 -*-
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, JsonResponse
from words.models import User
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class BaseController(View):
    def __init__(self):
        self.user = False
        self.data = False
        self.uuid = None

    def post_callback(self, request):
        pass

    def post(self, request):
        # Data have current_site, quantity_word, and uuid for getting user.

        self.data = request.POST
        self.uuid = self.data['uuid']
        self.user = get_object_or_404(User, uuid=self.uuid)

        return self.post_callback(request)

# Set data about current user position and quantity
# words were found on a page.
class SetUserStateController(BaseController):
    def post_callback(self, request):
        user = self.user
        data = self.data

        if "current_site" in data:
            user.was_gotten_new_domain = True
            user.current_site = data['current_site']
        else:
            user.quantity_words = data['quantity_words']
            user.is_parsed_data = True

        return HttpResponse(True)

# Set boolean field of user by default for
# parsing a next page.
class ThankYouServerController(BaseController):
    def post_callback(self, request):
        # Cache an user for convenient.
        user = self.user
        user.is_parsed_data = False
        user.was_gotten_new_domain = False
        user.save()

        return HttpResponse(True)



# Remove word in a needed user.
class RemoveWordController(BaseController):
    def __init__(self):
        self.user_action = 'remove_word'
    def post_callback(self, request):
        user = self.user
        # Remove or add word using user manager.
        getattr(User.objects, self.user_action)(user, self.data['word'])
        # Return array with rest words.
        return JsonResponse({
            'words': User.objects.get_words(user)
        })

class AddWordController(RemoveWordController):
    def __init__(self):
        # super(AddWordController, self).__init__()
        self.user_action = 'add_word'

