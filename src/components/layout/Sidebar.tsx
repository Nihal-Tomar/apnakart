'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartContext } from '@/lib/context';
import {
  LayoutDashboard, ShoppingBag, ShoppingCart, Wallet, Bot,
  Bell, RefreshCcw, BarChart3, Settings, LogOut
} from 'lucide-react';

const mainNav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/store', label: 'Grocery Store', icon: ShoppingBag },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/assistant', label: 'AI Assistant', icon: Bot },
];

const secondaryNav = [
  { href: '/budget', label: 'Reminders', icon: Bell },
  { href: '/budget', label: 'Subscriptions', icon: RefreshCcw },
  { href: '/budget', label: 'Analytics', icon: BarChart3 },
  { href: '/login', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { totalItems } = useCartContext();

  const NavLink = ({ href, label, icon: Icon, badge }: { href: string; label: string; icon: React.ElementType; badge?: number }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClose}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative"
        style={{
          background: isActive ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))' : 'transparent',
          color: isActive ? '#fff' : 'var(--muted)',
          boxShadow: isActive ? '0 4px 15px rgba(79,70,229,0.25)' : 'none',
        }}
      >
        <Icon size={18} className={`transition-all duration-200 ${!isActive ? 'group-hover:text-[var(--primary)]' : ''}`} />
        <span className={`transition-colors duration-200 ${!isActive ? 'group-hover:text-[var(--fg)]' : ''}`}>{label}</span>
        {badge && badge > 0 && (
          <span
            className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--danger)', color: '#fff' }}
          >
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      <aside
        className={`sidebar fixed top-0 left-0 h-full w-[260px] z-50 flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5">
          <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center text-white font-extrabold text-lg shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
              A
            </div>
            <div>
              <h1 className="text-[17px] font-extrabold tracking-tight gradient-text">ApnaKart</h1>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>Smart Daily Needs</p>
            </div>
          </Link>
        </div>

        {/* Main Nav */}
        <div className="flex-1 overflow-y-auto px-3">
          <p className="px-3 pt-2 pb-2 text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>Main</p>
          <nav className="space-y-1 mb-4">
            {mainNav.map(item => (
              <NavLink key={item.href + item.label} {...item} badge={item.label === 'Cart' ? totalItems : undefined} />
            ))}
          </nav>

          <div className="mx-3 my-3 h-px" style={{ background: 'var(--border-color)' }} />

          <p className="px-3 pt-1 pb-2 text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>More</p>
          <nav className="space-y-1">
            {secondaryNav.map(item => (
              <NavLink key={item.label} {...item} />
            ))}
          </nav>
        </div>

        {/* User */}
        <div className="p-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[var(--surface-hover)] group"
          >
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-md">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--fg)' }}>Nihal</p>
              <p className="text-[10px] truncate" style={{ color: 'var(--muted)' }}>nihal@apnakart.in</p>
            </div>
            <LogOut size={14} className="opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--muted)' }} />
          </Link>
        </div>
      </aside>
    </>
  );
}
