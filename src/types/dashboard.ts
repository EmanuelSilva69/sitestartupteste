export interface AreaResult {
  name: string;
  correct: number;
  total: number;
  timeSpent: number;
  averageTime: number;
}

export interface QuestionResult {
  id: number;
  area: string;
  correct: boolean;
  timeSpent: number;
  averageTime: number;
  isSlow: boolean;
}

export interface SimuladoAttempt {
  id: string;
  date: string;
  score: number;
  totalTime: number;
  areas: AreaResult[];
  questions: QuestionResult[];
  status: 'approved' | 'below_target';
  averageTime: number;
}

export interface RadarAttribute {
  name: string;
  value: number;
  color: string;
}

export interface TrendPoint {
  date: string;
  score: number;
  label: string;
}
