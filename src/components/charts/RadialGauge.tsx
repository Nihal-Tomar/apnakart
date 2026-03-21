'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function RadialGauge({ percentage, label = 'Health' }: { percentage: number; label?: string }) {
  const radius = 45;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" className="text-gray-100 dark:text-gray-800" />
        <motion.circle 
          cx="64" cy="64" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" 
          strokeDasharray={dashArray} initial={{ strokeDashoffset: dashArray }} animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[var(--primary)]" strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-[950] text-black dark:text-white leading-none">{percentage}%</span>
        <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest mt-1">{label}</span>
      </div>
    </div>
  );
}
