export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

export interface ChatHistory {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}
