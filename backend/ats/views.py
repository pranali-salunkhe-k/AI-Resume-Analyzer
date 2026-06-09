from rest_framework.views import APIView
from rest_framework.response import Response

from .ats_calculator import calculate_ats_score

from utils.email_service import (
    send_notification_email
)


class ATSScoreView(APIView):

    def post(self, request):

        resume_skills = request.data.get(
            "resume_skills",
            []
        )

        required_skills = request.data.get(
            "required_skills",
            []
        )

        result = calculate_ats_score(
            resume_skills,
            required_skills
        )

        # Email Notification
        send_notification_email(

            "ATS Score Report",

            f"""
ATS Score: {result['score']}%

Matched Skills:
{', '.join(result['matched'])}

Missing Skills:
{', '.join(result['missing'])}
            """,

            "salunkhepanu2511@gmail.com"
        )

        return Response(result)