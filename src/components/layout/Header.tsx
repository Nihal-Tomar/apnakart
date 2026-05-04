'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search, ShoppingCart, MapPin, Menu, X,
  LayoutDashboard, ShoppingBag, Wallet, Bot,
  Moon, Sun, ChevronDown, Heart
} from 'lucide-react';
import { useCartContext, useTheme } from '@/lib/context';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartSidebar } from '@/components/ui/CartSidebar';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/store', label: 'Store', icon: ShoppingBag },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/assistant', label: 'AI Assistant', icon: Bot },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems, totalPrice } = useCartContext();
  const { theme, toggleTheme } = useTheme();
  const { toggleCart } = useCartSidebar();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Restore saved city
  useEffect(() => {
    const saved = localStorage.getItem('apnakart-city');
    if (saved) setCity(saved);
  }, []);

  // Close city picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCityPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const suggestions = debouncedQuery.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.nameHindi?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'shadow-sm border-b' : 'border-b border-transparent'
        }`}
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: scrolled ? 'var(--border-color)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Main Row */}
          <div className="flex items-center justify-between h-16 md:h-[68px] gap-4">

            {/* Logo + Delivery */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-green-500/20 group-hover:shadow-green-500/30 transition-all">
                  A
                </div>
                <h1 className="hidden sm:block text-lg font-bold tracking-tight leading-none" style={{ color: 'var(--fg)' }}>
                  Apna<span className="text-[var(--primary)]">Kart</span>
                </h1>
              </Link>
              <div ref={cityRef} className="relative hidden md:flex">
                <button
                  onClick={() => setShowCityPicker(v => !v)}
                  className="flex items-center gap-1 pl-3 ml-1 border-l transition-colors hover:text-[var(--primary)]"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--muted)' }}
                >
                  <MapPin size={13} className="text-[var(--primary)]" />
                  <span className="text-xs font-medium">{city}</span>
                  <ChevronDown size={11} className={`transition-transform ${showCityPicker ? 'rotate-180' : ''}`} />
                </button>
                {showCityPicker && (
                  <div
                    className="absolute top-full left-0 mt-2 w-36 rounded-xl shadow-xl overflow-hidden z-50"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
                  >
                    {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'].map(c => (
                      <button
                        key={c}
                        onClick={() => { setCity(c); localStorage.setItem('apnakart-city', c); setShowCityPicker(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                        style={{ color: c === city ? 'var(--primary)' : 'var(--fg)' }}
                      >
                        {c === city ? '✓ ' : ''}{c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search — hidden on mobile */}
            <div className="flex-1 max-w-xl hidden md:block" ref={searchRef}>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Search for groceries, fruits, dairy..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all focus:ring-2 focus:ring-[var(--primary)]/20"
                  style={{
                    background: theme === 'dark' ? 'var(--surface)' : '#F1F5F9',
                    border: '1px solid var(--border-color)',
                    color: 'var(--fg)',
                  }}
                />

                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-xl z-50"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
                    >
                      {suggestions.map(product => (
                        <Link
                          key={product.id}
                          href="/store"
                          onClick={() => { setShowSuggestions(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--primary-light)] transition-colors"
                        >
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="36px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: 'var(--fg)' }}>{product.name}</p>
                            <p className="text-xs" style={{ color: 'var(--muted)' }}>{product.unit}</p>
                          </div>
                          <span className="text-sm font-semibold text-[var(--primary)] flex-shrink-0">{formatPrice(product.price)}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-colors hover:bg-[var(--border-color)]/40"
                style={{ color: 'var(--fg)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </button>

              {/* Cart Button — opens sidebar */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-white"
                style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
                  {totalItems > 0 ? formatPrice(totalPrice) : 'Cart'}
                </span>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-[var(--border-color)]/40"
                style={{ color: 'var(--fg)' }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 pb-1.5">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive ? '' : 'hover:bg-[var(--border-color)]/30'
                  }`}
                  style={{ color: isActive ? 'var(--primary)' : 'var(--muted)' }}
                >
                  <item.icon size={15} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[var(--primary)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 lg:hidden"
            style={{ background: 'var(--bg)' }}
          >
            <nav className="flex flex-col p-5 gap-1.5">
              {navItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-[var(--primary-light)]' : 'hover:bg-[var(--surface)]'
                    }`}
                    style={{ color: isActive ? 'var(--primary)' : 'var(--fg)' }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile Search */}
              <div className="mt-3 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Search groceries..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/store?search=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchQuery('');
                      setIsMenuOpen(false);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--fg)',
                  }}
                />
              </div>

              {/* Mobile Cart */}
              <button
                onClick={() => { setIsMenuOpen(false); toggleCart(); }}
                className="mt-2 w-full gradient-btn py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                View Cart ({totalItems} items)
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
