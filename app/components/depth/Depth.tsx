"use client";

import { useEffect, useState } from "react";
import { getDepth, getTicker } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";

export function Depth({ market }: {market: string}) {
    const [bids, setBids] = useState<[string, string][]>();
    const [asks, setAsks] = useState<[string, string][]>();
    const [price, setPrice] = useState<string>();

    useEffect(() => {
        getDepth(market).then(d => {
            setBids(d.bids.reverse());
            setAsks(d.asks);
        });

        getTicker(market).then(t => setPrice(t.lastPrice));
    }, [market])
    
    return (
        <div className="flex flex-col h-full bg-[#0d0d12]">
            <div className="flex justify-between items-center px-3 py-2 border-b border-white/10">
                <span className="text-xs text-gray-500 font-medium">Price</span>
                <span className="text-xs text-gray-500 font-medium">Size</span>
                <span className="text-xs text-gray-500 font-medium">Total</span>
            </div>
            <div className="flex-1 overflow-hidden">
                {asks && <AskTable asks={asks} />}
            </div>
            {price && (
                <div className="px-3 py-2 border-y border-white/10 bg-white/5">
                    <span className="text-lg font-bold font-mono text-white">${parseFloat(price).toFixed(2)}</span>
                </div>
            )}
            <div className="flex-1 overflow-hidden">
                {bids && <BidTable bids={bids} />}
            </div>
        </div>
    );
}
