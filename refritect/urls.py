from django.conf.urls import patterns, include, url

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'django_components.front.views.index', name='index'),
    url(r'^soluciones$', 'django_components.front.views.index', name='index'),
        url(r'^soluciones/instalacion$', 'django_components.front.views.index', name='index'),
        url(r'^soluciones/mantenimiento$', 'django_components.front.views.index', name='index'),
        url(r'^soluciones/industrial$', 'django_components.front.views.index', name='index'),
    url(r'^productos$', 'django_components.front.views.index', name='index'),
    url(r'^distribucion$', 'django_components.front.views.index', name='index'),
    url(r'^nosotros$', 'django_components.front.views.index', name='index'),
    url(r'^contacto$', 'django_components.front.views.index', name='index'),

    url(r'^partial/layout/', include('django_components.front.urls')),
    url(r'^partial/section/', include('django_components.front.urls')),
    url(r'^partial/block/', include('django_components.front.urls')),
    # url(r'^admin/', include(admin.site.urls)),

    #### Cert
    url(r'^.well-known/acme-challenge/(?P<challenge>[^/]+)$', 'django_components.front.views.challenge', name='challenge'),
)

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
