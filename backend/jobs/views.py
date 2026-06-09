from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Job
from .job_matcher import calculate_match

from utils.email_service import (
    send_notification_email
)


class JobMatchView(APIView):

    def post(self, request):

        resume_skills = request.data.get(
            "resume_skills",
            []
        )

        jobs = Job.objects.all()

        matched_jobs = []

        for job in jobs:

            job_skills = [
                skill.strip()
                for skill in
                job.required_skills.split(",")
            ]

            match_score = calculate_match(
                resume_skills,
                job_skills
            )

            matched_jobs.append({

                "job_title":
                job.title,

                "company":
                job.company,

                "match_score":
                match_score
            })

        matched_jobs = sorted(
            matched_jobs,
            key=lambda x:
            x["match_score"],
            reverse=True
        )

        # Prepare Email Content
        job_list = ""

        for job in matched_jobs:

            job_list += (
                f"{job['job_title']} - "
                f"{job['company']} "
                f"({job['match_score']}%)\n"
            )

        send_notification_email(

            "Job Recommendations",

            f"""
Recommended Jobs Based On Your Resume

{job_list}
            """,

            "salunkhepanu2511@gmail.com"
        )

        return Response(
            matched_jobs
        )