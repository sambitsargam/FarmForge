export type StrategyType = 'yield_farming' | 'staking' | 'rwa_integration';

export type RiskTolerance = 'low' | 'medium' | 'high';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  tvl?: number;
}

export interface VerifierRequirement {
  minCount: number;
  stakingAmount: number;
  performanceThreshold: number;
}

export interface FeeStructure {
  managementFee: number;
  performanceFee: number;
  entryFee: number;
  exitFee: number;
}

export interface FormData {
  // Step 1
  strategyType: StrategyType;
  targetApy: number;
  riskTolerance: RiskTolerance;
  strategyName: string;
  strategyDescription: string;
  
  // Step 2
  collateralAssets: string[];
  allocationPercentages: Record<string, number>;
  
  // Step 3
  verifierRequirements: VerifierRequirement;
  
  // Step 4
  sharpeRatio: number;
  benchmarkExpectations: {
    conservative: number;
    expected: number;
    optimistic: number;
  };
  feeStructure: FeeStructure;
  
  // Step 5
  termsAccepted: boolean;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  provider: any | null;
  signer: any | null;
}