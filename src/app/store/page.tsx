'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products, categories } from '@/lib/data/products';
import { useCartContext } from '@/lib/context';
import { formatPrice } from '@/lib/utils';
import { getRecommendedProducts } from '@/lib/agents';
import { Search, SlidersHorizontal, Sparkles, Plus, Minus, ShoppingBag } from 'lucide-react';

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: 'easeOut' as const }
  }),
};

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const { addItem, items, updateQuantity } = useCartContext();
  const aiPicks = useMemo(() => getRecommendedProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameHindi?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const getCartQuantity = (productId: string) => {
    const cartItem = items.find(item => item.product.id === productId);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag size={28} style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
            Grocery <span className="gradient-text">Store</span>
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Fresh groceries delivered to your doorstep</p>
      </motion.div>

      {/* Search & Sort */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
          <input type="text" placeholder="Search for atta, dal, sabzi..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-[13px] font-medium"
            style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} style={{ color: 'var(--muted)' }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 rounded-2xl text-[13px] font-medium cursor-pointer"
            style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-semibold whitespace-nowrap transition-all duration-200"
            style={selectedCategory === cat.id
              ? { background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))', color: '#fff', boxShadow: '0 4px 15px rgba(79,70,229,0.25)' }
              : { background: 'var(--card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-color)', color: 'var(--fg)' }
            }>
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </motion.div>

      {/* AI Picks */}
      {selectedCategory === 'all' && !searchQuery && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} style={{ color: 'var(--primary)' }} />
            <h2 className="text-base font-bold" style={{ color: 'var(--fg)' }}>AI Picks For You</h2>
            <span className="badge text-[10px]" style={{ background: '#EEF2FF', color: 'var(--primary)' }}>Personalized</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
            {aiPicks.map(product => (
              <motion.div key={`ai-${product.id}`} whileHover={{ y: -3 }}
                className="glass card-lift flex-shrink-0 w-40 rounded-2xl p-3 cursor-pointer">
                <div className="text-3xl text-center py-2">{product.image}</div>
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--fg)' }}>{product.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs font-bold" style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
                  <button onClick={() => addItem(product)} className="gradient-btn text-[10px] px-2 py-1 rounded-lg flex items-center gap-0.5">
                    <Plus size={10} /> Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Product Grid */}
      <div>
        <p className="text-[13px] mb-3 font-medium" style={{ color: 'var(--muted)' }}>
          Showing {filteredProducts.length} products
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map((product, i) => {
            const qty = getCartQuantity(product.id);
            return (
              <motion.div
                key={product.id}
                variants={fadeUp} initial="hidden" animate="visible" custom={i}
                className="glass card-lift rounded-3xl p-4 relative group"
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {product.discount && (
                    <span className="badge text-[10px]" style={{ background: '#FEF2F2', color: 'var(--danger)' }}>-{product.discount}%</span>
                  )}
                  {product.isOrganic && (
                    <span className="badge text-[10px]" style={{ background: '#F0FDF4', color: 'var(--success)' }}>Organic</span>
                  )}
                </div>

                <div className="text-center py-4">
                  <span className="product-emoji">{product.image}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--fg)' }}>{product.name}</p>
                  {product.nameHindi && <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{product.nameHindi}</p>}
                  <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{product.unit}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]">⭐</span>
                    <span className="text-[11px] font-semibold" style={{ color: 'var(--fg)' }}>{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold" style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-[11px] line-through" style={{ color: 'var(--muted)' }}>{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  {qty > 0 ? (
                    <div className="flex items-center justify-center gap-3 py-2 rounded-2xl" style={{ background: '#EEF2FF' }}>
                      <button onClick={() => updateQuantity(product.id, qty - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white gradient-bg">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{qty}</span>
                      <button onClick={() => addItem(product)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white gradient-bg">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => addItem(product)}
                      className="w-full gradient-btn py-2.5 rounded-2xl text-[13px] font-semibold flex items-center justify-center gap-1.5">
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>No products found</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Try a different search or category</p>
        </div>
      )}
    </div>
  );
}
