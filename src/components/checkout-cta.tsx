"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { ShoppingBag } from "lucide-react";

export default function CheckoutCta() {
  const { itemCount, subtotal } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-2">
      <div className="bg-white border border-fuchsia/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-fuchsia/10 text-fuchsia p-2.5 rounded-lg">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">
              {itemCount} item{itemCount !== 1 ? "s" : ""} in cart
            </p>
            <p className="text-fuchsia font-bold">
              ₦{subtotal.toLocaleString()}
            </p>
          </div>
        </div>
        <Link
          href="/checkout"
          className="w-full sm:w-auto text-center bg-fuchsia text-white px-6 py-3 rounded-lg font-semibold hover:bg-fuchsia-dark transition-colors min-h-[48px] flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Checkout
        </Link>
      </div>
    </div>
  );
}
