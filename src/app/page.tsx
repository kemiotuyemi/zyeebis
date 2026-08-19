import { prisma } from "@/lib/prisma";
import type { Product } from "@/generated/prisma/client";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import CheckoutCta from "@/components/checkout-cta";
import PaymentDetails from "@/components/payment-details";
import Image from "next/image";

export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      where: { available: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-fuchsia text-white py-10 sm:py-16 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Zyeebis Place</h1>
        <p className="mt-3 text-lg sm:text-xl opacity-90">
          Delicious food & cakes, delivered to you
        </p>
        <p className="mt-4 text-sm opacity-75">
          Choose your preferred delivery date at checkout
        </p>
        {products.length > 0 && (
          <a
            href="#products"
            className="mt-6 inline-block bg-white text-fuchsia px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[48px]"
          >
            View Menu
          </a>
        )}
      </header>

      <section id="products" className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Our Menu</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Products coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/products/${product.id}`}>
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={800}
                      height={400}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300">
                      No image
                    </div>
                  )}
                </Link>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      <CheckoutCta />

      <PaymentDetails />

      <section className="bg-gray-50 py-8 px-4 text-center">
        <p className="text-gray-600 mb-3">
          Questions about your order?
        </p>
        <a
          href={`https://wa.me/${(process.env.BUSINESS_PHONE || "+2348101638706").replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors min-h-[48px]"
        >
          Chat with us on WhatsApp
        </a>
      </section>
    </main>
  );
}
