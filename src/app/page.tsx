'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Package, TrendingUp, RefreshCcw, ShoppingCart, BarChart3, Bot, ShoppingBag, Milk, Flame, Zap, Droplets, ArrowUpRight, ArrowDownLeft, Plus, Sparkles, ChevronRight, Bell, Tag, ArrowRight } from 'lucide-react';
import { getGreeting, formatPrice } from '@/lib/utils';
import { subscriptions } from '@/lib/data/subscriptions';
import { transactions } from '@/lib/data/transactions';
import { getRecommendedProducts } from '@/lib/agents';
import { useCartContext } from '@/lib/context';
import { useToast } from '@/components/ui/Toast';

// SNAPPY ANIMATIONS (Reduced durations from 0.7 to 0.2s)
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.25, ease: 'easeOut' } // Fast snappy entry
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
};

function CountUp({ target, prefix = '' }: { target: number; prefix?: string }) {
  const [count, setCount] = useState(target); // Start at target to avoid delay, or set to target value directly
  return <>{prefix}{target.toLocaleString('en-IN')}</>;
}

const stats = [
  { label: 'Weekly Spend', value: 9581, prefix: '₹', icon: Wallet, color: '#000000', bg: '#F8F9FA' },
  { label: 'Total Items', value: 47, prefix: '', icon: Package, color: '#82C341', bg: '#F9FBF5' },
  { label: 'Cart Savings', value: 1230, prefix: '₹', icon: TrendingUp, color: '#FF9F00', bg: '#FFFBF2' },
  { label: 'Active Subs', value: 6, prefix: '', icon: RefreshCcw, color: '#EF4444', bg: '#FFF5F5' },
];

const reminderIcons: Record<string, React.ElementType> = {
  '🥛': Milk, '🔥': Flame, '⚡': Zap, '💧': Droplets,
};

