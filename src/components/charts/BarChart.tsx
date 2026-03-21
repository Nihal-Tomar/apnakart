'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: { day: string; amount: number }[];
  maxVal?: number;
}

export default function BarChart({ data, maxVal = 1500 }: { data: { day: string; amount: number }[]; maxVal?: number }) {
  return (
    <div className="flex items-baseline justify-between gap-6 h-64 px-4 w-full">
      {data.map(day => (
        <div key={day.day} className="flex-1 flex flex-col items-center gap-8 h-full group">
          <div className="relative w-full h-full flex items-end">
            <div className="absolute inset-0 bg-gray-50 dark:bg-white/[0.04] rounded-3xl w-full h-full" />
            <motion.div 
              initial={{ height: 0 }} whileInView={{ height: `${(day.amount / maxVal) * 100}%` }}
              whileHover={{ scaleX: 1.05 }}
              className="w-full rounded-3xl bg-black dark:bg-white relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:bg-[var(--primary)] transition-all cursor-crosshair"
            >
              <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 bg-black text-white text-[11px] font-black px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-3xl pointer-events-none">
                ₹{day.amount}
              </div>
            </motion.div>
          </div>
          <span className="text-[11px] font-[900] text-gray-300 dark:text-gray-600 uppercase tracking-widest">{day.day}</span>
        </div>
      ))}
    </div>
  );
}
