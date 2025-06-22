# 🔁 JupSwap

Link: https://jup-swap-ylqr.vercel.app/

**JupSwap** is a mobile-first decentralized swap interface for the Solana blockchain. It leverages the jupiter APIs to provide real-time, cost-efficient token swaps. The interface is built using **Next.js**, **React**, and **Tailwind CSS**, and supports **wallet connection**, **token selection**, **swap simulation**, and **route optimization** — all in a clean, responsive UI.

---

## 🚀 Features

- 📱 Mobile-first responsive design  
- 🔗 Solana wallet integration (Phantom, Solflare, Backpack)  
- 💱 Token-to-token swapping with real-time Jupiter quotes  
- 🎯 Automatic best route recommendation  
- 📊 Gas fee estimation and slippage control  
- 🌐 Live price data from Jupiter API  
- ⚡ Fast interface with optimized state management  
- 🌈 Glassmorphism-themed modern UI  

---

## 🧰 Prerequisites

Before running the project locally, make sure you have:

- Node.js (v18+)
- npm or yarn
- A Solana wallet (for development, use Phantom or Solflare)

---

## 🛠️ Getting Started

```bash
# 1. Clone the Repository
git clone https://github.com/yourusername/jupiter-mobile-swap.git
cd jupiter-mobile-swap

# 2. Install Dependencies
npm install
# or
yarn install

# 3. Set Up Environment Variables
# Create a `.env.local` file in the root directory and add the following:

NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_JUPITER_API_URL=https://quote-api.jup.ag/v6

# 4. Run the App Locally
npm run dev
# or
yarn dev

# 5. Open in your local browser
```
## 📁 Project Structure
```
jupiter-mobile-swap/
├── app/
│ ├── layout.js # Root layout wrapper
│ ├── page.js # Main swap logic + UI
│ └── globals.css # Tailwind global styles
├── components/ # UI components
├── lib/
│ └── jupiter.js # Jupiter API helpers
├── utils/
│ └── constants.js # Static token configs
├── public/ # Static assets (icons, manifest)
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
└── package.json
```

## 📱 Mobile Optimization

Fully responsive layout, Touch-friendly interactions, Lightweight API calls for low data usage, Simple UI for swap flow, PWA-ready structure

## 🤝 Contributing
```
# Fork the repo
# Create a new branch for your feature
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request!
```

## 📚 Resources

Jupiter API Docs

Solana Wallet Adapter

Jupiter Discord


## 💙 Built with Solana. Powered by Jupiter.


