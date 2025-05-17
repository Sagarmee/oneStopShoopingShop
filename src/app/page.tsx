"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Checkout Page</h1>
        <p className="text-gray-500">Your one-stop solution for all products</p>
      </div>

      <div className="flex flex-col items-start justify-start">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <Button
            onClick={() => router.push("/products")}
            className="cursor-pointer"
          >
            Explore Products
          </Button>
        </div>
      </div>

      <footer className="text-center text-gray-500">
        &copy; 2023 Your Company. All rights reserved.
      </footer>
    </div>
  );
}
