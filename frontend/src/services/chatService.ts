import api from "../api/axios";

export interface ChatResponse {
  answer: string;
}

export interface ChatHistory {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}

export const askQuestion = async (
  projectId: string,
  question: string
): Promise<ChatResponse> => {
  const response = await api.post(
    `/chat/${projectId}`,
    {
      question,
    }
  );

  return response.data;
};

/* ---------- NEW ---------- */

export const streamQuestion = async (
  projectId: string,
  question: string,
  onChunk: (chunk: string) => void
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/chat/${projectId}/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Streaming failed");
  }

  const reader = response.body?.getReader();

  if (!reader) return;

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } =
      await reader.read();

    if (done) break;

    const chunk = decoder.decode(
      value,
      {
        stream: true,
      }
    );

    onChunk(chunk);
  }
};

/* ------------------------- */

export const getChatHistory = async (
  projectId: string
): Promise<ChatHistory[]> => {
  const response = await api.get(
    `/chat/${projectId}/history`
  );

  return response.data;
};