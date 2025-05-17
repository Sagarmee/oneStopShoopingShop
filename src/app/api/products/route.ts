// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Premium Widget", price: 99.99 },
    { id: 2, name: "Deluxe Gadget", price: 149.99 },
    { id: 3, name: "Basic Thingamajig", price: 49.99 },
    { id: 4, name: "Advanced Doohickey", price: 199.99 },
    { id: 5, name: "Standard Gizmo", price: 79.99 },
    { id: 6, name: "Ultimate Contraption", price: 299.99 },
    { id: 7, name: "Essential Apparatus", price: 39.99 },
    { id: 8, name: "Pro Toolset", price: 249.99 },
    { id: 9, name: "Compact Device", price: 59.99 },
    { id: 10, name: "Smart Widgetry", price: 129.99 },
  ];

  return NextResponse.json(products, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
