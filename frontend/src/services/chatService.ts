import api from "../api/axios";
import { getToken } from "../utils/auth";

export interface ChatResponse {
  answer: string;
}

export interface ChatHistory {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}

/* ---------- Normal Chat ---------- */

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

/* ---------- Streaming Chat ---------- */

export const streamQuestion = async (
  projectId: string,
  question: string,
  onChunk: (chunk: string) => void
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

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
    const errorText = await response.text();

    console.error(
      "Streaming API error:",
      response.status,
      errorText
    );

    throw new Error(
      `Streaming failed: ${response.status}`
    );
  }

  if (!response.body) {
    throw new Error("Streaming response body is empty");
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const chunk = decoder.decode(value, {
      stream: true,
    });

    if (chunk) {
      onChunk(chunk);
    }
  }
};

/* ---------- Chat History ---------- */

export const getChatHistory = async (
  projectId: string
): Promise<ChatHistory[]> => {
  const response = await api.get(
    `/chat/${projectId}/history`
  );

  return response.data;
};