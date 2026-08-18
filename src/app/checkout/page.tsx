"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { Package, Truck } from "lucide-react";
import DatePicker from "@/components/date-picker";

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  deliveryDate?: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "LCCI Ikeja",
    deliveryDate: "",
    instructions: "",
  });

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold">No items to checkout</h1>
        <Link href="/" className="mt-4 text-fuchsia hover:underline">
          Browse Products
        </Link>
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
      clearCart();
      router.push(`/order/${data.orderNumber}`);
    } catch {
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
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <div className="divide-y text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span className="font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
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
