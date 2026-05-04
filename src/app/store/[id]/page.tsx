'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Minus, ArrowLeft, Star, Truck, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartContext } from '@/lib/context';
import { useToast } from '@/components/ui/Toast';
import { useCartSidebar } from '@/components/ui/CartSidebar';
import { useWishlist } from '@/lib/hooks/useWishlist';
import type { Product } from '@/types';

const FALLBACK = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800';

const catDesc: Record<string, string> = {
  fruits:     'Fresh, handpicked fruits delivered straight to your door. Packed with vitamins and natural goodness.',
  vegetables: 'Farm-fresh vegetables harvested daily for maximum nutrition and flavour.',
  dairy:      'Premium quality dairy, chilled and sourced from trusted farms.',
  grains:     'High-quality grains and pulses — the staples of every Indian kitchen.',
  spices:     'Aromatic spices to bring out the best flavours in your cooking.',
  snacks:     'Tasty snacks perfect for any time of the day.',
  beverages:  'Refreshing beverages to keep you energized all day long.',
  oils:       'Pure and natural oils for healthy, delicious cooking every day.',
  personal:   'Quality personal care products for your daily routine.',
};

function desc(p: Product) {
  const org = p.isOrganic ? 'Certified organic. ' : '';
  const dis = p.discount ? `Currently ${p.discount}% off. ` : '';
  return `${org}${catDesc[p.category] ?? 'A quality product from ApnaKart.'} ${dis}Rated ${p.rating}/5 by our customers. Sold in ${p.unit}.`;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addItem, items, updateQuantity } = useCartContext();
  const { addToast } = useToast();
  const { openCart } = useCartSidebar();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Product not found</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
          This product doesn&apos;t exist or may have been removed.
        </p>
        <Link href="/store" className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold">
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </div>
    );
  }

  const quantity = items.find(i => i.product.id === product.id)?.quantity ?? 0;
  const handleAdd = () => { addItem(product); addToast('cart', `${product.name} added to cart!`); openCart(); };

  return (
    <div className="pb-8 page-fade-in">
      {/* Breadcrumb */}
      <Link href="/store" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 hover:gap-2.5 transition-all" style={{ color: 'var(--muted)' }}>
        <ArrowLeft size={16} /> Back to Store
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ── Image ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="relative w-full aspect-square rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
        >
          <img
            src={product.image.startsWith('http') ? product.image : FALLBACK}
            onError={e => { (e.target as HTMLImageElement).src = FALLBACK; }}
            alt={product.name} className="w-full h-full object-cover"
          />
          {product.discount && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold bg-red-500 text-white">
              {product.discount}% OFF
            </span>
          )}
          {product.isOrganic && (
            <span className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold bg-green-500 text-white flex items-center gap-1">
              <Leaf size={11} /> Organic
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md"
          >
            <Heart size={18} className={isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        </motion.div>

        {/* ── Info ── */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-2">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1" style={{ color: 'var(--fg)' }}>{product.name}</h1>
            {product.nameHindi && <p className="text-sm" style={{ color: 'var(--muted)' }}>{product.nameHindi}</p>}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: 'var(--bg)' }}>
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{product.rating}</span>
            </div>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>Customer Rating</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg line-through" style={{ color: 'var(--muted)' }}>{formatPrice(product.originalPrice)}</span>
            )}
            <span className="text-sm px-2 py-0.5 rounded-md" style={{ background: 'var(--bg)', color: 'var(--muted)' }}>{product.unit}</span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc(product)}</p>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Truck, text: 'Free delivery above ₹499' },
              { icon: ShieldCheck, text: '100% quality guaranteed' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
                <Icon size={16} className="text-[var(--primary)] flex-shrink-0" />
                <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Add to Cart / Quantity */}
          <div className="flex items-center gap-3 pt-2">
            {quantity === 0 ? (
              <button onClick={handleAdd} className="flex-1 gradient-btn py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <Plus size={18} /> Add to Cart
              </button>
            ) : (
              <>
                <div className="flex items-center gap-3 border rounded-xl px-3 py-2.5" style={{ borderColor: 'var(--primary)', background: 'var(--primary-light)' }}>
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="text-[var(--primary)] active:scale-90 transition-all"><Minus size={18} /></button>
                  <span className="w-8 text-center font-bold text-[var(--primary)]">{quantity}</span>
                  <button onClick={() => addItem(product)} className="text-[var(--primary)] active:scale-90 transition-all"><Plus size={18} /></button>
                </div>
                <button onClick={openCart} className="flex-1 gradient-btn py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  View Cart
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
