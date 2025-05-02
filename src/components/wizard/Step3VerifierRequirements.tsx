import React from 'react';
import { useFormStore } from '../../store/formStore';
import WizardLayout from './WizardLayout';
import Input from '../ui/Input';
import Slider from '../ui/Slider';
import { Card, CardHeader, CardBody } from '../ui/Card';
import InfoTooltip from '../ui/InfoTooltip';
import { Users, Coins, BarChart3 } from 'lucide-react';

const Step3VerifierRequirements: React.FC = () => {
  const { 
    verifierRequirements,
    updateForm 
  } = useFormStore();
  
  const handleMinCountChange = (value: number) => {
    updateForm({
      verifierRequirements: {
        ...verifierRequirements,
        minCount: value
      }
    });
  };
  
  const handleStakingAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateForm({
      verifierRequirements: {
        ...verifierRequirements,
        stakingAmount: value
      }
    });
  };
  
  const handlePerformanceThresholdChange = (value: number) => {
    updateForm({
      verifierRequirements: {
        ...verifierRequirements,
        performanceThreshold: value
      }
    });
  };
  
  return (
    <WizardLayout 
      title="Verifier Requirements" 
      description="Define the requirements for verifiers who will help secure and validate your farm's operations."
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Verifiers play a crucial role in ensuring the security and performance of your farm. 
                They stake tokens as collateral and are rewarded for maintaining high performance standards.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Minimum Verifiers</h3>
              <InfoTooltip content="The minimum number of verifiers required to operate your farm. More verifiers increase security but may reduce individual rewards." />
            </CardHeader>
            <CardBody>
              <Slider
                min={1}
                max={10}
                step={1}
                value={verifierRequirements.minCount}
                onChange={handleMinCountChange}
                showValue
                helperText="Recommended: 3-5 verifiers for balanced security and efficiency"
              />
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Staking Requirement</h3>
              <InfoTooltip content="The amount of tokens each verifier must stake to participate. Higher stakes increase security but may limit verifier participation." />
            </CardHeader>
            <CardBody>
              <Input
                type="number"
                min="100"
                value={verifierRequirements.stakingAmount}
                onChange={handleStakingAmountChange}
                helperText="Amount in USD value of tokens"
                fullWidth
              />
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-medium text-gray-900">Performance Threshold</h3>
              <InfoTooltip content="The minimum performance level verifiers must maintain. Higher thresholds ensure better service but may be harder to maintain." />
            </CardHeader>
            <CardBody>
              <Slider
                min={80}
                max={99}
                step={1}
                value={verifierRequirements.performanceThreshold}
                onChange={handlePerformanceThresholdChange}
                valueSuffix="%"
                helperText="Recommended: 95% for optimal balance"
              />
            </CardBody>
          </Card>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Verifier Incentives</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward Multiplier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slashing Risk
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Above {verifierRequirements.performanceThreshold}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1.2x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    None
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {verifierRequirements.performanceThreshold - 5}% - {verifierRequirements.performanceThreshold}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1.0x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    None
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {verifierRequirements.performanceThreshold - 10}% - {verifierRequirements.performanceThreshold - 5}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0.8x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5% of stake
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Below {verifierRequirements.performanceThreshold - 10}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0.5x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10% of stake
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
};

export default Step3VerifierRequirements;