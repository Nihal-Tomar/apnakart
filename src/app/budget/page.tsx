'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownLeft,
  Calendar, ChevronRight, BarChart3, PieChart, Activity,
  Target, Lightbulb, ArrowRight
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { transactions, categorySpending, dailySpending } from '@/lib/data/transactions';
import { subscriptions } from '@/lib/data/subscriptions';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const RPieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

const TABS = [
  { id: 'overview', label: 'Overview', icon: PieChart },
  { id: 'transactions', label: 'Transactions', icon: Activity },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#64748B'];

const insights = [
  { text: 'You saved ₹200 this week by buying in bulk', type: 'positive' },
  { text: 'Snacks spending is 15% higher than last month', type: 'warning' },
  { text: 'Switch to weekly veggie market for ₹400/month savings', type: 'tip' },
];

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const totalBudget = 15000;
  const totalSpent = 9581;
  const budgetPercent = Math.round((totalSpent / totalBudget) * 100);
  const remaining = totalBudget - totalSpent;

  const weeklyData = dailySpending.map(d => ({
    ...d,
    fill: d.amount > 800 ? '#EF4444' : d.amount > 400 ? '#F59E0B' : '#22C55E',
  }));

  return (
    <div className="space-y-6 pb-8 page-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
            Budget <span className="text-[var(--primary)]">Tracker</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Track spending, set goals, and save smarter</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl border p-1" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'text-white' : ''
              }`}
              style={activeTab !== tab.id ? { color: 'var(--muted)' } : undefined}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="budget-tab" className="absolute inset-0 rounded-lg bg-[var(--primary)]" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <tab.icon size={16} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===== OVERVIEW TAB ===== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between mb-3">
                <Wallet size={20} style={{ color: 'var(--muted)' }} />
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">This Month</span>
              </div>
              <p className="text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--fg)' }}>{formatPrice(totalSpent)}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Total Spent</p>
            </div>
            <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between mb-3">
                <Target size={20} style={{ color: 'var(--muted)' }} />
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600">{budgetPercent}%</span>
              </div>
              <p className="text-2xl font-bold tracking-tight mb-1 text-[var(--primary)]">{formatPrice(remaining)}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Remaining Budget</p>
            </div>
            <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between mb-3">
                <TrendingUp size={20} style={{ color: 'var(--muted)' }} />
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600 flex items-center gap-1"><ArrowUpRight size={10} /> +14%</span>
              </div>
              <p className="text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--fg)' }}>₹1,230</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Savings This Month</p>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Monthly Budget Progress</h3>
              <span className="text-sm font-bold" style={{ color: 'var(--fg)' }}>₹{totalBudget.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full h-4 rounded-full overflow-hidden mb-4" style={{ background: 'var(--bg)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${budgetPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: budgetPercent > 80
                    ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
                    : 'linear-gradient(90deg, #22C55E, #16A34A)',
                }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>₹{totalSpent.toLocaleString('en-IN')} spent</span>
              <span className="text-[var(--primary)] font-medium">₹{remaining.toLocaleString('en-IN')} left</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Spending Bar Chart */}
            <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--fg)' }}>Weekly Spending</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData} barCategoryGap="30%">
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `₹${v}`} />
                  <Tooltip
                    formatter={(value) => [formatPrice(Number(value ?? 0)), 'Spent']}
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Pie Chart */}
            <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--fg)' }}>Spending by Category</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RPieChart>
                  <Pie data={categorySpending} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} strokeWidth={0}>
                    {categorySpending.map((entry, i) => (
                      <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatPrice(Number(value ?? 0)), 'Spent']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                </RPieChart>
              </ResponsiveContainer>
              
            </div>
          </div>

          {/* Insights */}
          <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={20} className="text-amber-500" />
              <h3 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Savings Insights</h3>
            </div>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                  <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    insight.type === 'positive' ? 'bg-green-500' : insight.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-sm" style={{ color: 'var(--fg)' }}>{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions */}
          <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} style={{ color: 'var(--muted)' }} />
                <h3 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Recurring Bills</h3>
              </div>
            </div>
            <div className="space-y-2">
              {subscriptions.map(sub => (
                <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bg)] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg)' }}>{sub.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{sub.name}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{sub.provider} · {sub.frequency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{formatPrice(sub.amount)}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      sub.status === 'overdue' ? 'bg-red-50 text-red-600' :
                      sub.status === 'paused' ? 'bg-gray-100 text-gray-500' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== TRANSACTIONS TAB ===== */}
      {activeTab === 'transactions' && (
        <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
          <div className="p-4 border-b hidden md:grid grid-cols-4 text-xs font-medium uppercase tracking-wider" style={{ borderColor: 'var(--border-color)', color: 'var(--muted)' }}>
            <span>Description</span>
            <span>Category</span>
            <span>Date</span>
            <span className="text-right">Amount</span>
          </div>
          {transactions.map(tx => (
            <div key={tx.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-0 items-center p-4 border-b last:border-0 hover:bg-[var(--bg)] transition-colors" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <TrendingDown size={16} />}
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{tx.description}</p>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{tx.category}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{tx.date}</p>
              <p className={`text-sm font-semibold text-right ${tx.type === 'credit' ? 'text-[var(--primary)]' : ''}`} style={tx.type !== 'credit' ? { color: 'var(--fg)' } : undefined}>
                {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ===== ANALYTICS TAB ===== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Category Breakdown */}
          <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--fg)' }}>Category-wise Spending</h3>
            <div className="space-y-4">
              {categorySpending.map((cat, i) => (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium" style={{ color: 'var(--fg)' }}>{cat.category}</span>
                    <span className="font-semibold" style={{ color: 'var(--fg)' }}>{formatPrice(cat.amount)}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(cat.amount / 3500) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Trend Chart */}
          <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-base font-semibold mb-6" style={{ color: 'var(--fg)' }}>Daily Spending Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dailySpending} barCategoryGap="25%">
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} tickFormatter={v => `₹${v}`} />
                <Tooltip
                  formatter={(value) => [formatPrice(Number(value ?? 0)), 'Spent']}
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]} fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
