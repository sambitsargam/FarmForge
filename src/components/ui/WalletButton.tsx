import React from 'react';
import { Wallet } from 'lucide-react';
import Button from './Button';
import { useWalletStore } from '../../store/walletStore';

interface WalletButtonProps {
  className?: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({ className }) => {
  const { connected, address, balance, connect, disconnect } = useWalletStore();
  
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const formatBalance = (balance: string) => {
    const balanceNum = parseFloat(balance);
    return balanceNum.toFixed(4);
  };
  
  if (!connected) {
    return (
      <Button
        variant="primary"
        size="md"
        leftIcon={<Wallet size={16} />}
        onClick={connect}
        className={className}
      >
        Connect Wallet
      </Button>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <div className="hidden md:block bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
        {balance && `${formatBalance(balance)} ETH`}
      </div>
      
      <Button
        variant="outline"
        size="md"
        leftIcon={<Wallet size={16} />}
        onClick={disconnect}
        className={className}
      >
        {formatAddress(address || '')}
      </Button>
    </div>
  );
};

export default WalletButton;