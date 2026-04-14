"use client";
import { useState } from "react";

export function SwapUI({ market }: {market: string}) {
    const [amount, setAmount] = useState('');
    const [activeTab, setActiveTab] = useState('buy');
    const [type, setType] = useState('limit');

    return (
        <div className="flex flex-col h-full bg-[#0d0d12]">
            <div className="flex border-b border-white/10">
                <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
                <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            <div className="flex gap-4 px-3 py-2 border-b border-white/10">
                <LimitButton type={type} setType={setType} />
                <MarketButton type={type} setType={setType} />                       
            </div>

            <div className="flex flex-col p-4 gap-4">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">Available Balance</p>
                    <p className="text-xs font-medium text-white">36.94 USDC</p>
                </div>
                
                <div>
                    <p className="text-xs text-gray-500 mb-2">Price</p>
                    <div className="relative">
                        <input 
                            step="0.01" 
                            placeholder="0" 
                            className="w-full h-12 rounded-lg border border-white/20 bg-white/5 px-4 pr-12 text-right text-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors font-mono" 
                            type="text" 
                            value="134.38" 
                        />
                        <div className="absolute right-3 top-3">
                            <img src="/usdc.webp" className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-2">Quantity</p>
                    <div className="relative">
                        <input 
                            step="0.01" 
                            placeholder="0" 
                            className="w-full h-12 rounded-lg border border-white/20 bg-white/5 px-4 pr-12 text-right text-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors font-mono" 
                            type="text" 
                            value="123" 
                        />
                        <div className="absolute right-3 top-3">
                            <img src="/sol.webp" className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 text-right mt-1">≈ 0.00 USDC</p>
                </div>

                <div className="flex gap-2">
                    {['25%', '50%', '75%', 'Max'].map((pct) => (
                        <div key={pct} className="flex-1 py-1.5 text-center text-xs bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                            {pct}
                        </div>
                    ))}
                </div>

                <button 
                    type="button" 
                    className={`w-full h-12 rounded-xl font-semibold text-white mt-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        activeTab === 'buy' 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500' 
                            : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500'
                    }`}
                >
                    {activeTab === 'buy' ? 'Buy' : 'Sell'} {market?.split('_')[0]}
                </button>

                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent accent-indigo-500" />
                        Post Only
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent accent-indigo-500" />
                        IOC
                    </label>
                </div>
            </div>
        </div>
    );
}

function LimitButton({ type, setType }: { type: string, setType: any }) {
    return (
        <div 
            className={`text-sm font-medium cursor-pointer pb-2 border-b-2 transition-colors ${
                type === 'limit' 
                    ? 'border-indigo-500 text-white' 
                    : 'border-transparent text-gray-500 hover:text-white'
            }`}
            onClick={() => setType('limit')}
        >
            Limit
        </div>
    );
}

function MarketButton({ type, setType }: { type: string, setType: any }) {
    return (
        <div 
            className={`text-sm font-medium cursor-pointer pb-2 border-b-2 transition-colors ${
                type === 'market' 
                    ? 'border-indigo-500 text-white' 
                    : 'border-transparent text-gray-500 hover:text-white'
            }`}
            onClick={() => setType('market')}
        >
            Market
        </div>
    );
}

function BuyButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: any }) {
    return (
        <div 
            className={`flex-1 cursor-pointer p-3 text-center font-semibold text-sm transition-colors border-b-2 ${
                activeTab === 'buy' 
                    ? 'border-green-500 text-green-400 bg-green-500/10' 
                    : 'border-white/20 text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveTab('buy')}
        >
            Buy
        </div>
    );
}

function SellButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: any }) {
    return (
        <div 
            className={`flex-1 cursor-pointer p-3 text-center font-semibold text-sm transition-colors border-b-2 ${
                activeTab === 'sell' 
                    ? 'border-red-500 text-red-400 bg-red-500/10' 
                    : 'border-white/20 text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveTab('sell')}
        >
            Sell
        </div>
    );
}
