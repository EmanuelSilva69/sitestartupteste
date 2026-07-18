import { useState, useCallback } from "react";
import {
  X,
  ThumbsUp,
  ThumbsDown,
  FileText,
  BookOpen,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "./ui/utils";
import { TransparencyData, FeedbackType } from "../types/transparency";
import FocusTrap from "focus-trap-react";

interface AITransparencyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: TransparencyData;
  onFeedback?: (messageId: string, type: FeedbackType) => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
      {children}
    </p>
  );
}

export function AITransparencyPanel({ isOpen, onClose, data, onFeedback }: AITransparencyPanelProps) {
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedback = useCallback((type: FeedbackType) => {
    setFeedback(type);
    setFeedbackSent(true);
    onFeedback?.(data.messageId, type);
  }, [data.messageId, onFeedback]);

  const userAnswerLetter = data.questionData.userAnswer;
  const correctAnswerLetter = data.questionData.correctAnswer;
  const isUserCorrect = userAnswerLetter === correctAnswerLetter;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <FocusTrap active={isOpen} focusTrapOptions={{ initialFocus: false, allowOutsideClick: true, clickOutsideDeactivates: true, returnFocusOnDeactivate: true, escapeDeactivates: true }}>
        <div
          className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-background border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-14 border-b border-border shrink-0">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Eye className="size-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Evidências</p>
                <p className="text-[10px] text-muted-foreground">Transparência da resposta</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="size-8 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="size-4 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {/* Response preview */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-sm text-foreground leading-relaxed">
                {data.aiResponse}
              </p>
            </div>

            {/* 1. Contexto */}
            <section>
              <SectionLabel>Contexto da Questão</SectionLabel>
              <div className="p-4 rounded-xl bg-muted/20 border border-border/50 mb-3">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {data.questionData.text}
                </p>
              </div>

              <div className="flex gap-3">
                <div className={cn(
                  "flex-1 rounded-xl border p-4",
                  isUserCorrect
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-red-500/10 border-red-500/30"
                )}>
                  <div className="flex items-center gap-1.5 mb-2">
                    {isUserCorrect
                      ? <CheckCircle2 className="size-4 text-emerald-500" />
                      : <XCircle className="size-4 text-red-500" />
                    }
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sua resposta</span>
                  </div>
                  <span className={cn(
                    "inline-flex items-center justify-center size-8 rounded-lg text-sm font-black text-white",
                    isUserCorrect ? "bg-emerald-500" : "bg-red-500"
                  )}>
                    {userAnswerLetter}
                  </span>
                </div>

                <div className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Gabarito</span>
                  </div>
                  <span className="inline-flex items-center justify-center size-8 rounded-lg text-sm font-black text-white bg-emerald-500">
                    {correctAnswerLetter}
                  </span>
                </div>
              </div>
            </section>

            {/* 2. Fontes */}
            <section>
              <SectionLabel>Fontes Oficiais</SectionLabel>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/50">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Prova</p>
                    <p className="text-sm text-foreground">{data.questionData.examSource}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/50">
                  <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <BookOpen className="size-4 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Gabarito</p>
                    <p className="text-sm text-foreground">{data.questionData.keySource}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Rastreabilidade */}
            <section>
              <SectionLabel>Rastreabilidade da IA</SectionLabel>
              <div className="space-y-5">
                {/* Evidence map */}
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-3 flex items-center gap-1.5">
                    <Search className="size-3.5" />
                    Mapa de evidências consultadas
                  </p>
                  <div className="space-y-2">
                    {data.traceability.evidenceMap.map((evidence, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-primary/[0.03] to-secondary/[0.03] border border-primary/10">
                        <span className="size-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-foreground leading-relaxed">{evidence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traceability */}
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-3 flex items-center gap-1.5">
                    <ArrowRight className="size-3.5" />
                    Matriz de Rastreabilidade
                  </p>
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/50">
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-primary/20 text-primary">Resposta da IA</span>
                      <ArrowRight className="size-3 text-muted-foreground/30" />
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400">Contexto</span>
                      <ArrowRight className="size-3 text-muted-foreground/30" />
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400">Gabarito</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {data.traceability.relationship}
                    </p>
                  </div>
                </div>

                {/* Limitations */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-foreground mb-1">Limitações da explicação</p>
                      <p className="text-xs text-foreground leading-relaxed">
                        {data.traceability.limitations}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Feedback footer */}
          <div className="border-t border-border px-6 py-4 shrink-0 bg-card/50">
            {feedbackSent ? (
              <p className="text-sm text-muted-foreground text-center">
                {feedback === 'like' ? '👍 Obrigado pelo feedback!' : '👎 Obrigado — seu feedback ajuda a melhorar.'}
              </p>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Útil?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFeedback('like')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition-all"
                  >
                    <ThumbsUp className="size-3.5" /> Sim
                  </button>
                  <button
                    onClick={() => handleFeedback('dislike')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-all"
                  >
                    <ThumbsDown className="size-3.5" /> Não
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </>
  );
}

interface TransparencyTriggerProps {
  onClick: () => void;
  label?: string;
}

export function TransparencyTrigger({ onClick }: TransparencyTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm"
    >
      <Eye className="size-3.5" />
      Ver evidências
    </button>
  );
}
