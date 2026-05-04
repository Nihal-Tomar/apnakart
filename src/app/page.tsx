'use client';

import React, { useState, useEffect } from 'react';
import type { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ShoppingBag, Wallet, Bot, TrendingUp, ChevronRight, Plus, Sparkles, Clock, Truck, Star, ArrowRight } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';
import { formatPrice } from '@/lib/utils';
import { getGreetingForHour } from '@/lib/utils';
import { getRecommendedProducts } from '@/lib/agents';
import { useCartContext } from '@/lib/context';
import { useToast } from '@/components/ui/Toast';
import { useCartSidebar } from '@/components/ui/CartSidebar';
import { categories } from '@/lib/data/products';
import { transactions } from '@/lib/data/transactions';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.05,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const quickActions = [
  { href: '/store', label: 'Grocery Store', desc: '19 items', icon: ShoppingBag, color: '#22C55E', bg: '#F0FDF4' },
  { href: '/budget', label: 'Budget Tracker', desc: '₹9.5k spent', icon: Wallet, color: '#3B82F6', bg: '#EFF6FF' },
  { href: '/assistant', label: 'AI Assistant', desc: 'Ask anything', icon: Bot, color: '#8B5CF6', bg: '#F5F3FF' },
  { href: '/store', label: 'Quick Picks', desc: '< 2 mins', icon: Clock, color: '#F59E0B', bg: '#FFFBEB' },
];

const stats = [
  { label: 'Weekly Spend',  value: '₹9,581', numericValue: 9581, prefix: '₹', change: '+12%', icon: Wallet,      positive: false },
  { label: 'Items Bought',  value: '47',     numericValue: 47,   prefix: '',  change: '+8',   icon: ShoppingBag, positive: true },
  { label: 'Total Savings', value: '₹1,230', numericValue: 1230, prefix: '₹', change: '+₹200',icon: TrendingUp,  positive: true },
];

