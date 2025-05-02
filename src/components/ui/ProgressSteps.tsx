import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li 
            key={step.id} 
            className={clsx(
              stepIdx !== steps.length - 1 ? 'pb-10' : '',
              'relative'
            )}
          >
            {step.id < currentStep ? (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-600" aria-hidden="true" />
                )}
                <button
                  className="group relative flex items-start"
                  onClick={() => onStepClick && onStepClick(step.id)}
                  disabled={!onStepClick}
                >
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-800">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-primary-600">{step.name}</span>
                    {step.description && (
                      <span className="text-sm text-gray-500">{step.description}</span>
                    )}
                  </span>
                </button>
              </>
            ) : step.id === currentStep ? (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                )}
                <button
                  className="group relative flex items-start"
                  aria-current="step"
                  onClick={() => onStepClick && onStepClick(step.id)}
                  disabled={!onStepClick}
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-primary-600">{step.name}</span>
                    {step.description && (
                      <span className="text-sm text-gray-500">{step.description}</span>
                    )}
                  </span>
                </button>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                )}
                <button
                  className="group relative flex items-start"
                  onClick={() => onStepClick && onStepClick(step.id)}
                  disabled={!onStepClick}
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-500">{step.name}</span>
                    {step.description && (
                      <span className="text-sm text-gray-500">{step.description}</span>
                    )}
                  </span>
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressSteps;