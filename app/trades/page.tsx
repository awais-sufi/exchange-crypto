"use client";

import { useEffect, useState } from "react";

interface Trade {
  id: number;
  market: string;
  price: string;
  quantity: string;
  quoteQuantity: string;
  side: string;
  fee: string;
  createdAt: number;
}

export default function Page() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("https://exchange-proxy.100xdevs.com/api/v1/my-trades")
      .then(res => res.json())
      .then(data => {
        setTrades(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredTrades = trades.filter(trade => {
    if (filter === "all") return true;
    return trade.side === filter;
  });

  const formatNumber = (num: string) => {
    const n = parseFloat(num);
    if (n === 0) return "0.00";
    if (n < 0.01) return n.toFixed(6);
    if (n < 1) return n.toFixed(4);
    return n.toFixed(2);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const totalVolume = trades.reduce((sum, t) => sum + parseFloat(t.quoteQuantity), 0);
  const totalFees = trades.reduce((sum, t) => sum + parseFloat(t.fee || "0"), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trade History</h1>
            <p className="text-gray-400">View your completed trades</p>
          </div>
          <div className="flex gap-2">
            {["all", "buy", "sell"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Total Trades</p>
            <p className="text-3xl font-bold">{trades.length}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Total Volume</p>
            <p className="text-3xl font-bold">${formatNumber(totalVolume.toString())}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Total Fees</p>
            <p className="text-3xl font-bold text-yellow-400">${formatNumber(totalFees.toString())}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredTrades.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            No trades found
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-medium">
              <div>Time</div>
              <div>Market</div>
              <div>Side</div>
              <div className="text-right">Price</div>
              <div className="text-right">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            <div className="divide-y divide-white/5">
              {filteredTrades.map((trade) => (
                <div key={trade.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-white/5 transition-colors items-center">
                  <div className="text-sm text-gray-400">{formatTime(trade.createdAt)}</div>
                  <div className="font-semibold">{trade.market.replace('_', '/')}</div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.side === "buy" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {trade.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right font-mono">${formatNumber(trade.price)}</div>
                  <div className="text-right font-mono">{formatNumber(trade.quantity)}</div>
                  <div className="text-right font-mono font-semibold">${formatNumber(trade.quoteQuantity)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
