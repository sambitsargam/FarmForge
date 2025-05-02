# 🌾 FarmForge – Strategy Builder for Dexponent

FarmForge is a powerful multi-step wizard interface that enables Asset Managers to define, preview, and deploy new yield-generating Farms within the [Dexponent Protocol](https:/dexponent.com/). Built for the Dexponent Hackathon Festival, FarmForge combines intuitive UX with advanced blockchain integrations to simplify decentralized finance strategy creation.


## 🚀 Features

- 🔄 **Multi-Step Wizard**  
  Guided form interface for configuring strategy type, target APY, collateral assets, verifier settings, and deployment details.

- 🔗 **Live Uniswap V3 TWAP Integration**  
  Real-time asset price feeds to assist with risk modeling and Sharpe benchmark estimation.

- 🧠 **Sharpe Consensus Preview**  
  Dynamic simulation of performance benchmarks and risk-adjusted return metrics.

- 🔐 **Smart Contract Deployment**  
  Direct integration with Dexponent protocol contracts via Ethers.js and MetaMask/WalletConnect.

- 📱 **Responsive, User-Friendly Interface**  
  Built with React.js and Tailwind CSS to ensure seamless UX across devices.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, React Hook Form, Tailwind CSS, Zustand |
| **Blockchain** | Ethers.js, MetaMask / WalletConnect |
| **Data Layer** | React Query, Axios |
| **Oracle** | Uniswap V3 TWAP Oracle |
| **Smart Contracts** | Dexponent Deployment Contract (assumed pre-deployed) |
| **Hosting** | Vercel |


## 🧰 Getting Started

### 🔧 Prerequisites

- Node.js >= 18.x
- Yarn or npm
- MetaMask browser extension

### 📦 Install Dependencies

```bash
git clone https://github.com/sambitsargam/farmforge.git
cd farmforge
npm install
````

### 🧪 Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
├── components/
│   ├── Wizard/
│   ├── Steps/
│   └── UI/
├── hooks/
├── services/
│   ├── uniswapOracle.ts
│   └── deployFarm.ts
├── state/
│   └── useFarmStore.ts
├── utils/
├── pages/
│   └── index.tsx
├── public/
├── README.md
└── tailwind.config.js
```

## 🔗 Smart Contract Integration

* The form collects data aligned with Dexponent’s Root Farm architecture.
* Contract interaction is handled via Ethers.js using a `deployFarm()` function.
* Uses connected wallet (MetaMask or WalletConnect) to sign and send deployment transaction.


## 📈 Real-Time Oracle Data

* TWAP prices fetched from Uniswap V3 Oracle.
* Used for previewing Sharpe ratio benchmarks and estimating fees.


## 🌍 Live Demo

[https://farmforge.vercel.app](https://farmforge.vercel.app)


## 📚 Resources

* [Dexponent Docs](https://docs.dexponent.com/)
* [Uniswap V3 Oracle Guide](https://docs.uniswap.org/protocol/reference/core/libraries/OracleLibrary)
* [React Hook Form](https://react-hook-form.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Zustand](https://github.com/pmndrs/zustand)


## 📄 License

MIT License © 2025 \[Sambit Sargam Ekalabya]


## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request with improvements or new features.

## 💬 Contact

* Twitter: [@sambitsargam](https://twitter.com/sambitsargam)

## 🏆 Part of the Dexponent Hackathon Festival

This project was created as part of the Dexponent Hackathon Festival to demonstrate compliant, modular DeFi strategy deployment using open-source tooling. Let's build the future of decentralized finance together.
