from django.urls import path

from .views import ATSScoreView

urlpatterns = [

    path(
        'check/',
        ATSScoreView.as_view()
    ),
]
