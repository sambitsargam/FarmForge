import React from 'react';
import { motion } from 'framer-motion';
import { useFormStore } from '../../store/formStore';
import ProgressSteps from '../ui/ProgressSteps';
import Button from '../ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

interface WizardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const steps = [
  { id: 1, name: 'Strategy Type' },
  { id: 2, name: 'Collateral Assets' },
  { id: 3, name: 'Verifier Requirements' },
  { id: 4, name: 'Performance Metrics' },
  { id: 5, name: 'Deployment' },
];

const WizardLayout: React.FC<WizardLayoutProps> = ({
  children,
  title,
  description,
}) => {
  const { currentStep, setStep, isValid } = useFormStore();
  
  const handleNext = () => {
    if (currentStep < steps.length && isValid(currentStep)) {
      setStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };
  
  const handleStepClick = (step: number) => {
    // Only allow going back to previous steps or current step
    if (step <= currentStep) {
      setStep(step);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <div className="sticky top-8">
                <ProgressSteps 
                  steps={steps} 
                  currentStep={currentStep} 
                  onStepClick={handleStepClick}
                />
              </div>
            </div>
            
            <div className="md:col-span-9">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                  {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  )}
                </div>
                
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-5"
                >
                  {children}
                </motion.div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                  <Button
                    variant="outline"
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < steps.length ? (
                    <Button
                      variant="primary"
                      rightIcon={<ArrowRight size={16} />}
                      onClick={handleNext}
                      disabled={!isValid(currentStep)}
                    >
                      Next
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WizardLayout;