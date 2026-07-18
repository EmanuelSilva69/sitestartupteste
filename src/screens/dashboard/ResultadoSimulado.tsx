import { ArrowLeft, Trophy, Clock, TrendingUp, Zap, Target, Sparkles, ChevronRight, BarChart3, Timer } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { fluidText } from "../../lib/fluid-typography";
import { latestAttempt } from "../../data/mockDashboard";

interface ResultadoSimuladoProps {
  onBack: () => void;
  onViewHistory: () => void;
  onViewDetails: () => void;
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

export function ResultadoSimulado({ onBack, onViewHistory, onViewDetails }: ResultadoSimuladoProps) {
  const attempt = latestAttempt;
  const scoreColor = attempt.score >= 80 ? 'emerald' : attempt.score >= 65 ? 'amber' : 'red';

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--primary)_0%,transparent_70%)] opacity-15" />

      <div className="relative bg-gradient-to-r from-primary via-primary-light to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L2JhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles className="size-8 text-foreground" />
            </div>
            <h1 style={fluidText['3xl']} className="font-bold text-foreground tracking-tight">
              Resultado do Simulado
            </h1>
          </div>
          <p className="text-foreground/90 text-base ml-14">
            Seu desempenho completo nesta prova
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-5xl relative">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2">
          <ArrowLeft className="size-4 mr-2" />
          Voltar
        </Button>

        <div className="space-y-6">
          {/* Score Card */}
          <Card className="bg-gradient-to-br from-card/95 to-card border-0 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Trophy className="size-4 text-primary" />
                    Nota Final
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`text-7xl md:text-8xl font-black bg-gradient-to-r from-${scoreColor}-500 to-${scoreColor}-600 bg-clip-text text-transparent`}>
                      {attempt.score}%
                    </span>
                    {attempt.score >= 80 && <TrendingUp className="size-8 text-emerald-500" strokeWidth={3} />}
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Tempo Total</p>
                    <div className="flex items-center gap-2">
                      <Clock className="size-5 text-primary" />
                      <span className="text-2xl font-black text-foreground">{formatTime(attempt.totalTime)}</span>
                    </div>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Tempo Médio</p>
                    <div className="flex items-center gap-2">
                      <Timer className="size-5 text-muted-foreground" />
                      <span className="text-2xl font-black text-foreground">{formatTime(attempt.averageTime)}</span>
                    </div>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                    <Badge variant={attempt.status === 'approved' ? 'success' : 'warning'} className="text-base px-4 py-1.5">
                      {attempt.status === 'approved' ? 'Aprovado' : 'Abaixo da Meta'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Distribution by Area */}
          <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <BarChart3 className="size-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Acertos por Área
                </h2>
              </div>

              <div className="grid gap-5">
                {attempt.areas.map((area) => {
                  const pct = (area.correct / area.total) * 100;
                  return (
                    <div key={area.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="size-4 text-primary" />
                          <span className="font-bold text-foreground">{area.name}</span>
                        </div>
                        <span className="text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {area.correct}/{area.total} ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-3 bg-muted/50 rounded-full overflow-hidden border border-border/50">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-1000 shadow-lg"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time Insight */}
              <div className="mt-8 p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Clock className="size-6 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-base mb-1">Análise de Tempo</p>
                    <p className="text-sm text-muted-foreground">
                      Você concluiu a prova {attempt.totalTime < attempt.averageTime ? `${attempt.averageTime - attempt.totalTime} minutos mais rápido` : `${attempt.totalTime - attempt.averageTime} minutos mais lento`} que a média esperada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={onViewHistory} className="rounded-full px-8 h-12 text-base border-2 border-border hover:bg-muted/50 font-semibold">
              <BarChart3 className="size-4 mr-2" />
              Histórico de Simulados
            </Button>
            <Button onClick={onViewDetails} className="rounded-full px-10 h-12 text-base shadow-2xl bg-gradient-to-r from-primary via-primary-light to-secondary hover:shadow-primary/40 font-bold">
              Ver Detalhes do Simulado
              <ChevronRight className="size-5 ml-1" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
