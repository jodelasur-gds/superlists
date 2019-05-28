from django.urls import path, include

from lists import urls as list_urls
from lists import views

urlpatterns = [
    path('', views.home_page, name='home'),
    path('lists/', include(list_urls)),
]
