def calculate_match(
    resume_skills,
    job_skills
):

    resume_set = set(
        skill.strip().lower()
        for skill in resume_skills
    )

    job_set = set(
        skill.strip().lower()
        for skill in job_skills
    )

    matched = resume_set.intersection(
        job_set
    )

    score = (
        len(matched)
        / len(job_set)
    ) * 100

    return round(score, 2)