from django.db import models

from django.db import models

class ATSScore(models.Model):

    candidate_name = models.CharField(
        max_length=100
    )

    score = models.FloatField()

    matched_skills = models.TextField()

    missing_skills = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.candidate_name
