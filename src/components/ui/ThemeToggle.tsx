'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/context';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-4 rounded-[20px] bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/5 shadow-2xl flex items-center justify-center text-black dark:text-white transition-all duration-500 hover:shadow-3xl"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <Sun size={24} />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <Moon size={24} className="text-[var(--primary)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
