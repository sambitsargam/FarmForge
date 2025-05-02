import { create } from 'zustand';
import { FormData, StrategyType, RiskTolerance } from '../types';

interface FormState extends FormData {
  currentStep: number;
  isValid: (step: number) => boolean;
  setStep: (step: number) => void;
  updateForm: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  // Step 1
  strategyType: 'yield_farming',
  targetApy: 10,
  riskTolerance: 'medium',
  strategyName: '',
  strategyDescription: '',
  
  // Step 2
  collateralAssets: [],
  allocationPercentages: {},
  
  // Step 3
  verifierRequirements: {
    minCount: 3,
    stakingAmount: 1000,
    performanceThreshold: 95,
  },
  
  // Step 4
  sharpeRatio: 0,
  benchmarkExpectations: {
    conservative: 0,
    expected: 0,
    optimistic: 0,
  },
  feeStructure: {
    managementFee: 2,
    performanceFee: 20,
    entryFee: 0.5,
    exitFee: 1,
  },
  
  // Step 5
  termsAccepted: false,
};

export const useFormStore = create<FormState>((set, get) => ({
  ...initialFormData,
  currentStep: 1,
  
  isValid: (step: number) => {
    const state = get();
    
    switch (step) {
      case 1:
        return !!state.strategyName && !!state.strategyDescription && state.targetApy > 0;
      case 2:
        return state.collateralAssets.length > 0 && 
          Object.values(state.allocationPercentages).reduce((sum, val) => sum + val, 0) === 100;
      case 3:
        return state.verifierRequirements.minCount >= 1 && 
          state.verifierRequirements.stakingAmount > 0 && 
          state.verifierRequirements.performanceThreshold > 0;
      case 4:
        return true; // This step is mostly informational
      case 5:
        return state.termsAccepted;
      default:
        return false;
    }
  },
  
  setStep: (step: number) => set({ currentStep: step }),
  
  updateForm: (data: Partial<FormData>) => set((state) => ({
    ...state,
    ...data,
  })),
  
  resetForm: () => set({ ...initialFormData, currentStep: 1 }),
}));