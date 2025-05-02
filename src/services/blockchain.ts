import { ethers } from 'ethers';
import { FormData } from '../types';

// Mock ABI for the Dexponent Farm Factory contract
const FARM_FACTORY_ABI = [
  "function deployFarm(string name, string description, uint256 targetApy, uint8 riskLevel, address[] collateralAssets, uint256[] allocations, uint256 minVerifiers, uint256 stakingAmount, uint256 performanceThreshold, uint256[] fees) external returns (address)",
  "event FarmDeployed(address indexed farmAddress, address indexed creator, string name)"
];

// Mock contract address
const FARM_FACTORY_ADDRESS = "0x1234567890123456789012345678901234567890";

export const deployFarmContract = async (
  formData: FormData,
  signer: ethers.Signer
): Promise<{ success: boolean; txHash?: string; farmAddress?: string; error?: string }> => {
  try {
    // Create contract instance
    const farmFactory = new ethers.Contract(
      FARM_FACTORY_ADDRESS,
      FARM_FACTORY_ABI,
      signer
    );
    
    // Convert risk tolerance to numeric value
    const riskLevelMap: Record<string, number> = {
      'low': 1,
      'medium': 2,
      'high': 3
    };
    
    // Prepare allocation percentages in the same order as collateral assets
    const allocations = formData.collateralAssets.map(
      assetId => formData.allocationPercentages[assetId] * 100 // Convert to basis points
    );
    
    // Prepare fee structure (convert percentages to basis points)
    const fees = [
      formData.feeStructure.managementFee * 100,
      formData.feeStructure.performanceFee * 100,
      formData.feeStructure.entryFee * 100,
      formData.feeStructure.exitFee * 100
    ];
    
    // Estimate gas
    const gasEstimate = await farmFactory.deployFarm.estimateGas(
      formData.strategyName,
      formData.strategyDescription,
      Math.floor(formData.targetApy * 100), // Convert to basis points
      riskLevelMap[formData.riskTolerance],
      formData.collateralAssets,
      allocations,
      formData.verifierRequirements.minCount,
      ethers.parseEther(formData.verifierRequirements.stakingAmount.toString()),
      formData.verifierRequirements.performanceThreshold * 100, // Convert to basis points
      fees
    );
    
    // Add 20% buffer to gas estimate
    const gasLimit = Math.floor(gasEstimate * 1.2);
    
    // Deploy farm
    const tx = await farmFactory.deployFarm(
      formData.strategyName,
      formData.strategyDescription,
      Math.floor(formData.targetApy * 100), // Convert to basis points
      riskLevelMap[formData.riskTolerance],
      formData.collateralAssets,
      allocations,
      formData.verifierRequirements.minCount,
      ethers.parseEther(formData.verifierRequirements.stakingAmount.toString()),
      formData.verifierRequirements.performanceThreshold * 100, // Convert to basis points
      fees,
      { gasLimit }
    );
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    // Extract farm address from event logs
    const farmDeployedEvent = receipt.logs
      .filter((log: any) => log.topics[0] === ethers.id("FarmDeployed(address,address,string)"))
      .map((log: any) => farmFactory.interface.parseLog(log))[0];
    
    const farmAddress = farmDeployedEvent.args[0];
    
    return {
      success: true,
      txHash: receipt.hash,
      farmAddress
    };
  } catch (error: any) {
    console.error("Error deploying farm:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred"
    };
  }
};

// Get gas price estimate
export const getGasPrice = async (provider: ethers.Provider): Promise<string> => {
  try {
    const feeData = await provider.getFeeData();
    return ethers.formatUnits(feeData.gasPrice || 0, 'gwei');
  } catch (error) {
    console.error("Error getting gas price:", error);
    return "unknown";
  }
};

// Estimate transaction cost
export const estimateTransactionCost = async (
  provider: ethers.Provider,
  gasLimit: number = 500000 // Default gas limit estimate
): Promise<string> => {
  try {
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice || ethers.parseUnits("50", "gwei");
    const costWei = gasPrice * BigInt(gasLimit);
    return ethers.formatEther(costWei);
  } catch (error) {
    console.error("Error estimating transaction cost:", error);
    return "unknown";
  }
};