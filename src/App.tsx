import { useState } from 'react';
import { ConsultationForm } from './components/ConsultationForm';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { DetailedProfile } from './components/DetailedProfile';
import { CustomizeSimulationScreen } from './screens/CustomizeSimulationScreen';
import { SimulationRunnerScreen } from './screens/SimulationRunnerScreen';
import { ReviewSubmissionScreen } from './screens/ReviewSubmissionScreen';
import { mockQuestions } from './data/mockQuestions';
import { SimulationConfig, Answer } from './types/simulation';

type Screen = 'login' | 'customize' | 'runner' | 'review' | 'processing' | 'result' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [inscription, setInscription] = useState('');
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [targetQuestionIndex, setTargetQuestionIndex] = useState<number>(0);

  // Handlers de Navegação
  const handleLoginSuccess = (id: string) => {
    setInscription(id);
    // Se o ID for o de sucesso, avançamos para personalização
    if (id === "123456789012") {
      setCurrentScreen('customize');
    } else {
      // Para outros IDs (erro/não encontrado), vamos direto para a tela de resultado
      // onde o ResultScreen tratará a exibição da mensagem de erro
      setCurrentScreen('processing');
    }
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
    setCurrentScreen('profile');
  };

  const handleBackToLogin = () => {
    setInscription('');
    setSimulationConfig(null);
    setCurrentAnswers([]);
    setTargetQuestionIndex(0);
    setCurrentScreen('login');
  };

  const handleBackToResult = () => {
    setCurrentScreen('result');
  };

  const handleBackToCustomize = () => {
    setCurrentScreen('customize');
  };

  const handleViewProfileFromLogin = () => {
    // Usar um ID padrão para demo
    setInscription('123456789012');
    setCurrentScreen('profile');
  };

  // Get questions based on config
  const getQuestions = () => {
    if (!simulationConfig) return [];
    // For now, return the first N questions from mock data
    return mockQuestions.slice(0, simulationConfig.questions);
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased">
      {currentScreen === 'login' && (
        <ConsultationForm 
          onSubmit={handleLoginSuccess}
          onViewProfile={handleViewProfileFromLogin}
        />
      )}

      {currentScreen === 'customize' && (
        <CustomizeSimulationScreen 
          onGenerate={handleGenerateSimulado}
          onBack={handleBackToLogin}
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

      {currentScreen === 'profile' && (
        <DetailedProfile 
          inscription={inscription} 
          onBack={handleBackToResult}
        />
      )}
    </main>
  );
}
