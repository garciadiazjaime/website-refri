from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'django_components.front.views.index', name='index'),

    #### LAYOUT VIEWS

    url(r'^header$', 'django_components.front.views.header', name='header'),
    url(r'^main$', 'django_components.front.views.main', name='main'),
    url(r'^footer$', 'django_components.front.views.footer', name='footer'),
    
    #### PARTIAL SECTION VIEWS
    url(r'^single_page$', 'django_components.front.views.home', name='home'),
)
