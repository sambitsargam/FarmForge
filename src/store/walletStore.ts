import { create } from 'zustand';
import { ethers } from 'ethers';
import { WalletState } from '../types';

interface WalletStore extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: () => Promise<void>;
  isCorrectNetwork: () => boolean;
  switchNetwork: () => Promise<void>;
}

const REQUIRED_CHAIN_ID = 1; // Ethereum Mainnet

export const useWalletStore = create<WalletStore>((set, get) => ({
  connected: false,
  address: null,
  chainId: null,
  balance: null,
  provider: null,
  signer: null,
  
  connect: async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);
        
        set({ 
          provider, 
          signer, 
          connected: true, 
          address, 
          chainId 
        });
        
        await get().updateBalance();
        
        // Setup listeners
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            get().disconnect();
          } else {
            set({ address: accounts[0] });
            get().updateBalance();
          }
        });
        
        window.ethereum.on('chainChanged', (chainId: string) => {
          set({ chainId: parseInt(chainId, 16) });
          get().updateBalance();
        });
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet provider");
    }
  },
  
  disconnect: () => {
    set({ 
      connected: false, 
      address: null, 
      chainId: null, 
      balance: null,
      provider: null,
      signer: null
    });
  },
  
  updateBalance: async () => {
    const { provider, address } = get();
    if (provider && address) {
      try {
        const balance = await provider.getBalance(address);
        set({ balance: ethers.formatEther(balance) });
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  },
  
  isCorrectNetwork: () => {
    return get().chainId === REQUIRED_CHAIN_ID;
  },
  
  switchNetwork: async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${REQUIRED_CHAIN_ID.toString(16)}` }],
        });
      } catch (error) {
        console.error("Error switching network:", error);
      }
    }
  }
}));