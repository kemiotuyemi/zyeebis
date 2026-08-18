"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Clock, CreditCard, ChefHat, CheckCircle, TrendingUp } from "lucide-react";

interface Stats {
  todayOrders: number;
  pendingOrders: number;
  awaitingPayment: number;
  preparing: number;
  completed: number;
  totalSales: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <p className="text-gray-500">Loading stats...</p>;

  const cards = [
    { label: "Today's Orders", value: stats.todayOrders, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Pending", value: stats.pendingOrders, icon: Clock, color: "bg-yellow-500" },
    { label: "Awaiting Payment", value: stats.awaitingPayment, icon: CreditCard, color: "bg-orange-500" },
    { label: "Preparing", value: stats.preparing, icon: ChefHat, color: "bg-purple-500" },
    { label: "Completed", value: stats.completed, icon: CheckCircle, color: "bg-green-500" },
    { label: "Total Sales", value: `₦${stats.totalSales.toLocaleString()}`, icon: TrendingUp, color: "bg-fuchsia" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className={`${card.color} text-white p-3 rounded-lg`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
