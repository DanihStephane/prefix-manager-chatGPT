export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  timestamp?: Date;
}

export interface ChatResponse {
  content: string;
  error?: string;
  loading: boolean;
}