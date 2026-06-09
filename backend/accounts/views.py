from rest_framework import generics
from django.contrib.auth.models import User

from .serializers import RegisterSerializer

from utils.email_service import (
    send_notification_email
)


class RegisterView(
    generics.CreateAPIView
):

    queryset = User.objects.all()

    serializer_class = (
        RegisterSerializer
    )

    def perform_create(
        self,
        serializer
    ):

        user = serializer.save()

        if user.email:

            send_notification_email(

                "Welcome to AI Resume Analyzer",

                f"""
Hello {user.username},

Your account has been created successfully.

Welcome to AI Resume Analyzer.

Thank You.
                """,

                user.email

            )
