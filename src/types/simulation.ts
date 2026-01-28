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
