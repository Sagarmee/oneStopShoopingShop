// components/cart-sheet.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartSheet() {
  const router = useRouter();
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative pr-4 cursor-pointer">
          <ShoppingCart className="h-4 w-4" />
          Cart
          <Badge className="ml-2 absolute -right-2 -top-2">
            {cartItems.length}
          </Badge>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl p-4">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-bold">
            Cart Items ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card shadow-sm"
              >
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-base">{item.name}</h4>
                  <p className="text-sm font-semibold text-primary">
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-6 text-center font-medium">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive/80 hover:text-destructive h-8 px-2 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center">
                  No items in cart
                </p>
              </div>
            )}
          </div>

          {/* Checkout Button */}
          <div className="sticky bottom-0 bg-background pt-4">
            <Button
              className="w-full h-11 text-base cursor-pointer"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Checkout Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
