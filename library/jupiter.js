// Jupiter API integration functions
// Replace the mock functions in page.js with these real API calls

const JUPITER_API_BASE = 'https://quote-api.jup.ag/v6';
const TOKEN_LIST_API = 'https://token.jup.ag/all';

export const fetchTokenList = async () => {
  try {
    const response = await fetch(TOKEN_LIST_API);
    const tokens = await response.json();
    
    // Filter for popular tokens and add logoURI
    const popularTokens = tokens.filter(token => 
      ['SOL', 'USDC', 'USDT', 'mSOL', 'SRM', 'RLB', 'BTC', 'ETH', 'RAY'].includes(token.symbol)
    );
    
    return popularTokens.map(token => ({
      ...token,
      logoURI: token.logoURI || `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.address}/logo.png`
    }));
  } catch (error) {
    console.error('Error fetching token list:', error);
    throw error;
  }
};

export const getQuote = async (inputMint, outputMint, amount, slippageBps = 50) => {
  try {
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amount.toString(),
      slippageBps: slippageBps.toString(),
      feeBps: '0',
      maxAccounts: '64'
    });

    const response = await fetch(`${JUPITER_API_BASE}/quote?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const quoteResponse = await response.json();
    
    // Transform the response to match our expected format
    return {
      routes: quoteResponse.routePlan ? [quoteResponse] : [],
      bestRoute: quoteResponse
    };
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
};

export const getSwapTransaction = async (walletPublicKey, quoteResponse) => {
  try {
    const response = await fetch(`${JUPITER_API_BASE}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey: walletPublicKey,
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: 'auto'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { swapTransaction } = await response.json();
    return swapTransaction;
  } catch (error) {
    console.error('Error getting swap transaction:', error);
    throw error;
  }
};

// Utility functions
export const formatTokenAmount = (amount, decimals, maxDecimals = 6) => {
  const num = Number(amount) / (10 ** decimals);
  return num.toLocaleString(undefined, { 
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0
  });
};

export const calculatePriceImpact = (inputAmount, outputAmount, inputDecimals, outputDecimals) => {
  const inputValue = Number(inputAmount) / (10 ** inputDecimals);
  const outputValue = Number(outputAmount) / (10 ** outputDecimals);
  
  // This is a simplified calculation - in reality you'd need market prices
  const priceImpact = Math.abs(1 - (outputValue / inputValue)) * 100;
  return priceImpact.toFixed(3);
};

export const getTokenIcon = (tokenMint, symbol) => {
  // Fallback icon URLs for common tokens
  const iconMap = {
    'So11111111111111111111111111111111111111112': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
  };
  
  return iconMap[tokenMint] || `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${tokenMint}/logo.png`;
};

// Error handling utilities
export const handleJupiterError = (error) => {
  if (error.message.includes('No routes found')) {
    return 'No trading routes available for this token pair. Try a different pair or amount.';
  }
  
  if (error.message.includes('Insufficient liquidity')) {
    return 'Insufficient liquidity for this trade. Try reducing the amount.';
  }
  
  if (error.message.includes('Slippage tolerance exceeded')) {
    return 'Price moved too much. Try increasing slippage tolerance or reducing amount.';
  }
  
  return 'An error occurred while processing your request. Please try again.';
};

// Constants
export const POPULAR_TOKEN_MINTS = [
  'So11111111111111111111111111111111111111112', // SOL
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
  'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt'  // SRM
];

export const DEFAULT_SLIPPAGE = 50; // 0.5%
export const MAX_SLIPPAGE = 1000; // 10%