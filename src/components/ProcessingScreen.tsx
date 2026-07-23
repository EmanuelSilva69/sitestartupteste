import { useEffect, useState, useRef } from "react";
import { Loader2, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ProfileCardSkeleton } from "./ui/skeleton";
import { fluidText } from "../lib/fluid-typography";
import { cn } from "./ui/utils";

interface ProcessingScreenProps {
  inscription: string;
  onComplete: () => void;
  onError?: () => void;
}

export function ProcessingScreen({ inscription, onComplete, onError }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'processing' | 'error' | 'timeout'>('processing');
  const [statusText, setStatusText] = useState("Preparando ambiente...");
  const progressRef = useRef(0);

  useEffect(() => {
    const stages = [
      { at: 15, text: "Baixando gabarito..." },
      { at: 30, text: "Analisando questões..." },
      { at: 50, text: "Comparando respostas..." },
      { at: 70, text: "Calculando métricas..." },
      { at: 85, text: "Gerando relatório..." },
      { at: 100, text: "Pronto!" },
    ];

    const interval = setInterval(() => {
      progressRef.current += Math.random() * 8 + 2;
      const val = Math.min(progressRef.current, 100);
      setProgress(val);

      const currentStage = stages.filter(s => val >= s.at).pop();
      if (currentStage) setStatusText(currentStage.text);

      if (val >= 100) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 400);

    // Safety timeout
    const safety = setTimeout(() => {
      if (progressRef.current < 100) {
        clearInterval(interval);
        setStage('timeout');
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, [onComplete, onError]);

  const handleRetry = () => {
    progressRef.current = 0;
    setProgress(0);
    setStage('processing');
    setStatusText("Preparando ambiente...");
  };

  if (stage === 'error' || stage === 'timeout') {
    return (
      <div className="min-h-screen w-full bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
        <div className="relative bg-gradient-to-r from-primary to-secondary shadow-2xl shadow-primary/20">
          <div className="container mx-auto px-6 py-8 relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Sparkles className="size-8 text-foreground" />
              </div>
              <h1 style={fluidText['3xl']} className="font-bold text-foreground tracking-tight">
                Startplay Simulados
              </h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-24 max-w-2xl relative">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full blur-3xl" />
            <div className="p-12 relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-rose-500/30 rounded-full blur-2xl" />
                  <div className="relative bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-8 shadow-2xl shadow-red-500/30">
                    <AlertCircle className="size-20 text-white" strokeWidth={2} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent mb-4">
                  {stage === 'timeout' ? 'Tempo Excedido' : 'Erro ao Processar'}
                </h2>
                <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
                  {stage === 'timeout'
                    ? 'O processamento está demorando mais que o esperado. Verifique sua conexão e tente novamente.'
                    : 'Não foi possível processar os resultados do simulado. O arquivo pode estar corrompido ou em formato não suportado.'}
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={onError || handleRetry}
                    className="rounded-full px-8 h-12 text-base border-2"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={handleRetry}
                    className="rounded-full px-8 h-12 text-base gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-primary/40"
                  >
                    <RefreshCw className="size-4" />
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
      <div className="relative bg-gradient-to-r from-primary to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L2JhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles className="size-8 text-foreground" />
            </div>
            <h1 style={fluidText['3xl']} className="font-bold text-foreground tracking-tight">
              Startplay Simulados
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24 max-w-2xl relative">
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
          <div className="p-12 relative space-y-6">
            <div className="text-center mb-8">
              <h2 style={fluidText['2xl']} className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Analisando seu Desempenho
              </h2>
              <p style={fluidText.base} className="text-muted-foreground max-w-md mx-auto mb-4">
                Aguarde enquanto processamos os resultados do seu simulado.
              </p>
              <div className="flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-3 rounded-full backdrop-blur-sm border border-primary/30 inline-flex mx-auto">
                <Sparkles className="size-5 text-primary" />
                <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {inscription}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">{statusText}</span>
                <span className="font-bold text-primary">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-muted/50 rounded-full overflow-hidden border border-border/50">
                <div
                  className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-300 shadow-lg shadow-primary/20"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Skeleton Cards (background loading simulation) */}
            <div className="space-y-4 mt-8">
              <ProfileCardSkeleton />
              <ProfileCardSkeleton />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
