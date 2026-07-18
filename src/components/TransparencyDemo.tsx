import { useState } from "react";
import { Bot, Sparkles, FileText, Eye, Search, Scale, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { AITransparencyPanel, TransparencyTrigger } from "./AITransparencyPanel";
import { mockTransparencyList } from "../data/mockTransparency";
import { FeedbackType } from "../types/transparency";
import { fluidText } from "../lib/fluid-typography";

const steps = [
  { icon: Eye, title: "Contexto", desc: "Questão, sua resposta e o gabarito lado a lado" },
  { icon: Scale, title: "Fontes", desc: "Banca, órgão e edital de origem da prova" },
  { icon: Search, title: "Rastreio", desc: "Raciocínio da IA, fontes consultadas e limitações" },
];

export function TransparencyDemo() {
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Record<string, FeedbackType>>({});

  const handleFeedback = (messageId: string, type: FeedbackType) => {
    setFeedbacks((prev) => ({ ...prev, [messageId]: type }));
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--primary)_0%,transparent_70%)] opacity-15" />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary via-primary-light to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L2JhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sparkles className="size-8 text-foreground" />
            </div>
            <h1 style={fluidText['3xl']} className="font-bold text-foreground tracking-tight">
              Transparência da IA
            </h1>
          </div>
          <p className="text-foreground/90 text-base ml-14">
            Fontes, evidências e raciocínio por trás de cada resposta
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Clique em <span className="text-foreground font-semibold">Ver evidências</span> ao final de cada resposta para abrir o painel com o contexto completo da questão, as fontes oficiais e o raciocínio detalhado da IA.
            </p>

            <div className="space-y-10">
              {mockTransparencyList.map((item, idx) => {
                const isCorrect = item.questionData.userAnswer === item.questionData.correctAnswer;
                return (
                  <article key={item.messageId}>
                    {/* Questão label */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Questão {idx + 1}
                      </span>
                      <span className="size-1 rounded-full bg-muted-foreground/30" />
                      <span className="text-xs text-muted-foreground">
                        {idx === 0 ? 'Direito Constitucional' : 'Direito Administrativo'}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="bg-card/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden relative group hover:shadow-primary/20 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full pointer-events-none" />

                      <div className="p-6 relative">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-xl shadow-primary/30">
                            <Bot className="size-6 text-white" />
                          </div>
                          <div className="min-w-0 pt-1 flex-1">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary ring-1 ring-primary/30 text-xs font-semibold mb-4">
                              <Sparkles className="size-3" />
                              TutorIA · explicando
                            </div>

                            {/* Enunciado */}
                            <div className="mb-5 pb-5 border-b border-border/50">
                              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                                Enunciado
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {item.questionData.text.split('\n')[0]}
                              </p>
                            </div>

                            {/* AI Response */}
                            <p className="text-sm text-foreground leading-relaxed">
                              {item.aiResponse}
                            </p>
                          </div>
                        </div>

                        {/* Metadata - Pills */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Sua resposta:</span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              isCorrect
                                ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
                            }`}>
                              {isCorrect ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                              {item.questionData.userAnswer}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Gabarito:</span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
                              <CheckCircle2 className="size-3" />
                              {item.questionData.correctAnswer}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground/60 ml-auto hidden sm:block">
                            {item.questionData.examSource}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between px-6 pb-5 relative">
                        <TransparencyTrigger onClick={() => setOpenPanelId(item.messageId)} />
                        {feedbacks[item.messageId] && (
                          <span className="text-xs text-muted-foreground/50">
                            {feedbacks[item.messageId] === 'like' ? '👍' : '👎'} Feedback registrado
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-12">
              <div className="bg-card/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-border/50">
                    <div className="size-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-1 ring-primary/30">
                      <Sparkles className="size-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-foreground">Como funciona</span>
                  </div>

                  <div className="space-y-5">
                    {steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center mt-0.5">
                          <div className="size-7 rounded-full bg-muted/50 ring-1 ring-border/50 flex items-center justify-center">
                            <step.icon className="size-3.5 text-primary" />
                          </div>
                          {i < steps.length - 1 && (
                            <div className="w-px flex-1 bg-border/40 mt-1.5" />
                          )}
                        </div>
                        <div className="pb-1">
                          <p className="text-sm font-semibold text-foreground mb-0.5">{step.title}</p>
                          <p className="text-xs text-muted-foreground/70 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                      <ArrowRight className="size-3" />
                      <span>Clique em "Ver evidências" nas respostas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {mockTransparencyList.map((item) => (
        <AITransparencyPanel
          key={item.messageId}
          isOpen={openPanelId === item.messageId}
          onClose={() => setOpenPanelId(null)}
          data={item}
          onFeedback={handleFeedback}
        />
      ))}
    </div>
  );
}
