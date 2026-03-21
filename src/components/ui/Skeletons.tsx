'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

/* ===== SKELETON PRIMITIVES ===== */

export function SkeletonPulse({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-2xl ${className}`}
      style={{ background: 'var(--surface-hover)', ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-3xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonPulse className="w-11 h-11 rounded-2xl" />
        <SkeletonPulse className="w-16 h-5 rounded-full" />
      </div>
      <SkeletonPulse className="w-24 h-8 rounded-xl" />
      <SkeletonPulse className="w-20 h-4 rounded-lg" />
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="glass rounded-3xl p-4 space-y-3">
      <SkeletonPulse className="w-full h-24 rounded-2xl" />
      <SkeletonPulse className="w-3/4 h-4 rounded-lg" />
      <SkeletonPulse className="w-1/2 h-3 rounded-lg" />
      <div className="flex justify-between items-center">
        <SkeletonPulse className="w-12 h-5 rounded-lg" />
        <SkeletonPulse className="w-16 h-8 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonTransaction() {
  return (
    <div className="flex items-center gap-3 p-4">
      <SkeletonPulse className="w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonPulse className="w-32 h-4 rounded-lg" />
        <SkeletonPulse className="w-20 h-3 rounded-lg" />
      </div>
      <SkeletonPulse className="w-16 h-4 rounded-lg" />
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <SkeletonPulse className="w-full h-40 rounded-3xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <SkeletonPulse key={i} className="h-28 rounded-3xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonProductCard key={i} />)}
        </div>
        <div className="lg:col-span-2 space-y-3">
          {[1, 2, 3, 4].map(i => <SkeletonPulse key={i} className="h-16 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}

export function SkeletonStore() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <SkeletonPulse className="w-48 h-10 rounded-2xl" />
      <SkeletonPulse className="w-full h-12 rounded-2xl" />
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => <SkeletonPulse key={i} className="w-24 h-10 rounded-2xl flex-shrink-0" />)}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <SkeletonProductCard key={i} />)}
      </div>
    </div>
  );
}

/* ===== EMPTY STATE ===== */

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 md:py-24">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="text-6xl mb-4 inline-block"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>{title}</h3>
      <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: 'var(--muted)' }}>{description}</p>
      {action}
    </motion.div>
  );
}

/* ===== CART SUCCESS ANIMATION ===== */

export function CartSuccessPopup({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-20 right-8 z-[90] flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={20} style={{ color: '#22C55E' }} />
          </motion.div>
          <span className="text-[13px] font-semibold" style={{ color: '#166534' }}>Added to cart!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== PAGE TRANSITION WRAPPER ===== */

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
