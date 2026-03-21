'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Wallet, Package, TrendingUp, RefreshCcw,
  ShoppingCart, BarChart3, Bot, ShoppingBag,
  Milk, Flame, Zap, Droplets, ArrowUpRight, ArrowDownLeft, Plus,
  Sparkles, Bell
} from 'lucide-react';
import { getGreeting, formatPrice } from '@/lib/utils';
import { subscriptions } from '@/lib/data/subscriptions';
import { transactions } from '@/lib/data/transactions';
import { getRecommendedProducts } from '@/lib/agents';
import { useCartContext } from '@/lib/context';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const }
  }),
};

function CountUp({ target, prefix = '' }: { target: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{prefix}{count.toLocaleString('en-IN')}</>;
}

const stats = [
  { label: 'Monthly Spend', value: 9581, prefix: '₹', icon: Wallet, color: '#4F46E5', bg: '#EEF2FF' },
  { label: 'Items Ordered', value: 47, prefix: '', icon: Package, color: '#22C55E', bg: '#F0FDF4' },
  { label: 'Total Savings', value: 1230, prefix: '₹', icon: TrendingUp, color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Subscriptions', value: 6, prefix: '', icon: RefreshCcw, color: '#EF4444', bg: '#FEF2F2' },
];

const quickActions = [
  { label: 'Order Groceries', desc: 'Browse fresh items', icon: ShoppingCart, href: '/store', color: '#4F46E5' },
  { label: 'Check Budget', desc: 'Track your expenses', icon: BarChart3, href: '/budget', color: '#22C55E' },
  { label: 'AI Assistant', desc: 'Smart suggestions', icon: Bot, href: '/assistant', color: '#7C3AED' },
  { label: 'View Cart', desc: 'Review items', icon: ShoppingBag, href: '/cart', color: '#F59E0B' },
];

const reminderIcons: Record<string, React.ElementType> = {
  '🥛': Milk, '🔥': Flame, '⚡': Zap, '💧': Droplets,
};

export default function DashboardPage() {
  const recommended = getRecommendedProducts();
  const { addItem } = useCartContext();
  const recentTx = transactions.slice(0, 5);
  const dueSubs = subscriptions.filter(s => s.status === 'overdue' || s.status === 'active').slice(0, 4);
  const budgetUsed = 64;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ===== WELCOME HEADER ===== */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={0}
        className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--gradient-start), transparent)' }} />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--gradient-end), transparent)' }} />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--muted)' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight" style={{ color: 'var(--fg)' }}>
              {getGreeting()}, <span className="gradient-text">Nihal</span> 👋
            </h1>
            <p className="text-sm mt-2 max-w-lg" style={{ color: 'var(--muted)' }}>
              Manage your groceries, track budget, and get AI-powered suggestions for your household.
            </p>
          </div>
          <Link href="/store" className="gradient-btn inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl self-start">
            <Sparkles size={16} /> Start Shopping
          </Link>
        </div>
      </motion.div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={scaleIn} initial="hidden" animate="visible" custom={i + 1}
            className="glass card-lift rounded-3xl p-5 md:p-6 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: stat.bg }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              {stat.label === 'Subscriptions' && (
                <span className="badge text-[10px]" style={{ background: '#FEF2F2', color: 'var(--danger)' }}>1 due</span>
              )}
            </div>
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
              <CountUp target={stat.value} prefix={stat.prefix} />
            </p>
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--muted)' }}>{stat.label}</p>
            {/* Decorative corner accent */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-5"
              style={{ background: stat.color }} />
          </motion.div>
        ))}
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {quickActions.map((action, i) => (
            <motion.div key={action.label} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={action.href}
                className="glass flex flex-col items-center text-center p-5 md:p-6 rounded-3xl group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${action.color}10` }}>
                  <action.icon size={22} style={{ color: action.color }} />
                </div>
                <span className="text-[13px] font-semibold" style={{ color: 'var(--fg)' }}>{action.label}</span>
                <span className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>{action.desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===== MAIN GRID: AI Picks + Reminders ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* AI Picks (3 cols) */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} style={{ color: 'var(--primary)' }} />
              <h2 className="text-lg font-bold" style={{ color: 'var(--fg)' }}>AI Picks For You</h2>
              <span className="badge text-[10px]" style={{ background: '#EEF2FF', color: 'var(--primary)' }}>Personalized</span>
            </div>
            <Link href="/store" className="text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {recommended.map((product, i) => (
              <motion.div
                key={product.id}
                variants={scaleIn} initial="hidden" animate="visible" custom={i + 7}
                className="glass card-lift rounded-3xl p-4 group cursor-pointer"
              >
                <div className="text-center py-3">
                  <span className="product-emoji">{product.image}</span>
                </div>
                <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--fg)' }}>{product.name}</p>
                {product.nameHindi && (
                  <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{product.nameHindi} · {product.unit}</p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-base font-bold" style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-[10px] line-through" style={{ color: 'var(--muted)' }}>{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className="gradient-btn text-xs px-3 py-1.5 rounded-xl flex items-center gap-1"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reminders + Budget (2 cols) */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8} className="lg:col-span-2 space-y-5">
          {/* Reminders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell size={18} style={{ color: 'var(--accent)' }} />
                <h2 className="text-lg font-bold" style={{ color: 'var(--fg)' }}>Reminders</h2>
              </div>
              <Link href="/budget" className="text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>Manage →</Link>
            </div>
            <div className="space-y-2.5">
              {dueSubs.map(sub => {
                const IconComp = reminderIcons[sub.icon] || Bell;
                return (
                  <motion.div
                    key={sub.id}
                    whileHover={{ x: 4 }}
                    className="glass card-lift flex items-center gap-3 p-4 rounded-2xl"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: sub.status === 'overdue' ? '#FEF2F2' : 'var(--surface-hover)' }}>
                      <IconComp size={18} style={{ color: sub.status === 'overdue' ? 'var(--danger)' : 'var(--primary)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--fg)' }}>{sub.name}</p>
                      <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{sub.provider}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[13px] font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(sub.amount)}</p>
                      <span className="badge text-[10px]" style={{
                        background: sub.status === 'overdue' ? '#FEF2F2' : '#F0FDF4',
                        color: sub.status === 'overdue' ? 'var(--danger)' : 'var(--success)',
                      }}>
                        {sub.status === 'overdue' ? '⚠ Due!' : sub.frequency}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Budget Progress */}
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Wallet size={16} style={{ color: 'var(--primary)' }} />
                <p className="text-[13px] font-semibold" style={{ color: 'var(--fg)' }}>Budget Progress</p>
              </div>
              <span className="text-lg font-extrabold" style={{ color: budgetUsed > 80 ? 'var(--danger)' : 'var(--success)' }}>
                {budgetUsed}%
              </span>
            </div>
            <p className="text-[11px] mb-3" style={{ color: 'var(--muted)' }}>₹9,581 of ₹15,000 monthly budget</p>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--surface-hover)' }}>
              <motion.div
                className="h-full rounded-full progress-animated"
                initial={{ width: 0 }}
                animate={{ width: `${budgetUsed}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                style={{ background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-mid))' }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-[11px]" style={{ color: 'var(--muted)' }}>₹9,581 spent</p>
              <p className="text-[11px] font-semibold" style={{ color: 'var(--success)' }}>₹5,419 remaining</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={10}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--fg)' }}>Recent Transactions</h2>
          <Link href="/budget" className="text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>View All →</Link>
        </div>
        <div className="glass rounded-3xl overflow-hidden">
          {recentTx.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.06, duration: 0.4 }}
              className="flex items-center justify-between p-4 md:px-6 transition-colors hover:bg-[var(--surface-hover)]"
              style={{ borderBottom: i < recentTx.length - 1 ? '1px solid var(--border-color)' : 'none' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: tx.type === 'credit' ? '#F0FDF4' : '#EEF2FF',
                  }}>
                  {tx.type === 'credit'
                    ? <ArrowDownLeft size={16} style={{ color: 'var(--success)' }} />
                    : <ArrowUpRight size={16} style={{ color: 'var(--primary)' }} />
                  }
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--fg)' }}>{tx.description}</p>
                  <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{tx.category} · {tx.date}</p>
                </div>
              </div>
              <p className="text-[13px] font-bold" style={{ color: tx.type === 'credit' ? 'var(--success)' : 'var(--danger)' }}>
                {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
