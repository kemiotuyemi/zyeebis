"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-4">
        <ShoppingBag size={64} className="text-gray-300" />
        <h1 className="text-2xl font-bold mt-4">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">Add some delicious items!</p>
        <Link
          href="/"
          className="mt-6 bg-fuchsia text-white px-6 py-3 rounded-lg font-semibold hover:bg-fuchsia-dark transition-colors min-h-[48px] flex items-center"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-lg shadow divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    No img
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{item.name}</h3>
                  <p className="text-fuchsia font-bold text-sm">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center border rounded-lg flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex justify-end mt-2 sm:hidden">
                <p className="font-bold text-sm text-fuchsia">
                  Total: ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow mt-4 p-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between items-baseline gap-2">
            <span className="text-lg font-bold">Total</span>
            <span className="text-fuchsia font-bold text-xl sm:text-2xl">₦{subtotal.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Delivery fee will be confirmed by Zyeebis Place.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="text-center border border-fuchsia text-fuchsia px-6 py-3 rounded-lg font-semibold hover:bg-fuchsia/5 transition-colors min-h-[48px] flex items-center justify-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/checkout"
            className="text-center bg-fuchsia text-white px-6 py-3 rounded-lg font-semibold hover:bg-fuchsia-dark transition-colors min-h-[48px] flex items-center justify-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
