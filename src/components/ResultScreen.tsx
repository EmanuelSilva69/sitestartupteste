import { CheckCircle2, XCircle, AlertTriangle, ArrowLeft, ChevronRight, TrendingUp, Sparkles, Trophy, Target } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const mockCandidateData = {
  name: "Maria Silva Santos",
  cpf: "123.456.789-00",
  foco: "Foco: Auditor Fiscal", // Changed from cargo
  dificuldade: "Dificuldade: Avançada", // Changed from area
  aproveitamento: 87.5, // Changed from nota (%)
  mediaTurma: 70.0, // Changed from notaCorte
  status: "Excelente", // Changed from Aprovado
  ranking: "Top 5%", // Changed from posicao
  totalAlunos: 5234, // Changed from totalCandidatos
};

type ResultType = "success" | "not-found" | "error";

function getResultType(inscription: string): ResultType {
  if (inscription === "123456789012") return "success";
  if (inscription === "000000000000") return "not-found";
  if (inscription === "999999999999") return "error";
  return "not-found";
}

interface ResultScreenProps {
  inscription: string;
  onBackToSearch: () => void;
  onViewDetails: () => void;
}

export function ResultScreen({ inscription, onBackToSearch, onViewDetails }: ResultScreenProps) {
  const resultType = getResultType(inscription);

  console.log("ResultScreen - inscription:", inscription, "type:", resultType);

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L2JhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles className="size-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Startplay Simulados
            </h1>
          </div>
          <p className="text-white/90 text-base ml-14">
            Portal de Desempenho e Análise
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBackToSearch}
          className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2"
        >
          <ArrowLeft className="size-4 mr-2" />
          Voltar para o painel
        </Button>

        <div className="space-y-6">
          {/* Success State */}
          {resultType === "success" && (
            <>
              {/* Success Alert */}
              <Card className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent)]" />
                <div className="p-5 flex items-start gap-4 relative">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="size-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-emerald-100 mb-2 flex items-center gap-2">
                      <Trophy className="size-5" />
                      Simulado Concluído!
                    </h3>
                    <p className="text-sm text-emerald-200/90">
                      ID do Simulado: <span className="font-bold text-white">{inscription}</span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Candidate Card */}
              <Card
                onClick={onViewDetails}
                className="shadow-2xl hover:shadow-primary/20 transition-all cursor-pointer border-0 group overflow-hidden backdrop-blur-sm bg-card/95 relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
                
                <div className="p-8 relative">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent mb-3">
                        {mockCandidateData.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        CPF: {mockCandidateData.cpf}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl px-6 py-3 shadow-lg shadow-emerald-500/30">
                      <p className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Trophy className="size-4" />
                        {mockCandidateData.status.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t-2 border-border pt-6 mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {mockCandidateData.foco}
                    </h3>
                    <p className="text-base text-muted-foreground flex items-center gap-2">
                      <Target className="size-4 text-primary" />
                      {mockCandidateData.dificuldade}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-0 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent)]" />
                    <div className="p-6 relative">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="text-center">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                            Seu Aproveitamento
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {mockCandidateData.aproveitamento}%
                            </p>
                            <TrendingUp className="size-6 text-emerald-500" strokeWidth={3} />
                          </div>
                        </div>
                        <div className="text-center md:border-x-2 border-border">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                            Média da Turma
                          </p>
                          <p className="text-5xl font-black text-foreground">
                            {mockCandidateData.mediaTurma}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                            Seu Ranking
                          </p>
                          <p className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {mockCandidateData.ranking}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Call to Action */}
                  <div className="mt-8 flex items-center justify-end">
                    <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                      <Sparkles className="size-5" />
                      <span className="text-base">Analisar Desempenho Detalhado</span>
                      <ChevronRight className="size-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Not Found State */}
          {resultType === "not-found" && (
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl" />
              <div className="p-20 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-2xl" />
                    <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-8 shadow-2xl shadow-yellow-500/30">
                      <AlertTriangle className="size-24 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-5">
                    Simulado Não Encontrado
                  </h2>
                  <p className="text-lg text-foreground/80 mb-3 max-w-md">
                    Não encontramos nenhum simulado com o ID
                  </p>
                  <div className="bg-muted/50 px-6 py-3 rounded-2xl border-2 border-border mb-6">
                    <strong className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {inscription}
                    </strong>
                  </div>
                  <p className="text-base text-muted-foreground mb-12 max-w-md">
                    Verifique se o ID foi digitado corretamente e tente novamente.
                  </p>
                  <Button
                    onClick={onBackToSearch}
                    className="rounded-full px-10 h-14 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-secondary hover:shadow-primary/40 font-bold"
                  >
                    <ArrowLeft className="size-5 mr-2" />
                    Tentar Outro ID
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Error State */}
          {resultType === "error" && (
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full blur-3xl" />
              <div className="p-20 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-rose-500/30 rounded-full blur-2xl" />
                    <div className="relative bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-8 shadow-2xl shadow-red-500/30">
                      <XCircle className="size-24 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent mb-5">
                    Erro na Análise
                  </h2>
                  <p className="text-lg text-foreground/80 mb-3 max-w-md">
                    Não foi possível carregar os resultados do simulado.
                  </p>
                  <p className="text-base text-muted-foreground mb-12 max-w-md">
                    Por favor, tente novamente em alguns instantes. Se o problema persistir, entre em contato com o suporte Startplay.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={onBackToSearch}
                      className="rounded-full px-8 h-14 text-lg border-2 border-border hover:bg-muted/50 font-semibold"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => window.location.reload()}
                      className="rounded-full px-10 h-14 text-lg shadow-2xl bg-gradient-to-r from-primary via-purple-600 to-secondary hover:shadow-primary/40 font-bold"
                    >
                      Tentar Novamente
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
