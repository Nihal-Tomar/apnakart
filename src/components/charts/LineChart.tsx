'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LineChart({ data, labels }: { data: number[]; labels: string[] }) {
  const maxVal = Math.max(...data, 1);
  const points = data.map((v, i) => `${50 + (i * 180)} ${180 - (v / maxVal * 140)}`).join(' ');
  const curvePoints = data.reduce((path, v, i, arr) => {
    const x = 50 + (i * 180);
    const y = 180 - (v / maxVal * 140);
    if (i === 0) return `M ${x} ${y}`;
    const prevX = 50 + ((i - 1) * 180);
    const prevY = 180 - (arr[i-1] / maxVal * 140);
    return `${path} C ${prevX + 90} ${prevY}, ${x - 90} ${y}, ${x} ${y}`;
  }, '');

  return (
    <div className="relative h-80 w-full bg-gray-50 dark:bg-white/[0.02] rounded-[48px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-inner p-4">
      <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <motion.path 
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" as const }}
          d={curvePoints} fill="none" stroke="currentColor" strokeWidth="6" className="text-black dark:text-white" strokeLinecap="round"
        />
        <motion.path 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}
          d={`${curvePoints} V 200 H 50 Z`} fill="url(#line-gradient)" stroke="none"
        />
        {data.map((v, i) => (
          <motion.circle 
            key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5 + (i * 0.1) }}
            cx={50 + (i * 180)} cy={180 - (v / maxVal * 140)} r="6" 
            className="fill-black dark:fill-white stroke-[4px] stroke-white dark:stroke-black" 
          />
        ))}
      </svg>
      <div className="absolute bottom-6 left-12 right-12 flex justify-between">
        {labels.map(l => (
          <span key={l} className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.4em]">{l}</span>
        ))}
      </div>
    </div>
  );
}
