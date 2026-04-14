"use client";
import { useEffect, useState } from "react";
import { Ticker as TickerType } from "../utils/types";
import { getTicker } from "../utils/httpClient";

export const MarketBar = ({market}: {market: string}) => {
    const [ticker, setTicker] = useState<TickerType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTicker(market)
            .then(setTicker)
            .finally(() => setLoading(false));
    }, [market]);

    const isPositive = Number(ticker?.priceChange) > 0;
    const price = ticker?.lastPrice ? parseFloat(ticker.lastPrice).toFixed(2) : '--';

    return (
        <div className="bg-[#0d0d12] border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img alt="SOL Logo" className="w-8 h-8 rounded-full" src="/sol.webp" />
                        <img alt="USDC Logo" className="w-8 h-8 rounded-full -ml-3" src="/usdc.webp" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{market.replace('_', ' / ')}</h2>
                        <p className="text-xs text-gray-500">Spot Trading</p>
                    </div>
                </div>
                
                {loading ? (
                    <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Last Price</p>
                            <p className="text-2xl font-bold font-mono text-white">${price}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">24h Change</p>
                            <p className={`text-lg font-semibold font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {isPositive ? '+' : ''}{ticker?.priceChange || '0'} ({ticker?.priceChangePercent ? parseFloat(ticker.priceChangePercent).toFixed(2) : '0.00'}%)
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">24h High</p>
                            <p className="text-lg font-semibold font-mono text-white">${ticker?.high || '--'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">24h Low</p>
                            <p className="text-lg font-semibold font-mono text-white">${ticker?.low || '--'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">24h Volume</p>
                            <p className="text-lg font-semibold font-mono text-white">{ticker?.volume || '--'}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
