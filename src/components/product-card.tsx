"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/generated/prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <span className="text-xs font-semibold uppercase text-fuchsia bg-fuchsia/10 px-2 py-0.5 rounded">
          {product.category}
        </span>
      </div>
      {product.description && (
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
      )}
      <div className="flex items-center justify-between mt-3">
        <p className="text-fuchsia font-bold text-xl">
          ₦{product.price.toLocaleString()}
        </p>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-colors min-h-[40px] ${
            added
              ? "bg-green-500 text-white"
              : "bg-fuchsia text-white hover:bg-fuchsia-dark"
          }`}
        >
          {added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
