'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

/* ===== SKELETON PRIMITIVES ===== */

export function SkeletonPulse({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ background: 'var(--border-color)', ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border p-4 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-between">
        <SkeletonPulse className="w-10 h-10 rounded-lg" />
        <SkeletonPulse className="w-14 h-5 rounded-full" />
      </div>
      <SkeletonPulse className="w-20 h-7 rounded-lg" />
      <SkeletonPulse className="w-16 h-4 rounded-lg" />
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}>
      <SkeletonPulse className="w-full h-36 rounded-none" />
      <div className="p-3.5 space-y-2">
        <SkeletonPulse className="w-16 h-3 rounded" />
        <SkeletonPulse className="w-full h-4 rounded" />
        <SkeletonPulse className="w-12 h-3 rounded" />
        <div className="flex justify-between items-center pt-1">
          <SkeletonPulse className="w-14 h-5 rounded" />
          <SkeletonPulse className="w-12 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTransaction() {
  return (
    <div className="flex items-center gap-3 p-3">
      <SkeletonPulse className="w-8 h-8 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <SkeletonPulse className="w-28 h-4 rounded" />
        <SkeletonPulse className="w-16 h-3 rounded" />
      </div>
      <SkeletonPulse className="w-14 h-4 rounded" />
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      <SkeletonPulse className="w-full h-40 rounded-2xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map(i => <SkeletonProductCard key={i} />)}
      </div>
    </div>
  );
}

export function SkeletonStore() {
  return (
    <div className="space-y-6">
      <SkeletonPulse className="w-48 h-8 rounded-lg" />
      <SkeletonPulse className="w-full h-10 rounded-xl" />
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => <SkeletonPulse key={i} className="w-24 h-9 rounded-xl flex-shrink-0" />)}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonProductCard key={i} />)}
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg)' }}>{title}</h3>
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
          className="fixed top-20 right-8 z-[90] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
        >
          <CheckCircle size={18} style={{ color: '#22C55E' }} />
          <span className="text-sm font-medium" style={{ color: '#166534' }}>Added to cart!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===== PAGE TRANSITION WRAPPER ===== */

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
