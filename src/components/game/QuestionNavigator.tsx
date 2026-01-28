import React, { useMemo } from "react";
import { Answer, Question } from "../../types/simulation";
import { cn } from "../ui/utils";
import { CheckCircle2, Flag, Circle, X } from "lucide-react";

interface QuestionNavigatorProps {
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function QuestionNavigator({
  questions,
  answers,
  currentQuestionIndex,
  isOpen,
  onClose,
  onNavigate
}: QuestionNavigatorProps) {
  if (!isOpen) {
    return null;
  }
  
  const handleQuestionClick = (index: number) => {
    onNavigate(index);
    onClose();
  };

  const getQuestionStatus = (index: number) => {
    const answer = answers[index];
    const isCurrent = index === currentQuestionIndex;
    const isAnswered = answer?.selectedAlternative !== null;
    const isFlagged = answer?.flaggedForReview;

    return {
      isCurrent,
      isAnswered,
      isFlagged
    };
  };

  const stats = useMemo(() => ({
    total: questions.length,
    answered: answers.filter(a => a.selectedAlternative !== null).length,
    flagged: answers.filter(a => a.flaggedForReview).length,
    unanswered: answers.filter(a => a.selectedAlternative === null).length
  }), [questions.length, answers]);

  const percentComplete = Math.round((stats.answered / stats.total) * 100);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-background border-l border-border shadow-2xl z-50 p-6 overflow-y-auto animate-in slide-in-from-right">
        {/* Header com Close Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Mapa da Prova
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{stats.total} questões</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-gradient-to-r from-primary via-purple-500 to-secondary hover:shadow-lg hover:shadow-primary/50 text-white rounded-xl transition-all duration-300 flex-shrink-0 active:scale-95"
            title="Fechar mapa (ESC)"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Progresso</span>
            <span className="text-sm font-bold text-primary">{percentComplete}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle2 className="size-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-500">{stats.answered}</div>
            <div className="text-xs text-muted-foreground font-medium">Respondidas</div>
          </div>
          <div className="bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/30 rounded-xl p-4 text-center hover:border-warning/50 transition-colors">
            <div className="flex items-center justify-center mb-2">
              <Flag className="size-5 text-warning fill-current" />
            </div>
            <div className="text-2xl font-black text-warning">{stats.flagged}</div>
            <div className="text-xs text-muted-foreground font-medium">Marcadas</div>
          </div>
          <div className="bg-gradient-to-br from-destructive/20 to-destructive/5 border border-destructive/30 rounded-xl p-4 text-center hover:border-destructive/50 transition-colors">
            <div className="flex items-center justify-center mb-2">
              <Circle className="size-5 text-destructive" />
            </div>
            <div className="text-2xl font-black text-destructive">{stats.unanswered}</div>
            <div className="text-xs text-muted-foreground font-medium">Pendentes</div>
          </div>
        </div>

        {/* Question Grid */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-foreground mb-4">Questões:</h3>
          <div className="grid grid-cols-5 gap-2.5">
            {questions.map((question, index) => {
              const { isCurrent, isAnswered, isFlagged } = getQuestionStatus(index);

              return (
                <button
                  key={question.id}
                  onClick={() => handleQuestionClick(index)}
                  className={cn(
                    "aspect-square rounded-xl font-bold text-sm flex items-center justify-center cursor-pointer transition-all duration-200 relative group",
                    // Base state
                    "border border-transparent",
                    // Answered - Green (but not current and not flagged)
                    isAnswered && !isFlagged && !isCurrent && "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40",
                    // Flagged - Orange (but not current)
                    isFlagged && !isCurrent && "bg-gradient-to-br from-warning to-orange-600 text-white shadow-lg shadow-warning/30 hover:shadow-xl hover:shadow-warning/40",
                    // Unanswered - Gray (both current and not current)
                    !isAnswered && !isFlagged && "bg-muted/40 text-muted-foreground border-2 border-border hover:border-primary/50 hover:bg-muted/60",
                    // Current question - Purple ring with gradient background (ALWAYS on top of other states)
                    isCurrent && "ring-2 ring-secondary ring-offset-2 ring-offset-background shadow-lg shadow-secondary/40 bg-gradient-to-br from-secondary/20 to-primary/20",
                    // Hover effect
                    "hover:scale-110 active:scale-95"
                  )}
                  title={`Questão ${question.number}${isCurrent ? ' (atual)' : ''}`}
                >
                  <span className="relative z-10">{question.number}</span>
                  
                  {/* Icon overlay - left side */}
                  {isAnswered && !isFlagged && !isCurrent && (
                    <CheckCircle2 className="absolute top-1/2 left-0 -translate-x-5 -translate-y-1/2 size-5 text-emerald-400" />
                  )}
                  {isFlagged && !isCurrent && (
                    <Flag className="absolute top-1/2 left-0 -translate-x-5 -translate-y-1/2 size-5 fill-current text-orange-400" />
                  )}
                  
                  {/* Current question indicator - purple dot on top */}
                  {isCurrent && (
                    <>
                      <div className="absolute top-1 right-1 size-2.5 rounded-full bg-gradient-to-br from-secondary to-primary shadow-lg shadow-secondary/50 animate-pulse" />
                      {isAnswered && !isFlagged && (
                        <CheckCircle2 className="absolute bottom-1/2 left-0 -translate-x-5 translate-y-1/2 size-5 text-emerald-400" />
                      )}
                      {isFlagged && (
                        <Flag className="absolute bottom-1/2 left-0 -translate-x-5 translate-y-1/2 size-5 fill-current text-orange-400" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 border-t border-border pt-6">
          <h3 className="text-sm font-bold text-foreground">Legenda:</h3>
          
          <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="size-6 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="size-3.5 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">Respondida corretamente</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="size-6 rounded-lg bg-warning flex items-center justify-center flex-shrink-0">
              <Flag className="size-3.5 text-white fill-current" />
            </div>
            <span className="text-xs text-muted-foreground">Marcada para revisão</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="size-6 rounded-lg ring-2 ring-primary bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">●</span>
            </div>
            <span className="text-xs text-muted-foreground">Questão atual</span>
          </div>
        </div>
      </div>
    </>
  );
}
