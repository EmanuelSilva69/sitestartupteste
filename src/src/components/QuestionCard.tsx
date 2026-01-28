import React, { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "./ui/utils";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  discipline: string;
  questionText: string;
  alternatives: string[];
  onSelectAnswer: (selectedAnswer: string) => void;
  selectedAnswer?: string | null;
  disabled?: boolean;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  discipline,
  questionText,
  alternatives,
  onSelectAnswer,
  selectedAnswer = null,
  disabled = false,
}: QuestionCardProps) {
  const handleSelect = (answer: string) => {
    if (!disabled) {
      onSelectAnswer(answer);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-card/95 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          Questão {questionNumber} <span className="text-muted-foreground">de {totalQuestions}</span>
        </h3>
        <Badge variant="primary" className="text-sm px-3 py-1">
          {discipline}
        </Badge>
      </div>

      {/* Body - Question Text */}
      <div className="text-lg text-foreground leading-relaxed">
        <p>{questionText}</p>
      </div>

      {/* Footer - Alternatives */}
      <div className="space-y-4">
        {alternatives.map((alt, index) => {
          const isSelected = selectedAnswer === alt;
          return (
            <button
              key={index}
              onClick={() => handleSelect(alt)}
              disabled={disabled}
              className={cn(
                "flex items-center w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                "bg-input-background text-foreground hover:bg-input/50",
                isSelected
                  ? "border-primary ring-2 ring-primary/50 shadow-lg shadow-primary/20"
                  : "border-border hover:border-primary/50",
                disabled && "opacity-70 cursor-not-allowed",
              )}
            >
              {isSelected ? (
                <CheckCircle className="size-6 text-primary mr-3 shrink-0" />
              ) : (
                <Circle className="size-6 text-muted-foreground mr-3 shrink-0" />
              )}
              <span className="font-medium text-base flex-1">{String.fromCharCode(65 + index)}. {alt}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
