def calculate_ats_score(
    resume_skills,
    required_skills
):

    resume_set = set(
        skill.lower()
        for skill in resume_skills
    )

    required_set = set(
        skill.lower()
        for skill in required_skills
    )

    matched = resume_set.intersection(
        required_set
    )

    missing = required_set - matched

    if len(required_set) == 0:
        score = 0
    else:
        score = (
            len(matched) /
            len(required_set)
        ) * 100

    return {
        "score": round(score, 2),
        "matched": list(matched),
        "missing": list(missing)
    }