from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User

from resumes.models import Resume
from jobs.models import Job


class AnalyticsView(APIView):

    def get(self, request):

        total_users = User.objects.count()

        total_resumes = Resume.objects.count()

        total_jobs = Job.objects.count()

        skills_data = {}

        resumes = Resume.objects.all()

        for resume in resumes:

            if resume.extracted_skills:

                skills = (
                    resume.extracted_skills
                    .split(",")
                )

                for skill in skills:

                    skill = skill.strip()

                    if skill:

                        skills_data[
                            skill
                        ] = skills_data.get(
                            skill,
                            0
                        ) + 1

        top_skills = sorted(

            skills_data.items(),

            key=lambda x: x[1],

            reverse=True

        )[:10]

        return Response({

            "total_users":
            total_users,

            "total_resumes":
            total_resumes,

            "total_jobs":
            total_jobs,

            "top_skills":
            top_skills

        })
