"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="bg-fuchsia text-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Zyeebis Place
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-fuchsia text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
