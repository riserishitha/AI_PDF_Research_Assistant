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
export interface ChatSource {
  document_id: string;
  document_name: string;
  page_number?: number;
  chunk_index?: number;
  relevance_score?: number;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
}
