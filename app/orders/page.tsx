"use client";

import { useEffect, useState } from "react";

interface Order {
  id: number;
  market: string;
  price: string;
  quantity: string;
  filledQuantity: string;
  side: string;
  status: string;
  createdAt: number;
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("https://exchange-proxy.100xdevs.com/api/v1/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.side === filter;
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Orders</h1>
            <p className="text-gray-400">View your order history</p>
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

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            No orders found
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-medium">
              <div>Time</div>
              <div>Market</div>
              <div>Side</div>
              <div className="text-right">Price</div>
              <div className="text-right">Quantity</div>
              <div className="text-right">Filled</div>
              <div>Status</div>
            </div>
            <div className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <div key={order.id} className="grid grid-cols-7 gap-4 p-4 hover:bg-white/5 transition-colors items-center">
                  <div className="text-sm text-gray-400">{formatTime(order.createdAt)}</div>
                  <div className="font-semibold">{order.market.replace('_', '/')}</div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.side === "buy" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {order.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right font-mono">${formatNumber(order.price)}</div>
                  <div className="text-right font-mono">{formatNumber(order.quantity)}</div>
                  <div className="text-right font-mono text-gray-400">
                    {formatNumber(order.filledQuantity)} / {formatNumber(order.quantity)}
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "filled" ? "bg-green-500/20 text-green-400" :
                      order.status === "partial" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
