from app.services.llm_service import ask_llm

context = """
Rishitha worked at ACT Fibernet from April 2025 to April 2026 as a Data Engineering Intern.
"""

question = "How long was the internship?"

answer = ask_llm(
    question,
    context,
)

print(answer)