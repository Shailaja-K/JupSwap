// Application constants and configuration

export const APP_CONFIG = {
  name: 'Jupiter Mobile Swap',
  shortName: 'Jupiter Swap',
  description: 'A mobile-first Jupiter swap interface for Solana',
  version: '1.0.0',
  author: 'Jupiter Mobile Team'
};

export const SOLANA_CONFIG = {
  mainnetRPC: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  devnetRPC: 'https://api.devnet.solana.com',
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta'
};

export const JUPITER_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_JUPITER_API_URL || 'https://quote-api.jup.ag/v6',
  tokenListUrl: 'https://token.jup.ag/all',
  defaultSlippage: 50, // 0.5%
  maxSlippage: 1000, // 10%
  maxAccounts: 64
};

export const WALLET_CONFIG = {
  autoConnect: false,
  commitment: 'confirmed',
  localStorageKey: 'wallet-adapter'
};

export const UI_CONFIG = {
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      background: '#111827',
      surface: '#1f2937'
    },
    breakpoints: {
      mobile: '640px',
      tablet: '768px',
      desktop: '1024px'
    }
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  }
};

export const TOKEN_ICONS = {
  SOL: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  USDC: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  USDT: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
  mSOL: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
  SRM: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png'
};

export const POPULAR_TOKENS = [
  {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6
  },
  {
    symbol: 'mSOL',
    name: 'Marinade SOL',
    mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    decimals: 9
  }
];

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  INVALID_AMOUNT: 'Please enter a valid amount',
  NO_ROUTES_FOUND: 'No trading routes found for this token pair',
  SLIPPAGE_EXCEEDED: 'Price impact too high. Consider reducing amount or increasing slippage',
  TRANSACTION_FAILED: 'Transaction failed. Please try again',
  NETWORK_ERROR: 'Network error. Please check your connection',
  UNKNOWN_ERROR: 'An unexpected error occurred'
};

export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_SENT: 'Transaction sent successfully',
  ROUTES_LOADED: 'Trading routes loaded'
};

export const LOADING_MESSAGES = {
  CONNECTING_WALLET: 'Connecting wallet...',
  LOADING_TOKENS: 'Loading tokens...',
  FINDING_ROUTES: 'Finding best routes...',
  PREPARING_TRANSACTION: 'Preparing transaction...',
  SENDING_TRANSACTION: 'Sending transaction...'
};

export const EXTERNAL_LINKS = {
  jupiter: 'https://jup.ag',
  solana: 'https://solana.com',
  docs: 'https://docs.jup.ag',
  discord: 'https://discord.gg/jup',
  twitter: 'https://twitter.com/JupiterExchange',
  github: 'https://github.com/jup-ag'
};

export const FEATURE_FLAGS = {
  enableAdvancedSettings: process.env.NEXT_PUBLIC_ENABLE_ADVANCED_SETTINGS === 'true',
  enablePriceCharts: process.env.NEXT_PUBLIC_ENABLE_PRICE_CHARTS === 'true',
  enableTransactionHistory: process.env.NEXT_PUBLIC_ENABLE_TX_HISTORY === 'true',
  enablePortfolioTracking: process.env.NEXT_PUBLIC_ENABLE_PORTFOLIO === 'true'
};

export const API_ENDPOINTS = {
  tokenPrices: 'https://api.coingecko.com/api/v3/simple/price',
  solanaPrice: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
  tokenMetadata: 'https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json'
};

export const STORAGE_KEYS = {
  selectedTokens: 'jupiter_selected_tokens',
  recentSwaps: 'jupiter_recent_swaps',
  userPreferences: 'jupiter_user_preferences',
  slippageSettings: 'jupiter_slippage_settings'
};

export const VALIDATION_RULES = {
  minSwapAmount: 0.000001,
  maxSwapAmount: 1000000,
  minSlippage: 1, // 0.01%
  maxSlippage: 5000, // 50%
  maxTokenSymbolLength: 10,
  maxTokenNameLength: 50
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }
};