import { ArrowLeft, User, BookOpen, BarChart3, Award, Download, History, TrendingUp, Sparkles, Trophy, Target, Zap, Clock, Star, Flame, GraduationCap, Battery, Map, Gauge, Crown } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const mockDetailedData = {
  name: "Maria Silva Santos",
  cpf: "123.456.789-00",
  email: "maria.silva@email.com",
  telefone: "(61) 98765-4321",
  inscricao: "123456789012",
  foco: "Foco: Auditor Fiscal", // Changed from cargo
  dificuldade: "Dificuldade: Avançada", // Changed from area
  tempoProva: "02h 14m", // Changed from orgao
  xpGanho: "+850 XP", // Changed from localidade
  ofensiva: "7 dias seguidos", // New metric
  aproveitamentoFinal: 87.5, // Changed from notaFinal
  mediaTurma: 70.0, // Changed from notaCorte
  status: "Excelente", // Changed from Aprovado
  ranking: 142, // Changed from posicao
  totalAlunos: 5234, // Changed from totalCandidatos
  nivel: 12,
  titulo: "Estrategista",
  atributos: {
    Precisão: 87,
    Velocidade: 75,
    Consistência: 92,
    Resistência: 68,
    Cobertura: 79,
  },
  provas: [
    {
      nome: "Raciocínio Lógico", // Changed from Conhecimentos Básicos
      nota: 42.5,
      notaMaxima: 50,
      percentual: 85,
      questoesCorretas: 34,
      questoesTotais: 40,
    },
    {
      nome: "Direito Administrativo", // Changed from Conhecimentos Específicos
      nota: 45.0,
      notaMaxima: 50,
      percentual: 90,
      questoesCorretas: 36,
      questoesTotais: 40,
    },
  ],
  dataSimulado: "18 de agosto de 2024", // Changed from dataProva
  dataAnalise: "21 de novembro de 2024", // Changed from dataResultado
};

