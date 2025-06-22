'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, Repeat, Zap, TrendingUp, Clock, DollarSign, ExternalLink, Wallet, RefreshCw } from 'lucide-react';

// Mock Jupiter API functions (replace with actual API calls)
const fetchTokens = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { address: 'So11111111111111111111111111111111111111112', symbol: 'SOL', name: 'Solana', decimals: 9, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
    { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin', decimals: 6, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
    { address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', symbol: 'USDT', name: 'Tether', decimals: 6, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg' },
    { address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', symbol: 'mSOL', name: 'Marinade SOL', decimals: 9, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png' },
    { address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', symbol: 'SRM', name: 'Serum', decimals: 6, logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png' },
    { address: 'RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a', symbol: 'RLB', name: 'Rollbit Coin', decimals: 2, logoURI: 'https://assets.coingecko.com/coins/images/28199/standard/cj2ad0Gt_400x400.jpg' }
  ];
};

const fetchQuote = async (inputMint, outputMint, amount, slippageBps = 50) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock quote data with multiple routes
  const routes = [
    {
      marketInfos: [{ label: 'Raydium' }],
      outAmount: (amount * 0.95 * Math.random() + amount * 0.9).toString(),
      priceImpactPct: Math.random() * 0.02,
      slippageBps: 50,
      fee: { feeMint: inputMint, feeAmount: (amount * 0.003).toString() },
      routePlan: [{ swapInfo: { ammKey: 'raydium', label: 'Raydium', inputMint, outputMint } }]
    },
    {
      marketInfos: [{ label: 'Orca' }],
      outAmount: (amount * 0.93 * Math.random() + amount * 0.88).toString(),
      priceImpactPct: Math.random() * 0.025,
      slippageBps: 50,
      fee: { feeMint: inputMint, feeAmount: (amount * 0.0025).toString() },
      routePlan: [{ swapInfo: { ammKey: 'orca', label: 'Orca', inputMint, outputMint } }]
    },
    {
      marketInfos: [{ label: 'Jupiter' }, { label: 'Serum' }],
      outAmount: (amount * 0.97 * Math.random() + amount * 0.92).toString(),
      priceImpactPct: Math.random() * 0.018,
      slippageBps: 50,
      fee: { feeMint: inputMint, feeAmount: (amount * 0.004).toString() },
      routePlan: [
        { swapInfo: { ammKey: 'jupiter', label: 'Jupiter', inputMint, outputMint: 'intermediate' } },
        { swapInfo: { ammKey: 'serum', label: 'Serum', inputMint: 'intermediate', outputMint } }
      ]
    },
    {
      marketInfos: [{ label: 'Saber' }],
      outAmount: (amount * 0.91 * Math.random() + amount * 0.87).toString(),
      priceImpactPct: Math.random() * 0.03,
      slippageBps: 50,
      fee: { feeMint: inputMint, feeAmount: (amount * 0.0035).toString() },
      routePlan: [{ swapInfo: { ammKey: 'saber', label: 'Saber', inputMint, outputMint } }]
    }
  ];
  
  // Sort by best output amount
  routes.sort((a, b) => parseFloat(b.outAmount) - parseFloat(a.outAmount));
  
  return { routes, bestRoute: routes[0] };
};

const getSwapTransaction = async (walletAddress, route) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return 'mock_encoded_transaction_string';
};

