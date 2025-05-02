import React, { useEffect, useState } from 'react';
import { useFormStore } from '../../store/formStore';
import WizardLayout from './WizardLayout';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Slider from '../ui/Slider';
import InfoTooltip from '../ui/InfoTooltip';
import { calculateSharpeRatio, calculateBenchmarks } from '../../services/api';
import { TrendingUp, BarChart4, Percent } from 'lucide-react';

const Step4PerformanceMetrics: React.FC = () => {
  const { 
    strategyType,
    targetApy,
    riskTolerance,
    collateralAssets,
    allocationPercentages,
    sharpeRatio,
    benchmarkExpectations,
    feeStructure,
    updateForm 
  } = useFormStore();
  
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const calculateMetrics = async () => {
      setLoading(true);
      try {
        // Calculate Sharpe ratio based on selected assets and risk tolerance
        const calculatedSharpeRatio = await calculateSharpeRatio(
          collateralAssets,
          allocationPercentages,
          riskTolerance
        );
        
        // Calculate benchmark expectations based on Sharpe ratio and target APY
        const calculatedBenchmarks = await calculateBenchmarks(
          calculatedSharpeRatio,
          targetApy
        );
        
        updateForm({
          sharpeRatio: calculatedSharpeRatio,
          benchmarkExpectations: calculatedBenchmarks
        });
      } catch (error) {
        console.error('Error calculating metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    calculateMetrics();
  }, [collateralAssets, allocationPercentages, riskTolerance, targetApy, updateForm]);
  
  const handleFeeChange = (feeType: keyof typeof feeStructure, value: number) => {
    updateForm({
      feeStructure: {
        ...feeStructure,
        [feeType]: value
      }
    });
  };
  
  return (
    <WizardLayout 
      title="Performance Metrics & Fee Structure" 
      description="Review the calculated performance metrics and set your fee structure."
    >
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary-400 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Calculating metrics...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-medium text-gray-900">Sharpe Ratio</h3>
                  <InfoTooltip content="The Sharpe ratio measures the performance of an investment compared to a risk-free asset, after adjusting for risk. Higher is better." />
                </CardHeader>
                <CardBody className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {sharpeRatio.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {sharpeRatio > 2 ? 'Excellent' : sharpeRatio > 1.5 ? 'Good' : sharpeRatio > 1 ? 'Average' : 'Below Average'}
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <BarChart4 className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-medium text-gray-900">Expected Returns</h3>
                  <InfoTooltip content="Projected annual returns based on your strategy parameters and market conditions." />
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Conservative</span>
                        <span className="font-medium text-gray-900">{benchmarkExpectations.conservative}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(benchmarkExpectations.conservative / targetApy) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Expected</span>
                        <span className="font-medium text-gray-900">{benchmarkExpectations.expected}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${(benchmarkExpectations.expected / targetApy) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Optimistic</span>
                        <span className="font-medium text-gray-900">{benchmarkExpectations.optimistic}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full" 
                          style={{ width: `${(benchmarkExpectations.optimistic / targetApy) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Percent className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-medium text-gray-900">Strategy Details</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Strategy Type</span>
                      <span className="text-sm font-medium text-gray-900">
                        {strategyType === 'yield_farming' ? 'Yield Farming' : 
                         strategyType === 'staking' ? 'Staking' : 'RWA Integration'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Target APY</span>
                      <span className="text-sm font-medium text-gray-900">{targetApy}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Risk Tolerance</span>
                      <span className="text-sm font-medium text-gray-900">
                        {riskTolerance === 'low' ? 'Low' : 
                         riskTolerance === 'medium' ? 'Medium' : 'High'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Assets</span>
                      <span className="text-sm font-medium text-gray-900">{collateralAssets.length}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Structure</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Management Fee</span>
                    <InfoTooltip content="Annual fee charged for managing the farm, calculated as a percentage of assets under management" />
                  </div>
                  <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={feeStructure.managementFee}
                    onChange={(value) => handleFeeChange('managementFee', value)}
                    valueSuffix="%"
                    helperText="Industry standard: 1-3%"
                  />
                  
                  <div className="flex items-center mb-1 mt-4">
                    <span className="text-sm font-medium text-gray-700">Performance Fee</span>
                    <InfoTooltip content="Fee charged on profits generated by the farm" />
                  </div>
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    value={feeStructure.performanceFee}
                    onChange={(value) => handleFeeChange('performanceFee', value)}
                    valueSuffix="%"
                    helperText="Industry standard: 10-20%"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Entry Fee</span>
                    <InfoTooltip content="One-time fee charged when users deposit into the farm" />
                  </div>
                  <Slider
                    min={0}
                    max={3}
                    step={0.1}
                    value={feeStructure.entryFee}
                    onChange={(value) => handleFeeChange('entryFee', value)}
                    valueSuffix="%"
                    helperText="Industry standard: 0-1%"
                  />
                  
                  <div className="flex items-center mb-1 mt-4">
                    <span className="text-sm font-medium text-gray-700">Exit Fee</span>
                    <InfoTooltip content="Fee charged when users withdraw from the farm" />
                  </div>
                  <Slider
                    min={0}
                    max={3}
                    step={0.1}
                    value={feeStructure.exitFee}
                    onChange={(value) => handleFeeChange('exitFee', value)}
                    valueSuffix="%"
                    helperText="Industry standard: 0-2%"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Fee Summary</h4>
                <p className="text-sm text-gray-500">
                  For a $10,000 investment with a 10% return, you would earn approximately:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-500">
                  <li>
                    Management Fee: ${(10000 * feeStructure.managementFee / 100).toFixed(2)} per year
                  </li>
                  <li>
                    Performance Fee: ${(1000 * feeStructure.performanceFee / 100).toFixed(2)} on profits
                  </li>
                  <li>
                    Entry Fee: ${(10000 * feeStructure.entryFee / 100).toFixed(2)} at deposit
                  </li>
                  <li>
                    Exit Fee: ${(11000 * feeStructure.exitFee / 100).toFixed(2)} at withdrawal
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </WizardLayout>
  );
};

export default Step4PerformanceMetrics;