// Componente de Gráfico de Radar (SVG Spider Chart)
function RadarChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  const count = entries.length;
  const size = 280;
  const center = size / 2;
  const maxValue = 100;
  const radius = 100;
  const levels = 5;

  // Calcula ângulo para cada atributo (em radianos)
  const angle = (Math.PI * 2) / count;
  
  // Define cores por atributo
  const colors: Record<string, string> = {
    'Precisão': 'rgb(16, 185, 129)',      // Esmeralda
    'Velocidade': 'rgb(59, 130, 246)',    // Azul
    'Consistência': 'rgb(249, 115, 22)',  // Laranja
    'Resistência': 'rgb(147, 51, 234)',   // Roxo
    'Cobertura': 'rgb(234, 179, 8)',      // Amarelo
  };

  // Calcula pontos do polígono de dados
  const points = entries.map((entry, i) => {
    const value = entry[1];
    const currentAngle = angle * i - Math.PI / 2;
    const r = (value / maxValue) * radius;
    const x = center + r * Math.cos(currentAngle);
    const y = center + r * Math.sin(currentAngle);
    return { x, y, value, name: entry[0], color: colors[entry[0]] };
  });

  // Calcula pontos dos níveis de background
  const levelPoints = Array.from({ length: levels }, (_, levelIndex) => {
    const levelValue = ((levelIndex + 1) / levels) * maxValue;
    return entries.map((entry, i) => {
      const currentAngle = angle * i - Math.PI / 2;
      const r = (levelValue / maxValue) * radius;
      const x = center + r * Math.cos(currentAngle);
      const y = center + r * Math.sin(currentAngle);
      return `${x},${y}`;
    }).join(' ');
  });

  // Calcula pontos das linhas dos eixos
  const axisPoints = entries.map((entry, i) => {
    const currentAngle = angle * i - Math.PI / 2;
    const x = center + radius * Math.cos(currentAngle);
    const y = center + radius * Math.sin(currentAngle);
    return { x, y, angle: currentAngle };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* SVG Radar Chart */}
      <div className="flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Levels */}
          {levelPoints.map((points, idx) => (
            <polygon
              key={`level-${idx}`}
              points={points}
              fill="none"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="1"
            />
          ))}

          {/* Axis Lines */}
          {axisPoints.map((axis, idx) => (
            <line
              key={`axis-${idx}`}
              x1={center}
              y1={center}
              x2={axis.x}
              y2={axis.y}
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="1"
            />
          ))}

          {/* Data Polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#radarGradient)"
            stroke="rgb(139, 92, 246)"
            strokeWidth="2"
            filter="url(#glowEffect)"
          />

          {/* Data Points */}
          {points.map((point, idx) => (
            <circle
              key={`point-${idx}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={point.color}
              stroke="white"
              strokeWidth="2"
              filter="url(#glowEffect)"
            />
          ))}

          {/* Labels */}
          {points.map((point, idx) => {
            const labelDistance = 130;
            const currentAngle = angle * idx - Math.PI / 2;
            const labelX = center + labelDistance * Math.cos(currentAngle);
            const labelY = center + labelDistance * Math.sin(currentAngle);

            return (
              <g key={`label-${idx}`}>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="rgb(248, 250, 252)"
                  className="pointer-events-none select-none"
                >
                  {point.name}
                </text>
                <text
                  x={labelX}
                  y={labelY + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="500"
                  fill="rgb(139, 92, 246)"
                  className="pointer-events-none select-none"
                >
                  {point.value}%
                </text>
              </g>
            );
          })}

          {/* Center Circle */}
          <circle
            cx={center}
            cy={center}
            r="6"
            fill="rgb(139, 92, 246)"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>


    </div>
  );
}

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
      <div className="container mx-auto px-6 py-8 max-w-6xl relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-primary hover:text-primary hover:bg-primary/10 -ml-2"
        >
          <ArrowLeft className="size-4 mr-2" />
          Voltar para o Resumo
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
                      CPF: {mockDetailedData.cpf} • ID Simulado: {mockDetailedData.inscricao}
                    </p>
                  </div>
                </div>
                <Button className="rounded-full shadow-xl h-12 bg-gradient-to-r from-primary via-purple-600 to-secondary hover:shadow-2xl hover:shadow-primary/40 font-bold">
                  <Download className="size-4 mr-2" />
                  Baixar PDF de Questões
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8"> {/* Changed to grid-cols-3 */}
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Clock className="size-3.5 text-primary" /> {/* New icon */}
                    Tempo de Prova
                  </p>
                  <p className="text-lg text-foreground font-medium">
                    {mockDetailedData.tempoProva}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Star className="size-3.5 text-primary" /> {/* New icon */}
                    XP Ganho
                  </p>
                  <p className="text-lg text-foreground font-medium">
                    {mockDetailedData.xpGanho}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Flame className="size-3.5 text-primary" /> {/* New icon */}
                    Ofensiva
                  </p>
                  <p className="text-lg text-foreground font-medium">
                    {mockDetailedData.ofensiva}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Simulado Details */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30">
                  <BookOpen className="size-7 text-primary" /> {/* Changed icon */}
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Detalhes do Simulado
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Foco
                  </p>
                  <p className="text-lg text-foreground font-bold">
                    {mockDetailedData.foco}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Dificuldade
                  </p>
                  <p className="text-lg text-foreground font-bold flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    {mockDetailedData.dificuldade}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Tempo de Prova
                  </p>
                  <p className="text-lg text-foreground font-bold">
                    {mockDetailedData.tempoProva}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    XP Ganho
                  </p>
                  <p className="text-lg text-foreground font-bold">
                    {mockDetailedData.xpGanho}
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
                        Seu Status
                      </p>
                      <p className="text-5xl font-black text-white flex items-center gap-3">
                        {mockDetailedData.status.toUpperCase()}
                        <TrendingUp className="size-10 text-emerald-300" strokeWidth={3} />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-emerald-200 mb-3">
                        Seu Ranking
                      </p>
                      <p className="text-7xl font-black text-white">
                        {mockDetailedData.ranking}º
                      </p>
                      <p className="text-sm text-emerald-200 mt-2">
                        entre {mockDetailedData.totalAlunos} alunos
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg shadow-primary/20">
                  <div className="p-6 text-center">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                      Aproveitamento Final
                    </p>
                    <p className="text-6xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      {mockDetailedData.aproveitamentoFinal}%
                    </p>
                  </div>
                </Card>
                <Card className="bg-muted/50 border-2 border-border shadow-lg">
                  <div className="p-6 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      Média da Turma
                    </p>
                    <p className="text-6xl font-black text-foreground">
                      {mockDetailedData.mediaTurma}%
                    </p>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                  <div className="p-6 text-center">
                    <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-4">
                      Diferença
                    </p>
                    <p className="text-6xl font-black text-emerald-100">
                      +{(mockDetailedData.aproveitamentoFinal - mockDetailedData.mediaTurma).toFixed(1)}%
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Status do Concurseiro - RPG Attributes */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              {/* Header com Nível */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl shadow-primary/50">
                    <Sparkles className="size-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                      Status do Concurseiro
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Análise gamificada do seu desempenho</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="relative p-6 bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/50 rounded-3xl overflow-visible group hover:border-secondary/50 transition-all duration-500 min-w-max">
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-secondary opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Crown Icon */}
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-2xl shadow-yellow-500/50 animate-bounce">
                          <Crown className="size-5 text-white" fill="white" />
                        </div>
                      </div>
                      
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Nível Atual</p>
                      
                      {/* Level Number */}
                      <div className="relative mb-1">
                        <p className="font-black text-white drop-shadow-2xl" style={{
                          fontSize: '100px',
                          lineHeight: '0.9',
                          textShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)'
                        }}>
                          {mockDetailedData.nivel}
                        </p>
                        {/* Sparkle effect */}
                        <Sparkles className="absolute top-0 right-0 size-7 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                      </div>
                      
                      {/* Title */}
                      <p className="text-base font-black text-secondary drop-shadow-lg">
                        {mockDetailedData.titulo}
                      </p>
                      
                      {/* Decorative line */}
                      <div className="h-1 w-12 mx-auto bg-gradient-to-r from-primary via-secondary to-amber-500 rounded-full mt-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Radar Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center justify-center bg-muted/30 rounded-2xl p-8 border border-border/50">
                  <RadarChart data={mockDetailedData.atributos} />
                </div>

                {/* Atributos Legend */}
                <div className="space-y-4">
                  {Object.entries(mockDetailedData.atributos).map(([name, value], idx) => {
                    const icons = [
                      <Target className="size-5" />,
                      <Gauge className="size-5" />,
                      <Flame className="size-5" />,
                      <Battery className="size-5" />,
                      <Map className="size-5" />,
                    ];
                    
                    const colorGradients = [
                      { start: 'rgb(16, 185, 129)', end: 'rgb(5, 150, 105)' }, // emerald
                      { start: 'rgb(59, 130, 246)', end: 'rgb(34, 197, 94)' }, // blue to cyan
                      { start: 'rgb(249, 115, 22)', end: 'rgb(239, 68, 68)' }, // orange to red
                      { start: 'rgb(147, 51, 234)', end: 'rgb(236, 72, 153)' }, // purple to pink
                      { start: 'rgb(234, 179, 8)', end: 'rgb(245, 158, 11)' }, // yellow to amber
                    ];

                    return (
                      <div key={name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="p-2 rounded-lg text-white"
                              style={{
                                background: `linear-gradient(135deg, ${colorGradients[idx].start}, ${colorGradients[idx].end})`
                              }}
                            >
                              {icons[idx]}
                            </div>
                            <span className="font-bold text-foreground">{name}</span>
                          </div>
                          <span className="text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{value}%</span>
                        </div>
                        <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden border border-border/30">
                          <div
                            className="rounded-full transition-all duration-1000 shadow-lg"
                            style={{ 
                              width: `${value}%`,
                              background: `linear-gradient(90deg, ${colorGradients[idx].start}, ${colorGradients[idx].end})`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Scores */}
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/95 overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl" />
            <div className="p-8 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl border border-accent/30">
                  <GraduationCap className="size-7 text-accent" /> {/* Changed icon */}
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Detalhamento por Disciplina
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
                        Acertos: <span className="font-black text-foreground text-lg">{prova.questoesCorretas}</span> de {prova.questoesTotais}
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
                  <History className="size-7 text-secondary" /> {/* Changed icon */}
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Histórico do Simulado
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg shadow-primary/30">
                    <div className="size-3 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground mb-2">
                      Início do Simulado
                    </p>
                    <p className="text-base text-muted-foreground">
                      {mockDetailedData.dataSimulado}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-gradient-to-br from-secondary to-primary rounded-full shadow-lg shadow-secondary/30">
                    <div className="size-3 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground mb-2">
                      Análise Concluída
                    </p>
                    <p className="text-base text-muted-foreground">
                      {mockDetailedData.dataAnalise}
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
