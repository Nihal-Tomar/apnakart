'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Star, Plus, Minus, Filter, ChevronDown, CheckCircle, Sparkles, SlidersHorizontal, ArrowRight, Heart, Tag, ImageOff } from 'lucide-react';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartContext } from '@/lib/context';
import { getRecommendedProducts } from '@/lib/agents';
import { useToast } from '@/components/ui/Toast';

// SNAPPY ANIMATIONS (Reduced durations to 0.2s for snappy page switching)
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.25, ease: 'easeOut' }
  },
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400";
const categories = ['All', 'Fruits & Vegetables', 'Dairy & Bakery', 'Grains & Essentials', 'Snacks & Drinks', 'Household Care'];

export default function StorePage() {
  const { addItem, items, updateQuantity } = useCartContext();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');

  const recommended = getRecommendedProducts();

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.split(' ')[0].toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.nameHindi?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getQuantity = (id: string) => {
    return items.find(item => item.product.id === id)?.quantity || 0;
  };

  const handleAddToCart = (product: any) => {
    addItem(product);
    addToast('cart', `${product.name} added to cart! 🛒`);
  };

  return (
    <div className="space-y-24 mb-24 page-fade-in">
      {/* ##### STORE HERO: STATIC FOR SPEED ##### */}
      <section className="relative overflow-hidden group">
        <div className="relative bg-white rounded-[48px] p-12 md:p-20 lg:p-24 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-16 shadow-sm">
           <div className="max-w-2xl text-center md:text-left z-10 pl-12 border-l-8 border-black">
              <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-green-500/10 text-green-600 text-[11px] font-black uppercase tracking-[0.2em] border border-green-500/20 mb-10">
                 🥦 Verified High-Definition Products
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 leading-[1.05]">
                Apna<span className="text-[var(--primary)]">Store</span>
              </h1>
              <p className="text-gray-900 text-xl font-bold leading-relaxed max-w-lg opacity-60">Handpicked items captured in HD. Inspected for quality and freshness.</p>
           </div>
           
           <div className="relative z-10 hidden lg:flex gap-8 items-center">
              <div className="flex gap-6">
                 <div className="w-32 h-32 bg-white rounded-3xl shadow-xl border border-gray-50 flex items-center justify-center overflow-hidden">
                    <img src={FALLBACK_IMG} className="w-full h-full object-cover" alt="product" />
                 </div>
                 <div className="w-32 h-32 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden translate-y-12">
                   <img src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="product" />
                 </div>
                 <div className="w-32 h-32 bg-white rounded-3xl shadow-xl border border-gray-50 flex items-center justify-center overflow-hidden translate-y-6">
                    <img src="https://images.unsplash.com/photo-1563636619-e910ef2a844b?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="product" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ##### AI Picks: Snappy ##### */}
      <section className="space-y-12">
         <div className="flex items-center gap-6 px-4 pl-12">
            <div className="w-12 h-12 rounded-2xl bg-black text-[var(--primary)] flex items-center justify-center shadow-xl">
                <Sparkles size={24} />
            </div>
            <div>
               <h2 className="text-3xl font-black text-black tracking-tighter uppercase">AI Selected Picks</h2>
            </div>
         </div>

         <div className="flex gap-8 overflow-x-auto pb-12 -mx-4 px-4 pl-12 scrollbar-hide no-scrollbar">
            {recommended.map((product) => (
              <motion.div
                key={`ai-${product.id}`}
                variants={fadeUp} initial="hidden" animate="visible"
                className="w-72 flex-shrink-0 bg-white rounded-[40px] p-8 pl-10 border border-gray-100 shadow-sm transition-all text-left group"
              >
                 <div className="relative mb-8 h-44 flex items-center justify-center overflow-hidden rounded-[24px] bg-gray-50 border border-gray-50">
                    <img 
                      src={product.image.startsWith('http') ? product.image : FALLBACK_IMG} 
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      alt={product.name} 
                    />
                 </div>
                 <div className="pl-2">
                    <h4 className="text-lg font-black text-black truncate tracking-tighter mb-1">{product.name}</h4>
                    <p className="text-[11px] font-black text-gray-400 mb-6 uppercase tracking-widest leading-none">{product.unit}</p>
                    <div className="flex items-center justify-between">
                       <span className="text-xl font-black text-black tracking-tighter">{formatPrice(product.price)}</span>
                       <button 
                         onClick={() => handleAddToCart(product)}
                         className="w-11 h-11 rounded-2xl bg-black text-white hover:bg-[var(--primary)] flex items-center justify-center shadow-xl active:scale-90"
                       >
                          <Plus size={22} />
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* ##### GRID ##### */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pt-16 border-t border-gray-100 pl-4">
         <div className="lg:col-span-3 space-y-16 hidden lg:block">
            <div className="space-y-10 pl-8">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mb-10"><Filter size={16} /> Filter Stock</div>
               <div className="space-y-3">
                  {categories.map(cat => (
                    <button 
                       key={cat}
                       onClick={() => setSelectedCategory(cat)}
                       className={`w-full text-left px-8 py-4.5 rounded-[20px] text-[13px] font-black transition-all flex items-center justify-between tracking-tight ${selectedCategory === cat ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-50'}`}
                    >
                       {cat}
                       {selectedCategory === cat && <CheckCircle size={16} className="text-[var(--primary)]" />}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-9 space-y-16">
            <div className="flex flex-col sm:flex-row gap-8 justify-between items-center bg-gray-50 p-8 rounded-[40px] border border-gray-100 mx-4">
               <div className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.3em] text-gray-400 pl-4">
                  <SlidersHorizontal size={16} /> 
                  <span className="text-black">{filteredProducts.length} Items</span>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 px-4">
               <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const quantity = getQuantity(product.id);
                    return (
                      <motion.div
                        key={product.id}
                        variants={fadeUp} initial="hidden" animate="visible"
                        className="group bg-white rounded-[48px] p-10 pl-12 border border-gray-100 flex flex-col h-full text-left"
                      >
                         <div className="relative mb-10 h-44 flex items-center justify-center overflow-hidden rounded-[32px] bg-gray-50 border border-gray-50">
                            <img 
                              src={product.image.startsWith('http') ? product.image : FALLBACK_IMG} 
                              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG }}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                              alt={product.name} 
                            />
                         </div>
                         <div className="flex-grow space-y-2 pl-2">
                            <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-2">{product.category}</p>
                            <h3 className="text-xl font-black text-black tracking-tighter leading-tight mb-1">{product.name}</h3>
                            <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">{product.unit}</p>
                         </div>
                         <div className="flex items-center justify-between mt-12 pt-10 border-t border-gray-50 pl-2">
                            <p className="text-2xl font-black text-black tracking-tighter leading-none">{formatPrice(product.price)}</p>
                            
                            {quantity === 0 ? (
                               <button onClick={() => handleAddToCart(product)} className="px-8 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">ADD</button>
                            ) : (
                               <div className="flex items-center gap-4 bg-gray-50 px-5 py-2.5 rounded-2xl border border-green-200">
                                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 text-gray-400 transition-all active:scale-95"><Minus size={18} /></button>
                                  <span className="text-base font-black text-black w-6 text-center">{quantity}</span>
                                  <button onClick={() => addItem(product)} className="p-1 text-[var(--primary)] transition-all active:scale-95"><Plus size={18} /></button>
                               </div>
                            )}
                         </div>
                      </motion.div>
                    );
                  })}
               </AnimatePresence>
            </div>
         </div>
      </div>
    </div>
  );
}
