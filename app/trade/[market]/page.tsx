"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useParams } from "next/navigation";

export default function Page() {
    const { market } = useParams();

    return (
        <div className="flex flex-1 min-h-[calc(100vh-64px)] bg-[#0a0a0f]">
            <div className="flex flex-col flex-1">
                <MarketBar market={market as string} />
                <div className="flex flex-row h-[calc(100vh-64px-80px)] border-b border-white/10">
                    <div className="flex flex-col flex-1">
                        <TradeView market={market as string} />
                    </div>
                    <div className="w-[1px] bg-white/10" />
                    <div className="flex flex-col w-[280px] overflow-hidden">
                        <Depth market={market as string} /> 
                    </div>
                </div>
            </div>
            <div className="w-[1px] bg-white/10" />
            <div className="flex flex-col w-[300px]">
                <SwapUI market={market as string} />
            </div>
        </div>
    );
}
