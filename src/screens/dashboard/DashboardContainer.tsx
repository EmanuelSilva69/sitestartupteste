import { useState } from "react";
import { ResultadoSimulado } from "./ResultadoSimulado";
import { HistoricoTentativas } from "./HistoricoTentativas";
import { DetalheTentativa } from "./DetalheTentativa";
import { PerfilConcurseiro } from "./PerfilConcurseiro";
import { EmptyState } from "../../components/ui/empty-state";
import { Button } from "../../components/ui/button";
import { BarChart3 } from "lucide-react";
import type { SimuladoAttempt } from "../../types/dashboard";

type DashboardScreen = 'resultado' | 'historico' | 'detalhe' | 'perfil';

interface DashboardContainerProps {
  onBackToApp: () => void;
  latestAttempt?: SimuladoAttempt;
  history?: SimuladoAttempt[];
}

export function DashboardContainer({
  onBackToApp,
  latestAttempt,
  history = [],
}: DashboardContainerProps) {
  const [screen, setScreen] = useState<DashboardScreen>('resultado');
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);

  const hasData = latestAttempt != null || history.length > 0;

  const goToResultado = () => setScreen('resultado');
  const goToHistorico = () => setScreen('historico');
  const goToDetalhe = (id: string) => {
    setSelectedAttemptId(id);
    setScreen('detalhe');
  };
  const goToPerfil = () => setScreen('perfil');

  if (!hasData) {
    return (
      <div className="min-h-screen w-full bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="container mx-auto px-4 py-16 max-w-2xl relative">
          <EmptyState
            icon={<BarChart3 className="size-10 text-muted-foreground/40" />}
            title="Nenhum Simulado Realizado"
            description="Você ainda não concluiu nenhum simulado. Complete seu primeiro simulado para ver análises detalhadas de desempenho aqui."
            actionLabel="Iniciar Novo Simulado"
            onAction={onBackToApp}
          />
          <div className="flex justify-center mt-4">
            <Button variant="ghost" onClick={onBackToApp} className="text-muted-foreground">
              Voltar ao início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {screen === 'resultado' && (
        <ResultadoSimulado
          onBack={onBackToApp}
          onViewHistory={goToHistorico}
          onViewDetails={() => goToDetalhe(latestAttempt?.id || history[0]?.id || 'SIM-001')}
          attempt={latestAttempt || history[0]}
        />
      )}
      {screen === 'historico' && (
        <HistoricoTentativas
          onBack={goToResultado}
          onSelectAttempt={goToDetalhe}
          onViewProfile={goToPerfil}
          attempts={history}
        />
      )}
      {screen === 'detalhe' && selectedAttemptId && (
        <DetalheTentativa
          attemptId={selectedAttemptId}
          onBack={goToHistorico}
          allAttempts={history}
        />
      )}
      {screen === 'perfil' && (
        <PerfilConcurseiro
          onBack={goToHistorico}
          history={history}
          latestAttempt={latestAttempt || history[0]}
        />
      )}
    </>
  );
}
