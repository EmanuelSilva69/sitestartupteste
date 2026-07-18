// Types for simulation/quiz system

export interface Alternative {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  subject: string; // "Português", "Direito", "Raciocínio Lógico", etc.
  statement: string;
  imageUrl?: string; // Optional image for question
  alternatives: Alternative[];
  correctAnswer?: string; // Only filled after submission
}

export interface Answer {
  questionId: string;
  selectedAlternative: string | null;
  flaggedForReview: boolean;
  timeSpent?: number; // seconds
}

export interface SimulationState {
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  mode: "training" | "real";
  startTime: number; // timestamp
  timeLimit?: number; // seconds (only for "real" mode)
  isCompleted: boolean;
}

export interface SimulationConfig {
  questions: number;
  mode: "training" | "real";
  subjects?: string[];
  timestamp: string;
}

export type DownloadStatus = "idle" | "downloading" | "completed" | "error";

export interface DownloadedFile {
  id: string;
  name: string;
  sourceUrl: string;
  type: "exam" | "gabarito";
  mimeType: string;
  size: number;
  objectUrl: string;
  downloadedAt: string;
}

export interface Citation {
  text: string;
  url?: string;
  source?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  citations?: Citation[];
  timestamp: number;
  rating?: "like" | "dislike" | null;
}

export interface AIProviderConfig {
  provider: "openai" | "mock";
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export interface AIQuestionContext {
  question: Question;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  subject: string;
}

export interface PerQuestionChat {
  questionId: string;
  messages: ChatMessage[];
}
