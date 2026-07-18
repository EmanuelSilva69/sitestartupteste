export interface QuestionData {
  text: string;
  userAnswer: string;
  correctAnswer: string;
  examSource: string;
  keySource: string;
}

export interface Traceability {
  evidenceMap: string[];
  relationship: string;
  limitations: string;
}

export interface TransparencyData {
  messageId: string;
  aiResponse: string;
  questionData: QuestionData;
  traceability: Traceability;
}

export type FeedbackType = 'like' | 'dislike';
