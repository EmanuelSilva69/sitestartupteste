import React, { useState, useRef } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileCheck,
  Link as LinkIcon,
  Play,
  Loader2,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { fluidText } from "../lib/fluid-typography";
import { DownloadedFile, DownloadStatus } from "../types/simulation";
import { validateUrl, downloadFile, formatFileSize, revokeDownloadedFile } from "../lib/download-utils";
import { saveFileToSession } from "../lib/exam-storage";

interface DownloadExamScreenProps {
  onComplete: (exam: DownloadedFile, gabarito: DownloadedFile) => void;
  onBack: () => void;
}

function createPlaceholderFile(type: "exam" | "gabarito"): DownloadedFile {
  const id = `${type}_placeholder_${Date.now()}`;
  return {
    id,
    name: type === "exam" ? "Prova (demo)" : "Gabarito (demo)",
    sourceUrl: "",
    type,
    mimeType: "text/plain",
    size: 0,
    objectUrl: "",
    downloadedAt: new Date().toISOString(),
  };
}

export function DownloadExamScreen({ onComplete, onBack }: DownloadExamScreenProps) {
  const [examUrl, setExamUrl] = useState("");
  const [gabaritoUrl, setGabaritoUrl] = useState("");
  const [examStatus, setExamStatus] = useState<DownloadStatus>("idle");
  const [gabaritoStatus, setGabaritoStatus] = useState<DownloadStatus>("idle");
  const [examError, setExamError] = useState<string | null>(null);
  const [gabaritoError, setGabaritoError] = useState<string | null>(null);
  const [examFile, setExamFile] = useState<DownloadedFile | null>(null);
  const [gabaritoFile, setGabaritoFile] = useState<DownloadedFile | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const examAbortRef = useRef<AbortController | null>(null);
  const gabaritoAbortRef = useRef<AbortController | null>(null);

  const handleDownloadExam = async () => {
    const validationError = validateUrl(examUrl);
    if (validationError) {
      setExamStatus("error");
      setExamError(validationError);
      return;
    }

    if (examFile) {
      revokeDownloadedFile(examFile);
      setExamFile(null);
    }

    setExamStatus("downloading");
    setExamError(null);

    examAbortRef.current = new AbortController();
    try {
      const file = await downloadFile(examUrl, "exam", examAbortRef.current.signal);
      setExamFile(file);
      setExamStatus("completed");
      saveFileToSession(file);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setExamStatus("error");
      setExamError(err instanceof Error ? err.message : "Erro desconhecido ao baixar a prova.");
    }
  };

  const handleDownloadGabarito = async () => {
    const validationError = validateUrl(gabaritoUrl);
    if (validationError) {
      setGabaritoStatus("error");
      setGabaritoError(validationError);
      return;
    }

    if (gabaritoFile) {
      revokeDownloadedFile(gabaritoFile);
      setGabaritoFile(null);
    }

    setGabaritoStatus("downloading");
    setGabaritoError(null);

    gabaritoAbortRef.current = new AbortController();
    try {
      const file = await downloadFile(gabaritoUrl, "gabarito", gabaritoAbortRef.current.signal);
      setGabaritoFile(file);
      setGabaritoStatus("completed");
      saveFileToSession(file);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setGabaritoStatus("error");
      setGabaritoError(err instanceof Error ? err.message : "Erro desconhecido ao baixar o gabarito.");
    }
  };

  const handleStartSimulation = () => {
    if (!examFile || !gabaritoFile) return;
    setIsStarting(true);
    onComplete(examFile, gabaritoFile);
  };

  const handleClearExam = () => {
    if (examFile) revokeDownloadedFile(examFile);
    setExamFile(null);
    setExamStatus("idle");
    setExamError(null);
  };

  const handleClearGabarito = () => {
    if (gabaritoFile) revokeDownloadedFile(gabaritoFile);
    setGabaritoFile(null);
    setGabaritoStatus("idle");
    setGabaritoError(null);
  };

  const handleSkip = () => {
    const exam = createPlaceholderFile("exam");
    const gabarito = createPlaceholderFile("gabarito");
    setExamFile(exam);
    setGabaritoFile(gabarito);
    setExamStatus("completed");
    setGabaritoStatus("completed");
    onComplete(exam, gabarito);
  };

  const isReady = examStatus === "completed" && gabaritoStatus === "completed";

  const renderStatusBadge = (status: DownloadStatus, error?: string | null) => {
    switch (status) {
      case "downloading":
        return (
          <Badge variant="outline" className="gap-1.5 text-primary border-primary/30 bg-primary/5">
            <Loader2 className="size-3.5 animate-spin" />
            Baixando...
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="gap-1.5 text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
            <CheckCircle2 className="size-3.5" />
            Baixado
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="gap-1.5 text-destructive border-destructive/30 bg-destructive/10">
            <AlertCircle className="size-3.5" />
            Erro
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary to-secondary shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container mx-auto px-6 py-8 relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 hover:gap-3"
          >
            <ArrowLeft className="size-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg shadow-black/20">
                <Download className="size-7 text-white" />
              </div>
              <div>
                <h1 style={fluidText['3xl']} className="font-black text-white tracking-tight">Carregar Prova</h1>
                <p style={fluidText.base} className="text-white/80 font-medium">
                  Insira os links da prova e do gabarito para começar
                </p>
              </div>
            </div>
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full px-5 h-10 text-sm font-medium"
            >
              Pular
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl relative">
        <Card className="shadow-2xl border-border/50 overflow-hidden backdrop-blur-md bg-card/95 p-8 md:p-12 space-y-10">
          {/* Exam Link Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/30">
                <FileText className="size-5 text-primary" />
              </div>
              <div>
                <h2 style={fluidText['2xl']} className="font-black text-foreground">Link da Prova</h2>
                <p className="text-xs text-muted-foreground">URL direta para o arquivo da prova (PDF, imagem ou texto)</p>
              </div>
              {renderStatusBadge(examStatus, examError)}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={examUrl}
                  onChange={(e) => {
                    setExamUrl(e.target.value);
                    if (examStatus === "error") {
                      setExamStatus("idle");
                      setExamError(null);
                    }
                  }}
                  placeholder="https://exemplo.com/prova.pdf"
                  className="pl-10 h-12 text-sm"
                  disabled={examStatus === "downloading"}
                />
              </div>
              <Button
                onClick={handleDownloadExam}
                disabled={!examUrl.trim() || examStatus === "downloading"}
                className="h-12 px-6 gap-2 shrink-0"
              >
                {examStatus === "downloading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : examFile ? (
                  <Download className="size-4" />
                ) : (
                  <Download className="size-4" />
                )}
                {examFile ? "Baixar Novamente" : "Baixar"}
              </Button>
            </div>

            {examError && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">Falha ao baixar prova</p>
                  <p className="text-destructive/80 text-xs mt-0.5">{examError}</p>
                  <p className="text-destructive/60 text-xs mt-1">
                    Verifique se o link está correto e acessível publicamente. Alguns servidores bloqueiam downloads automáticos.
                  </p>
                </div>
              </div>
            )}

            {examFile && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-3 min-w-0">
                  <FileCheck className="size-5 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{examFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(examFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={handleClearExam}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remover arquivo"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center">
              <Badge variant="outline" className="px-4 py-1 text-xs bg-card">
                Gabarito
              </Badge>
            </div>
          </div>

          {/* Gabarito Link Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl border border-secondary/30">
                <FileCheck className="size-5 text-secondary" />
              </div>
              <div>
                <h2 style={fluidText['2xl']} className="font-black text-foreground">Link do Gabarito</h2>
                <p className="text-xs text-muted-foreground">URL direta para o arquivo do gabarito oficial</p>
              </div>
              {renderStatusBadge(gabaritoStatus, gabaritoError)}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={gabaritoUrl}
                  onChange={(e) => {
                    setGabaritoUrl(e.target.value);
                    if (gabaritoStatus === "error") {
                      setGabaritoStatus("idle");
                      setGabaritoError(null);
                    }
                  }}
                  placeholder="https://exemplo.com/gabarito.pdf"
                  className="pl-10 h-12 text-sm"
                  disabled={gabaritoStatus === "downloading"}
                />
              </div>
              <Button
                onClick={handleDownloadGabarito}
                disabled={!gabaritoUrl.trim() || gabaritoStatus === "downloading"}
                className="h-12 px-6 gap-2 shrink-0"
              >
                {gabaritoStatus === "downloading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : gabaritoFile ? (
                  <Download className="size-4" />
                ) : (
                  <Download className="size-4" />
                )}
                {gabaritoFile ? "Baixar Novamente" : "Baixar"}
              </Button>
            </div>

            {gabaritoError && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">Falha ao baixar gabarito</p>
                  <p className="text-destructive/80 text-xs mt-0.5">{gabaritoError}</p>
                  <p className="text-destructive/60 text-xs mt-1">
                    Verifique se o link está correto e acessível publicamente. Alguns servidores bloqueiam downloads automáticos.
                  </p>
                </div>
              </div>
            )}

            {gabaritoFile && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-3 min-w-0">
                  <FileCheck className="size-5 text-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{gabaritoFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(gabaritoFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={handleClearGabarito}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remover arquivo"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )}
          </section>

          {/* Start Button */}
          <div className="pt-6 border-t border-border/50">
            <Button
              onClick={handleStartSimulation}
              disabled={!isReady || isStarting}
              className={cn(
                "w-full h-14 md:h-16 text-lg md:text-xl font-black rounded-2xl gap-3",
                "bg-gradient-to-r from-primary to-secondary",
                isReady && "hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95",
                "transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isStarting ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  <Play className="size-6 fill-current" />
                  Iniciar Simulado
                </>
              )}
            </Button>

            {!isReady && (
              <div className="text-center mt-4">
                <p className="text-xs text-muted-foreground font-medium mb-3">
                  {examStatus !== "completed" && gabaritoStatus !== "completed"
                    ? "Baixe a prova e o gabarito para começar"
                    : examStatus !== "completed"
                      ? "Aguardando download da prova"
                      : "Aguardando download do gabarito"}
                </p>
                <button
                  onClick={handleSkip}
                  className="text-xs text-muted-foreground/60 hover:text-primary transition-colors underline underline-offset-2"
                >
                  Pular esta etapa e usar dados de demonstração
                </button>
              </div>
            )}

            {isReady && (
              <p className="text-center text-xs text-muted-foreground mt-4 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="size-3 text-emerald-500" />
                Prova e gabarito prontos. Clique para iniciar!
              </p>
            )}
          </div>
        </Card>

        {/* Info Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-medium flex items-center justify-center gap-2">
            <ExternalLink className="size-3" />
            Os arquivos ficarão disponíveis apenas durante esta sessão
          </p>
        </div>
      </div>
    </div>
  );
}
