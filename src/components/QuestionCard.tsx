import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, Circle } from "lucide-react";
import { cn } from "./ui/utils";
import { Question, Alternative } from "../types/simulation";
import { Button } from "./ui/button";

interface QuestionCardProps {
  question: Question;
  totalQuestions: number;
  onSelectAnswer: (alternativeId: string) => void;
  selectedAnswer?: string | null;
  disabled?: boolean;
  showImage?: boolean;
  feedbackMode?: boolean;
  isCorrect?: boolean;
  correctAnswerId?: string;
  onRequestExplanation?: () => void;
  onNextQuestion?: () => void;
}

export function QuestionCard({
  question,
  totalQuestions,
  onSelectAnswer,
  selectedAnswer = null,
  disabled = false,
  showImage = true,
  feedbackMode = false,
  isCorrect = false,
  correctAnswerId = "",
  onRequestExplanation = () => {},
  onNextQuestion = () => {},
}: QuestionCardProps) {
  const handleSelect = (alternativeId: string) => {
    if (!disabled) {
      onSelectAnswer(alternativeId);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-card/95 p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          Questão {question.number} <span className="text-muted-foreground">de {totalQuestions}</span>
        </h3>
        <Badge variant="primary" className="text-sm px-3 py-1">
          {question.subject}
        </Badge>
      </div>

      {/* Body - Question Text */}
      <div className="text-base md:text-lg text-foreground leading-relaxed space-y-4">
        <p className="whitespace-pre-line">{question.statement}</p>
        
        {/* Optional Image */}
        {showImage && question.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-border">
            <img 
              src={question.imageUrl} 
              alt="Imagem da questão" 
              className="w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* Footer - Alternatives */}
      <div className="space-y-3">
        {question.alternatives.map((alt) => {
          const isSelected = selectedAnswer === alt.id;
          const isCorrectOption = alt.id === correctAnswerId;
          const label = alt.id.toUpperCase();

          // Determina a cor de fundo baseado no feedback mode
          let bgColor = "border-border bg-input-background hover:border-primary/50 hover:bg-primary/5";
          let iconColor = "text-muted-foreground";

          if (feedbackMode && selectedAnswer) {
            if (isSelected) {
              if (isCorrect) {
                // Resposta correta e selecionada = verde
                bgColor = "border-emerald-500 bg-emerald-100 ring-2 ring-emerald-500/30";
                iconColor = "text-emerald-600";
              } else {
                // Resposta errada e selecionada = vermelho
                bgColor = "border-red-500 bg-red-100 ring-2 ring-red-500/30";
                iconColor = "text-red-600";
              }
            } else if (isCorrectOption && !isCorrect) {
              // Mostrar a resposta correta em verde quando o usuário errou
              bgColor = "border-emerald-500 bg-emerald-100 ring-2 ring-emerald-500/30";
              iconColor = "text-emerald-600";
            }
          } else if (isSelected && !feedbackMode) {
            // Modo normal (sem feedback) - apenas destaca a seleção
            bgColor = "border-primary bg-primary/10 ring-2 ring-primary/30 shadow-lg shadow-primary/20";
            iconColor = "text-primary";
          }
          
          return (
            <button
              key={alt.id}
              onClick={() => handleSelect(alt.id)}
              disabled={disabled || feedbackMode}
              className={cn(
                "group flex items-start w-full p-5 rounded-xl border-2 transition-all duration-200 text-left",
                "hover:scale-[1.01] active:scale-[0.99]",
                bgColor,
                feedbackMode && "cursor-default",
                !feedbackMode && disabled && "opacity-70 cursor-not-allowed",
              )}
              aria-label={`Alternativa ${label}`}
            >
              <div className="flex items-center justify-center mr-4 shrink-0">
                {feedbackMode && selectedAnswer ? (
                  isSelected ? (
                    isCorrect ? (
                      <CheckCircle className={cn("size-6", iconColor)} />
                    ) : (
                      <XCircle className={cn("size-6", iconColor)} />
                    )
                  ) : isCorrectOption && !isCorrect ? (
                    <CheckCircle className={cn("size-6", iconColor)} />
                  ) : (
                    <Circle className="size-6 text-muted-foreground/30" />
                  )
                ) : isSelected ? (
                  <div className="relative">
                    <CheckCircle className={cn("size-6", iconColor)} />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
                  </div>
                ) : (
                  <Circle className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <span className={cn(
                  "font-semibold text-base leading-relaxed",
                  feedbackMode && selectedAnswer
                    ? isSelected || isCorrectOption
                      ? "text-foreground"
                      : "text-muted-foreground/60"
                    : isSelected && !feedbackMode
                      ? "text-primary"
                      : "text-foreground group-hover:text-primary transition-colors"
                )}>
                  <span className="font-black mr-2">{label}.</span>
                  {alt.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Bar - Feedback Mode */}
      {feedbackMode && selectedAnswer && (
        <div className="flex gap-3 pt-6 border-t border-border/50">
          <Button
            onClick={onRequestExplanation}
            variant="outline"
            className="flex-1 gap-2"
          >
            <span>✨</span>
            Explicar com IA
          </Button>
          <Button
            onClick={onNextQuestion}
            className="flex-1"
          >
            Próxima
          </Button>
        </div>
      )}
    </Card>
  );
}
