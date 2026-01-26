import { ArrowLeft, User, FileText, BarChart3, Award, Download, Calendar, TrendingUp, Sparkles, Trophy, Target, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const mockDetailedData = {
  name: "Maria Silva Santos",
  cpf: "123.456.789-00",
  email: "maria.silva@email.com",
  telefone: "(61) 98765-4321",
  inscricao: "123456789012",
  cargo: "Analista Técnico de Políticas Sociais",
  area: "Gestão de Políticas Públicas",
  orgao: "Ministério da Gestão e da Inovação",
  localidade: "Brasília/DF",
  notaFinal: 87.5,
  notaCorte: 70.0,
  status: "Aprovado",
  posicao: 142,
  totalCandidatos: 5234,
  provas: [
    {
      nome: "Conhecimentos Básicos",
      nota: 42.5,
      notaMaxima: 50,
      percentual: 85,
      questoesCorretas: 34,
      questoesTotais: 40,
    },
    {
      nome: "Conhecimentos Específicos",
      nota: 45.0,
      notaMaxima: 50,
      percentual: 90,
      questoesCorretas: 36,
      questoesTotais: 40,
    },
  ],
  dataProva: "18 de agosto de 2024",
  dataResultado: "21 de novembro de 2024",
};

interface DetailedProfileProps {
  inscription: string;
  onBack: () => void;
}

export function DetailedProfile({ inscription, onBack }: DetailedProfileProps) {
  console.log("DetailedProfile - inscription:", inscription);

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary via-purple-600 to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles className="size-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              CNU Resultados
            </h1>
          </div>
          <p className="text-white/90 text-base ml-14">
            Sistema de Consulta de Resultados do Concurso Nacional Unificado
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-6xl relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2"
        >
          <ArrowLeft className="size-4 mr-2" />
          Voltar para resultados
        </Button>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-start gap-6">
                  <div className="p-5 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl shadow-primary/30">
                    <User className="size-12 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent mb-3">
                      {mockDetailedData.name}
                    </h1>
                    <p className="text-base text-muted-foreground flex items-center gap-2">
                      <Zap className="size-4 text-primary" />
                      CPF: {mockDetailedData.cpf} • Inscrição: {mockDetailedData.inscricao}
                    </p>
                  </div>
                </div>
                <Button className="rounded-full shadow-xl h-12 bg-gradient-to-r from-primary via-purple-600 to-secondary hover:shadow-2xl hover:shadow-primary/40 font-bold">
                  <Download className="size-4 mr-2" />
                  Baixar Comprovante
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" />
                    E-mail
                  </p>
                  <p className="text-lg text-foreground font-medium">
                    {mockDetailedData.email}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" />
                    Telefone
                  </p>
                  <p className="text-lg text-foreground font-medium">
                    {mockDetailedData.telefone}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Cargo Information */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <FileText className="size-7 text-primary" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Informações do Cargo
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Cargo
                  </p>
                  <p className="text-lg text-foreground font-bold">
                    {mockDetailedData.cargo}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Área
                  </p>
                  <p className="text-lg text-foreground font-bold flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    {mockDetailedData.area}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Órgão
                  </p>
                  <p className="text-lg text-foreground font-bold">
                    {mockDetailedData.orgao}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Localidade
                  </p>
                  <p className="text-lg text-foreground font-bold">
                    {mockDetailedData.localidade}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Summary */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl border border-emerald-500/30">
                  <Award className="size-7 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Desempenho Geral
                </h2>
              </div>
              
              {/* Status Card */}
              <Card className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 backdrop-blur-sm mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent)]" />
                <div className="p-8 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-emerald-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Trophy className="size-5" />
                        Status da Aprovação
                      </p>
                      <p className="text-5xl font-black text-white flex items-center gap-3">
                        {mockDetailedData.status.toUpperCase()}
                        <TrendingUp className="size-10 text-emerald-300" strokeWidth={3} />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-emerald-200 mb-3">
                        Posição na Classificação
                      </p>
                      <p className="text-7xl font-black text-white">
                        {mockDetailedData.posicao}º
                      </p>
                      <p className="text-sm text-emerald-200 mt-2">
                        de {mockDetailedData.totalCandidatos} candidatos
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg shadow-primary/20">
                  <div className="p-6 text-center">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                      Nota Final
                    </p>
                    <p className="text-6xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      {mockDetailedData.notaFinal}
                    </p>
                  </div>
                </Card>
                <Card className="bg-muted/50 border-2 border-border shadow-lg">
                  <div className="p-6 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      Nota de Corte
                    </p>
                    <p className="text-6xl font-black text-foreground">
                      {mockDetailedData.notaCorte}
                    </p>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                  <div className="p-6 text-center">
                    <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-4">
                      Diferença
                    </p>
                    <p className="text-6xl font-black text-emerald-100">
                      +{(mockDetailedData.notaFinal - mockDetailedData.notaCorte).toFixed(1)}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Detailed Scores */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl border border-accent/30">
                  <BarChart3 className="size-7 text-accent" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Detalhamento por Prova
                </h2>
              </div>

              <div className="space-y-6">
                {mockDetailedData.provas.map((prova, index) => (
                  <Card key={index} className="border-2 border-border shadow-lg backdrop-blur-sm bg-card/80 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl" />
                    <div className="p-6 relative">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <Zap className="size-5 text-primary" />
                          {prova.nome}
                        </h3>
                        <div className="text-right">
                          <p className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {prova.nota}
                          </p>
                          <p className="text-sm text-muted-foreground font-semibold">
                            de {prova.notaMaxima}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-5">
                        <div className="flex justify-between mb-3">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Aproveitamento
                          </p>
                          <p className="text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {prova.percentual}%
                          </p>
                        </div>
                        <div className="h-3 bg-muted/50 rounded-full overflow-hidden border border-border/50">
                          <div 
                            className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-1000 shadow-lg"
                            style={{ width: `${prova.percentual}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-base text-muted-foreground">
                        Questões corretas: <span className="font-black text-foreground text-lg">{prova.questoesCorretas}</span> de {prova.questoesTotais}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl border border-secondary/30">
                  <Calendar className="size-7 text-secondary" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Cronologia
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg shadow-primary/30">
                    <div className="size-3 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground mb-2">
                      Aplicação da Prova
                    </p>
                    <p className="text-base text-muted-foreground">
                      {mockDetailedData.dataProva}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-gradient-to-br from-secondary to-primary rounded-full shadow-lg shadow-secondary/30">
                    <div className="size-3 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground mb-2">
                      Divulgação dos Resultados
                    </p>
                    <p className="text-base text-muted-foreground">
                      {mockDetailedData.dataResultado}
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
