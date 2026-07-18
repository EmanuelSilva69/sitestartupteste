import { ArrowLeft, Sparkles, TrendingUp, Target, Zap, Crown, Star, Lightbulb, BarChart3, Brain, LineChart, Award } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { fluidText } from "../../lib/fluid-typography";
import { mockRadarAttributes, mockTrendData } from "../../data/mockDashboard";
import { TrendingDown } from "lucide-react";

interface PerfilConcurseiroProps {
  onBack: () => void;
}

function RadarChart({ data }: { data: typeof mockRadarAttributes }) {
  const count = data.length;
  const size = 220;
  const center = size / 2;
  const maxValue = 100;
  const radius = 75;
  const levels = 5;

  const angle = (Math.PI * 2) / count;

  const points = data.map((entry, i) => {
    const currentAngle = angle * i - Math.PI / 2;
    const r = (entry.value / maxValue) * radius;
    return {
      x: center + r * Math.cos(currentAngle),
      y: center + r * Math.sin(currentAngle),
      name: entry.name,
      value: entry.value,
      color: entry.color,
    };
  });

  const levelPoints = Array.from({ length: levels }, (_, levelIndex) => {
    const levelValue = ((levelIndex + 1) / levels) * maxValue;
    return data
      .map((_, i) => {
        const currentAngle = angle * i - Math.PI / 2;
        const r = (levelValue / maxValue) * radius;
        return `${center + r * Math.cos(currentAngle)},${center + r * Math.sin(currentAngle)}`;
      })
      .join(' ');
  });

  const axisPoints = data.map((_, i) => {
    const currentAngle = angle * i - Math.PI / 2;
    return {
      x: center + radius * Math.cos(currentAngle),
      y: center + radius * Math.sin(currentAngle),
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 220 220" className="max-w-[260px] h-auto">
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {levelPoints.map((pts, idx) => (
          <polygon key={idx} points={pts} fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
        ))}
        {axisPoints.map((axis, idx) => (
          <line key={idx} x1={center} y1={center} x2={axis.x} y2={axis.y} stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
        ))}
        <polygon points={polygonPoints} fill="url(#radarGradient)" stroke="rgb(139, 92, 246)" strokeWidth="2" filter="url(#glow)" />
        {points.map((point, idx) => (
          <circle key={idx} cx={point.x} cy={point.y} r="5" fill={point.color} stroke="white" strokeWidth="2" filter="url(#glow)" />
        ))}
        {points.map((point, idx) => {
          const labelDistance = 96;
          const currentAngle = angle * idx - Math.PI / 2;
          return (
            <g key={`label-${idx}`}>
              <text x={center + labelDistance * Math.cos(currentAngle)} y={center + labelDistance * Math.sin(currentAngle)}
                textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="600" fill="rgb(248, 250, 252)">
                {point.name}
              </text>
              <text x={center + labelDistance * Math.cos(currentAngle)} y={center + labelDistance * Math.sin(currentAngle) + 14}
                textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="500" fill="rgb(139, 92, 246)">
                {point.value}%
              </text>
            </g>
          );
        })}
        <circle cx={center} cy={center} r="6" fill="rgb(139, 92, 246)" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function PerfilConcurseiro({ onBack }: PerfilConcurseiroProps) {
  const highest = [...mockRadarAttributes].sort((a, b) => b.value - a.value)[0];
  const lowest = [...mockRadarAttributes].sort((a, b) => a.value - b.value)[0];
  const lastScore = mockTrendData[mockTrendData.length - 1].score;
  const firstScore = mockTrendData[0].score;
  const evolution = lastScore - firstScore;

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
              Perfil do Concurseiro
            </h1>
          </div>
          <p className="text-foreground/90 text-base ml-14">
            Sua evolução e forças por disciplina
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl relative">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2">
          <ArrowLeft className="size-4 mr-2" />
          Voltar
        </Button>

        <div className="space-y-6">
          {/* Radar Chart Card */}
          <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <Brain className="size-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Força por Disciplina
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex items-center justify-center bg-muted/30 rounded-2xl p-8 border border-border/50">
                  <RadarChart data={mockRadarAttributes} />
                </div>

                <div className="space-y-4">
                  {mockRadarAttributes.map((attr, idx) => {
                    const gradientColors = [
                      { start: 'rgb(139, 92, 246)', end: 'rgb(167, 139, 250)' },
                      { start: 'rgb(236, 72, 153)', end: 'rgb(244, 114, 182)' },
                      { start: 'rgb(59, 130, 246)', end: 'rgb(96, 165, 250)' },
                      { start: 'rgb(16, 185, 129)', end: 'rgb(52, 211, 153)' },
                      { start: 'rgb(245, 158, 11)', end: 'rgb(251, 191, 36)' },
                    ];
                    return (
                      <div key={attr.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-foreground">{attr.name}</span>
                          <span className="text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{attr.value}%</span>
                        </div>
                        <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden border border-border/30">
                          <div className="h-full rounded-full transition-all duration-1000 shadow-lg"
                            style={{ width: `${attr.value}%`, background: `linear-gradient(90deg, ${gradientColors[idx].start}, ${gradientColors[idx].end})` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 backdrop-blur-sm bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
              <div className="p-6 relative">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg shadow-emerald-500/30">
                    <Star className="size-6 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success">Ponto Forte</Badge>
                    </div>
                    <p className="text-xl font-bold text-foreground mb-1">
                      Seu ponto forte é <span className="text-emerald-500">{highest.name}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Você acertou {highest.value}% das questões desta disciplina. Continue praticando para manter o alto desempenho.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-0 backdrop-blur-sm bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 shadow-2xl relative overflow-hidden">
              <div className="p-6 relative">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg shadow-amber-500/30">
                    <Lightbulb className="size-6 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="warning">Atenção</Badge>
                    </div>
                    <p className="text-xl font-bold text-foreground mb-1">
                      Precisa de atenção em <span className="text-amber-500">{lowest.name}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Você acertou apenas {lowest.value}% nesta disciplina. Dedique mais tempo de estudo para esta matéria.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Trend Chart */}
          <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <LineChart className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Evolução das Notas
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Últimos {mockTrendData.length} simulados</p>
                </div>
                <div className="ml-auto">
                  <Badge variant={evolution >= 0 ? 'success' : 'destructive'} className="text-sm px-4 py-1.5 flex items-center gap-1">
                    {evolution >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                    {evolution >= 0 ? '+' : ''}{evolution.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              <div className="h-64 flex items-end justify-between gap-2 px-2">
                {mockTrendData.map((point, idx) => {
                  const height = (point.score / 100) * 200;
                  const color = point.score >= 80 ? '#10b981' : point.score >= 65 ? '#f59e0b' : '#ef4444';
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                      <span className="text-xs font-bold text-foreground">{point.score.toFixed(0)}%</span>
                      <div
                        className="w-full rounded-lg transition-all duration-500 shadow-lg hover:opacity-80 cursor-pointer"
                        style={{
                          height: `${height}px`,
                          background: `linear-gradient(180deg, ${color}, ${color}88)`,
                          minHeight: '8px',
                        }}
                      />
                      <span className="text-xs text-muted-foreground font-medium">{point.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Target className="size-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-base mb-1">Resumo de Evolução</p>
                    <p className="text-sm text-muted-foreground">
                      Sua nota variou de {firstScore}% para {lastScore}% nos últimos simulados
                      {evolution >= 0
                        ? `, uma melhora de ${evolution.toFixed(1)} pontos percentuais.`
                        : `. Foco nos estudos para reverter a tendência.`}
                      {highest.name} continua sendo seu ponto forte com {highest.value}% de aproveitamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
