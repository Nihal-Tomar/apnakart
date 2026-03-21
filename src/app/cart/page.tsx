'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '@/lib/context';
import { formatPrice } from '@/lib/utils';
import { getRecommendedProducts } from '@/lib/agents';
import { ShoppingCart, Minus, Plus, Trash2, Tag, Truck, ShieldCheck, Sparkles, X, CheckCircle } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalSavings, addItem } = useCartContext();
  const recommended = getRecommendedProducts().slice(0, 4);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const delivery = totalPrice > 499 ? 0 : 40;
  const promoDiscount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice - promoDiscount + delivery;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'APNA10' || promoCode.toUpperCase() === 'FIRST10') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto text-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Add items from the store to get started</p>
        <a href="/store" className="gradient-btn inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl">
          <Sparkles size={16} /> Browse Store
        </a>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <ShoppingCart size={28} style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
            Your <span className="gradient-text">Cart</span>
          </h1>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{items.length} items in your cart</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass card-lift flex items-center gap-4 p-4 rounded-3xl"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-hover)' }}>
                  <span className="text-3xl">{item.product.image}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--fg)' }}>{item.product.name}</p>
                  <p className="text-[11px]" style={{ color: 'var(--muted)' }}>{item.product.unit}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: 'var(--primary)' }}>{formatPrice(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--surface-hover)]"
                    style={{ border: '1px solid var(--border-color)', color: 'var(--fg)' }}>
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold" style={{ color: 'var(--fg)' }}>{item.quantity}</span>
                  <button onClick={() => addItem(item.product)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center gradient-bg text-white">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(item.product.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.product.id)}
                    className="text-[11px] mt-1 flex items-center gap-1 transition-colors hover:text-[var(--danger)]"
                    style={{ color: 'var(--muted)' }}>
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass rounded-3xl p-6 space-y-4 sticky top-24">
            <h3 className="text-base font-bold" style={{ color: 'var(--fg)' }}>Order Summary</h3>

            {/* Promo Code */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                <input type="text" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs"
                  style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--fg)' }} />
              </div>
              <button onClick={applyPromo} className="gradient-btn px-4 py-2 text-xs rounded-xl">Apply</button>
            </div>
            {promoApplied && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--success)' }}>
                <CheckCircle size={12} /> 10% discount applied!
              </motion.p>
            )}

            <div className="space-y-2 text-[13px]" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <div className="flex justify-between"><span style={{ color: 'var(--muted)' }}>Subtotal</span><span style={{ color: 'var(--fg)' }}>{formatPrice(totalPrice)}</span></div>
              {totalSavings > 0 && <div className="flex justify-between"><span style={{ color: 'var(--success)' }}>Savings</span><span style={{ color: 'var(--success)' }}>-{formatPrice(totalSavings)}</span></div>}
              {promoApplied && <div className="flex justify-between"><span style={{ color: 'var(--success)' }}>Promo (10%)</span><span style={{ color: 'var(--success)' }}>-{formatPrice(promoDiscount)}</span></div>}
              <div className="flex justify-between"><span style={{ color: 'var(--muted)' }}>Delivery</span><span style={{ color: delivery === 0 ? 'var(--success)' : 'var(--fg)' }}>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span></div>
            </div>

            <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="font-bold" style={{ color: 'var(--fg)' }}>Total</span>
              <span className="text-xl font-extrabold gradient-text">{formatPrice(finalTotal)}</span>
            </div>

            <button onClick={() => setShowCheckout(true)} className="gradient-btn w-full py-3.5 text-sm rounded-2xl flex items-center justify-center gap-2">
              <ShieldCheck size={16} /> Place Order
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px]" style={{ color: 'var(--muted)' }}>
              <span className="flex items-center gap-1"><Truck size={12} /> Free above ₹499</span>
              <span className="flex items-center gap-1"><ShieldCheck size={12} /> Secure checkout</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--fg)' }}>You might also need</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {recommended.map(product => (
            <motion.div key={`rec-${product.id}`} whileHover={{ y: -3 }} className="glass card-lift rounded-3xl p-4">
              <div className="text-3xl text-center py-2">{product.image}</div>
              <p className="text-xs font-semibold truncate" style={{ color: 'var(--fg)' }}>{product.name}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{formatPrice(product.price)}</p>
                <button onClick={() => addItem(product)} className="gradient-btn text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-0.5">
                  <Plus size={10} /> Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-3xl p-8 max-w-sm w-full relative z-10 text-center">
              <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-[var(--surface-hover)]" style={{ color: 'var(--muted)' }}>
                <X size={16} />
              </button>
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Order Placed!</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Your order of {formatPrice(finalTotal)} will be delivered tomorrow 9-11 AM</p>
              <a href="/" className="gradient-btn inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl">Back to Dashboard</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
