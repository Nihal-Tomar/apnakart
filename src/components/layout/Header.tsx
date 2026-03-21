'use client';

import React from 'react';
import { useCartContext, useTheme } from '@/lib/context';
import Link from 'next/link';
import { Search, Bell, Sun, Moon, ShoppingBag, Menu } from 'lucide-react';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { totalItems } = useCartContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="glass-strong sticky top-0 z-30 px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between gap-4"
      style={{ borderBottom: '1px solid var(--border-color)', borderRadius: 0 }}
    >
      {/* Left: Menu (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-[var(--surface-hover)] transition-all active:scale-95"
        style={{ color: 'var(--fg)' }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Center: Search */}
      <div className="flex-1 max-w-xl mx-auto hidden sm:block">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            placeholder="Search products, categories, orders..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-[13px] font-medium"
            style={{
              background: 'var(--surface-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--fg)',
            }}
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all active:scale-95"
          style={{ color: 'var(--fg)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all active:scale-95"
          style={{ color: 'var(--fg)' }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--danger)' }} />
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all active:scale-95"
          style={{ color: 'var(--fg)' }}
          aria-label="Cart"
        >
          <ShoppingBag size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center gradient-bg">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Profile Avatar */}
        <Link href="/login" className="ml-1.5">
          <div className="w-9 h-9 rounded-2xl gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 hover:scale-105">
            N
          </div>
        </Link>
      </div>
    </header>
  );
}
