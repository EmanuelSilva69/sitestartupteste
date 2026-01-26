import { useState } from "react";
import { Search, Lock, Info, TestTube, Sparkles, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface ConsultationFormProps {
  onSubmit: (inscription: string) => void;
}

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  const [inscription, setInscription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with inscription:", inscription);
    if (inscription.length === 12) {
      console.log("Calling onSubmit");
      onSubmit(inscription);
    } else {
      console.log("Inscription length invalid:", inscription.length);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
      
      {/* Header with Gradient */}
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
      <div className="container mx-auto px-6 py-16 max-w-2xl relative">
        <Card className="shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-card/95">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="p-8 relative">
            {/* Title Section */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg shadow-primary/30">
                <Search className="size-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                  Iniciar Consulta
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Digite suas informações abaixo
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              {/* Número de Inscrição */}
              <div className="space-y-2">
                <Label htmlFor="inscription" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  Número de Inscrição
                  <span className="text-secondary ml-1">*</span>
                </Label>
                <Input
                  id="inscription"
                  type="text"
                  value={inscription}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                    setInscription(value);
                  }}
                  placeholder="Digite os 12 dígitos"
                  className="h-16 text-lg border-2 border-input bg-input-background focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all rounded-2xl font-medium"
                  maxLength={12}
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 ml-1">
                  <Info className="size-3.5" />
                  Exemplo: 123456789012
                </p>
              </div>

              {/* Concurso - Locked Field */}
              <div className="space-y-2">
                <Label htmlFor="contest" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Lock className="size-4 text-muted-foreground" />
                  Concurso
                </Label>
                <div className="relative">
                  <Input
                    id="contest"
                    type="text"
                    value="CNU - Edição Unificada"
                    disabled
                    className="h-16 text-lg bg-muted/50 border-2 border-border cursor-not-allowed opacity-60 pl-14 rounded-2xl"
                    readOnly
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 ml-1">
                  <Info className="size-3.5" />
                  Concurso fixo para esta edição
                </p>
              </div>

              {/* Submit Button with Gradient */}
              <Button
                type="submit"
                disabled={inscription.length !== 12}
                className="w-full h-16 text-lg rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary hover:shadow-2xl hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold mt-8 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Search className="size-6 mr-3 relative z-10" />
                <span className="relative z-10">Consultar Resultado</span>
              </Button>
            </form>

            {/* Information Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 backdrop-blur-sm mt-10">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-xl mt-0.5">
                    <Info className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
                      <Sparkles className="size-4 text-primary" />
                      Informações Importantes
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Mantenha seu número de inscrição em local seguro</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary mt-0.5">•</span>
                        <span>Os resultados são oficiais e atualizados em tempo real</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>Em caso de dúvidas, consulte o edital oficial</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Testing Instructions */}
            <Card className="bg-muted/30 border-border/50 backdrop-blur-sm mt-4">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <TestTube className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      Para testar o protótipo:
                    </h3>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">▸</span>
                        <span>Digite <strong className="text-primary font-bold">123456789012</strong> para ver resultado aprovado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">▸</span>
                        <span>Digite <strong className="text-secondary font-bold">000000000000</strong> para ver inscrição não encontrada</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">▸</span>
                        <span>Digite <strong className="text-destructive font-bold">999999999999</strong> para ver erro de sistema</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