export default function DashboardPage() {
  const recommended = getRecommendedProducts();
  const { addItem } = useCartContext();
  const { addToast } = useToast();
  const { openCart } = useCartSidebar();
  const recentTx = transactions.slice(0, 5);

  // ── Greeting: computed client-side only to avoid hydration mismatch.
  // SSR renders a neutral 'Hello'; useEffect swaps it with the real greeting.
  const [greeting, setGreeting] = useState('Hello');
  const [name, setName] = useState('Nihal');
  const [showModal, setShowModal] = useState(false);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    setGreeting(getGreetingForHour(new Date().getHours()));
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      localStorage.setItem('userName', inputName.trim());
      setName(inputName.trim());
      setShowModal(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    addToast('cart', `${product.name} added to cart!`);
    openCart();
  };

  return (
    <>
      <div className="space-y-8 pb-8 page-fade-in">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden rounded-2xl p-6 md:p-10 lg:p-12" style={{ background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--surface) 50%, var(--bg) 100%)' }}>
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#22C55E]/5 blur-[100px]" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 text-xs font-medium text-[var(--primary)] mb-4 border border-green-100">
              <Sparkles size={14} /> Smart Daily Needs Platform
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.15] mb-3" style={{ color: '#0F172A' }}>
              {greeting}, <span className="text-gradient">{name}!</span> 👋
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#64748B' }}>
              Your personalized dashboard for groceries, budgets, and smart recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/store" className="gradient-btn px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 group">
                Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/budget" className="px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 border transition-all hover:shadow-sm" style={{ background: 'white', borderColor: '#E2E8F0', color: '#1E293B' }}>
                View Budget
              </Link>
            </div>
          </div>

          {/* Hero Cards */}
          <div className="hidden lg:flex flex-col gap-3 w-72">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-md border border-white/50"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=200" fill className="object-cover" alt="Bananas" sizes="48px" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--primary)]">Fresh & Organic</p>
                <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>Organic Bananas</p>
              </div>
              <span className="ml-auto text-sm font-bold" style={{ color: '#0F172A' }}>₹49</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-md border border-white/50"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1563636619-e910ef2a844b?auto=format&fit=crop&q=80&w=200" fill className="object-cover" alt="Milk" sizes="48px" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-500">Daily Essential</p>
                <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>Amul Milk</p>
              </div>
              <span className="ml-auto text-sm font-bold" style={{ color: '#0F172A' }}>₹68</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-green-100"
            >
              <Truck size={16} className="text-[var(--primary)]" />
              <p className="text-xs font-medium" style={{ color: '#64748B' }}>Free delivery on orders above ₹499</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {quickActions.map((action, i) => (
          <motion.div key={action.label} custom={i} variants={fadeUp} initial="hidden" animate="visible">
            <Link href={action.href} className="group flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: action.bg }}>
                <action.icon size={20} style={{ color: action.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--fg)' }}>{action.label}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{action.desc}</p>
              </div>
              <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: 'var(--muted)' }} />
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ===== STATS CARDS ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label} custom={i} variants={fadeUp} initial="hidden" animate="visible"
            className="p-5 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} style={{ color: 'var(--muted)' }} />
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--fg)' }}>
              <CountUp target={stat.numericValue} prefix={stat.prefix} />
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ===== CATEGORIES SCROLL ===== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Shop by Category</h2>
          <Link href="/store" className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat, i) => (
            <Link key={cat.id} href="/store"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap text-sm font-medium transition-all hover:border-[var(--primary)] hover:shadow-sm flex-shrink-0"
              style={{ background: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Picks (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-[var(--primary)]" />
              <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Recommended for You</h2>
            </div>
            <Link href="/store" className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">
              See all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {recommended.map((product, i) => (
              <motion.div
                key={product.id} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                className="group rounded-xl border overflow-hidden transition-all hover:shadow-md"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="relative h-36 md:h-40 overflow-hidden" style={{ background: 'var(--bg)' }}>
                  <Image src={product.image} alt={product.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw" />
                  {product.discount && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500 text-white">
                      {product.discount}% OFF
                    </span>
                  )}
                  {product.isOrganic && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500 text-white">
                      Organic
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <p className="text-[11px] font-medium uppercase tracking-wide mb-1 text-[var(--primary)]">{product.category}</p>
                  <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2" style={{ color: 'var(--fg)' }}>{product.name}</h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{product.unit}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="ml-1.5 text-xs line-through" style={{ color: 'var(--muted)' }}>{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--primary-hover)] active:scale-90 transition-all shadow-sm shadow-green-500/20"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-4">
          {/* Budget Overview */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Monthly Budget</h3>
              <Link href="/budget" className="text-xs font-medium text-[var(--primary)]">Details</Link>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>64%</span>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>used</span>
            </div>
            <div className="w-full h-2.5 rounded-full overflow-hidden mb-4" style={{ background: 'var(--bg)' }}>
              <div className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] transition-all duration-1000" style={{ width: '64%' }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Spent</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>₹9,581</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Remaining</p>
                <p className="text-sm font-semibold text-[var(--primary)]">₹5,419</p>
              </div>
            </div>
          </div>

          {/* Spending Log */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Recent Activity</h3>
              <Link href="/budget" className="text-xs font-medium text-[var(--primary)]">View all</Link>
            </div>
            <div className="space-y-1">
              {recentTx.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[var(--bg)] transition-colors">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{tx.description}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{tx.category}</p>
                  </div>
                  <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-[var(--primary)]' : ''}`} style={tx.type !== 'credit' ? { color: 'var(--fg)' } : undefined}>
                    {tx.type === 'debit' ? '-' : '+'}{formatPrice(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Name Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm" style={{ animation: 'scaleUp 0.3s ease-out' }}>
            <h2 className="text-xl font-bold mb-4 text-center text-[#0F172A]">Welcome to ApnaKart!</h2>
            <form onSubmit={handleSaveName} className="flex flex-col gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Enter your name</label>
                <input
                  id="username"
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] outline-none transition-all"
                  placeholder="e.g. Rahul"
                  autoFocus
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#22C55E] text-white font-semibold py-2.5 rounded-xl hover:bg-[#16A34A] transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
