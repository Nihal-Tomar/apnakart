import { NextResponse } from 'next/server';

let cartItems: { productId: string; quantity: number }[] = [];

export async function GET() {
  return NextResponse.json({ items: cartItems, total: cartItems.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { productId, quantity } = body;

  const existing = cartItems.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity || 1;
  } else {
    cartItems.push({ productId, quantity: quantity || 1 });
  }

  return NextResponse.json({ items: cartItems, message: 'Item added' });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (productId) {
    cartItems = cartItems.filter(item => item.productId !== productId);
  } else {
    cartItems = [];
  }

  return NextResponse.json({ items: cartItems, message: 'Cart updated' });
}
