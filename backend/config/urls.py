from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="AI Resume Analyzer API",
        default_version='v1',
        description="Resume Analyzer & Job Matcher APIs",
    ),
    public=True,
    permission_classes=[
        permissions.AllowAny,
    ],
)

urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        'api/accounts/',
        include('accounts.urls')
    ),

    path(
        'api/resume/',
        include('resumes.urls')
    ),

    path(
        'api/ats/',
        include('ats.urls')
    ),

    path(
        'api/jobs/',
        include('jobs.urls')
    ),

    path(
        'swagger/',
        schema_view.with_ui(
            'swagger',
            cache_timeout=0
        ),
        name='swagger-ui'
    ),

]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)