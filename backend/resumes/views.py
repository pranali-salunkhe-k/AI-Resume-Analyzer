from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Resume
from .serializers import ResumeSerializer

import PyPDF2


class ResumeUploadView(APIView):

    def post(self, request):

        serializer = ResumeSerializer(
            data=request.data
        )

        if serializer.is_valid():

            resume = serializer.save()

            text = ""

            pdf_file = open(
                resume.resume_file.path,
                'rb'
            )

            pdf_reader = PyPDF2.PdfReader(
                pdf_file
            )

            for page in pdf_reader.pages:
                text += page.extract_text()

            pdf_file.close()

            return Response({
                "message":
                "Resume Uploaded",

                "text":
                text[:3000]
            })

        return Response(
            serializer.errors
        )
