// components/product-card.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

type Product = {
  id: number;
  name: string;
  price: number;
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">
          {product.price.toFixed(2)}
        </p>
        <Button
          onClick={() => addToCart(product)}
          className="w-full gap-2 cursor-pointer"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
