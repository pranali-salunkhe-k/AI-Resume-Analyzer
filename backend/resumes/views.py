from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Resume
from .serializers import ResumeSerializer

from .skill_extractor import extract_skills

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

                page_text = page.extract_text()

                if page_text:
                    text += page_text

            pdf_file.close()

            skills = extract_skills(text)

            resume.extracted_skills = (
                ", ".join(skills)
            )

            resume.save()

            return Response({

                "message":
                "Resume Uploaded Successfully",

                "skills":
                skills,

                "skills_count":
                len(skills)

            })

        return Response(
            serializer.errors
        )