import { NextResponse } from 'next/server';
import { products, categories } from '@/lib/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let result = products;

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.nameHindi?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ products: result, categories, total: result.length });
}
