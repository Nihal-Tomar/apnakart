'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, Filter, Star, ChevronDown, Sparkles, SlidersHorizontal, X, Heart } from 'lucide-react';
import { products, categories } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartContext } from '@/lib/context';
import { getRecommendedProducts } from '@/lib/agents';
import { useToast } from '@/components/ui/Toast';
import { useCartSidebar } from '@/components/ui/CartSidebar';
import { SkeletonProductCard } from '@/components/ui/Skeletons';
import { useWishlist } from '@/lib/hooks/useWishlist';

const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400";

/** Wrapper that falls back to FALLBACK_IMG if the Unsplash URL fails to load. */
function ProductImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [imgSrc, setImgSrc] = useState(
    src.startsWith('http') ? src : FALLBACK_IMG
  );
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      sizes={sizes}
      onError={() => setImgSrc(FALLBACK_IMG)}
    />
  );
}

const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating'];

export default function StorePage() {
  const { addItem, items, updateQuantity } = useCartContext();
  const { addToast } = useToast();
  const { openCart } = useCartSidebar();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Read ?search= param from URL on mount (set by mobile header redirect)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('search');
    if (q) { setSearchQuery(q); setDebouncedSearch(q); }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const recommended = useMemo(() => getRecommendedProducts(), []);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = debouncedSearch === '' ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.nameHindi?.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategory, debouncedSearch, sortBy]);

  const getQuantity = (id: string) => items.find(item => item.product.id === id)?.quantity || 0;

  const handleAddToCart = (product: Product) => {
    addItem(product);
    addToast('cart', `${product.name} added to cart!`);
  };

  return (
    <div className="space-y-6 pb-8 page-fade-in">
      {/* Store Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
            Grocery <span className="text-[var(--primary)]">Store</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Fresh products handpicked for quality</p>
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all focus:ring-2 focus:ring-[var(--primary)]/20"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2.5 rounded-xl border transition-colors"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* AI Picks Horizontal Scroll */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[var(--primary)]" />
          <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Quick Picks</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {recommended.map((product) => (
            <div
              key={`ai-${product.id}`}
              className="w-48 flex-shrink-0 rounded-xl border overflow-hidden group transition-all hover:shadow-md"
              style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
            >
              <Link href={`/store/${product.id}`} className="block">
                <div className="relative h-28 overflow-hidden" style={{ background: 'var(--bg)' }}>
                  <ProductImage src={product.image} alt={product.name} sizes="192px" />
                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <Heart size={13} className={isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                  </button>
                </div>
              </Link>
              <div className="p-3">
                <h4 className="text-sm font-medium truncate mb-0.5" style={{ color: 'var(--fg)' }}>{product.name}</h4>
                <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{product.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(product.price)}</span>
                  {product.inStock ? (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-7 h-7 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--primary-hover)] active:scale-90 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-400">Sold Out</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-4`}>
          <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <Filter size={16} /> Categories
            </h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                      : 'hover:bg-[var(--bg)]'
                  }`}
                  style={selectedCategory !== cat.id ? { color: 'var(--fg)' } : undefined}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="rounded-xl border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <SlidersHorizontal size={16} /> Sort By
            </h3>
            <div className="space-y-1">
              {sortOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === option
                      ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                      : 'hover:bg-[var(--bg)]'
                  }`}
                  style={sortBy !== option ? { color: 'var(--fg)' } : undefined}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
              {filteredProducts.length} items found
            </p>
            {/* Mobile category scroll */}
            <div className="flex gap-2 lg:hidden overflow-x-auto no-scrollbar">
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'border-[var(--border-color)]'
                  }`}
                  style={selectedCategory !== cat.id ? { color: 'var(--fg)' } : undefined}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonProductCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => {
                  const quantity = getQuantity(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="group rounded-xl border overflow-hidden transition-all hover:shadow-md"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
                    >
                      <Link href={`/store/${product.id}`} className="block">
                        <div className="relative h-36 md:h-40 overflow-hidden" style={{ background: 'var(--bg)' }}>
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
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
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-md px-1.5 py-0.5">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-[10px] font-semibold text-gray-700">{product.rating}</span>
                          </div>
                          {/* Wishlist toggle */}
                          <button
                            onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                            className="absolute bottom-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
                          >
                            <Heart size={13} className={isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                          </button>
                        </div>
                      </Link>
                      <div className="p-3.5">
                        <p className="text-[11px] font-medium uppercase tracking-wide mb-1 text-[var(--primary)]">{product.category}</p>
                        <Link href={`/store/${product.id}`}>
                          <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2 hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--fg)' }}>{product.name}</h3>
                        </Link>
                        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{product.unit}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="ml-1.5 text-xs line-through" style={{ color: 'var(--muted)' }}>{formatPrice(product.originalPrice)}</span>
                            )}
                          </div>
                          {!product.inStock ? (
                            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-400">Sold Out</span>
                          ) : quantity === 0 ? (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="px-3.5 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold hover:bg-[var(--primary-hover)] active:scale-95 transition-all shadow-sm shadow-green-500/20"
                            >
                              ADD
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 border rounded-lg px-1 py-0.5" style={{ borderColor: 'var(--primary)', background: 'var(--primary-light)' }}>
                              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 text-[var(--primary)] active:scale-90 transition-all">
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-[var(--primary)]">{quantity}</span>
                              <button onClick={() => addItem(product)} className="p-1 text-[var(--primary)] active:scale-90 transition-all">
                                <Plus size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-base font-medium mb-1" style={{ color: 'var(--fg)' }}>No products found</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
