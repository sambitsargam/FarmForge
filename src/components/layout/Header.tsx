import React from 'react';
import { Layers } from 'lucide-react';
import WalletButton from '../ui/WalletButton';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Layers className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FarmForge</span>
            <span className="ml-2 text-sm bg-secondary-100 text-secondary-800 px-2 py-0.5 rounded-md">
              Dexponent
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;