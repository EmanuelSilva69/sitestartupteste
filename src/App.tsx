import { useState, useRef } from 'react';
import { ConsultationForm } from './components/ConsultationForm';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { DetailedProfile } from './components/DetailedProfile';
import { CustomizeSimulationScreen } from './screens/CustomizeSimulationScreen';
import { SimulationRunnerScreen } from './screens/SimulationRunnerScreen';
import { ReviewSubmissionScreen } from './screens/ReviewSubmissionScreen';
import { DownloadExamScreen } from './screens/DownloadExamScreen';
import { DashboardContainer } from './screens/dashboard/DashboardContainer';
import { TransparencyDemo } from './components/TransparencyDemo';
import { mockQuestions } from './data/mockQuestions';
import { SimulationConfig, Answer, DownloadedFile } from './types/simulation';
import { ThemeSelector } from './components/ui/theme-selector';
import { ErrorState } from './components/ui/error-state';
import { OfflineState } from './components/ui/offline-state';
import { useOnlineStatus } from './components/ui/offline-state';
import { computeResults } from './lib/simulation-results';
import { ExpiredState } from './components/ui/expired-state';
import { SimuladoAttempt } from './types/dashboard';

type Screen = 'login' | 'download-exam' | 'customize' | 'runner' | 'review' | 'processing' | 'result' | 'profile' | 'dashboard' | 'transparency';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [inscription, setInscription] = useState('');
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [targetQuestionIndex, setTargetQuestionIndex] = useState<number>(0);
  const [downloadedExam, setDownloadedExam] = useState<DownloadedFile | null>(null);
  const [downloadedGabarito, setDownloadedGabarito] = useState<DownloadedFile | null>(null);
  const [processingError, setProcessingError] = useState(false);
  const [simulationStartTime, setSimulationStartTime] = useState<number>(Date.now());
  const [simulationAttempt, setSimulationAttempt] = useState<SimuladoAttempt | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const historyRef = useRef<SimuladoAttempt[]>([]);
  const isOnline = useOnlineStatus();

  // Handlers de Navegação
  const handleLoginSuccess = (id: string) => {
    setInscription(id);
    // Se o ID for o de sucesso, avançamos para download da prova
    if (id === "123456789012") {
      setCurrentScreen('download-exam');
    } else {
      // Para outros IDs (erro/não encontrado), vamos direto para a tela de resultado
      // onde o ResultScreen tratará a exibição da mensagem de erro
      setCurrentScreen('processing');
    }
  };

  const handleDownloadComplete = (exam: DownloadedFile, gabarito: DownloadedFile) => {
    setDownloadedExam(exam);
    setDownloadedGabarito(gabarito);
    setCurrentScreen('customize');
  };

  const handleGenerateSimulado = (config: SimulationConfig) => {
    console.log('Configurações do Simulado:', config);
    setSimulationConfig(config);
    setSimulationStartTime(Date.now());
    setCurrentAnswers([]);
    // Reset any previous results
    setSimulationAttempt(null);
    setIsExpired(false);
    setCurrentScreen('runner');
  };

  const handleRunnerExit = () => {
    setCurrentScreen('customize');
  };

  const handleRunnerReview = () => {
    setCurrentScreen('review');
  };

  const handleUpdateAnswers = (answers: Answer[]) => {
    setCurrentAnswers(answers);
  };

  const handleReviewBack = () => {
    setCurrentScreen('runner');
  };

  const handleReviewNavigateToQuestion = (index: number) => {
    setTargetQuestionIndex(index);
    setCurrentScreen('runner');
  };

  const handleSubmitSimulation = () => {
    setProcessingError(false);
    // Compute results from answers before transitioning
    if (simulationConfig) {
      const results = computeResults(
        getQuestions(),
        currentAnswers,
        simulationConfig,
        simulationStartTime
      );
      setSimulationAttempt(results.attempt);
      // Add to history
      historyRef.current = [results.attempt, ...historyRef.current];
    }
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('result');
  };

  const handleProcessingError = () => {
    setProcessingError(true);
  };

  const handleViewDetails = () => {
    setCurrentScreen('dashboard');
  };

  const handleBackFromDashboard = () => {
    setCurrentScreen('result');
  };

  const handleBackToLogin = () => {
    setInscription('');
    setSimulationConfig(null);
    setCurrentAnswers([]);
    setTargetQuestionIndex(0);
    setDownloadedExam(null);
    setDownloadedGabarito(null);
    setSimulationAttempt(null);
    setIsExpired(false);
    setCurrentScreen('login');
  };

  const handleBackToResult = () => {
    setCurrentScreen('result');
  };

  const handleBackToCustomize = () => {
    setCurrentScreen('download-exam');
  };

  const handleViewProfileFromLogin = () => {
    setInscription('123456789012');
    setCurrentScreen('profile');
  };

  const handleViewTransparencyDemo = () => {
    setCurrentScreen('transparency');
  };

  const handleTimeExpired = () => {
    setIsExpired(true);
    // Auto-submit when time expires
    handleSubmitSimulation();
  };

  // Get questions based on config
  const getQuestions = () => {
    if (!simulationConfig) return [];
    // For now, return the first N questions from mock data
    return mockQuestions.slice(0, simulationConfig.questions);
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased page-enter">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 backdrop-blur-md text-amber-900 text-center py-2 px-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg">
          <span className="size-2 rounded-full bg-amber-900 animate-pulse" />
          Você está offline. Algumas funcionalidades podem estar indisponíveis.
        </div>
      )}

      {/* Theme Selector - Premium Floating Button */}
      <div className="fixed top-6 right-6 z-50">
        <div className="backdrop-blur-md bg-card/30 border border-border/40 rounded-full p-2 shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:border-border/60 hover:bg-card/40">
          <ThemeSelector variant="button" className="rounded-full size-11 hover:bg-primary/20 transition-colors duration-200" />
        </div>
      </div>

      {currentScreen === 'login' && (
        <ConsultationForm 
          onSubmit={handleLoginSuccess}
          onViewProfile={handleViewProfileFromLogin}
          onViewTransparency={handleViewTransparencyDemo}
        />
      )}

      {currentScreen === 'download-exam' && (
        <DownloadExamScreen
          onComplete={handleDownloadComplete}
          onBack={handleBackToLogin}
        />
      )}

      {currentScreen === 'customize' && (
        <CustomizeSimulationScreen 
          onGenerate={handleGenerateSimulado}
          onBack={() => setCurrentScreen('download-exam')}
        />
      )}

      {currentScreen === 'runner' && simulationConfig && (
        <SimulationRunnerScreen
          questions={getQuestions()}
          config={simulationConfig}
          onExit={handleRunnerExit}
          onReview={handleRunnerReview}
          onSubmit={handleSubmitSimulation}
          onUpdateAnswers={handleUpdateAnswers}
          initialQuestionIndex={targetQuestionIndex}
          onTimeExpired={handleTimeExpired}
        />
      )}

      {currentScreen === 'review' && simulationConfig && (
        <ReviewSubmissionScreen
          questions={getQuestions()}
          answers={currentAnswers}
          onNavigateToQuestion={handleReviewNavigateToQuestion}
          onSubmit={handleSubmitSimulation}
          onBack={handleReviewBack}
        />
      )}

      {currentScreen === 'processing' && !processingError && (
        <ProcessingScreen 
          inscription={inscription} 
          onComplete={handleProcessingComplete} 
          onError={handleProcessingError}
        />
      )}

      {isExpired && (
        <ExpiredState
          onRestart={() => {
            setIsExpired(false);
            setCurrentScreen('download-exam');
          }}
          onHome={() => {
            setIsExpired(false);
            handleBackToLogin();
          }}
        />
      )}

      {processingError && (
        <ErrorState
          title="Falha no Processamento"
          description="Não foi possível processar os resultados. O arquivo pode estar corrompido ou em formato não suportado."
          retryLabel="Tentar Novamente"
          onRetry={() => { setProcessingError(false); setCurrentScreen('processing'); }}
          backLabel="Voltar ao Início"
          onBack={() => { setProcessingError(false); setCurrentScreen('login'); }}
        />
      )}

      {currentScreen === 'result' && (
        <ResultScreen 
          inscription={inscription} 
          onBackToSearch={handleBackToLogin}
          onViewDetails={handleViewDetails}
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardContainer
          onBackToApp={handleBackFromDashboard}
          latestAttempt={simulationAttempt || undefined}
          history={historyRef.current}
        />
      )}

      {currentScreen === 'transparency' && (
        <TransparencyDemo />
      )}

      {currentScreen === 'profile' && (
        <DetailedProfile 
          inscription={inscription} 
          onBack={handleBackToResult}
        />
      )}
    </main>
  );
}
