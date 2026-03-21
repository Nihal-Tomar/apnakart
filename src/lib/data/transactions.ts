import { Transaction } from '@/types';

export const transactions: Transaction[] = [
  { id: 't1', description: 'Weekly Groceries', category: 'Groceries', amount: 1250, date: '2026-03-20', type: 'debit' },
  { id: 't2', description: 'Milk Subscription', category: 'Dairy', amount: 68, date: '2026-03-20', type: 'debit' },
  { id: 't3', description: 'Vegetable Market', category: 'Vegetables', amount: 340, date: '2026-03-19', type: 'debit' },
  { id: 't4', description: 'Cashback Reward', category: 'Reward', amount: 50, date: '2026-03-19', type: 'credit' },
  { id: 't5', description: 'LPG Gas Cylinder', category: 'Gas', amount: 903, date: '2026-03-18', type: 'debit' },
  { id: 't6', description: 'Fruits Purchase', category: 'Fruits', amount: 420, date: '2026-03-17', type: 'debit' },
  { id: 't7', description: 'Electricity Bill', category: 'Utilities', amount: 1450, date: '2026-03-16', type: 'debit' },
  { id: 't8', description: 'Snacks & Beverages', category: 'Snacks', amount: 280, date: '2026-03-15', type: 'debit' },
  { id: 't9', description: 'Monthly Atta Supply', category: 'Grains', amount: 520, date: '2026-03-14', type: 'debit' },
  { id: 't10', description: 'Online Offer Refund', category: 'Reward', amount: 120, date: '2026-03-14', type: 'credit' },
  { id: 't11', description: 'Spices Restock', category: 'Spices', amount: 350, date: '2026-03-13', type: 'debit' },
  { id: 't12', description: 'Personal Care Items', category: 'Personal', amount: 650, date: '2026-03-12', type: 'debit' },
  { id: 't13', description: 'Oil & Ghee Purchase', category: 'Oils', amount: 780, date: '2026-03-11', type: 'debit' },
  { id: 't14', description: 'Water Bill', category: 'Utilities', amount: 350, date: '2026-03-10', type: 'debit' },
  { id: 't15', description: 'Festival Groceries', category: 'Groceries', amount: 2200, date: '2026-03-09', type: 'debit' },
];

export const categorySpending = [
  { category: 'Groceries', amount: 3450, color: '#6366f1' },
  { category: 'Vegetables', amount: 1240, color: '#22c55e' },
  { category: 'Dairy', amount: 890, color: '#3b82f6' },
  { category: 'Fruits', amount: 720, color: '#f59e0b' },
  { category: 'Utilities', amount: 1800, color: '#ef4444' },
  { category: 'Spices', amount: 350, color: '#ec4899' },
  { category: 'Snacks', amount: 280, color: '#8b5cf6' },
  { category: 'Others', amount: 1430, color: '#64748b' },
];

export const dailySpending = [
  { day: 'Mon', amount: 320 },
  { day: 'Tue', amount: 180 },
  { day: 'Wed', amount: 450 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 620 },
  { day: 'Sat', amount: 890 },
  { day: 'Sun', amount: 1250 },
];
