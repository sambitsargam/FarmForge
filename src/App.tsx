import React from 'react';
import { useFormStore } from './store/formStore';
import Step1StrategyType from './components/wizard/Step1StrategyType';
import Step2CollateralAssets from './components/wizard/Step2CollateralAssets';
import Step3VerifierRequirements from './components/wizard/Step3VerifierRequirements';
import Step4PerformanceMetrics from './components/wizard/Step4PerformanceMetrics';
import Step5Deployment from './components/wizard/Step5Deployment';

function App() {
  const { currentStep } = useFormStore();
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1StrategyType />;
      case 2:
        return <Step2CollateralAssets />;
      case 3:
        return <Step3VerifierRequirements />;
      case 4:
        return <Step4PerformanceMetrics />;
      case 5:
        return <Step5Deployment />;
      default:
        return <Step1StrategyType />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {renderStep()}
    </div>
  );
}

export default App;