import React, { useState, useEffect } from 'react';
import { useFormStore } from '../../store/formStore';
import WizardLayout from './WizardLayout';
import { getAssets } from '../../services/api';
import { Asset } from '../../types';
import AssetCard from '../ui/AssetCard';
import Input from '../ui/Input';
import { Search, AlertCircle } from 'lucide-react';
import InfoTooltip from '../ui/InfoTooltip';

const Step2CollateralAssets: React.FC = () => {
  const { 
    collateralAssets, 
    allocationPercentages, 
    updateForm 
  } = useFormStore();
  
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load assets. Please try again.');
        setLoading(false);
      }
    };
    
    fetchAssets();
  }, []);
  
  const handleAssetClick = (assetId: string) => {
    let newCollateralAssets = [...collateralAssets];
    let newAllocationPercentages = { ...allocationPercentages };
    
    if (newCollateralAssets.includes(assetId)) {
      // Remove asset
      newCollateralAssets = newCollateralAssets.filter(id => id !== assetId);
      delete newAllocationPercentages[assetId];
    } else {
      // Add asset
      newCollateralAssets.push(assetId);
      
      // Distribute allocations evenly
      const equalAllocation = Math.floor(100 / newCollateralAssets.length);
      const remainder = 100 - (equalAllocation * newCollateralAssets.length);
      
      newCollateralAssets.forEach((id, index) => {
        newAllocationPercentages[id] = equalAllocation + (index === 0 ? remainder : 0);
      });
    }
    
    updateForm({ 
      collateralAssets: newCollateralAssets,
      allocationPercentages: newAllocationPercentages
    });
  };
  
  const handleAllocationChange = (assetId: string, value: string) => {
    const newValue = parseInt(value) || 0;
    
    if (newValue < 0 || newValue > 100) return;
    
    const newAllocationPercentages = { ...allocationPercentages };
    newAllocationPercentages[assetId] = newValue;
    
    updateForm({ allocationPercentages: newAllocationPercentages });
  };
  
  const totalAllocation = Object.values(allocationPercentages).reduce((sum, val) => sum + val, 0);
  const isAllocationValid = totalAllocation === 100;
  
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <WizardLayout 
      title="Select Collateral Assets" 
      description="Choose the assets to include in your strategy and set allocation percentages."
    >
      <div className="space-y-6">
        <div className="relative">
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-400" />}
            fullWidth
          />
        </div>
        
        {!isAllocationValid && collateralAssets.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Total allocation must equal 100%. Current total: {totalAllocation}%
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Selected Assets ({collateralAssets.length})
          </h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-1">Total Allocation:</span>
            <span className={`text-sm font-medium ${isAllocationValid ? 'text-green-600' : 'text-red-600'}`}>
              {totalAllocation}%
            </span>
            <InfoTooltip content="The sum of all asset allocations must equal 100%" />
          </div>
        </div>
        
        {collateralAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collateralAssets.map(assetId => {
              const asset = assets.find(a => a.id === assetId);
              if (!asset) return null;
              
              return (
                <div key={assetId} className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img src={asset.logo} alt={asset.name} className="h-10 w-10 rounded-full" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {asset.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {asset.symbol}
                    </p>
                  </div>
                  
                  <div className="w-24">
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={allocationPercentages[assetId] || 0}
                        onChange={(e) => handleAllocationChange(assetId, e.target.value)}
                        className="block w-16 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                      <span className="ml-1 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No assets selected. Choose from the list below.</p>
          </div>
        )}
        
        <h3 className="text-lg font-medium text-gray-900 mt-8">Available Assets</h3>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary-400 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading assets...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
            <p className="mt-2 text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map(asset => (
              <AssetCard
                key={asset.id}
                asset={asset}
                selected={collateralAssets.includes(asset.id)}
                onClick={() => handleAssetClick(asset.id)}
              />
            ))}
          </div>
        )}
      </div>
    </WizardLayout>
  );
};

export default Step2CollateralAssets;