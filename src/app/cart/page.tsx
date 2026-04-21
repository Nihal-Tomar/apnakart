'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '@/lib/context';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Minus, Plus, Trash2, Truck, ShieldCheck, Sparkles, X, CheckCircle, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalSavings, addItem, clearCart } = useCartContext();
  const { addToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  // Tracking ID is set once when the order is placed (client-side event),
  // never during render — avoids Date.now() in JSX causing hydration mismatches.
  const [trackingId, setTrackingId] = useState('');

  const delivery = totalPrice > 499 ? 0 : 40;
  const promoDiscount = promoApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice - promoDiscount + delivery;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'APNA2026' || promoCode.toUpperCase() === 'FIRST10') {
      setPromoApplied(true);
      addToast('success', 'Promo applied! 10% discount added 🎉');
    } else {
      addToast('error', 'Invalid code. Try FIRST10');
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-20"
      >
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Your cart is empty</h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
          Add fresh fruits, dairy, and daily essentials from our store.
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
            Shopping <span className="text-[var(--primary)]">Cart</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{items.length} items in your cart</p>
        </div>
        <Link href="/store" className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0, padding: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 p-4 border-b last:border-0 group"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                    <img
                      src={item.product.image.startsWith('http') ? item.product.image : FALLBACK_IMG}
                      onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--fg)' }}>{item.product.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{item.product.unit} · {formatPrice(item.product.price)} each</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-1.5 border rounded-lg px-1.5 py-1" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded transition-colors hover:bg-[var(--bg)]"
                      style={{ color: 'var(--muted)' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold" style={{ color: 'var(--fg)' }}>{item.quantity}</span>
                    <button
                      onClick={() => addItem(item.product)}
                      className="p-1 rounded transition-colors hover:bg-[var(--primary-light)] text-[var(--primary)]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-bold w-16 text-right" style={{ color: 'var(--fg)' }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => { removeItem(item.product.id); addToast('info', 'Item removed'); }}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-red-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
            <Truck size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Free delivery on orders above ₹499</p>
              <p className="text-xs text-green-600">Estimated delivery: 30-45 minutes</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--fg)' }}>Order Summary</h3>

            {/* Promo Code */}
            <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--muted)' }}>Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="FIRST10"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:scale-95 transition-all"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[var(--primary)] font-medium mt-2 flex items-center gap-1">
                  <CheckCircle size={12} /> 10% discount applied!
                </motion.p>
              )}
            </div>

            {/* Bill */}
            <div className="space-y-2.5 text-sm mb-4">
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Subtotal ({items.length} items)</span>
                <span className="font-medium" style={{ color: 'var(--fg)' }}>{formatPrice(totalPrice)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[var(--primary)]">
                  <span>Product Savings</span>
                  <span className="font-medium">-{formatPrice(totalSavings)}</span>
                </div>
              )}
              {promoApplied && (
                <div className="flex justify-between text-[var(--primary)]">
                  <span>Promo Discount</span>
                  <span className="font-medium">-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Delivery</span>
                <span className={delivery === 0 ? 'text-[var(--primary)] font-medium' : 'font-medium'} style={delivery !== 0 ? { color: 'var(--fg)' } : undefined}>
                  {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-3 border-t mb-4" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Total</span>
              <span className="text-xl font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(finalTotal)}</span>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                // Capture timestamp here — safely client-side in an event handler.
                setTrackingId(Date.now().toString().slice(-5));
                setShowCheckout(true);
              }}
              className="w-full gradient-btn py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} /> Place Order <ArrowRight size={16} />
            </button>

            <p className="text-[10px] text-center mt-3 flex items-center justify-center gap-1" style={{ color: 'var(--muted)' }}>
              <ShieldCheck size={10} /> Secure checkout · 100% safe payments
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md rounded-2xl p-8 text-center shadow-2xl"
              style={{ background: 'var(--surface)' }}
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--bg)] transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center text-3xl mb-4">
                ✅
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Order Placed!</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--muted)' }}>
                Your order of {formatPrice(finalTotal)} is being prepared. Estimated delivery: 30-45 minutes.
              </p>

              <div className="p-4 rounded-xl mb-6 flex justify-between items-center" style={{ background: 'var(--bg)' }}>
                <div className="text-left">
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Tracking ID</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>AK-{trackingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Status</p>
                  <p className="text-sm font-semibold text-[var(--primary)] flex items-center gap-1">
                    Confirmed <CheckCircle size={14} />
                  </p>
                </div>
              </div>

              <Link href="/" onClick={() => { setShowCheckout(false); clearCart(); }}
                className="block w-full py-3 rounded-xl text-sm font-semibold text-center transition-all"
                style={{ background: 'var(--fg)', color: 'var(--surface)' }}
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
