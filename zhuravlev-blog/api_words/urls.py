from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'plugin_user', PluginUserViewSet)
router.register(r'document_data_user', DocumentUserViewSet)

urlpatterns = router.urls