// Components
function TokenSelector({ token, onSelect, tokens, label, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 flex items-center justify-between hover:bg-gray-700 transition-colors"
      >
        {token ? (
          <div className="flex items-center space-x-3">
            <img src={token.logoURI} alt={token.symbol} className="w-6 h-6 rounded-full" />
            <div className="text-left">
              <div className="font-semibold text-white">{token.symbol}</div>
              <div className="text-xs text-gray-400">{token.name}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Select Token</span>
        )}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Loading tokens...</div>
          ) : (
            tokens.map(t => (
              <button
                key={t.address}
                onClick={() => {
                  onSelect(t);
                  setIsOpen(false);
                }}
                className="w-full p-3 flex items-center space-x-3 hover:bg-gray-700 transition-colors"
              >
                <img src={t.logoURI} alt={t.symbol} className="w-6 h-6 rounded-full" />
                <div className="text-left">
                  <div className="font-semibold text-white">{t.symbol}</div>
                  <div className="text-xs text-gray-400">{t.name}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function RouteCard({ route, fromToken, toToken, isSelected, onSelect, isBest }) {
  const outputAmount = Number(route.outAmount) / (10 ** toToken.decimals);
  const priceImpact = (route.priceImpactPct * 100).toFixed(3);
  const routeLabels = route.marketInfos.map(m => m.label).join(' → ');
  
  return (
    <div 
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
      }`}
      onClick={() => onSelect(route)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium text-white">{routeLabels}</div>
          {isBest && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Best
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-white">
            {outputAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toToken.symbol}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-1">
          <TrendingUp className="w-3 h-3" />
          <span>Impact: {priceImpact}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-3 h-3" />
          <span>Fee: ~{((Number(route.fee.feeAmount) / (10 ** fromToken.decimals)) * 0.001).toFixed(4)} {fromToken.symbol}</span>
        </div>
      </div>
    </div>
  );
}

function WalletConnect({ walletAddress, setWalletAddress }) {
  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.solana) {
        const resp = await window.solana.connect();
        const pubkey = resp.publicKey.toString();
        setWalletAddress(pubkey);
      } else {
        // Mock wallet connection for demo
        const mockAddress = 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdef';
        setWalletAddress(mockAddress);
      }
    } catch (err) {
      alert("Wallet connection failed: " + err.message);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
  };

  return (
    <div className="mb-6">
      {walletAddress ? (
        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Connected</div>
              <div className="text-xs text-gray-400 font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
}

export default function JupiterMobileSwap() {
  const [tokens, setTokens] = useState([]);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  const [lastQuoteTime, setLastQuoteTime] = useState(null);

  // Load tokens on mount
  useEffect(() => {
    setIsLoadingTokens(true);
    fetchTokens()
      .then(setTokens)
      .catch(console.error)
      .finally(() => setIsLoadingTokens(false));
  }, []);

  // Fetch routes when inputs change
  useEffect(() => {
    if (fromToken && toToken && amount && parseFloat(amount) > 0) {
      setIsLoadingRoutes(true);
      const amountInBaseUnits = parseFloat(amount) * (10 ** fromToken.decimals);
      
      fetchQuote(fromToken.address, toToken.address, amountInBaseUnits)
        .then(({ routes, bestRoute }) => {
          setRoutes(routes);
          setSelectedRoute(bestRoute);
          setLastQuoteTime(new Date());
        })
        .catch(console.error)
        .finally(() => setIsLoadingRoutes(false));
    } else {
      setRoutes([]);
      setSelectedRoute(null);
    }
  }, [fromToken, toToken, amount]);

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const executeSwap = async () => {
    if (!selectedRoute || !walletAddress) return;
    
    try {
      const tx = await getSwapTransaction(walletAddress, selectedRoute);
      const url = `https://jup.ag/swap/deeplink?encodedTx=${encodeURIComponent(tx)}`;
      window.open(url, '_blank');
    } catch (error) {
      alert('Failed to execute swap: ' + error.message);
    }
  };

  const refreshRoutes = () => {
    if (fromToken && toToken && amount && parseFloat(amount) > 0) {
      setIsLoadingRoutes(true);
      const amountInBaseUnits = parseFloat(amount) * (10 ** fromToken.decimals);
      
      fetchQuote(fromToken.address, toToken.address, amountInBaseUnits)
        .then(({ routes, bestRoute }) => {
          setRoutes(routes);
          setSelectedRoute(bestRoute);
          setLastQuoteTime(new Date());
        })
        .catch(console.error)
        .finally(() => setIsLoadingRoutes(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Jupiter Mobile
          </h1>
          <p className="text-gray-400 mt-2">Best routes, lowest fees</p>
        </div>

        {/* Wallet Connection */}
        <WalletConnect walletAddress={walletAddress} setWalletAddress={setWalletAddress} />

        {/* Swap Interface */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm">
          {/* Token Selectors */}
          <div className="space-y-4">
            <TokenSelector
              token={fromToken}
              onSelect={setFromToken}
              tokens={tokens}
              label="From"
              isLoading={isLoadingTokens}
            />

            <div className="flex justify-center">
              <button
                onClick={swapTokens}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                disabled={!fromToken || !toToken}
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            <TokenSelector
              token={toToken}
              onSelect={setToToken}
              tokens={tokens}
              label="To"
              isLoading={isLoadingTokens}
            />

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="0.0"
                step="any"
              />
            </div>
          </div>
        </div>

        {/* Routes Section */}
        {(routes.length > 0 || isLoadingRoutes) && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Routes</h2>
              <div className="flex items-center space-x-2">
                {lastQuoteTime && (
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{lastQuoteTime.toLocaleTimeString()}</span>
                  </div>
                )}
                <button
                  onClick={refreshRoutes}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoadingRoutes}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingRoutes ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {isLoadingRoutes ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2 text-gray-400">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Finding best routes...</span>
                  </div>
                </div>
              ) : (
                routes.map((route, index) => (
                  <RouteCard
                    key={index}
                    route={route}
                    fromToken={fromToken}
                    toToken={toToken}
                    isSelected={selectedRoute === route}
                    onSelect={setSelectedRoute}
                    isBest={index === 0}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Execute Button */}
        {selectedRoute && (
          <div className="mt-6">
            <button
              onClick={executeSwap}
              disabled={!walletAddress || !selectedRoute}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>{walletAddress ? 'Execute Swap' : 'Connect Wallet to Swap'}</span>
            </button>
            
            {walletAddress && selectedRoute && (
              <div className="mt-3 text-center">
                <a
                  href="https://jup.ag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <span>Powered by Jupiter</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Always verify transactions before signing</p>
          <p className="mt-1">© 2025 Jupiter Mobile Interface</p>
        </div>
      </div>
    </div>
  );
}