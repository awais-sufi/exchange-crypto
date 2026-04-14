"use client";

import Link from "next/link";
import { PrimaryButton, SuccessButton } from "./components/core/Button";
import { useEffect, useState } from "react";

interface Ticker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
}

export default function Home() {
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

  const topMarkets = tickers.slice(0, 6);

  const stats = [
    { label: "Trading Volume", value: "$2.5B+" },
    { label: "Active Traders", value: "500K+" },
    { label: "Markets", value: "200+" },
    { label: "Countries", value: "150+" },
  ];

  const steps = [
    { num: "01", title: "Create Account", desc: "Sign up in seconds with just your email" },
    { num: "02", title: "Deposit Funds", desc: "Add funds using your preferred method" },
    { num: "03", title: "Start Trading", desc: "Execute trades instantly with low fees" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-20">
        <div className="text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-400">Live Trading</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trade Crypto
            </span>
            <br />
            <span className="text-white">Like a Pro</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Lightning-fast trading with advanced charts, deep liquidity, and zero compromises on security.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/markets">
              <SuccessButton onClick={() => {}}>
                Explore Markets
              </SuccessButton>
            </Link>
            <Link href="/trade/SOL_USDC">
              <PrimaryButton onClick={() => {}}>
                Start Trading
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {!loading && topMarkets.length > 0 && (
          <div className="w-full max-w-5xl mb-20">
            <p className="text-sm text-gray-500 mb-4 text-center">Live Prices</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topMarkets.map((ticker) => {
                const isPositive = parseFloat(ticker.priceChangePercent) >= 0;
                return (
                  <Link
                    key={ticker.symbol}
                    href={`/trade/${ticker.symbol}`}
                    className="block group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 hover:bg-white/10"
                  >
                    <p className="font-semibold text-sm mb-1">{ticker.symbol.replace('_', '/')}</p>
                    <p className="font-mono text-lg">${parseFloat(ticker.lastPrice).toFixed(2)}</p>
                    <p className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{parseFloat(ticker.priceChangePercent).toFixed(2)}%
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-24 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose 100x Exchange</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Lightning Fast", desc: "Sub-millisecond order execution with our high-performance matching engine", icon: "⚡" },
              { title: "Deep Liquidity", desc: "Best prices for large trades with minimal slippage", icon: "💧" },
              { title: "Secure", desc: "Enterprise-grade security with multi-layer protection", icon: "🔒" },
              { title: "Low Fees", desc: "Industry-leading fees starting from 0.1%", icon: "💰" },
              { title: "24/7 Support", desc: "Round-the-clock customer support in multiple languages", icon: "🎧" },
              { title: "Advanced Charts", desc: "Professional trading tools and real-time market data", icon: "📊" },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Start Trading in Minutes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of traders already using 100x Exchange</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets">
              <SuccessButton onClick={() => {}}>
                Explore Markets
              </SuccessButton>
            </Link>
            <Link href="/trade/SOL_USDC">
              <PrimaryButton onClick={() => {}}>
                Start Trading
              </PrimaryButton>
            </Link>
          </div>
        </div>

        <div className="w-full border-t border-white/10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/markets" className="hover:text-white transition-colors">Markets</Link></li>
                <li><Link href="/trade/SOL_USDC" className="hover:text-white transition-colors">Trade</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/orders" className="hover:text-white transition-colors">Orders</Link></li>
                <li><Link href="/trades" className="hover:text-white transition-colors">Trade History</Link></li>
                <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">API Documentation</button></li>
                <li><button className="hover:text-white transition-colors">Fees</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-12">
            <p>&copy; 2024 100x Exchange. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
