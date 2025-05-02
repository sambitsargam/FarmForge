import axios from 'axios';
import { Asset } from '../types';

// Mock TWAP API endpoint
const API_BASE_URL = 'https://api.example.com/v1';

// Mock assets data
const MOCK_ASSETS: Asset[] = [
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 3245.67,
    change24h: 2.34,
    tvl: 45000000000
  },
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: 52345.89,
    change24h: 1.23,
    tvl: 120000000000
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    price: 1.00,
    change24h: 0.01,
    tvl: 32000000000
  },
  {
    id: 'dai',
    symbol: 'DAI',
    name: 'Dai',
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    price: 1.00,
    change24h: 0.02,
    tvl: 8000000000
  },
  {
    id: 'aave',
    symbol: 'AAVE',
    name: 'Aave',
    logo: 'https://cryptologos.cc/logos/aave-aave-logo.png',
    price: 92.45,
    change24h: -1.23,
    tvl: 1200000000
  },
  {
    id: 'compound',
    symbol: 'COMP',
    name: 'Compound',
    logo: 'https://cryptologos.cc/logos/compound-comp-logo.png',
    price: 58.32,
    change24h: 3.45,
    tvl: 800000000
  },
  {
    id: 'uniswap',
    symbol: 'UNI',
    name: 'Uniswap',
    logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    price: 7.89,
    change24h: 5.67,
    tvl: 3500000000
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    price: 14.56,
    change24h: 2.78,
    tvl: 5000000000
  }
];

// In a real app, this would fetch from a real API
export const getAssets = async (): Promise<Asset[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ASSETS);
    }, 500);
  });
};

// Get asset price from Uniswap V3 TWAP Oracle (simulated)
export const getAssetPrice = async (assetId: string): Promise<number> => {
  const asset = MOCK_ASSETS.find(a => a.id === assetId);
  return asset ? asset.price : 0;
};

// Calculate Sharpe Ratio based on selected assets and allocations
export const calculateSharpeRatio = async (
  assets: string[],
  allocations: Record<string, number>,
  riskTolerance: string
): Promise<number> => {
  // Simulated calculation
  // In a real app, this would use historical data and proper financial calculations
  const baseRatio = {
    'low': 1.2,
    'medium': 1.8,
    'high': 2.5
  }[riskTolerance] || 1.5;
  
  // Add some randomness based on assets
  const assetFactor = assets.length / 10 + Math.random() * 0.5;
  
  return parseFloat((baseRatio + assetFactor).toFixed(2));
};

// Calculate benchmark expectations based on Sharpe ratio and target APY
export const calculateBenchmarks = async (
  sharpeRatio: number,
  targetApy: number
): Promise<{ conservative: number; expected: number; optimistic: number }> => {
  return {
    conservative: parseFloat((targetApy * 0.7).toFixed(2)),
    expected: parseFloat(targetApy.toFixed(2)),
    optimistic: parseFloat((targetApy * 1.3).toFixed(2))
  };
};

// Simulate deploying a farm to the blockchain
export const deployFarm = async (formData: any, signer: any): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  // Simulate blockchain delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success (90% of the time)
  if (Math.random() > 0.1) {
    return {
      success: true,
      txHash: `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };
  } else {
    return {
      success: false,
      error: "Transaction failed. Please try again."
    };
  }
};