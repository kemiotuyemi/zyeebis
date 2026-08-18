"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryDay: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-NG", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const STATUS_OPTIONS = ["new", "payment_pending", "payment_confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];
const PAYMENT_OPTIONS = ["pending", "submitted", "confirmed", "failed"];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  payment_pending: "bg-yellow-100 text-yellow-700",
  payment_confirmed: "bg-green-100 text-green-700",
  preparing: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (status?: string) => {
    setLoading(true);
    const url = status ? `/api/admin/orders?status=${status}` : "/api/admin/orders";
    const res = await fetch(url);
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(filter || undefined);
  }, [filter]);

  const updateOrder = async (id: string, data: Record<string, string>) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...updated } : o)));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter("")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${!filter ? "bg-fuchsia text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${filter === s ? "bg-fuchsia text-white" : "bg-gray-200"}`}
          >
            {s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{order.orderNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] || "bg-gray-100"}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.customerName} &middot; {order.phone} &middot; {formatDate(order.deliveryDay)}
                  </p>
                  <p className="text-sm font-semibold text-fuchsia">₦{order.total.toLocaleString()}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                    className="border rounded px-2 py-1 text-sm capitalize"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>

                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updateOrder(order.id, { paymentStatus: e.target.value })}
                    className="border rounded px-2 py-1 text-sm capitalize"
                  >
                    {PAYMENT_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>

                  <Link
                    href={`/order/${order.orderNumber}`}
                    target="_blank"
                    className="text-fuchsia text-sm underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
