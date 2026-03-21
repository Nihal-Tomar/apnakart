'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FintechCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FintechCard({ children, className = '', delay = 0 }: FintechCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, scale: 1.01, boxShadow: '0 40px 80px -40px rgba(0,0,0,0.12)' }}
      className={`bg-white dark:bg-[#111827] p-16 rounded-[48px] border border-gray-100 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group transition-all duration-500 hover:shadow-2xl ${className}`}
    >
      {/* BREATHING ROOM GRADIENT */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)]/5 rounded-full translate-x-40 -translate-y-40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="relative z-10 h-full pl-4 pr-4">
        {children}
      </div>
    </motion.div>
  );
}
