"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PrimaryButton, SuccessButton } from "./core/Button";
import { useState } from "react";

export const Appbar = () => {
    const route = usePathname();
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <div className="h-16 bg-[#0d0d12] border-b border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        100x Exchange
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link 
                            href="/"
                            className={`text-sm font-medium transition-colors ${route === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/markets"
                            className={`text-sm font-medium transition-colors ${route.startsWith('/markets') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Markets
                        </Link>
                        <Link 
                            href="/trade/SOL_USDC"
                            className={`text-sm font-medium transition-colors ${route.startsWith('/trade') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Trade
                        </Link>
                        <div className="relative">
                            <button 
                                onClick={() => setMoreOpen(!moreOpen)}
                                className={`text-sm font-medium transition-colors flex items-center gap-1 ${route.startsWith('/portfolio') || route.startsWith('/orders') || route.startsWith('/trades') || route.startsWith('/settings') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                More
                                <svg className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {moreOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[#0d0d12] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                                    <Link 
                                        href="/portfolio"
                                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${route.startsWith('/portfolio') ? 'text-white' : 'text-gray-400'}`}
                                    >
                                        Portfolio
                                    </Link>
                                    <Link 
                                        href="/orders"
                                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${route.startsWith('/orders') ? 'text-white' : 'text-gray-400'}`}
                                    >
                                        Orders
                                    </Link>
                                    <Link 
                                        href="/trades"
                                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${route.startsWith('/trades') ? 'text-white' : 'text-gray-400'}`}
                                    >
                                        Trade History
                                    </Link>
                                    <Link 
                                        href="/settings"
                                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${route.startsWith('/settings') ? 'text-white' : 'text-gray-400'}`}
                                    >
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <SuccessButton onClick={() => {}}>Deposit</SuccessButton>
                    <PrimaryButton onClick={() => {}}>Withdraw</PrimaryButton>
                </div>
            </div>
        </div>
    );
};
