"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import type { Product } from "@/generated/prisma/client";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-fuchsia mb-4 hover:underline text-sm"
        >
          &larr; Back
        </button>

        <div className="flex flex-col sm:flex-row gap-8">
          {product.imageUrl && (
            <div className="sm:w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="flex-1">
            <span className="text-xs font-semibold uppercase text-fuchsia bg-fuchsia/10 px-2 py-1 rounded">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold mt-3">{product.name}</h1>
            {product.description && (
              <p className="text-gray-600 mt-2">{product.description}</p>
            )}
            <p className="text-fuchsia font-bold text-3xl mt-4">
              ₦{product.price.toLocaleString()}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-semibold min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Subtotal: ₦{(product.price * quantity).toLocaleString()}
            </p>

            <button
              onClick={handleAdd}
              className="mt-6 bg-fuchsia text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-fuchsia-dark transition-colors"
            >
              <ShoppingCart size={18} />
              {added ? "Added!" : "Add to Cart"}
            </button>

            {added && (
              <button
                onClick={() => router.push("/cart")}
                className="mt-3 text-fuchsia hover:underline text-sm"
              >
                View Cart &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
