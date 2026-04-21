'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartContext } from '@/lib/context';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

// ============ Cart Sidebar Context ============
interface CartSidebarContextType {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartSidebarContext = createContext<CartSidebarContextType>({
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
});

export function useCartSidebar() {
  return useContext(CartSidebarContext);
}

export function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value: CartSidebarContextType = {
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen(prev => !prev),
  };

  return (
    <CartSidebarContext.Provider value={value}>
      {children}
    </CartSidebarContext.Provider>
  );
}

// ============ Cart Sidebar Component ============
export default function CartSidebar() {
  const { items, removeItem, updateQuantity, addItem, totalPrice, totalSavings, totalItems } = useCartContext();
  const { isOpen, closeCart } = useCartSidebar();
  const delivery = totalPrice > 0 ? (totalPrice > 499 ? 0 : 40) : 0;
  const grandTotal = totalPrice - totalSavings + delivery;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl"
            style={{ background: 'var(--surface)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-[var(--primary)]" />
                <span className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Your Cart</span>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--primary-light)] text-[var(--primary)]">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-[var(--bg)] transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Your cart is empty</p>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Add items from the store</p>
                  <Link
                    href="/store"
                    onClick={closeCart}
                    className="gradient-btn px-5 py-2.5 rounded-xl text-sm font-medium"
                  >
                    Browse Store
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ background: 'var(--bg)', borderColor: 'var(--border-color)' }}
                    >
                      {/* Image */}
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--fg)' }}>{item.product.name}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{item.product.unit}</p>
                        <p className="text-sm font-bold text-[var(--primary)]">{formatPrice(item.product.price)}</p>
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors border hover:border-[var(--primary)] hover:text-[var(--primary)]"
                          style={{ borderColor: 'var(--border-color)', color: 'var(--muted)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold" style={{ color: 'var(--fg)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addItem(item.product)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white transition-colors bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-5 space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                {/* Bill Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                    <span className="font-medium" style={{ color: 'var(--fg)' }}>{formatPrice(totalPrice)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[var(--primary)]">
                      <span>Savings</span>
                      <span className="font-medium">-{formatPrice(totalSavings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--muted)' }}>Delivery</span>
                    <span className={delivery === 0 ? 'text-[var(--primary)] font-medium' : 'font-medium'} style={delivery !== 0 ? { color: 'var(--fg)' } : undefined}>
                      {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                    </span>
                  </div>
                </div>

                {/* Total + Checkout */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Total</p>
                    <p className="text-xl font-bold" style={{ color: 'var(--fg)' }}>{formatPrice(grandTotal)}</p>
                  </div>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="gradient-btn px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                  >
                    Checkout <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Free delivery nudge */}
                {delivery > 0 && (
                  <p className="text-xs text-center py-2 px-3 rounded-lg bg-amber-50 text-amber-700">
                    Add {formatPrice(499 - totalPrice)} more for free delivery
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
