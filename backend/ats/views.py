from rest_framework.views import APIView
from rest_framework.response import Response

from .ats_calculator import calculate_ats_score


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

        print("Resume Skills:", resume_skills)
        print("Required Skills:", required_skills)

        result = calculate_ats_score(
            resume_skills,
            required_skills
        )

        return Response(result)