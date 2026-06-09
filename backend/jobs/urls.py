from django.urls import path

from .views import JobMatchView

urlpatterns = [

    path(
        'match/',
        JobMatchView.as_view()
    ),
]