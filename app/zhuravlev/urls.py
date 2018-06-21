from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from myadmin.admin import admin_site

urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS
    url(r'^admin/', admin_site.urls),
    url(r'', include('blog.urls')),
    url(r'^api/v0/', include('api_v0.urls')),
    url(r'^api/v1/', include('blog_api.urls')),
    url(r'^words/', include('words.urls')),
    url(r'^account/', include('account.urls')),
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
