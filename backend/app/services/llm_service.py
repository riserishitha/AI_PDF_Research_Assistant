from google import genai

from app.core.config import settings

client = genai.Client(
    api_key=settings.GEMINI_API_KEY,
)


SYSTEM_PROMPT = """
You are an AI Research Assistant.

Answer ONLY using the provided context.

If the answer is not found in the context, reply:

"I couldn't find that information in the uploaded documents."

Always answer in Markdown.
"""


def ask_llm(question: str, context: str):
    prompt = f"""
{SYSTEM_PROMPT}

Context:
{context}

Question:
{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text


def stream_llm(question: str, context: str):
    prompt = f"""
{SYSTEM_PROMPT}

Context:
{context}

Question:
{question}
"""

    response = client.models.generate_content_stream(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    full_answer = ""

    for chunk in response:
        if chunk.text:
            full_answer += chunk.text
            yield chunk.text

    return full_answer