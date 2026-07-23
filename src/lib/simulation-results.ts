import { Question, Answer, SimulationConfig } from '../types/simulation';
import { SimuladoAttempt, AreaResult, QuestionResult } from '../types/dashboard';

export interface ComputedResults {
  attempt: SimuladoAttempt;
  score: number;
  totalTime: number;
  answeredCount: number;
  correctCount: number;
}

export function computeResults(
  questions: Question[],
  answers: Answer[],
  config: SimulationConfig,
  startTime?: number
): ComputedResults {
  const now = Date.now();
  const totalTime = startTime ? Math.round((now - startTime) / 1000 / 60) : 0;

  const questionResults: QuestionResult[] = questions.map((q, i) => {
    const answer = answers[i];
    const isCorrect = answer?.selectedAlternative === q.correctAnswer;
    const timeSpent = answer?.timeSpent || 0;
    return {
      id: i + 1,
      area: q.subject,
      correct: isCorrect,
      timeSpent,
      averageTime: 90,
      isSlow: timeSpent > 120,
    };
  });

  const correctCount = questionResults.filter(q => q.correct).length;
  const score = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
  const answeredCount = answers.filter(a => a.selectedAlternative !== null).length;

  // Group by area
  const areaMap = new Map<string, { correct: number; total: number; timeSpent: number }>();
  questions.forEach((q, i) => {
    const area = q.subject;
    const existing = areaMap.get(area) || { correct: 0, total: 0, timeSpent: 0 };
    existing.total++;
    if (questionResults[i]?.correct) existing.correct++;
    existing.timeSpent += answers[i]?.timeSpent || 0;
    areaMap.set(area, existing);
  });

  const areas: AreaResult[] = Array.from(areaMap.entries()).map(([name, data]) => ({
    name,
    correct: data.correct,
    total: data.total,
    timeSpent: data.timeSpent,
    averageTime: Math.round(data.timeSpent / data.total),
  }));

  const attempt: SimuladoAttempt = {
    id: `SIM-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toISOString().split('T')[0],
    score,
    totalTime,
    averageTime: 0,
    status: score >= 70 ? 'approved' : 'below_target',
    areas,
    questions: questionResults,
  };

  return {
    attempt,
    score,
    totalTime,
    answeredCount,
    correctCount,
  };
}
