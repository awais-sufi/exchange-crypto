
export const AskTable = ({ asks }: { asks: [string, string][] }) => {
    let currentTotal = 0;
    const relevantAsks = asks.slice(0, 15);
    relevantAsks.reverse();

    let asksWithTotal: [string, string, number][] = [];
    for (let i = relevantAsks.length - 1; i >= 0; i--) {
        const [price, quantity] = relevantAsks[i];
        asksWithTotal.push([price, quantity, currentTotal += Number(quantity)]);
    }

    const maxTotal = relevantAsks.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);
    asksWithTotal.reverse();

    return (
        <div className="flex flex-col">
            {asksWithTotal.map(([price, quantity, total]) => (
                <Ask maxTotal={maxTotal} key={price} price={price} quantity={quantity} total={total} />
            ))}
        </div>
    );
}

function Ask({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    return (
        <div className="flex justify-between items-center px-3 py-1 text-xs relative hover:bg-white/5 cursor-pointer transition-colors">
            <div 
                className="absolute right-0 top-0 h-full bg-red-500/20 transition-all duration-300"
                style={{ width: `${(100 * total) / maxTotal}%` }}
            />
            <span className="relative font-mono text-red-400">{price}</span>
            <span className="relative font-mono text-gray-300">{quantity}</span>
            <span className="relative font-mono text-gray-500">{total?.toFixed(2)}</span>
        </div>
    );
}
