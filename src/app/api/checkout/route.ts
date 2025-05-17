// File: src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay

  return NextResponse.json({ success: true });
}

export function GET() {
  return new NextResponse(null, { status: 405 });
}
