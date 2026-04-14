"use client";

import { useEffect, useState } from "react";

interface Balance {
  asset: string;
  free: string;
  locked: string;
}

export default function Page() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exchange-proxy.100xdevs.com/api/v1/balances")
      .then(res => res.json())
      .then(data => {
        setBalances(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatNumber = (num: string) => {
    const n = parseFloat(num);
    if (n === 0) return "0.00";
    if (n < 0.01) return n.toFixed(6);
    if (n < 1) return n.toFixed(4);
    return n.toFixed(2);
  };

  const totalUsd = balances.reduce((sum, b) => {
    return sum + parseFloat(b.free) + parseFloat(b.locked);
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-gray-400">View your balances and assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Total Balance</p>
            <p className="text-3xl font-bold">${formatNumber(totalUsd.toString())}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Total Assets</p>
            <p className="text-3xl font-bold">{balances.filter(b => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0).length}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Available</p>
            <p className="text-3xl font-bold text-green-400">${formatNumber(balances.reduce((sum, b) => sum + parseFloat(b.free), 0).toString())}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-medium">
              <div>Asset</div>
              <div className="text-right">Available</div>
              <div className="text-right">Locked</div>
              <div className="text-right">Total</div>
            </div>
            <div className="divide-y divide-white/5">
              {balances.map((balance) => {
                const total = parseFloat(balance.free) + parseFloat(balance.locked);
                if (total === 0) return null;
                return (
                  <div key={balance.asset} className="grid grid-cols-4 gap-4 p-4 hover:bg-white/5 transition-colors">
                    <div className="font-semibold flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                        {balance.asset.slice(0, 2)}
                      </div>
                      {balance.asset}
                    </div>
                    <div className="text-right font-mono">{formatNumber(balance.free)}</div>
                    <div className="text-right font-mono text-yellow-400">{formatNumber(balance.locked)}</div>
                    <div className="text-right font-mono font-semibold">{formatNumber(total.toString())}</div>
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