export default function DashboardPage() {
  const recommended = getRecommendedProducts();
  const { addItem } = useCartContext();
  const { addToast } = useToast();
  const recentTx = transactions.slice(0, 5);
  const dueSubs = subscriptions.filter(s => s.status === 'overdue' || s.status === 'active').slice(0, 4);
  const budgetUsed = 64;

  const handleAddToCart = (product: any) => {
    addItem(product);
    addToast('success', `${product.name} added to cart! 🛒`);
  };

  return (
    <div className="space-y-24 pb-24 page-fade-in">
      {/* ##### HERO SECTION ##### */}
      <section className="relative overflow-hidden">
        <div 
          className="rounded-[56px] p-12 md:p-20 lg:p-24 shadow-2xl overflow-hidden relative border border-gray-100"
          style={{ background: '#FFFFFF' }}
        >
          <div className="absolute right-20 -top-20 w-[700px] h-[700px] rounded-full bg-green-500/5 blur-[140px]" />
          
          <div className="relative z-10 flex flex-col items-center lg:items-start gap-12 lg:flex-row lg:justify-between text-center lg:text-left">
             <div className="max-w-2xl px-6 md:px-0 pl-12 border-l-8 border-black">
                <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/5 text-black text-[11px] font-black uppercase tracking-[0.3em] border border-black/5 mb-12">
                   ✨ Experience Smart Living
                </span>
                <h1 className="text-6xl md:text-8xl font-black text-black leading-[1.05] mb-10 tracking-tighter">
                  {getGreeting()}, <span className="text-[var(--primary)]">Nihal!</span> 🙏
                </h1>
                <p className="text-gray-900 text-xl md:text-2xl mb-12 font-bold leading-relaxed opacity-60">
                   Your personalized dashboard for groceries and budget tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/store" className="bg-black text-white px-12 py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-3xl transition-transform active:scale-95">
                    Shop Premium <ChevronRight size={18} />
                  </Link>
                   <Link href="/budget" className="bg-white hover:bg-gray-50 text-black px-12 py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-4 border border-gray-200 transition-all">
                    Weekly Budget
                  </Link>
                </div>
             </div>
             
             <div className="hidden lg:flex flex-1 justify-center relative min-h-[400px]">
                <div className="flex flex-col gap-8 relative z-10">
                   <div className="flex items-center gap-8 bg-white p-8 rounded-[36px] border border-gray-100 shadow-3xl">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-50">
                         <img src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="product" />
                      </div>
                      <div className="text-left pr-12"><p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1.5">Fresh & Fast</p><p className="text-xl font-black text-black tracking-tight leading-none">Organic Spinach</p></div>
                   </div>
                   <div className="flex items-center gap-8 bg-white p-8 rounded-[36px] border border-gray-100 shadow-3xl">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-50">
                        <img src="https://images.unsplash.com/photo-1563636619-e910ef2a844b?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="product" />
                      </div>
                      <div className="text-left pr-12"><p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">A2 Grade</p><p className="text-xl font-black text-black tracking-tight leading-none">Full Fat Milk</p></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ##### STATS: SNAPPY ##### */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={scaleIn} initial="hidden" animate="visible"
            className="group card-hover rounded-[40px] p-10 md:p-12 pl-12 relative overflow-hidden flex flex-col items-start text-left bg-white"
            style={{ color: '#000000' }}
          >
            <div className="flex items-start justify-between w-full mb-10">
              <div className="w-16 h-16 rounded-[20px] bg-gray-50 flex items-center justify-center"
                style={{ background: stat.bg }}>
                <stat.icon size={28} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-2">
              {stat.prefix}{stat.value.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1 pr-6">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ##### CONTENT GRID ##### */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left: AI Picks */}
        <div className="lg:col-span-8 space-y-16">
           <div className="flex items-center justify-between px-4 pl-4">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-[20px] bg-black text-[var(--primary)] flex items-center justify-center shadow-2xl">
                    <Sparkles size={24} />
                 </div>
                 <div>
                    <h2 className="text-4xl font-black text-black tracking-tighter uppercase">AI Selected Essentials</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2 pl-1">High Definition Real Photography</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {recommended.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={fadeUp} initial="hidden" animate="visible"
                  className="bg-white rounded-[40px] p-10 pl-12 border border-gray-100 card-hover flex flex-col group shadow-sm text-left"
                >
                   <div className="relative mb-12 h-44 overflow-hidden rounded-[28px] bg-gray-50 border border-gray-50 flex items-center justify-center">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={product.name} />
                   </div>
                   <div className="space-y-4 flex-grow pl-2">
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">{product.category}</p>
                      <h3 className="text-2xl font-black text-black tracking-tighter leading-tight mb-2 pr-6">{product.name}</h3>
                      <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest leading-none">{product.unit}</p>
                   </div>
                   <div className="flex items-center justify-between mt-12 pt-10 border-t border-gray-50 pl-2">
                      <p className="text-3xl font-black text-black tracking-tighter leading-none">{formatPrice(product.price)}</p>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-14 h-14 rounded-2xl bg-black text-white hover:bg-[var(--primary)] shadow-2xl active:scale-90 transition-all flex items-center justify-center"
                      >
                         <Plus size={24} />
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Right: Sidebar Cards */}
        <div className="lg:col-span-4 space-y-20">
           {/* Budget meter */}
           <div className="bg-white p-12 pl-12 rounded-[48px] border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-black" />
              <div className="flex justify-between items-center mb-10 pl-2">
                 <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.4em]">Monthly Split</h3>
                 <span className="text-5xl font-black text-black tracking-tighter">{budgetUsed}%</span>
              </div>
              <div className="relative w-full h-5 bg-gray-100 rounded-full shadow-inner mb-8 px-1">
                 <div className="h-full bg-black rounded-full shadow-2xl" style={{ width: `${budgetUsed}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-50 pl-2">
                 <div className="text-left border-l-4 border-gray-100 pl-4">
                    <span className="text-[10px] font-black text-gray-400 tracking-widest block mb-2">Expended</span>
                    <span className="text-xl font-black text-black tracking-tighter">₹9,581</span>
                 </div>
                 <div className="text-left border-l-4 border-[var(--primary)] pl-4">
                    <span className="text-[10px] font-black text-gray-400 tracking-widest block mb-2">Residual</span>
                    <span className="text-xl font-black text-black tracking-tighter">₹5,419</span>
                 </div>
              </div>
           </div>

           {/* Spending Log */}
           <div className="space-y-12">
               <div className="flex items-center gap-6 px-6">
                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-2xl">
                      <Tag size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-black tracking-tighter uppercase">Spending Log</h3>
                </div>
                <div className="bg-white rounded-[48px] p-6 space-y-4 border border-gray-50">
                   {recentTx.map((tx) => (
                     <div key={tx.id} className="flex justify-between items-center p-6 pl-10 rounded-3xl hover:bg-gray-50 transition-all group cursor-pointer border border-transparent hover:border-gray-100 relative overflow-hidden">
                        <div className="flex items-center gap-6 text-left">
                           <div className="pr-4">
                              <p className="text-base font-black text-black tracking-tight leading-none mb-2">{tx.description}</p>
                              <p className="text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase">{tx.category}</p>
                           </div>
                        </div>
                        <p className="text-xl font-black tracking-tighter text-black">
                           {tx.type === 'debit' ? '-' : '+'}{formatPrice(tx.amount)}
                        </p>
                     </div>
                   ))}
                </div>
           </div>
        </div>
      </div>
    </div>
  );
}
