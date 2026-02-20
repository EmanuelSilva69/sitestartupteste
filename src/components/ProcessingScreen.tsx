import { useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { ProfileCardSkeleton } from "./ui/skeleton";
import { fluidText } from "../lib/fluid-typography";

interface ProcessingScreenProps {
  inscription: string;
  onComplete: () => void;
}

export function ProcessingScreen({ inscription, onComplete }: ProcessingScreenProps) {
  useEffect(() => {
    console.log("ProcessingScreen mounted, inscription:", inscription);
    
    const timer = setTimeout(() => {
      console.log("Processing complete, calling onComplete");
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [inscription, onComplete]);

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
      
      {/* Header */}
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
          <p className="text-foreground/90 text-base ml-14">
            Portal de Desempenho e Análise
          </p>
        </div>
      </div>

      {/* Loading Content */}
      <div className="container mx-auto px-6 py-24 max-w-2xl relative">
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
          
          <div className="p-12 relative space-y-6">
            {/* Title and Description */}
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

            {/* Profile Skeleton Cards */}
            <div className="space-y-4">
              <ProfileCardSkeleton />
              <ProfileCardSkeleton />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
