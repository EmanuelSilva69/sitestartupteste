import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, XCircle, Zap, Sparkles, Timer, Gauge, BarChart3 } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { fluidText } from "../../lib/fluid-typography";
import { mockAttempts } from "../../data/mockDashboard";
import type { SimuladoAttempt, QuestionResult } from "../../types/dashboard";

interface DetalheTentativaProps {
  attemptId: string;
  onBack: () => void;
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

function formatSeconds(seconds: number): string {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
  return `${seconds}s`;
}

function getAttempt(id: string): SimuladoAttempt {
  return mockAttempts.find((a) => a.id === id) || mockAttempts[0];
}

export function DetalheTentativa({ attemptId, onBack }: DetalheTentativaProps) {
  const attempt = getAttempt(attemptId);

  const timePerArea = attempt.areas.map((area) => ({
    name: area.name,
    time: area.timeSpent,
    avgTime: area.averageTime,
    ratio: ((area.timeSpent - area.averageTime) / area.averageTime) * 100,
  }));

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
            <div>
              <h1 style={fluidText['3xl']} className="font-bold text-foreground tracking-tight">
                {attemptId}
              </h1>
              <p className="text-foreground/90 text-base">Análise detalhada de tempo e acertos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl relative">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2">
          <ArrowLeft className="size-4 mr-2" />
          Voltar ao Histórico
        </Button>

        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="bg-gradient-to-br from-card/95 to-card border-0 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                  <Badge variant={attempt.status === 'approved' ? 'success' : 'warning'} className="text-base px-5 py-1.5">
                    {attempt.status === 'approved' ? 'Aprovado' : 'Abaixo da Meta'}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Nota</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {attempt.score}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1"><Timer className="size-3" /> Tempo Total</p>
                  <p className="text-2xl font-black text-foreground flex items-center gap-2">
                    <Clock className="size-5 text-primary" />
                    {formatTime(attempt.totalTime)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Time Analysis by Area */}
          <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <Gauge className="size-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Tempo por Área de Conhecimento
                </h2>
              </div>

              <div className="grid gap-6">
                {timePerArea.map((area) => {
                  const barWidth = Math.min(Math.abs(area.ratio), 100);
                  const isSlow = area.ratio > 10;

                  return (
                    <div key={area.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="size-4 text-primary" />
                          <span className="font-bold text-foreground">{area.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {formatSeconds(area.time)} / {formatSeconds(area.avgTime)}
                          </span>
                          {isSlow && (
                            <Badge variant="warning" className="flex items-center gap-1">
                              <Clock className="size-3" />
                              Lento
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="h-4 bg-muted/50 rounded-full overflow-hidden border border-border/50 relative">
                        <div
                          className="h-full rounded-full transition-all duration-1000 shadow-lg"
                          style={{
                            width: `${barWidth}%`,
                            background: isSlow
                              ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                              : 'linear-gradient(90deg, #10b981, #34d399)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Questions List */}
          <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl relative overflow-hidden">
            <div className="p-8 relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <BarChart3 className="size-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Status das Questões
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {attempt.questions.slice(0, 40).map((q) => (
                  <div
                    key={q.id}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      !q.correct
                        ? 'bg-red-500/10 border-red-500/30'
                        : q.isSlow
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-emerald-500/10 border-emerald-500/30'
                    }`}
                  >
                    <p className="text-sm font-bold text-foreground mb-1">Q{q.id}</p>
                    <div className="flex items-center justify-center gap-1">
                      {!q.correct ? (
                        <XCircle className="size-4 text-red-500" />
                      ) : q.isSlow ? (
                        <Clock className="size-4 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      )}
                      <span className="text-xs text-muted-foreground">{formatSeconds(q.timeSpent)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-6 justify-center text-sm">
                <span className="flex items-center gap-1"><CheckCircle2 className="size-4 text-emerald-500" /> Correto</span>
                <span className="flex items-center gap-1"><Clock className="size-4 text-amber-500" /> Lento</span>
                <span className="flex items-center gap-1"><XCircle className="size-4 text-red-500" /> Errado</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
