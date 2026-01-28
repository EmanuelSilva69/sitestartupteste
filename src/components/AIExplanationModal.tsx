import React, { useState, useEffect } from "react";
import { Sparkles, BookOpen, AlertTriangle, X } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";

interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

type ModalState = "loading" | "success" | "error";

const LOADING_MESSAGES = [
  "Analisando a questão...",
  "Consultando base de conhecimento...",
  "Gerando explicação didática...",
  "Processando análise profunda...",
  "Preparando resposta personalizada..."
];

const MOCK_EXPLANATIONS = [
  {
    summary: "Esta alternativa é a mais precisa e abrangente em relação ao tema.",
    detail: [
      "A alternativa correta apresenta todos os elementos necessários da definição.",
      "Ela está em conformidade com a jurisprudência consolidada.",
      "As outras alternativas contêm erros conceituais ou informações incompletas.",
      "O conhecimento aqui é aplicável em diversos contextos práticos."
    ],
    sources: [
      { title: "Art. 5º da Constituição Federal", link: "#" },
      { title: "Jurisprudência STF 2023", link: "#" },
      { title: "Lei Complementar nº 101/2000", link: "#" }
    ]
  },
  {
    summary: "A resposta correta integra múltiplos conceitos de forma coerente.",
    detail: [
      "Baseia-se nas normas fundamentais do direito administrativo.",
      "Está alinhada com as melhores práticas internacionais.",
      "Reflete o entendimento predominante na doutrina especializada.",
      "Passa no teste de aplicabilidade prática e teórica."
    ],
    sources: [
      { title: "Decreto nº 9.203/2017", link: "#" },
      { title: "Resolução CNPC nº 1/2018", link: "#" },
      { title: "Parecer AGU nº 001/2022", link: "#" }
    ]
  },
  {
    summary: "Pela eliminação de erros, chegamos à resposta correta.",
    detail: [
      "As alternativas A e B contêm contradições lógicas.",
      "A alternativa D apresenta um conceito desatualizado.",
      "Apenas a alternativa correta contempla todos os requisitos legais.",
      "Essa é a interpretação confirmada pelos tribunais superiores."
    ],
    sources: [
      { title: "STF - Súmula nº 512", link: "#" },
      { title: "OAB - Enunciado Nº 432", link: "#" },
      { title: "ABNT NBR ISO 9001:2015", link: "#" }
    ]
  }
];

const MOCK_ERROR_EXPLANATION = {
  summary: "Explicação padrão do gabarito oficial.",
  detail: [
    "A alternativa correta é a que melhor responde à questão proposta.",
    "Consulte o material didático para aprofundamento neste tema.",
    "Recomenda-se revisar os conceitos fundamentais relacionados.",
    "Pratique mais questões similares para consolidar o aprendizado."
  ],
  sources: [
    { title: "Gabarito Oficial - INEP", link: "#" },
    { title: "Material de Apoio - Instituição", link: "#" },
    { title: "Referências Complementares", link: "#" }
  ]
};

export function AIExplanationModal({
  isOpen,
  onClose,
  question,
  correctAnswer,
  selectedAnswer,
  isCorrect
}: AIExplanationModalProps) {
  const [state, setState] = useState<ModalState>("loading");
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [explanation, setExplanation] = useState(MOCK_EXPLANATIONS[0]);

  useEffect(() => {
    if (!isOpen) return;

    // Simular mudança de mensagem durante o loading
    const messageInterval = setInterval(() => {
      setLoadingMessage(
        LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
      );
    }, 800);

    // Simular requisição à API (2.5 segundos)
    const timer = setTimeout(() => {
      clearInterval(messageInterval);
      
      // 80% sucesso, 20% erro
      if (Math.random() < 0.8) {
        setExplanation(
          MOCK_EXPLANATIONS[Math.floor(Math.random() * MOCK_EXPLANATIONS.length)]
        );
        setState("success");
      } else {
        setState("error");
      }
    }, 2500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <h3 className="font-bold text-foreground">Análise do Tutor</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Fechar"
          >
            <X className="size-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Loading State */}
          {state === "loading" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center animate-pulse">
                {loadingMessage}
              </p>
              
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded-full animate-pulse" />
                <div className="h-4 bg-muted rounded-full animate-pulse w-5/6" />
                <div className="h-4 bg-muted rounded-full animate-pulse w-4/6" />
              </div>

              <div className="pt-4 space-y-3">
                <div className="h-3 bg-muted rounded-full animate-pulse" />
                <div className="h-3 bg-muted rounded-full animate-pulse w-5/6" />
                <div className="h-3 bg-muted rounded-full animate-pulse w-4/6" />
              </div>
            </div>
          )}

          {/* Success State */}
          {state === "success" && (
            <div className="space-y-6">
              {/* Resultado */}
              <div
                className={cn(
                  "p-4 rounded-xl border-2 flex items-center gap-3",
                  isCorrect
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-red-500/10 border-red-500/50"
                )}
              >
                <div
                  className={cn(
                    "size-6 rounded-full flex items-center justify-center flex-shrink-0 text-white",
                    isCorrect ? "bg-emerald-500" : "bg-red-500"
                  )}
                >
                  {isCorrect ? "✓" : "✗"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isCorrect ? "Resposta Correta!" : "Resposta Incorreta"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Resposta correta: {correctAnswer}
                  </p>
                </div>
              </div>

              {/* Resumo */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Resumo
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {explanation.summary}
                </p>
              </div>

              {/* Detalhes */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Análise Detalhada
                </h4>
                <ul className="space-y-2">
                  {explanation.detail.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-primary font-bold flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fontes */}
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="size-4 text-primary" />
                  Fontes Sugeridas
                </h4>
                <ul className="space-y-2">
                  {explanation.sources.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.link}
                        className="text-xs text-primary hover:text-secondary transition-colors flex items-center gap-1.5"
                      >
                        {source.title}
                        <span className="text-[10px]">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Error State */}
          {state === "error" && (
            <div className="space-y-6">
              {/* Alerta */}
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/50 flex gap-3">
                <AlertTriangle className="size-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    IA Indisponível
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    A análise com IA está temporariamente indisponível. Exibindo gabarito padrão.
                  </p>
                </div>
              </div>

              {/* Resultado */}
              <div className="p-4 rounded-xl border-2 border-muted bg-muted/30">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Resposta Correta
                </p>
                <p className="text-sm text-muted-foreground">
                  {correctAnswer}
                </p>
              </div>

              {/* Explicação Padrão */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Explicação Padrão
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {MOCK_ERROR_EXPLANATION.summary}
                </p>
                <ul className="space-y-2">
                  {MOCK_ERROR_EXPLANATION.detail.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <span className="text-primary font-bold flex-shrink-0">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fontes */}
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Materiais de Referência
                </h4>
                <ul className="space-y-2">
                  {MOCK_ERROR_EXPLANATION.sources.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.link}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-background sticky bottom-0">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Entendido
          </Button>
        </div>
      </div>
    </>
  );
}
