import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Crown, Users, TrendingUp, Info, BarChart3 } from 'lucide-react';
import { cn } from './ui/utils';

interface ComparisonData {
  label: string;
  yourValue: number;
  compareValue: number;
}

interface ComparisonSectionProps {
  rankingData: ComparisonData;
  averageData: ComparisonData;
  selfData: ComparisonData[];
}

function ComparisonBar({ label, yourValue, compareValue }: ComparisonData) {
  const maxVal = Math.max(yourValue, compareValue, 1);
  const yourWidth = (yourValue / maxVal) * 100;
  const compareWidth = (compareValue / maxVal) * 100;

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{label}</p>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-foreground w-16 shrink-0">Você</span>
          <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden border border-border/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
              style={{ width: `${yourWidth}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground w-10 text-right">{yourValue.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-foreground w-16 shrink-0">{label === 'Melhor do Ranking' ? 'Ranking' : 'Média'}</span>
          <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden border border-border/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30 transition-all duration-1000"
              style={{ width: `${compareWidth}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground w-10 text-right">{compareValue.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

export function ComparisonSection({ rankingData, averageData, selfData }: ComparisonSectionProps) {
  return (
    <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="p-8 relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
            <BarChart3 className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Comparações
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Como você se compara</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="size-5 text-emerald-500" />
              <span className="text-sm font-bold text-foreground">Melhor do Ranking</span>
            </div>
            <ComparisonBar {...rankingData} />
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="size-5 text-blue-500" />
              <span className="text-sm font-bold text-foreground">Média Geral</span>
            </div>
            <ComparisonBar {...averageData} />
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="size-5 text-primary" />
              <span className="text-sm font-bold text-foreground">Você vs Você</span>
            </div>
            <div className="space-y-3">
              {selfData.map((point, i) => (
                <ComparisonBar key={i} {...point} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-start gap-2.5">
            <Info className="size-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              As comparações de ranking e média consideram o grupo de testes atual (POC).
              Os dados são aproximados e podem não refletir a população total de concurseiros.
              Versão demonstrativa para validação.
            </p>
          </div>
        </div>

        {selfData.length > 0 && (
          <div className="mt-6">
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {selfData.map((point, idx) => {
                const height = (point.yourValue / 100) * 160;
                const compareHeight = (point.compareValue / 100) * 160;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-foreground">{point.yourValue.toFixed(0)}%</span>
                    <div className="w-full flex gap-0.5 items-end" style={{ height: '160px' }}>
                      <div
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all duration-500"
                        style={{ height: `${height}px` }}
                      />
                      <div
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-muted-foreground/50 to-muted-foreground/30 transition-all duration-500"
                        style={{ height: `${compareHeight}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium truncate max-w-full">{point.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-gradient-to-br from-primary to-secondary" />
                Você
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-gradient-to-br from-muted-foreground/50 to-muted-foreground/30" />
                Anterior
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
