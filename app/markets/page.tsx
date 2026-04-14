"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Ticker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
}

export default function Page() {
  const router = useRouter();
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exchange-proxy.100xdevs.com/api/v1/tickers")
      .then(res => res.json())
      .then(data => {
        setTickers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatNumber = (num: string) => {
    const n = parseFloat(num);
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
    return n.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Markets</h1>
          <p className="text-gray-400">Explore all available trading pairs</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-medium">
              <div className="col-span-2">Market</div>
              <div className="text-right">Last Price</div>
              <div className="text-right">24h Change</div>
              <div className="text-right">Volume</div>
            </div>
            <div className="divide-y divide-white/5">
              {tickers.map((ticker) => {
                const isPositive = parseFloat(ticker.priceChangePercent) >= 0;
                return (
                  <div
                    key={ticker.symbol}
                    onClick={() => router.push(`/trade/${ticker.symbol}`)}
                    className="grid grid-cols-5 gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="col-span-2 font-semibold">
                      {ticker.symbol.replace('_', '/')}
                    </div>
                    <div className="text-right font-mono">${parseFloat(ticker.lastPrice).toFixed(2)}</div>
                    <div className={`text-right font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{parseFloat(ticker.priceChangePercent).toFixed(2)}%
                    </div>
                    <div className="text-right font-mono text-gray-400">${formatNumber(ticker.volume)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
