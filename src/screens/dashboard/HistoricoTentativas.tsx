import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Trophy, Target, Sparkles, Filter, ChevronRight, Search, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { fluidText } from "../../lib/fluid-typography";
import { mockAttempts } from "../../data/mockDashboard";
import type { SimuladoAttempt } from "../../types/dashboard";

interface HistoricoTentativasProps {
  onBack: () => void;
  onSelectAttempt: (id: string) => void;
  onViewProfile: () => void;
  attempts?: SimuladoAttempt[];
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

type PeriodFilter = 'all' | '7' | '30' | '90';

export function HistoricoTentativas({ onBack, onSelectAttempt, onViewProfile, attempts: propAttempts }: HistoricoTentativasProps) {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allAttempts = propAttempts && propAttempts.length > 0 ? propAttempts : mockAttempts;

  const filteredAttempts = allAttempts.filter((a) => {
    if (periodFilter !== 'all') {
      const days = parseInt(periodFilter);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const attemptDate = new Date(a.date + 'T00:00:00');
      if (attemptDate < cutoff) return false;
    }
    if (searchTerm && !a.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

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
              Histórico de Simulados
            </h1>
          </div>
          <p className="text-foreground/90 text-base ml-14">
            Acompanhe sua evolução ao longo do tempo
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-5xl relative">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2">
          <ArrowLeft className="size-4 mr-2" />
          Voltar
        </Button>

        {/* Filters */}
        <Card className="border-0 backdrop-blur-sm bg-card/95 shadow-2xl mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="size-4 text-muted-foreground" />
                {(['all', '7', '30', '90'] as PeriodFilter[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriodFilter(p)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      periodFilter === p
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {p === 'all' ? 'Tudo' : `Últimos ${p} dias`}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* List */}
        <div className="space-y-4">
          {filteredAttempts.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="size-16 rounded-3xl bg-muted/50 border border-border/50 flex items-center justify-center mb-4">
                <Search className="size-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Nenhum resultado encontrado</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                {searchTerm ? `Nenhum simulado encontrado para "${searchTerm}".` : 'Nenhum simulado neste período.'}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')} className="rounded-full px-6">
                  Limpar busca
                </Button>
              )}
            </div>
          )}
          {filteredAttempts.map((attempt) => (
            <Card
              key={attempt.id}
              onClick={() => onSelectAttempt(attempt.id)}
              className="border-0 backdrop-blur-sm bg-card/95 shadow-xl hover:shadow-primary/20 transition-all cursor-pointer group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl" />
              <div className="p-6 relative">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${
                      attempt.status === 'approved'
                        ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30'
                        : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30'
                    }`}>
                      {attempt.status === 'approved'
                        ? <CheckCircle2 className="size-6 text-emerald-500" />
                        : <XCircle className="size-6 text-amber-500" />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-foreground">{attempt.id}</h3>
                        <Badge variant={attempt.status === 'approved' ? 'success' : 'warning'}>
                          {attempt.status === 'approved' ? 'Aprovado' : 'Abaixo da Meta'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3.5" />
                          {formatDate(attempt.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {formatTime(attempt.totalTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="size-3.5" />
                          {attempt.areas.reduce((a, b) => a + b.total, 0)} questões
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Nota</p>
                      <p className={`text-3xl font-black ${
                        attempt.score >= 80
                          ? 'text-emerald-500'
                          : attempt.score >= 65
                          ? 'text-amber-500'
                          : 'text-red-500'
                      }`}>
                        {attempt.score}%
                      </p>
                    </div>
                    <ChevronRight className="size-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View Profile CTA */}
        <div className="mt-8 flex justify-center">
          <Button onClick={onViewProfile} className="rounded-full px-8 h-12 text-base shadow-2xl bg-gradient-to-r from-primary via-primary-light to-secondary hover:shadow-primary/40 font-bold">
            <Target className="size-4 mr-2" />
            Ver Perfil do Concurseiro
            <ChevronRight className="size-5 ml-1" strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
}
