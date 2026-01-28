import React from "react";
import { Answer, Question } from "../types/simulation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  AlertCircle, 
  CheckCircle2, 
  Flag, 
  ArrowLeft,
  Send,
  Clock
} from "lucide-react";
import { cn } from "../components/ui/utils";

interface ReviewSubmissionScreenProps {
  questions: Question[];
  answers: Answer[];
  onNavigateToQuestion: (index: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  timeRemaining?: number;
}

export function ReviewSubmissionScreen({
  questions,
  answers,
  onNavigateToQuestion,
  onSubmit,
  onBack,
  timeRemaining
}: ReviewSubmissionScreenProps) {
  const stats = {
    total: questions.length,
    answered: answers.filter(a => a.selectedAlternative !== null).length,
    unanswered: answers.filter(a => a.selectedAlternative === null).length,
    flagged: answers.filter(a => a.flaggedForReview).length
  };

  const unansweredQuestions = questions.filter((_, index) => 
    answers[index]?.selectedAlternative === null
  );

  const flaggedQuestions = questions.filter((_, index) => 
    answers[index]?.flaggedForReview === true
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary shadow-2xl shadow-primary/20">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 hover:gap-3"
          >
            <ArrowLeft className="size-5" />
            <span className="text-sm font-medium">Voltar para prova</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Revisar e Entregar</h1>
              <p className="text-white/80 text-base font-medium mt-2">
                Confira suas respostas antes de finalizar
              </p>
            </div>
            {timeRemaining !== undefined && (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center gap-3">
                <Clock className="size-6 text-white" />
                <div className="text-right">
                  <div className="text-xs text-white/70 font-medium">Tempo Restante</div>
                  <div className="text-2xl font-black text-white">{formatTime(timeRemaining)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl relative">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-card border-border/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <CheckCircle2 className="size-6 text-emerald-500" />
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-500">{stats.answered}</div>
                <div className="text-sm text-muted-foreground font-medium">Respondidas</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/20 rounded-xl">
                <AlertCircle className="size-6 text-destructive" />
              </div>
              <div>
                <div className="text-3xl font-black text-destructive">{stats.unanswered}</div>
                <div className="text-sm text-muted-foreground font-medium">Não respondidas</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/20 rounded-xl">
                <Flag className="size-6 text-warning" />
              </div>
              <div>
                <div className="text-3xl font-black text-warning">{stats.flagged}</div>
                <div className="text-sm text-muted-foreground font-medium">Marcadas</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Warnings & Pending Items */}
        {(stats.unanswered > 0 || stats.flagged > 0) && (
          <Card className="p-8 bg-card border-border/50 shadow-xl mb-8">
            <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
              <AlertCircle className="size-6 text-warning" />
              Pendências
            </h2>

            {/* Unanswered Questions */}
            {stats.unanswered > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                  <AlertCircle className="size-5" />
                  Questões não respondidas ({stats.unanswered})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {unansweredQuestions.map((question) => {
                    const index = questions.findIndex(q => q.id === question.id);
                    return (
                      <button
                        key={question.id}
                        onClick={() => onNavigateToQuestion(index)}
                        className="px-4 py-3 bg-destructive/10 border-2 border-destructive/30 rounded-xl font-bold text-destructive hover:bg-destructive/20 hover:scale-105 transition-all"
                      >
                        {question.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flagged Questions */}
            {stats.flagged > 0 && (
              <div>
                <h3 className="text-lg font-bold text-warning mb-4 flex items-center gap-2">
                  <Flag className="size-5" />
                  Questões marcadas para revisão ({stats.flagged})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {flaggedQuestions.map((question) => {
                    const index = questions.findIndex(q => q.id === question.id);
                    return (
                      <button
                        key={question.id}
                        onClick={() => onNavigateToQuestion(index)}
                        className="px-4 py-3 bg-warning/10 border-2 border-warning/30 rounded-xl font-bold text-warning hover:bg-warning/20 hover:scale-105 transition-all"
                      >
                        {question.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Success Message */}
        {stats.unanswered === 0 && stats.flagged === 0 && (
          <Card className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/30 shadow-xl mb-8">
            <div className="flex items-center gap-4 text-emerald-500">
              <CheckCircle2 className="size-12" />
              <div>
                <h3 className="text-2xl font-black">Tudo pronto!</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Você respondeu todas as questões. Pode finalizar quando quiser!
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-14 text-lg font-bold rounded-xl"
          >
            <ArrowLeft className="size-5 mr-2" />
            Continuar Respondendo
          </Button>

          <Button
            onClick={onSubmit}
            className={cn(
              "flex-1 h-14 text-lg font-bold rounded-xl",
              "bg-gradient-to-r from-primary via-purple-500 to-secondary",
              "hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]",
              "active:scale-95 transition-all duration-300"
            )}
          >
            <Send className="size-5 mr-2" />
            Finalizar Simulado
          </Button>
        </div>

        {/* Warning Message */}
        {stats.unanswered > 0 && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
            <p className="text-sm text-center text-destructive font-medium">
              ⚠️ Atenção: Você ainda tem {stats.unanswered} questão(ões) sem resposta. 
              Questões não respondidas serão consideradas erradas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
