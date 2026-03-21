'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '@/lib/context';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Minus, Plus, Trash2, Tag, Truck, ShieldCheck, Sparkles, X, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalSavings, addItem } = useCartContext();
  const { addToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const delivery = totalPrice > 499 ? 0 : 40;
  const promoDiscount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice - promoDiscount + delivery;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'APNA2026' || promoCode.toUpperCase() === 'FIRST10') {
      setPromoApplied(true);
      addToast('success', '10% discount applied! 🎉');
    } else {
      addToast('error', 'Invalid code! Try FIRST10');
    }
  };

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center py-40 bg-white dark:bg-slate-800 rounded-[48px] border border-gray-100 dark:border-slate-700 shadow-sm px-12">
        <div className="w-32 h-32 mx-auto rounded-full bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-7xl mb-10 animate-float">🛒</div>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 uppercase">Your Bag Is Empty</h2>
        <p className="text-lg font-bold text-gray-400 mb-12 px-6 leading-relaxed">Add fresh fruits, dairy, and essential daily needs from our store to get started with your first order.</p>
        <a href="/store" className="gradient-btn inline-flex items-center gap-4 px-12 py-5 text-sm font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-green-500/20 active:scale-95 active:shadow-none">
          <Sparkles size={20} /> Back to Store
        </a>
      </motion.div>
    );
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Header with improved text */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-2 leading-none">Checkout <span className="text-[var(--primary)]">Bag</span></h1>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Review {items.length} Premium Selected Items</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left: Cart Items (8 cols) - Large Padding */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-[40px] border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
             <div className="p-8 border-b border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 hidden md:grid grid-cols-12 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                <span className="col-span-6">Product & Details</span>
                <span className="col-span-3 text-center">Batch Quantity</span>
                <span className="col-span-3 text-right">Unit Total</span>
             </div>
             
             <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 md:p-12 border-b border-gray-50 dark:border-slate-700 last:border-0 grid grid-cols-1 md:grid-cols-12 items-center gap-10 md:gap-0 hover:bg-gray-50/50 dark:hover:bg-slate-900/50 transition-all group"
                  >
                    {/* Detailed Info */}
                    <div className="col-span-6 flex items-center gap-8">
                       <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-700 ease-out">
                          {item.product.image}
                       </div>
                       <div className="min-w-0 pr-4">
                          <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em] mb-2 leading-none">{item.product.category}</p>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white truncate tracking-tighter mb-1">{item.product.name}</h4>
                          <p className="text-[11px] font-black text-gray-400 mt-1 uppercase tracking-widest">{item.product.unit} · {formatPrice(item.product.price)} each</p>
                          <button onClick={() => {removeItem(item.product.id); addToast('info', 'Item Removed');}} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 mt-4 flex items-center gap-2 transition-all group-hover:px-2 bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 py-1.5 rounded-lg w-fit"><Trash2 size={12} /> Remove</button>
                       </div>
                    </div>

                    {/* Quantity Selector - Breathable Spacing */}
                    <div className="col-span-3 flex justify-center">
                       <div className="flex items-center gap-6 bg-gray-50 dark:bg-slate-900 px-6 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-inner">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-gray-300 hover:text-red-500 transition-all active:scale-95"><Minus size={18} /></button>
                          <span className="text-base font-black text-gray-900 dark:text-white w-6 text-center">{item.quantity}</span>
                          <button onClick={() => addItem(item.product)} className="p-1.5 text-[var(--primary)] hover:scale-125 transition-all active:scale-95"><Plus size={18} /></button>
                       </div>
                    </div>

                    {/* Price Total */}
                    <div className="col-span-3 text-right">
                       <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter mb-1">{formatPrice(item.product.price * item.quantity)}</p>
                       <span className="inline-flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full">✓ Ready for dispatch</span>
                    </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>

          <div className="flex items-center gap-10 p-10 md:p-12 bg-green-50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10 rounded-[40px] group shadow-sm">
             <div className="w-20 h-20 rounded-[28px] bg-white dark:bg-slate-800 flex items-center justify-center text-green-500 shadow-2xl shadow-green-500/10 group-hover:rotate-12 transition-transform duration-700">
                <Truck size={40} />
             </div>
             <div>
                <h4 className="text-lg font-black text-green-900 dark:text-green-400 uppercase tracking-[0.2em] leading-none mb-3">Priority Express 45 Min Delivery</h4>
                <p className="text-sm font-bold text-green-700/80 dark:text-green-500/60 leading-relaxed max-w-lg">Your items are reserved and will be delivered from our nearest dark-store within the chosen time-slot.</p>
             </div>
          </div>
        </div>

        {/* Right: Summary (4 cols) - Premium Styling */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[var(--fg)] dark:bg-slate-900 rounded-[40px] p-10 md:p-12 text-white shadow-[0_32px_128px_rgba(0,0,0,0.4)] relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
             <h3 className="text-2xl font-black tracking-tighter mb-12 uppercase flex justify-between items-center">Final Invoice <ShoppingCart size={24} className="opacity-20" /></h3>
             
             {/* Promo Row */}
             <div className="space-y-6 mb-12">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">Partner Rewards Code</p>
                <div className="flex gap-3">
                   <input type="text" placeholder="FIRST10" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black uppercase placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all" 
                   />
                   <button onClick={applyPromo} className="bg-[var(--primary)] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95 shadow-xl shadow-green-500/20">Apply</button>
                </div>
                {promoApplied && (
                   <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-3 text-green-400 text-xs font-black uppercase tracking-widest"><CheckCircle size={16} /> 10% Discount Applied!</motion.div>
                )}
             </div>

             {/* Bill Items */}
             <div className="space-y-6 mb-12 border-t border-white/10 pt-12 font-bold text-sm">
                <div className="flex justify-between items-center group/row">
                   <span className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] group-hover/row:text-white transition-colors">Gross Value</span>
                   <span className="text-xl tracking-tighter">{formatPrice(totalPrice)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-green-500 group/row">
                    <span className="font-black uppercase text-[10px] tracking-[0.2em] group-hover/row:text-green-300 transition-colors">Basket Savings</span>
                    <span className="text-xl tracking-tighter">-{formatPrice(totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-gray-300 group/row">
                   <span className="font-black uppercase text-[10px] tracking-[0.2em] group-hover/row:text-white transition-colors">Shipping</span>
                   <span className={delivery === 0 ? 'text-[11px] font-black tracking-[0.2em] text-green-500 bg-green-500/10 px-3 py-1 rounded-lg' : 'text-xl tracking-tighter'}>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span>
                </div>
                {promoApplied && (
                   <div className="flex justify-between items-center text-green-400 group/row">
                    <span className="font-black uppercase text-[10px] tracking-[0.2em] group-hover/row:text-white transition-colors">Promo Shield</span>
                    <span className="text-xl tracking-tighter">-{formatPrice(promoDiscount)}</span>
                   </div>
                )}
             </div>

             {/* Dynamic Total */}
             <div className="flex justify-between items-center mb-12 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-3xl shadow-2xl">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-2">To Settle</span>
                   <span className="text-4xl font-black tracking-tighter text-white">{formatPrice(finalTotal)}</span>
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="text-[9px] font-black uppercase text-green-500 tracking-widest mb-1">Tax Included</span>
                   <div className="flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] opacity-40" />)}
                   </div>
                </div>
             </div>

             {/* CTA Button */}
             <button 
                onClick={() => setShowCheckout(true)}
                className="w-full py-6 rounded-[24px] gradient-btn text-[13px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-3xl shadow-green-500/40 active:scale-95 active:shadow-none transition-all"
             >
                <ShieldCheck size={24} /> Pay & Place <ArrowRight size={20} />
             </button>

             <div className="flex items-center justify-center gap-5 mt-12 opacity-30 group-hover:opacity-60 transition-all duration-700">
                <ShieldCheck size={16} /> <span className="text-[9px] font-black uppercase tracking-[0.5em]">PCI-DSS Secure</span>
             </div>
          </div>
        </div>
      </div>

      {/* Recommended Upsell section */}
      <section className="space-y-12 mt-24 pt-24 border-t border-gray-100 dark:border-slate-800">
         <div className="flex items-center gap-5 px-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/5 flex items-center justify-center text-orange-500 border border-orange-100">
                <Sparkles size={24} />
            </div>
            <div>
               <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Don&apos;t Forget</h2>
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Customers also bought</p>
            </div>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[...items.slice(0, 1), ...items.slice(1, 2)].map((item, i) => (
              <div key={`rec-${i}`} className="bg-white dark:bg-slate-800 p-8 rounded-[36px] border border-gray-100 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-2 group">
                  <div className="text-center py-8 text-6xl group-hover:scale-110 transition-transform duration-700">✨</div>
                  <h4 className="text-sm font-black text-center text-gray-900 dark:text-white uppercase tracking-widest">More Picks in Store</h4>
                  <a href="/store" className="mt-8 block w-full text-center py-4 bg-gray-50 dark:bg-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all">Go back</a>
              </div>
            ))}
         </div>
      </section>

      {/* Success Modal with generous padding */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={() => setShowCheckout(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 32 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 32 }}
              className="bg-white dark:bg-slate-900 rounded-[56px] p-12 md:p-20 max-w-2xl w-full relative z-10 text-center shadow-[0_64px_256px_rgba(0,0,0,0.6)] border border-white/5"
            >
              <button onClick={() => setShowCheckout(false)} className="absolute top-10 right-10 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 transition-all active:scale-95">
                <X size={24} />
              </button>
              <div className="w-32 h-32 mx-auto rounded-[40px] bg-green-500/10 flex items-center justify-center text-8xl mb-12 shadow-inner">
                 ✨
              </div>
              <h3 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-6 uppercase">Order Successfully Placed!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-bold mb-12 leading-relaxed max-w-md mx-auto">Nihal, your order of {formatPrice(finalTotal)} is being prepared for dispatch. Estimated delivery time: **30-45 mins**.</p>
              
              <div className="bg-gray-50 dark:bg-slate-800 p-10 rounded-[40px] border border-gray-100 dark:border-slate-700 mb-12 flex justify-between items-center text-left">
                 <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-2">Tracking ID</p>
                    <p className="text-xl font-black text-gray-900 dark:text-white tracking-widest">AK-19022-BNG</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] mb-2">Status</p>
                    <p className="text-lg font-black text-green-500 uppercase flex items-center gap-3">Confirmed <CheckCircle size={20} /></p>
                 </div>
              </div>

              <a href="/" className="block w-full py-6 rounded-[24px] bg-gray-900 text-white text-[13px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-[0_24px_64px_rgba(0,0,0,0.2)] active:scale-95 shadow-lg active:shadow-none">View Order Tracking</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
