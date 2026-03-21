'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Bell, ChevronDown, MapPin, Phone, HelpCircle, Menu, X, LayoutDashboard, ShoppingBag, Wallet, Bot, Heart, Moon, Sun, ShoppingBasket } from 'lucide-react';
import { useCartContext, useTheme } from '@/lib/context';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/store', label: 'Grocery Store', icon: ShoppingBag },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/assistant', label: 'AI Assistant', icon: Bot },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCartContext();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100 dark:bg-slate-900 dark:border-slate-800" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {/* Top Info Bar (Black Text) */}
        <div className="hidden lg:block w-full text-[11px] font-black uppercase tracking-[0.2em] py-2 border-b border-gray-100" style={{ background: '#FFFFFF', color: '#000000' }}>
          <div className="max-w-7xl mx-auto px-12 flex justify-between items-center h-4">
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2"><Phone size={12} /> +91 12345 67890</span>
              <span className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary)] transition-colors"><MapPin size={12} /> 560001, Bangalore <ChevronDown size={10} /></span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/budget" className="hover:text-[var(--primary)] transition-all">Support</Link>
              <Link href="/budget" className="hover:text-[var(--primary)] transition-all">My Rewards</Link>
              <Link href="/budget" className="hover:text-[var(--primary)] transition-all">Track Order</Link>
            </div>
          </div>
        </div>

        {/* Branding & Search Row (Centered with mx-auto & px-12) */}
        <div className="max-w-7xl mx-auto px-12 py-7 flex items-center justify-between gap-12">
          {/* Logo (Black text branding) */}
          <Link href="/" className="flex items-center gap-5 group flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-green-500/20 transition-transform group-hover:scale-110 active:scale-95">
              A
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-black tracking-tighter text-black dark:text-white leading-none">Apna<span className="text-[var(--primary)]">Kart</span></h1>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase mt-1.5 text-gray-400">Pure Freshness</p>
            </div>
          </Link>

          {/* Search bar (Main focus centered) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group items-center">
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="w-full pl-8 pr-16 py-4 rounded-2xl text-sm font-black transition-all focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 shadow-sm placeholder:text-gray-300"
                style={{ 
                  background: '#F9F9F9', 
                  border: '1px solid #E5E5E5', 
                  color: '#000000' 
                }}
              />
              <button className="absolute right-0 top-0 h-full px-6 rounded-r-2xl bg-black text-white hover:bg-[var(--primary)] transition-all flex items-center justify-center shadow-lg active:scale-95">
                <Search size={22} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
            {/* Dark mode button - Darkened color */}
            <button
              onClick={toggleTheme}
              className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 transition-all active:scale-95 text-black dark:text-white"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Profile Dropdown - Black text */}
            <Link href="/login" className="hidden lg:flex items-center gap-4 py-1 pr-5 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-100">
               <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-black dark:text-white font-black text-sm">NS</div>
               <div className="text-left">
                  <p className="text-sm font-black text-black dark:text-white leading-none">Nihal Tomar</p>
                  <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">Premium User</p>
               </div>
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
               <button className="relative p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 transition-all hidden sm:flex items-center justify-center text-black dark:text-white">
                 <Heart size={20} />
               </button>
               
               <Link href="/cart" className="relative h-14 flex items-center gap-4 px-8 rounded-[20px] bg-black text-white transition-all shadow-2xl hover:bg-gray-900 active:scale-95">
                 <ShoppingCart size={20} className="text-[var(--primary)]" />
                 <div className="hidden sm:block text-left relative z-10">
                    <p className="text-[10px] leading-tight font-black opacity-50 uppercase tracking-[0.2em]">Bag Content</p>
                    <p className="text-[14px] leading-tight font-black">{totalItems} Total</p>
                 </div>
                 {totalItems > 0 && (
                   <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white lg:hidden">
                     {totalItems}
                   </span>
                 )}
               </Link>

               {/* Mobile Menu */}
               <button 
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="lg:hidden p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-black dark:text-white"
               >
                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Menu Bar (Perfect center + Black text) */}
        <div className="hidden lg:block w-full border-t border-gray-100 px-12 py-3 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto flex items-center gap-16 h-10">
            {/* Category */}
            <div className="relative">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-4 px-8 h-12 rounded-xl bg-black text-white font-black text-[12px] uppercase tracking-[0.2em] transition-all hover:bg-gray-900 active:scale-95"
              >
                Categories <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                    className="absolute top-full left-0 mt-4 w-80 bg-white dark:bg-slate-800 rounded-3xl py-6 shadow-[0_32px_128px_rgba(0,0,0,0.2)] z-50 overflow-hidden border border-gray-50 dark:border-slate-800"
                  >
                    {['Fruits & Vegetables', 'Dairy & Bakery', 'Grains & Essentials', 'Snacks & Drinks', 'Household needs'].map((cat, i) => (
                      <Link 
                        key={cat} href="/store"
                        className="flex items-center justify-between px-8 py-4 text-[14px] font-black text-black hover:bg-gray-50 hover:text-[var(--primary)] transition-all group"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        {cat} <ChevronDown className="-rotate-90 opacity-20 group-hover:opacity-100 transition-all" size={12} />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Horizontal Nav Links - Black Text */}
            <nav className="flex items-center gap-6 h-full">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} href={item.href}
                    className={`flex items-center gap-3 px-6 h-full text-[11px] font-black uppercase tracking-[0.3em] transition-all relative
                      ${isActive ? 'text-[var(--primary)] shadow-sm' : 'text-black dark:text-gray-400 hover:text-[var(--primary)]'}`}
                  >
                    {isActive && <motion.div layoutId="nav-glow-black" className="absolute bottom-0 left-6 right-6 h-1.5 bg-[var(--primary)] rounded-full shadow-[0_4px_12px_var(--primary)]" />}
                    <item.icon size={16} /> {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-4 h-full px-8 border-l border-gray-50 text-[10px] font-black uppercase text-red-600 tracking-[0.2em] animate-pulse">
               ⚡ Order now for 15-min pickup
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 top-[96px] z-40 bg-white dark:bg-slate-900 p-10 flex flex-col gap-12 lg:hidden"
            >
               <nav className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}
                    className="flex justify-between items-center text-4xl font-black text-black dark:text-white tracking-tighter"
                  >
                    <span className="flex items-center gap-6"><item.icon size={32} /> {item.label}</span>
                    <ChevronDown size={24} className="-rotate-90 text-[var(--primary)]" />
                  </Link>
                ))}
              </nav>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="bg-black text-white p-8 rounded-3xl flex items-center justify-center font-black text-2xl gap-5 shadow-2xl">
                 <ShoppingCart size={28} /> My Bag ({totalItems})
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Category Drop Overlay */}
      {isCategoryOpen && <div className="fixed inset-0 z-40 bg-black/5" onClick={() => setIsCategoryOpen(false)} />}
    </>
  );
}
