import { useState } from 'react';
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

type Screen = 'login' | 'download-exam' | 'customize' | 'runner' | 'review' | 'processing' | 'result' | 'profile' | 'dashboard' | 'transparency';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [inscription, setInscription] = useState('');
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [targetQuestionIndex, setTargetQuestionIndex] = useState<number>(0);
  const [downloadedExam, setDownloadedExam] = useState<DownloadedFile | null>(null);
  const [downloadedGabarito, setDownloadedGabarito] = useState<DownloadedFile | null>(null);

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
    console.log("Configurações do Simulado:", config);
    setSimulationConfig(config);
    setCurrentScreen('runner');
  };

  const handleRunnerPause = () => {
    console.log("Prova pausada");
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
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('result');
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

  // Get questions based on config
  const getQuestions = () => {
    if (!simulationConfig) return [];
    // For now, return the first N questions from mock data
    return mockQuestions.slice(0, simulationConfig.questions);
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased">
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
          onPause={handleRunnerPause}
          onExit={handleRunnerExit}
          onReview={handleRunnerReview}
          onSubmit={handleSubmitSimulation}
          onUpdateAnswers={handleUpdateAnswers}
          initialQuestionIndex={targetQuestionIndex}
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

      {currentScreen === 'processing' && (
        <ProcessingScreen 
          inscription={inscription} 
          onComplete={handleProcessingComplete} 
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
        <DashboardContainer onBackToApp={handleBackFromDashboard} />
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
