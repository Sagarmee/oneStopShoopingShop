// app/checkout/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { PaymentForm } from "../componets/PaymentForm";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = total * 0.1;
  const grandTotal = total + tax;

  const handleReturn = () => {
    clearCart();
    router.push("/products");
  };

  return (
    <div className="container max-w-4xl p-8 space-y-8">
      <Progress value={(currentStep / 3) * 100} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {currentStep === 1 && "Review Items"}
            {currentStep === 2 && "Payment Details"}
            {currentStep === 3 && "Order Confirmation"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Item List */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Total Section */}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant="outline"
                  className="w-full mb-2 cursor-pointer"
                  onClick={() => router.push("/products")}
                >
                  Continue Shopping
                </Button>
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => setCurrentStep(2)}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <PaymentForm onSuccess={() => setCurrentStep(3)} />
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => setCurrentStep(1)}
              >
                Back to Review
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">🎉 Order Successful!</h2>
              <p>A confirmation email has been sent to your inbox.</p>
              <Button onClick={handleReturn}>Return to Shopping</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
