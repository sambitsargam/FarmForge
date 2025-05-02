# FarmForge - Dexponent Strategy Builder

FarmForge is a fully functional web application for the Dexponent Hackathon Festival that allows Asset Managers to define and deploy new Farms via a user-friendly, multi-step wizard.

## Features

- **Multi-Step Wizard Form**:
  - Step 1: Select Strategy Type, enter Target APY, set risk tolerance
  - Step 2: Choose Collateral Assets from a predefined list with real-time price feeds
  - Step 3: Define Verifier Requirements and Risk Profiles
  - Step 4: Show calculated Sharpe Ratio, benchmark expectations, fee structure breakdown
  - Step 5: Final Deployment Summary with wallet connection and transaction submission

- **Live Price Data**:
  - Integration with Uniswap V3 TWAP Oracle (simulated)
  - Real-time asset prices in step 2
  - TWAP to simulate estimated Sharpe benchmarks in step 4

- **Smart Contract Interaction**:
  - Connect via MetaMask or WalletConnect
  - Send structured data from the wizard to deploy a new Farm instance on-chain
  - Transaction confirmation and failure handling

## Tech Stack

- **Frontend**: React.js, React Hook Form, Zustand, Tailwind CSS, Framer Motion
- **Blockchain**: Ethers.js, MetaMask / WalletConnect
- **Data Fetching**: React Query + Axios for TWAP oracle API
- **Smart Contracts**: Dexponent-compatible contracts (simulated)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/src/components`: UI components
  - `/ui`: Reusable UI components
  - `/wizard`: Wizard step components
  - `/layout`: Layout components
- `/src/services`: API and blockchain services
- `/src/store`: Zustand state management
- `/src/types`: TypeScript type definitions

## Deployment

The application can be deployed to Vercel or Netlify.

## License

MIT