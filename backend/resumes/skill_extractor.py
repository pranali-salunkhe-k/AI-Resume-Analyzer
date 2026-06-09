SKILLS_DB = [
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Django",
    "Flask",
    "MySQL",
    "SQL",
    "HTML",
    "CSS",
    "Bootstrap",
    "Node.js",
    "MongoDB",
    "Git",
    "GitHub",
    "REST API",
    "Machine Learning",
    "Data Science",
    "C",
    "C++"
]

def extract_skills(text):

    found_skills = []

    text = text.lower()

    for skill in SKILLS_DB:

        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))