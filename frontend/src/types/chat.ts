export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatHistory {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}