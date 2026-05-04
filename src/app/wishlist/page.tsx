'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { useCartContext } from '@/lib/context';
import { useToast } from '@/components/ui/Toast';
import { useCartSidebar } from '@/components/ui/CartSidebar';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400';

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlist();
  const { addItem } = useCartContext();
  const { addToast } = useToast();
  const { openCart } = useCartSidebar();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    addToast('cart', `${product.name} added to cart!`);
    openCart();
  };

  if (wishlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-20"
      >
        <div className="text-6xl mb-6">🤍</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>
          Your wishlist is empty
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
          Save products you love by tapping the ❤️ icon on any item.
        </p>
        <Link href="/store" className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold">
          <Sparkles size={16} /> Browse Store
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 pb-8 page-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
            My <span className="text-[var(--primary)]">Wishlist</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/store" className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">
          <ShoppingBag size={16} /> Browse More
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {wishlist.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group rounded-xl border overflow-hidden transition-all hover:shadow-md"
              style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
            >
              {/* Image */}
              <div className="relative h-36 md:h-40 overflow-hidden" style={{ background: 'var(--bg)' }}>
                <img
                  src={product.image.startsWith('http') ? product.image : FALLBACK_IMG}
                  onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Remove from wishlist */}
                <button
                  onClick={() => toggle(product)}
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={13} className="fill-red-500 text-red-500" />
                </button>
                {product.discount && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500 text-white">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wide mb-1 text-[var(--primary)]">
                  {product.category}
                </p>
                <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2" style={{ color: 'var(--fg)' }}>
                  {product.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{product.unit}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold" style={{ color: 'var(--fg)' }}>
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-1.5 text-xs line-through" style={{ color: 'var(--muted)' }}>
                        {formatPrice(product.originalPrice)}
                      </span>
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
        </AnimatePresence>
      </div>
    </div>
  );
}
