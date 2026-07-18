import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Loader2,
  AlertCircle,
  Bot,
  User,
  CheckCircle2,
  XCircle,
  BookOpen,
} from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { fluidText } from "../lib/fluid-typography";
import {
  ChatMessage,
  Question,
  Citation,
  AIQuestionContext,
} from "../types/simulation";
import { askAI } from "../lib/ai-service";
import { setMessageRating, attachRatingsToMessages } from "../lib/ai-storage";
import FocusTrap from "focus-trap-react";

interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
  subject: string;
  messages: ChatMessage[];
  questionId: string;
  onMessagesUpdate: (messages: ChatMessage[]) => void;
}

function CitationLink({ citation }: { citation: Citation }) {
  if (!citation.url) {
    return (
      <span className="text-xs text-muted-foreground italic">
        {citation.text}
      </span>
    );
  }
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-primary hover:text-secondary underline underline-offset-2 transition-colors"
    >
      {citation.text}
      <ExternalLink className="size-2.5 shrink-0" />
    </a>
  );
}

function MessageContent({ content, citations }: { content: string; citations?: Citation[] }) {
  const segments = content.split(/(https?:\/\/[^\s)]+)/g);

  return (
    <div className="space-y-2">
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {segments.map((segment, i) => {
          if (segment.match(/^https?:\/\//)) {
            const cleanUrl = segment.replace(/[.,;:!?)]$/, "");
            return (
              <a
                key={i}
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary underline underline-offset-2 transition-colors break-all"
              >
                {cleanUrl}
              </a>
            );
          }
          return <span key={i}>{segment}</span>;
        })}
      </div>

      {citations && citations.length > 0 && (
        <div className="pt-2 border-t border-border/30 mt-2">
          <p className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5">
            <BookOpen className="size-3" />
            Fontes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {citations.map((citation, idx) => (
              <CitationLink key={idx} citation={citation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <div className="size-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
        <Bot className="size-4 text-white" />
      </div>
      <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 border border-border/30">
        <div className="flex items-center gap-1.5">
          <div className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

export function AIExplanationModal({
  isOpen,
  onClose,
  question,
  correctAnswer,
  selectedAnswer,
  isCorrect,
  subject,
  messages,
  questionId,
  onMessagesUpdate,
}: AIExplanationModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleSendMessage("Explique esta questão.");
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isSending) return;

    if (!text) setInputValue("");

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    onMessagesUpdate(updatedMessages);
    setIsSending(true);

    const context: AIQuestionContext = {
      question,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      subject,
    };

    try {
      const aiResponse = await askAI(messageText, context, updatedMessages);
      const finalMessages = [...updatedMessages, aiResponse];
      onMessagesUpdate(finalMessages);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content:
          err instanceof Error
            ? `Erro: ${err.message}`
            : "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
        timestamp: Date.now(),
      };
      const finalMessages = [...updatedMessages, errorMessage];
      onMessagesUpdate(finalMessages);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRate = (messageId: string, rating: "like" | "dislike") => {
    setMessageRating(messageId, questionId, rating);
    const updated = attachRatingsToMessages(messages, questionId);
    onMessagesUpdate(updated);
  };

  if (!isOpen) return null;

  const ratedMessages = attachRatingsToMessages(messages, questionId);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          initialFocus: false,
          allowOutsideClick: true,
          clickOutsideDeactivates: true,
          returnFocusOnDeactivate: true,
          escapeDeactivates: true,
        }}
      >
        <div
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="size-4 text-white" />
              </div>
              <div>
                <h3 id="modal-title" className="font-bold text-sm text-foreground">
                  TutorIA
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Tire dúvidas sobre esta questão
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Fechar"
              aria-label="Fechar modal"
            >
              <X className="size-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          {/* Result Banner */}
          <div
            className={cn(
              "mx-4 mt-3 p-3 rounded-xl border flex items-center gap-2.5",
              isCorrect
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-red-500/10 border-red-500/30"
            )}
          >
            {isCorrect ? (
              <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="size-5 text-red-500 shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">
                {isCorrect ? "Você acertou!" : "Você errou"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                Correto: {correctAnswer}
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {ratedMessages.length === 0 && !isSending && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Bot className="size-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground font-medium">
                  Faça uma pergunta sobre esta questão
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1 max-w-[200px]">
                  O TutorIA pode explicar o gabarito, aprofundar conceitos e dar dicas de estudo
                </p>
              </div>
            )}

            {ratedMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 items-start",
                  msg.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "size-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                    msg.role === "user"
                      ? "bg-muted shadow-black/5"
                      : "bg-gradient-to-br from-primary to-secondary shadow-primary/20"
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="size-4 text-muted-foreground" />
                  ) : msg.role === "assistant" && msg.content.startsWith("Erro:") ? (
                    <AlertCircle className="size-4 text-white" />
                  ) : (
                    <Bot className="size-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "flex-1 min-w-0",
                    msg.role === "user" ? "max-w-[85%]" : "max-w-[85%]"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 border",
                      msg.role === "user"
                        ? "bg-primary/10 border-primary/20 rounded-tr-none"
                        : msg.content.startsWith("Erro:")
                          ? "bg-destructive/10 border-destructive/20 rounded-tl-none"
                          : "bg-muted/50 border-border/30 rounded-tl-none"
                    )}
                  >
                    <MessageContent
                      content={msg.content}
                      citations={msg.citations}
                    />
                  </div>

                  {/* Rating Buttons (only for assistant messages) */}
                  {msg.role === "assistant" && !msg.content.startsWith("Erro:") && (
                    <div className="flex items-center gap-1 mt-1.5 px-1">
                      <button
                        onClick={() => handleRate(msg.id, "like")}
                        className={cn(
                          "p-1 rounded-md transition-colors",
                          msg.rating === "like"
                            ? "text-emerald-500 bg-emerald-500/10"
                            : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/50"
                        )}
                        title="Útil"
                        aria-label="Marcar como útil"
                      >
                        <ThumbsUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleRate(msg.id, "dislike")}
                        className={cn(
                          "p-1 rounded-md transition-colors",
                          msg.rating === "dislike"
                            ? "text-red-500 bg-red-500/10"
                            : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/50"
                        )}
                        title="Não útil"
                        aria-label="Marcar como não útil"
                      >
                        <ThumbsDown className="size-3.5" />
                      </button>
                      {msg.rating && (
                        <span className="text-[10px] text-muted-foreground/50 ml-1">
                          {msg.rating === "like" ? "Útil" : "Não útil"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isSending && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background sticky bottom-0">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Pergunte sobre a questão..."
                  disabled={isSending}
                  className="w-full h-10 px-4 pr-10 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isSending}
                size="icon"
                className="size-10 shrink-0 rounded-xl"
                aria-label="Enviar pergunta"
              >
                {isSending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
              O TutorIA pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </FocusTrap>
    </>
  );
}
