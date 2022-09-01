from django.urls import path, re_path
from . import views 

urlpatterns = [ 
    path('api/inbox', views.inbox, name="inbox"),
    path('api/sent', views.sent, name="sent"),
    re_path(r'^', views.root, name='root'),
]