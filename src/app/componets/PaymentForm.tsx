// components/payment-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import crypto from "crypto-js";

const formSchema = z.object({
  cardNumber: z.string().min(13, "Invalid card number").max(19),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(3, "CVV must be 3-4 digits")
    .max(4, "CVV must be 3-4 digits")
    .regex(/^\d+$/, "Must be only digits"),
  cardholderName: z
    .string()
    .min(1, "Cardholder name is required")
    .max(50, "Name too long"),
});

export function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const simulateTokenization = (data: z.infer<typeof formSchema>) => {
    // Simulate secure tokenization
    const combinedString = `${data.cardNumber}|${data.expiryDate}|${data.cvv}`;
    return crypto.SHA256(combinedString).toString(crypto.enc.Hex);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = simulateTokenization(values);
      console.log("Secure Token:", token);

      // Simulate payment processing
      onSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          {/* Card Number */}
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="4242 4242 4242 4242"
                    className="font-mono"
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .match(/.{1,4}/g)
                        ?.join(" ")
                        .substr(0, 19);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cardholder Name */}
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    className="uppercase"
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MM/YY"
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        field.onChange(value.substr(0, 5));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CVV */}
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123"
                      type="password"
                      className="font-mono"
                      maxLength={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full",
            form.formState.isSubmitting && "opacity-75 cursor-not-allowed"
          )}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Processing..." : "Confirm Payment"}
        </Button>
      </form>
    </Form>
  );
}
