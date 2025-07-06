export interface ChatMessage {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  createdAt?: string; // Optional: date string
}
