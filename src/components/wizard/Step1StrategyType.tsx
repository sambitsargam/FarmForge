import React from 'react';
import { useFormStore } from '../../store/formStore';
import WizardLayout from './WizardLayout';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Slider from '../ui/Slider';
import { Card, CardBody } from '../ui/Card';
import InfoTooltip from '../ui/InfoTooltip';
import { TrendingUp, Shield, Building2 } from 'lucide-react';

const strategyOptions = [
  { value: 'yield_farming', label: 'Yield Farming' },
  { value: 'staking', label: 'Staking' },
  { value: 'rwa_integration', label: 'RWA Integration' },
];

const riskOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const Step1StrategyType: React.FC = () => {
  const { 
    strategyType, 
    targetApy, 
    riskTolerance, 
    strategyName,
    strategyDescription,
    updateForm 
  } = useFormStore();
  
  const handleStrategyTypeChange = (value: string) => {
    updateForm({ strategyType: value as any });
  };
  
  const handleRiskToleranceChange = (value: string) => {
    updateForm({ riskTolerance: value as any });
  };
  
  const handleTargetApyChange = (value: number) => {
    updateForm({ targetApy: value });
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ strategyName: e.target.value });
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ strategyDescription: e.target.value });
  };
  
  return (
    <WizardLayout 
      title="Define Your Strategy" 
      description="Start by selecting the type of strategy you want to create and setting your target parameters."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Yield Farming</h3>
              <p className="text-sm text-gray-500">
                Maximize returns by automatically allocating assets across DeFi protocols.
              </p>
            </CardBody>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Staking</h3>
              <p className="text-sm text-gray-500">
                Earn passive income by staking assets to secure blockchain networks.
              </p>
            </CardBody>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">RWA Integration</h3>
              <p className="text-sm text-gray-500">
                Connect real-world assets to DeFi for stable, collateralized returns.
              </p>
            </CardBody>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Strategy Name"
              placeholder="Enter a name for your strategy"
              value={strategyName}
              onChange={handleNameChange}
              helperText="Choose a clear, descriptive name for your farm strategy"
              fullWidth
            />
            
            <Input
              label="Strategy Description"
              placeholder="Briefly describe your strategy"
              value={strategyDescription}
              onChange={handleDescriptionChange}
              helperText="Explain the goals and approach of your strategy"
              fullWidth
            />
          </div>
          
          <div>
            <Select
              label="Strategy Type"
              options={strategyOptions}
              value={strategyType}
              onChange={handleStrategyTypeChange}
              helperText="Select the primary strategy approach"
              fullWidth
            />
            
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Target APY
              </label>
              <InfoTooltip content="The annual percentage yield you aim to achieve with this strategy" />
            </div>
            <Slider
              min={1}
              max={50}
              step={0.5}
              value={targetApy}
              onChange={handleTargetApyChange}
              valueSuffix="%"
              helperText="Higher targets typically involve higher risk"
            />
            
            <Select
              label="Risk Tolerance"
              options={riskOptions}
              value={riskTolerance}
              onChange={handleRiskToleranceChange}
              helperText="This affects asset selection and strategy parameters"
              fullWidth
            />
          </div>
        </div>
      </div>
    </WizardLayout>
  );
};

export default Step1StrategyType;