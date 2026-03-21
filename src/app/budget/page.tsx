'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownLeft,
  RefreshCcw, Lightbulb, UtensilsCrossed, Calendar
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { transactions, categorySpending, dailySpending } from '@/lib/data/transactions';
import { subscriptions } from '@/lib/data/subscriptions';
import { mealPlans } from '@/lib/data/user';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Wallet },
  { id: 'transactions', label: 'Transactions', icon: TrendingDown },
  { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCcw },
  { id: 'meals', label: 'Meal Plans', icon: UtensilsCrossed },
];

const tips = [
  { icon: Lightbulb, text: 'Buy vegetables from weekly market — save ₹500/month', color: '#F59E0B' },
  { icon: TrendingUp, text: 'Bulk buy dal & rice quarterly — save ₹400', color: '#22C55E' },
  { icon: Lightbulb, text: 'Switch to LED lights — save ₹200/month', color: '#4F46E5' },
];

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const budgetUsed = 64;
  const maxSpend = Math.max(...categorySpending.map(c => c.amount));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <Wallet size={28} style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
            Budget <span className="gradient-text">Dashboard</span>
          </h1>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Track expenses, manage subscriptions, and plan meals</p>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        className="flex gap-1 p-1 rounded-2xl w-fit" style={{ background: 'var(--surface-hover)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
            style={activeTab === tab.id
              ? { background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))', color: '#fff', boxShadow: '0 4px 15px rgba(79,70,229,0.25)' }
              : { color: 'var(--muted)' }
            }>
            <tab.icon size={15} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Budget Meter */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold" style={{ color: 'var(--fg)' }}>Monthly Budget</h3>
              <span className="text-2xl font-extrabold" style={{ color: budgetUsed > 80 ? 'var(--danger)' : 'var(--success)' }}>
                {budgetUsed}% <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>used</span>
              </span>
            </div>
            <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: 'var(--surface-hover)' }}>
              <motion.div className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${budgetUsed}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                style={{ background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-mid))' }} />
            </div>
            <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--muted)' }}>
              <span>₹9,581 spent</span><span className="font-semibold" style={{ color: 'var(--success)' }}>₹5,419 remaining</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Spending */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass rounded-3xl p-6">
              <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--fg)' }}>Spending by Category</h3>
              <div className="space-y-3">
                {categorySpending.map((cat, i) => (
                  <div key={cat.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium" style={{ color: 'var(--fg)' }}>{cat.category}</span>
                      <span className="font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(cat.amount)}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-hover)' }}>
                      <motion.div className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.amount / maxSpend) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                        style={{ background: cat.color || 'var(--primary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Spending */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass rounded-3xl p-6">
              <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--fg)' }}>This Week&apos;s Spending</h3>
              <div className="flex items-end justify-between gap-2 h-40">
                {dailySpending.map((day, i) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(day.amount)}</span>
                    <motion.div className="w-full rounded-xl"
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(day.amount / 15, 8)}%` }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
                      style={{ background: i === dailySpending.length - 1 ? 'var(--accent)' : 'linear-gradient(180deg, var(--gradient-start), var(--gradient-mid))', minHeight: '8px' }} />
                    <span className="text-[10px] font-medium" style={{ color: 'var(--muted)' }}>{day.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Tips */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--fg)' }}>💡 Smart Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tips.map((tip, i) => (
                <motion.div key={i} whileHover={{ y: -2 }} className="glass card-lift rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${tip.color}15` }}>
                    <tip.icon size={16} style={{ color: tip.color }} />
                  </div>
                  <p className="text-[12px] font-medium" style={{ color: 'var(--fg)' }}>{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* TRANSACTIONS TAB */}
      {activeTab === 'transactions' && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl overflow-hidden">
          {transactions.map((tx, i) => (
            <div key={tx.id} className="flex items-center justify-between p-4 md:px-6 transition-colors hover:bg-[var(--surface-hover)]"
              style={{ borderBottom: i < transactions.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: tx.type === 'credit' ? '#F0FDF4' : '#EEF2FF' }}>
                  {tx.type === 'credit' ? <ArrowDownLeft size={16} style={{ color: 'var(--success)' }} /> : <ArrowUpRight size={16} style={{ color: 'var(--primary)' }} />}
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--fg)' }}>{tx.description}</p>
                  <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{tx.category} · {tx.date}</p>
                </div>
              </div>
              <p className="text-[13px] font-bold" style={{ color: tx.type === 'credit' ? 'var(--success)' : 'var(--danger)' }}>
                {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* SUBSCRIPTIONS TAB */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map((sub, i) => (
            <motion.div key={sub.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="glass card-lift flex items-center gap-4 p-5 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: sub.status === 'overdue' ? '#FEF2F2' : 'var(--surface-hover)' }}>
                {sub.icon}
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold" style={{ color: 'var(--fg)' }}>{sub.name}</p>
                <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{sub.provider} · {sub.frequency}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(sub.amount)}</p>
                <span className="badge text-[10px]" style={{
                  background: sub.status === 'overdue' ? '#FEF2F2' : sub.status === 'active' ? '#F0FDF4' : 'var(--surface-hover)',
                  color: sub.status === 'overdue' ? 'var(--danger)' : sub.status === 'active' ? 'var(--success)' : 'var(--muted)',
                }}>
                  {sub.status === 'overdue' ? '⚠ Overdue' : sub.status === 'active' ? '✓ Active' : 'Paused'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MEAL PLANS TAB */}
      {activeTab === 'meals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mealPlans.map((plan, i) => (
            <motion.div key={plan.day}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
              className="glass card-lift rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={15} style={{ color: 'var(--primary)' }} />
                <p className="text-[13px] font-bold" style={{ color: 'var(--fg)' }}>{plan.day}</p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-start"><span className="text-xs">🌅</span><div><p className="text-[10px] font-semibold" style={{ color: 'var(--muted)' }}>Breakfast</p><p className="text-[12px] font-medium" style={{ color: 'var(--fg)' }}>{plan.breakfast}</p></div></div>
                <div className="flex gap-2 items-start"><span className="text-xs">🍛</span><div><p className="text-[10px] font-semibold" style={{ color: 'var(--muted)' }}>Lunch</p><p className="text-[12px] font-medium" style={{ color: 'var(--fg)' }}>{plan.lunch}</p></div></div>
                <div className="flex gap-2 items-start"><span className="text-xs">🌙</span><div><p className="text-[10px] font-semibold" style={{ color: 'var(--muted)' }}>Dinner</p><p className="text-[12px] font-medium" style={{ color: 'var(--fg)' }}>{plan.dinner}</p></div></div>
              </div>
              {plan.estimatedCost && (
                <p className="text-[11px] font-semibold mt-3 pt-2" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--primary)' }}>
                  Est. Cost: {formatPrice(plan.estimatedCost)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
