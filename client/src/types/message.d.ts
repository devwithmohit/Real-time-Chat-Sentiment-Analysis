export interface ChatMessage {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
   timestamp?: Date;
  id?: string;
  createdAt?: string; // Optional: date string
}
