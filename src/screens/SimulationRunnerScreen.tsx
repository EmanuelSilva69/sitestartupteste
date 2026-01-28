import React, { useState, useEffect, useCallback, useRef } from "react";
import { Question, Answer, SimulationConfig } from "../types/simulation";
import { QuestionCard } from "../components/QuestionCard";
import { QuestionNavigator } from "../components/game/QuestionNavigator";
import { AIExplanationModal } from "../components/AIExplanationModal";
import { SimuladoTimer } from "../components/SimuladoTimer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Pause,
  Flag,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  AlertCircle,
  Home
} from "lucide-react";
import { cn } from "../components/ui/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

interface SimulationRunnerScreenProps {
  questions: Question[];
  config: SimulationConfig;
  onPause: () => void;
  onExit: () => void;
  onReview: () => void;
  onSubmit: () => void;
  onUpdateAnswers: (answers: Answer[]) => void;
  initialQuestionIndex?: number;
}

const STORAGE_KEY = "startplay_simulation_state";

export function SimulationRunnerScreen({
  questions,
  config,
  onPause,
  onExit,
  onReview,
  onSubmit,
  onUpdateAnswers,
  initialQuestionIndex = 0
}: SimulationRunnerScreenProps) {
  // Initialize answers
  const [answers, setAnswers] = useState<Answer[]>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp === config.timestamp) {
          return parsed.answers;
        }
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    // Initialize empty answers
    return questions.map(q => ({
      questionId: q.id,
      selectedAlternative: null,
      flaggedForReview: false
    }));
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp === config.timestamp) {
          return parsed.currentQuestionIndex || 0;
        }
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return initialQuestionIndex;
  });

  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showMapTest, setShowMapTest] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(
    config.mode === "real" ? 180 * questions.length : undefined // 3 min per question for real mode
  );
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [showAIExplanation, setShowAIExplanation] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  // Sync question index when coming back from review
  useEffect(() => {
    if (initialQuestionIndex !== currentQuestionIndex) {
      setCurrentQuestionIndex(initialQuestionIndex);
      mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [initialQuestionIndex]);

  // Auto-save to localStorage
  useEffect(() => {
    const state = {
      answers,
      currentQuestionIndex,
      timestamp: config.timestamp
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    
    // Notify parent component about answers update
    onUpdateAnswers(answers);
  }, [answers, currentQuestionIndex, config.timestamp, onUpdateAnswers]);

  // Timer countdown for real mode
  useEffect(() => {
    if (config.mode === "real" && timeRemaining !== undefined && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev: number | undefined) => {
          if (prev === undefined || prev <= 1) {
            // Time's up - auto submit
            clearInterval(timer);
            onSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [config.mode, timeRemaining, onSubmit]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "f":
        case "F":
          e.preventDefault();
          handleToggleFlag();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestionIndex, answers]);

  const handleSelectAnswer = useCallback((alternativeId: string) => {
    setAnswers((prev: Answer[]) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = {
        ...newAnswers[currentQuestionIndex],
        selectedAlternative: alternativeId
      };
      return newAnswers;
    });
    
    // Entrar no modo feedback após selecionar
    if (config.mode === "training") {
      setFeedbackMode(true);
    }
  }, [currentQuestionIndex, config.mode]);

  const handleToggleFlag = useCallback(() => {
    setAnswers((prev: Answer[]) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = {
        ...newAnswers[currentQuestionIndex],
        flaggedForReview: !newAnswers[currentQuestionIndex].flaggedForReview
      };
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    setFeedbackMode(false);
    setShowAIExplanation(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Last question - go to review
      onReview();
    }
  }, [currentQuestionIndex, questions.length, onReview]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev: number) => prev - 1);
      mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentQuestionIndex]);

  const handleNavigate = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
    mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleExitClick = () => {
    setShowExitDialog(true);
  };

  const handleConfirmExit = () => {
    // Clear saved state
    localStorage.removeItem(STORAGE_KEY);
    onExit();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFlagged = currentAnswer?.flaggedForReview || false;

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Fixed Header */}
      <header className="bg-card border-b border-border shadow-lg z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Exit Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExitClick}
            className="text-muted-foreground hover:text-destructive gap-2"
          >
            <Home className="size-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>

          {/* Center: Timer (Real mode only) */}
          <div className="flex-1 flex justify-center">
            {config.mode === "real" && timeRemaining !== undefined && (
              <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                <SimuladoTimer
                  initialTimeInSeconds={timeRemaining}
                  onTimeEnd={onSubmit}
                />
              </div>
            )}
          </div>

          {/* Right: Progress & Grid */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:flex gap-2 px-3 py-1.5">
              <span className="font-bold text-primary">{currentQuestionIndex + 1}</span>
              <span className="text-muted-foreground">de</span>
              <span className="font-bold">{questions.length}</span>
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log("Abrindo mapa...");
                setIsNavigatorOpen(true);
              }}
              className="gap-2"
            >
              <Grid3x3 className="size-4" />
              <span className="hidden sm:inline">Mapa</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main
        ref={mainContentRef}
        className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-muted/5 to-background"
      >
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <QuestionCard
            question={currentQuestion}
            totalQuestions={questions.length}
            onSelectAnswer={handleSelectAnswer}
            selectedAnswer={currentAnswer?.selectedAlternative}
            feedbackMode={feedbackMode}
            isCorrect={currentQuestion.correctAnswer ? currentAnswer?.selectedAlternative === currentQuestion.correctAnswer : false}
            correctAnswerId={currentQuestion.correctAnswer || ""}
            onRequestExplanation={() => setShowAIExplanation(true)}
            onNextQuestion={handleNext}
          />
        </div>
      </main>

      {/* Fixed Footer (Actions) */}
      <footer className={cn("bg-card border-t border-border shadow-2xl z-40", feedbackMode && "hidden")}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 sm:flex-none h-12 gap-2"
            >
              <ChevronLeft className="size-5" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>

            {/* Flag Button */}
            <Button
              variant={isFlagged ? "default" : "outline"}
              onClick={handleToggleFlag}
              className={cn(
                "h-12 gap-2 flex-1 sm:flex-none",
                isFlagged && "bg-warning hover:bg-warning/90 text-white"
              )}
              title="Marcar para revisão (Tecla F)"
            >
              <Flag className={cn("size-5", isFlagged && "fill-current")} />
              <span className="hidden md:inline">
                {isFlagged ? "Marcada" : "Marcar"}
              </span>
            </Button>

            {/* Next/Review Button */}
            <Button
              onClick={handleNext}
              className={cn(
                "flex-1 sm:flex-none h-12 gap-2",
                isLastQuestion
                  ? "bg-gradient-to-r from-primary via-purple-500 to-secondary hover:shadow-xl"
                  : ""
              )}
            >
              <span className="hidden sm:inline">
                {isLastQuestion ? "Revisar e Entregar" : "Próxima"}
              </span>
              <span className="sm:hidden">
                {isLastQuestion ? "Revisar" : "Próx"}
              </span>
              {!isLastQuestion && <ChevronRight className="size-5" />}
            </Button>
          </div>

          {/* Mobile Progress Indicator */}
          <div className="sm:hidden mt-3 flex justify-center">
            <Badge variant="outline" className="gap-2 px-3 py-1.5">
              <span className="font-bold text-primary">{currentQuestionIndex + 1}</span>
              <span className="text-muted-foreground">de</span>
              <span className="font-bold">{questions.length}</span>
            </Badge>
          </div>
        </div>
      </footer>

      {/* Question Navigator Sheet */}
      <QuestionNavigator
        questions={questions}
        answers={answers}
        currentQuestionIndex={currentQuestionIndex}
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* AI Explanation Modal */}
      <AIExplanationModal
        isOpen={showAIExplanation}
        onClose={() => setShowAIExplanation(false)}
        question={currentQuestion.statement}
        correctAnswer={
          currentQuestion.alternatives.find(
            alt => alt.id === currentQuestion.correctAnswer
          )?.text || "N/A"
        }
        selectedAnswer={
          currentQuestion.alternatives.find(
            alt => alt.id === currentAnswer.selectedAlternative
          )?.text || "N/A"
        }
        isCorrect={currentAnswer.selectedAlternative === currentQuestion.correctAnswer}
      />

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-warning" />
              Sair do Simulado?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Seu progresso será perdido se você sair agora. 
              {config.mode === "real" && " O tempo continuará correndo se você voltar."}
              <br /><br />
              Tem certeza que deseja sair?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmExit}
              className="bg-destructive hover:bg-destructive/90"
            >
              Sim, sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Test Dialog para o Mapa */}
      <AlertDialog open={showMapTest} onOpenChange={setShowMapTest}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Teste: Mapa está funcionando!</AlertDialogTitle>
            <AlertDialogDescription>Este é um diálogo de teste para verificar se os diálogos estão funcionando corretamente.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
