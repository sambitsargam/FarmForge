import React, { useState, useEffect } from 'react';
import { useFormStore } from '../../store/formStore';
import { useWalletStore } from '../../store/walletStore';
import WizardLayout from './WizardLayout';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { deployFarmContract, estimateTransactionCost, getGasPrice } from '../../services/blockchain';
import { AlertCircle, CheckCircle2, XCircle, Wallet, ExternalLink } from 'lucide-react';

const Step5Deployment: React.FC = () => {
  const { 
    strategyName,
    strategyType,
    targetApy,
    riskTolerance,
    collateralAssets,
    allocationPercentages,
    verifierRequirements,
    sharpeRatio,
    benchmarkExpectations,
    feeStructure,
    termsAccepted,
    updateForm 
  } = useFormStore();
  
  const { 
    connected, 
    address, 
    provider, 
    signer,
    connect,
    isCorrectNetwork,
    switchNetwork
  } = useWalletStore();
  
  const [deploying, setDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<{
    success?: boolean;
    txHash?: string;
    farmAddress?: string;
    error?: string;
  } | null>(null);
  
  const [gasPrice, setGasPrice] = useState<string>('unknown');
  const [estimatedCost, setEstimatedCost] = useState<string>('unknown');
  
  useEffect(() => {
    const fetchGasEstimates = async () => {
      if (provider) {
        const price = await getGasPrice(provider);
        const cost = await estimateTransactionCost(provider);
        
        setGasPrice(price);
        setEstimatedCost(cost);
      }
    };
    
    if (connected) {
      fetchGasEstimates();
    }
  }, [connected, provider]);
  
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ termsAccepted: e.target.checked });
  };
  
  const handleDeploy = async () => {
    if (!connected || !signer) {
      await connect();
      return;
    }
    
    if (!isCorrectNetwork()) {
      await switchNetwork();
      return;
    }
    
    if (!termsAccepted) {
      return;
    }
    
    setDeploying(true);
    setDeploymentResult(null);
    
    try {
      const formData = {
        strategyName,
        strategyDescription: `A ${riskTolerance} risk ${strategyType.replace('_', ' ')} strategy targeting ${targetApy}% APY`,
        strategyType,
        targetApy,
        riskTolerance,
        collateralAssets,
        allocationPercentages,
        verifierRequirements,
        sharpeRatio,
        benchmarkExpectations,
        feeStructure
      };
      
      const result = await deployFarmContract(formData, signer);
      setDeploymentResult(result);
    } catch (error: any) {
      setDeploymentResult({
        success: false,
        error: error.message || 'Unknown error occurred'
      });
    } finally {
      setDeploying(false);
    }
  };
  
  return (
    <WizardLayout 
      title="Deploy Your Farm" 
      description="Review your strategy details and deploy your farm to the blockchain."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Strategy Summary</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Basic Information</h4>
                <dl className="space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Strategy Name</dt>
                    <dd className="text-sm font-medium text-gray-900">{strategyName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Strategy Type</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {strategyType === 'yield_farming' ? 'Yield Farming' : 
                       strategyType === 'staking' ? 'Staking' : 'RWA Integration'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Target APY</dt>
                    <dd className="text-sm font-medium text-gray-900">{targetApy}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Risk Tolerance</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {riskTolerance === 'low' ? 'Low' : 
                       riskTolerance === 'medium' ? 'Medium' : 'High'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Sharpe Ratio</dt>
                    <dd className="text-sm font-medium text-gray-900">{sharpeRatio.toFixed(2)}</dd>
                  </div>
                </dl>
                
                <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">Verifier Requirements</h4>
                <dl className="space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Minimum Count</dt>
                    <dd className="text-sm font-medium text-gray-900">{verifierRequirements.minCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Staking Amount</dt>
                    <dd className="text-sm font-medium text-gray-900">${verifierRequirements.stakingAmount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Performance Threshold</dt>
                    <dd className="text-sm font-medium text-gray-900">{verifierRequirements.performanceThreshold}%</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Fee Structure</h4>
                <dl className="space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Management Fee</dt>
                    <dd className="text-sm font-medium text-gray-900">{feeStructure.managementFee}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Performance Fee</dt>
                    <dd className="text-sm font-medium text-gray-900">{feeStructure.performanceFee}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Entry Fee</dt>
                    <dd className="text-sm font-medium text-gray-900">{feeStructure.entryFee}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Exit Fee</dt>
                    <dd className="text-sm font-medium text-gray-900">{feeStructure.exitFee}%</dd>
                  </div>
                </dl>
                
                <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">Collateral Assets</h4>
                <div className="space-y-2">
                  {collateralAssets.map(assetId => (
                    <div key={assetId} className="flex justify-between">
                      <span className="text-sm text-gray-500">{assetId}</span>
                      <span className="text-sm font-medium text-gray-900">{allocationPercentages[assetId]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Deployment Information</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Current Gas Price</span>
              <span className="text-sm font-medium text-gray-900">{gasPrice} Gwei</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Estimated Transaction Cost</span>
              <span className="text-sm font-medium text-gray-900">~{estimatedCost} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Network</span>
              <span className="text-sm font-medium text-gray-900">Ethereum Mainnet</span>
            </div>
          </div>
        </div>
        
        <Checkbox
          label="I confirm that I have reviewed all details and understand that once deployed, the farm's parameters cannot be changed."
          checked={termsAccepted}
          onChange={handleTermsChange}
        />
        
        {deploymentResult && (
          <div className={`p-4 rounded-lg ${deploymentResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {deploymentResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${deploymentResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {deploymentResult.success ? 'Deployment Successful' : 'Deployment Failed'}
                </h3>
                <div className="mt-2 text-sm">
                  {deploymentResult.success ? (
                    <div className="space-y-1">
                      <p className="text-green-700">
                        Your farm has been successfully deployed to the blockchain.
                      </p>
                      {deploymentResult.txHash && (
                        <p className="flex items-center">
                          <span className="text-gray-500">Transaction:</span>
                          <a 
                            href={`https://etherscan.io/tx/${deploymentResult.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-primary-600 hover:text-primary-500 flex items-center"
                          >
                            {`${deploymentResult.txHash.substring(0, 10)}...${deploymentResult.txHash.substring(deploymentResult.txHash.length - 8)}`}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        </p>
                      )}
                      {deploymentResult.farmAddress && (
                        <p className="flex items-center">
                          <span className="text-gray-500">Farm Address:</span>
                          <a 
                            href={`https://etherscan.io/address/${deploymentResult.farmAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-primary-600 hover:text-primary-500 flex items-center"
                          >
                            {`${deploymentResult.farmAddress.substring(0, 10)}...${deploymentResult.farmAddress.substring(deploymentResult.farmAddress.length - 8)}`}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-700">
                      {deploymentResult.error || 'An unknown error occurred during deployment.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center pt-4">
          {!connected ? (
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Wallet size={18} />}
              onClick={connect}
              fullWidth
            >
              Connect Wallet to Deploy
            </Button>
          ) : !isCorrectNetwork() ? (
            <Button
              variant="primary"
              size="lg"
              onClick={switchNetwork}
              fullWidth
            >
              Switch to Ethereum Mainnet
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleDeploy}
              isLoading={deploying}
              disabled={!termsAccepted || deploying}
              fullWidth
            >
              {deploying ? 'Deploying...' : 'Deploy Farm'}
            </Button>
          )}
        </div>
        
        {!connected && (
          <div className="text-center text-sm text-gray-500">
            <p>You'll need to connect your wallet to deploy your farm to the blockchain.</p>
          </div>
        )}
      </div>
    </WizardLayout>
  );
};

export default Step5Deployment;