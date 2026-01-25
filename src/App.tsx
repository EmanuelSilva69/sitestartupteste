import { useState } from 'react';
import { ConsultationForm } from './components/ConsultationForm';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { DetailedProfile } from './components/DetailedProfile';

type Screen = 'form' | 'processing' | 'result' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('form');
  const [inscription, setInscription] = useState('');

  const handleStartConsultation = (inscriptionNumber: string) => {
    setInscription(inscriptionNumber);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('result');
  };

  const handleViewProfile = () => {
    setCurrentScreen('profile');
  };

  const handleBackToForm = () => {
    setCurrentScreen('form');
    setInscription('');
  };

  const handleBackToResult = () => {
    setCurrentScreen('result');
  };

  return (
    <>
      {currentScreen === 'form' && (
        <ConsultationForm onSubmit={handleStartConsultation} />
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
          onBackToSearch={handleBackToForm}
          onViewDetails={handleViewProfile}
        />
      )}
      {currentScreen === 'profile' && (
        <DetailedProfile 
          inscription={inscription} 
          onBack={handleBackToResult}
        />
      )}
    </>
  );
}
