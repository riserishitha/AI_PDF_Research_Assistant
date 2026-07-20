from google import genai

from app.core.config import settings

client = genai.Client(
    api_key=settings.GEMINI_API_KEY,
)


def ask_llm(question: str, context: str):
    prompt = f"""
You are a helpful AI Research Assistant.

Answer ONLY from the context below.

If the answer is not present, say:
"I couldn't find that information in the uploaded documents."

Context:
{context}

Question:
{question}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        print(e)
        raise