import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  SlidersHorizontal,
  ArrowLeft,
  Coffee,
  Timer,
  BookOpen,
  Lock,
  Zap,
  Play,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { cn } from "../components/ui/utils";

type QuestionCount = 10 | 20 | 30;
type GameMode = "training" | "real";

interface CustomizeSimulationScreenProps {
  onGenerate: (config: any) => void;
  onBack: () => void;
}

export function CustomizeSimulationScreen({ onGenerate, onBack }: CustomizeSimulationScreenProps) {
  const [questionCount, setQuestionCount] = useState<QuestionCount>(20);
  const [gameMode, setGameMode] = useState<GameMode>("training");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!gameMode) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onGenerate({
        questions: questionCount,
        mode: gameMode,
        timestamp: new Date().toISOString()
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 hover:gap-3"
          >
            <ArrowLeft className="size-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg shadow-black/20">
              <SlidersHorizontal className="size-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Personalizar Simulado</h1>
              <p className="text-white/80 text-base font-medium">Configure o treino ideal para o seu objetivo de hoje</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl relative">
        <Card className="shadow-2xl border-border/50 overflow-hidden backdrop-blur-md bg-card/95 p-8 md:p-12 space-y-12">
          
          {/* 1. Quantidade de Questões */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/30">
                <Sparkles className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Quantas questões?</h2>
                <p className="text-xs text-muted-foreground">Escolha o volume ideal para sua sessão</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count as QuestionCount)}
                  className={cn(
                    "relative py-6 md:py-8 rounded-2xl font-black text-xl transition-all duration-300 border-2 overflow-hidden group",
                    questionCount === count
                      ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-[0_0_24px_rgba(158,127,255,0.3)]"
                      : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <span className="relative z-10 flex flex-col items-center justify-center gap-2">
                    {count}
                    {questionCount === count && (
                      <CheckCircle2 className="size-5 text-primary animate-pulse" />
                    )}
                  </span>
                  {questionCount === count && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* 2. Modo de Tempo - Selection Cards */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl border border-secondary/30">
                <Timer className="size-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Modo de Tempo</h2>
                <p className="text-xs text-muted-foreground">Escolha como deseja treinar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Modo Treino (Zen) */}
              <div
                onClick={() => setGameMode("training")}
                className={cn(
                  "relative group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                  gameMode === "training"
                    ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-transparent shadow-lg shadow-emerald-500/20"
                    : "border-border bg-muted/20 hover:border-emerald-500/30 hover:bg-muted/40"
                )}
              >
                {/* Gradient Background on Hover */}
                {gameMode === "training" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-100 transition-opacity" />
                )}

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={cn(
                      "p-4 rounded-2xl transition-all duration-300",
                      gameMode === "training"
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-muted text-muted-foreground group-hover:bg-emerald-500/20"
                    )}
                  >
                    <Coffee className="size-6" />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className={cn(
                      "text-xl font-black transition-colors duration-300",
                      gameMode === "training" ? "text-emerald-400" : "text-foreground"
                    )}>
                      Modo Treino
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      Sem pressão de tempo. Responda e veja o gabarito na hora.
                    </p>
                  </div>

                  {gameMode === "training" && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center justify-center size-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                    </div>
                  )}
                </div>
              </div>

              {/* Modo Real (Hardcore) */}
              <div
                onClick={() => setGameMode("real")}
                className={cn(
                  "relative group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                  gameMode === "real"
                    ? "border-primary/50 bg-gradient-to-br from-primary/10 to-transparent shadow-lg shadow-primary/20"
                    : "border-border bg-muted/20 hover:border-primary/30 hover:bg-muted/40"
                )}
              >
                {/* Gradient Background on Hover */}
                {gameMode === "real" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-100 transition-opacity" />
                )}

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={cn(
                      "p-4 rounded-2xl transition-all duration-300",
                      gameMode === "real"
                        ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/20"
                    )}
                  >
                    <Zap className="size-6" />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className={cn(
                      "text-xl font-black transition-colors duration-300",
                      gameMode === "real" ? "text-primary" : "text-foreground"
                    )}>
                      Simulado Real
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      Com cronômetro oficial. Simulação real de prova.
                    </p>
                  </div>

                  {gameMode === "real" && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center justify-center size-3 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Disciplinas - Bloqueado com "Em Breve" */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl border border-accent/30">
                <BookOpen className="size-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Filtros de Matéria</h2>
                <p className="text-xs text-muted-foreground">Personalize por disciplina</p>
              </div>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-border bg-muted/20">
              {/* Conteúdo da Disciplina - Bloqueado com opacidade */}
              <div className="p-6 flex flex-wrap gap-3 opacity-40">
                {["Português", "Direito", "Raciocínio Lógico"].map((discipline) => (
                  <Badge key={discipline} variant="outline" className="px-4 py-2.5 text-sm font-semibold">
                    {discipline}
                  </Badge>
                ))}
              </div>

              {/* Overlay Bloqueio Centralizado */}
              <div className="absolute inset-0 backdrop-blur-sm bg-background/70 flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-3 translate-y-2">
                  <div className="p-3 bg-muted rounded-full">
                    <Lock className="size-6 text-muted-foreground" />
                  </div>
                  <Badge variant="warning" className="gap-2 px-4 py-2 text-sm font-bold">
                    <span>EM BREVE</span>
                  </Badge>
                  <p className="text-xs text-muted-foreground text-center font-medium">
                    Feature premium em desenvolvimento
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Call-to-Action Button */}
          <div className="pt-6 border-t border-border/50">
            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={isLoading}
              className={cn(
                "w-full h-14 md:h-16 text-lg md:text-xl font-black rounded-2xl",
                "bg-gradient-to-r from-primary via-purple-500 to-secondary",
                "hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]",
                "active:scale-95",
                "transition-all duration-300 gap-3",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {!isLoading && <Play className="size-6 fill-current" />}
              {isLoading ? "Gerando seu simulado..." : "Começar Simulado"}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
              Duração estimada: {questionCount === 10 ? "10-15 min" : questionCount === 20 ? "20-30 min" : "40-50 min"}
            </p>
          </div>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-medium">
            ✨ Seu desempenho será salvo automaticamente
          </p>
        </div>
      </div>
    </div>
  );
}
