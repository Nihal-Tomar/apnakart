import { NextResponse } from 'next/server';
import { transactions, categorySpending, dailySpending } from '@/lib/data/transactions';

export async function GET() {
  const totalSpent = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
  const totalCredits = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);

  return NextResponse.json({
    transactions,
    categorySpending,
    dailySpending,
    summary: {
      totalSpent,
      totalCredits,
      netSpent: totalSpent - totalCredits,
      budget: 15000,
      remaining: 15000 - (totalSpent - totalCredits),
    },
  });
}
