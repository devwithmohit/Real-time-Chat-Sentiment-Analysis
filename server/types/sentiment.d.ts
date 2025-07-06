declare module 'sentiment' {
  interface SentimentResult {
    score: number;
    comparative: number;
    calculation: Record<string, number>[];
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  }

  class Sentiment {
    analyze(text: string): SentimentResult;
  }

  export = Sentiment;
}
// declare module 'sentiment';