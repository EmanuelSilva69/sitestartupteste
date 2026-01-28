import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ListOrdered,
  Clock,
  BookOpen,
  Settings,
  Play,
  ArrowLeft,
  Coffee,
  Timer,
  CheckCircle2
} from "lucide-react";
import { cn } from "../components/ui/utils";

type QuestionCount = 10 | 20 | 30;
type TimeMode = "zen" | "pressure";
type Discipline = "Português" | "Direito" | "Raciocínio Lógico";

interface CustomizeSimulationScreenProps {
  onGenerate: (config: any) => void;
  onBack: () => void;
}

export function CustomizeSimulationScreen({ onGenerate, onBack }: CustomizeSimulationScreenProps) {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<QuestionCount>(20);
  const [selectedTimeMode, setSelectedTimeMode] = useState<TimeMode>("zen");
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(["Português"]);
  const [isLoading, setIsLoading] = useState(false);

  const availableDisciplines: Discipline[] = ["Português", "Direito", "Raciocínio Lógico"];

  const toggleDiscipline = (discipline: Discipline) => {
    setSelectedDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline],
    );
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      onGenerate({
        count: selectedQuestionCount,
        mode: selectedTimeMode,
        disciplines: selectedDisciplines
      });
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      
      <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary shadow-2xl">
        <div className="container mx-auto px-6 py-10 relative">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white/70 hover:text-white hover:bg-white/10 mb-6 -ml-2 transition-all"
          >
            <ArrowLeft className="size-4 mr-2" /> Voltar ao Início
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
              <Settings className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Configurar Simulado</h1>
              <p className="text-white/70 text-sm font-medium">Personalize sua experiência de estudo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-3xl relative">
        <Card className="shadow-2xl border-border/50 overflow-hidden backdrop-blur-md bg-card/80 p-8 space-y-10">
          
          {/* Quantidade de Questões */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-3">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <ListOrdered className="size-5 text-primary" />
              </div>
              Volume de Questões
            </h2>
            <div className="flex gap-4">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedQuestionCount(count as QuestionCount)}
                  className={cn(
                    "flex-1 h-16 rounded-2xl text-lg font-bold transition-all duration-300 border-2 flex items-center justify-center gap-2",
                    selectedQuestionCount === count 
                      ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(158,127,255,0.2)]" 
                      : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {count}
                  {selectedQuestionCount === count && <CheckCircle2 className="size-4" />}
                </button>
              ))}
            </div>
          </section>

          {/* Modo de Tempo com Ícones */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-3">
              <div className="p-1.5 bg-secondary/10 rounded-lg">
                <Clock className="size-5 text-secondary" />
              </div>
              Modo de Tempo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Modo Zen */}
              <div
                onClick={() => setSelectedTimeMode("zen")}
                className={cn(
                  "group relative p-5 cursor-pointer border-2 rounded-2xl transition-all duration-300 flex items-center gap-4 overflow-hidden",
                  selectedTimeMode === "zen" 
                    ? "border-primary bg-primary/5 shadow-lg" 
                    : "border-border bg-muted/20 hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "p-4 rounded-xl transition-colors duration-300",
                  selectedTimeMode === "zen" ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/20"
                )}>
                  <Coffee className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className={cn("font-bold text-lg", selectedTimeMode === "zen" ? "text-primary" : "text-foreground")}>
                    Modo Zen
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Foco total no aprendizado, sem cronômetro.
                  </p>
                </div>
                {selectedTimeMode === "zen" && (
                  <div className="absolute top-2 right-2">
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              {/* Modo Pressão */}
              <div
                onClick={() => setSelectedTimeMode("pressure")}
                className={cn(
                  "group relative p-5 cursor-pointer border-2 rounded-2xl transition-all duration-300 flex items-center gap-4 overflow-hidden",
                  selectedTimeMode === "pressure" 
                    ? "border-secondary bg-secondary/5 shadow-lg" 
                    : "border-border bg-muted/20 hover:border-secondary/30"
                )}
              >
                <div className={cn(
                  "p-4 rounded-xl transition-colors duration-300",
                  selectedTimeMode === "pressure" ? "bg-secondary text-white" : "bg-muted text-muted-foreground group-hover:bg-secondary/20"
                )}>
                  <Timer className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className={cn("font-bold text-lg", selectedTimeMode === "pressure" ? "text-secondary" : "text-foreground")}>
                    Modo Pressão
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Simule o dia da prova com tempo limite.
                  </p>
                </div>
                {selectedTimeMode === "pressure" && (
                  <div className="absolute top-2 right-2">
                    <div className="size-2 bg-secondary rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Matérias */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-3">
              <div className="p-1.5 bg-accent/10 rounded-lg">
                <BookOpen className="size-5 text-accent" />
              </div>
              Disciplinas
            </h2>
            <div className="flex flex-wrap gap-3">
              {availableDisciplines.map((d) => (
                <Badge
                  key={d}
                  variant={selectedDisciplines.includes(d) ? "accent" : "outline"}
                  onClick={() => toggleDiscipline(d)}
                  className={cn(
                    "cursor-pointer px-5 py-2.5 text-sm font-semibold transition-all rounded-xl border-2",
                    selectedDisciplines.includes(d) 
                      ? "bg-accent/20 border-accent text-accent shadow-md" 
                      : "hover:border-accent/50"
                  )}
                >
                  {d}
                </Badge>
              ))}
            </div>
          </section>

          {/* Botão de Ação */}
          <Button
            onClick={handleGenerate}
            isLoading={isLoading}
            disabled={selectedDisciplines.length === 0}
            className="w-full h-16 text-xl rounded-2xl bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] active:scale-[0.98] transition-all font-black shadow-xl shadow-primary/20"
          >
            <Play className="size-6 mr-3 fill-current" /> INICIAR SIMULADO
          </Button>
        </Card>
      </div>
    </div>
  );
}
