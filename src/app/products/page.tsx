// app/products/page.tsx
"use client";

import { ProductCard } from "../componets/product-card";
import useSWR from "swr";

type Product = {
  id: number;
  name: string;
  price: number;
};

interface FetchError extends Error {
  message: string;
}

interface SWRResponse<T> {
  data: T | undefined;
  error: FetchError | undefined;
}

export default function ProductsPage() {
  const { data: products }: SWRResponse<Product[]> = useSWR<Product[]>(
    "/api/products",
    async (url: string): Promise<Product[]> => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    }
  );
  return (
    <div className="container mx-auto p-20">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {false ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
