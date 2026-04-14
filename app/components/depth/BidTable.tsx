
export const BidTable = ({ bids }: {bids: [string, string][]}) => {
    let currentTotal = 0; 
    const relevantBids = bids.slice(0, 15);
    const bidsWithTotal: [string, string, number][] = relevantBids.map(([price, quantity]) => [price, quantity, currentTotal += Number(quantity)]);
    const maxTotal = relevantBids.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);

    return (
        <div className="flex flex-col">
            {bidsWithTotal?.map(([price, quantity, total]) => (
                <Bid maxTotal={maxTotal} total={total} key={price} price={price} quantity={quantity} />
            ))}
        </div>
    );
}

function Bid({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    return (
        <div className="flex justify-between items-center px-3 py-1 text-xs relative hover:bg-white/5 cursor-pointer transition-colors">
            <div 
                className="absolute right-0 top-0 h-full bg-green-500/20 transition-all duration-300"
                style={{ width: `${(100 * total) / maxTotal}%` }}
            />
            <span className="relative font-mono text-green-400">{price}</span>
            <span className="relative font-mono text-gray-300">{quantity}</span>
            <span className="relative font-mono text-gray-500">{total.toFixed(2)}</span>
        </div>
    );
}
