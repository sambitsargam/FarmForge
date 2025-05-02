import React from 'react';
import { clsx } from 'clsx';
import { Asset } from '../../types';
import Badge from './Badge';

interface AssetCardProps {
  asset: Asset;
  selected?: boolean;
  onClick?: () => void;
  allocation?: number;
  showAllocation?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  selected = false,
  onClick,
  allocation = 0,
  showAllocation = false,
}) => {
  const { symbol, name, logo, price, change24h } = asset;
  
  return (
    <div
      className={clsx(
        'relative border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md',
        selected 
          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-50' 
          : 'border-gray-200 bg-white hover:border-primary-200'
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 h-10 w-10">
          <img src={logo} alt={name} className="h-10 w-10 rounded-full" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {symbol}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <p className="text-sm font-semibold text-gray-900">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <Badge 
            variant={change24h >= 0 ? 'success' : 'danger'} 
            size="sm"
          >
            {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
          </Badge>
        </div>
      </div>
      
      {showAllocation && allocation > 0 && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-700">Allocation</span>
            <span className="text-xs font-semibold text-gray-900">{allocation}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-primary-600 h-1.5 rounded-full" 
              style={{ width: `${allocation}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {selected && (
        <div className="absolute top-2 right-2 h-4 w-4 bg-primary-500 rounded-full flex items-center justify-center">
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AssetCard;