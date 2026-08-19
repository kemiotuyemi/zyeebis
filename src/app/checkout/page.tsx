"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { Package, Truck, Plus, Minus, Trash2 } from "lucide-react";
import DatePicker from "@/components/date-picker";

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  deliveryDate?: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart, updateQuantity, removeItem } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "LCCI Ikeja",
    deliveryDate: "",
    instructions: "",
  });

  if (items.length === 0 && !placed) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold">No items to checkout</h1>
        <Link href="/" className="mt-4 text-fuchsia hover:underline">
          Browse Products
        </Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h1 className="text-xl font-bold">Placing your order...</h1>
      </main>
    );
  }

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^[0-9+\s()-]{7,}$/.test(form.phone.trim())) {
      e.phone = "Enter a valid phone number";
    }
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.deliveryDate) {
      e.deliveryDate = "Select a delivery date";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          email: form.email || null,
          address: form.address,
          deliveryDate: form.deliveryDate,
          instructions: form.instructions || null,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      setPlaced(true);
      clearCart();
      router.push(`/order/${data.orderNumber}`);
    } catch {
      setPlaced(false);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <main className="min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {/* Delivery Banner */}
        <div className="bg-fuchsia/10 border border-fuchsia/20 rounded-lg p-3 mb-4 flex items-center gap-3">
          <Truck size={20} className="text-fuchsia flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <strong>Delivery days:</strong> Mondays, Wednesdays & Fridays only.
            Please select an available date below.
          </p>
        </div>

        {/* Customer Info */}
        <section className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-semibold mb-3">Your Information</h2>
          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <input
              type="email"
              placeholder="Email Address (optional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia"
            />
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-semibold mb-3">Delivery Information</h2>
          <div className="space-y-3">
            <div>
              <textarea
                placeholder="Delivery Address *"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className={inputClass("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Preferred Delivery Date *
              </label>
              <DatePicker
                value={form.deliveryDate}
                onChange={(date) => setForm({ ...form, deliveryDate: date })}
                error={errors.deliveryDate}
              />
            </div>
            <textarea
              placeholder="Delivery instructions (optional)"
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              rows={2}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia"
            />
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Order Summary</h2>
            <Link href="/cart" className="text-sm text-fuchsia hover:underline">
              Edit in Cart
            </Link>
          </div>
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ₦{item.price.toLocaleString()} each
                  </p>
                </div>

                <div className="flex items-center border rounded-lg flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-7 text-center font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <p className="font-semibold text-sm min-w-[70px] text-right">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 min-h-[40px] min-w-[40px] flex items-center justify-center flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-fuchsia">₦{subtotal.toLocaleString()}</span>
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-fuchsia text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-fuchsia-dark transition-colors disabled:opacity-50 min-h-[52px]"
        >
          <Package size={20} />
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
