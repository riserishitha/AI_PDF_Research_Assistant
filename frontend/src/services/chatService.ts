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

export const getChatHistory = async (
  projectId: string
): Promise<ChatHistory[]> => {
  const response = await api.get(
    `/chat/${projectId}/history`
  );

  return response.data;
};