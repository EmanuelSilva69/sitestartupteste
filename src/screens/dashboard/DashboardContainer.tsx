import { useState } from "react";
import { ResultadoSimulado } from "./ResultadoSimulado";
import { HistoricoTentativas } from "./HistoricoTentativas";
import { DetalheTentativa } from "./DetalheTentativa";
import { PerfilConcurseiro } from "./PerfilConcurseiro";

type DashboardScreen = 'resultado' | 'historico' | 'detalhe' | 'perfil';

interface DashboardContainerProps {
  onBackToApp: () => void;
}

export function DashboardContainer({ onBackToApp }: DashboardContainerProps) {
  const [screen, setScreen] = useState<DashboardScreen>('resultado');
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);

  const goToResultado = () => setScreen('resultado');
  const goToHistorico = () => setScreen('historico');
  const goToDetalhe = (id: string) => {
    setSelectedAttemptId(id);
    setScreen('detalhe');
  };
  const goToPerfil = () => setScreen('perfil');

  return (
    <>
      {screen === 'resultado' && (
        <ResultadoSimulado
          onBack={onBackToApp}
          onViewHistory={goToHistorico}
          onViewDetails={() => goToDetalhe('SIM-001')}
        />
      )}
      {screen === 'historico' && (
        <HistoricoTentativas
          onBack={goToResultado}
          onSelectAttempt={goToDetalhe}
          onViewProfile={goToPerfil}
        />
      )}
      {screen === 'detalhe' && selectedAttemptId && (
        <DetalheTentativa
          attemptId={selectedAttemptId}
          onBack={goToHistorico}
        />
      )}
      {screen === 'perfil' && (
        <PerfilConcurseiro
          onBack={goToHistorico}
        />
      )}
    </>
  );
}
