'use client';

import React from 'react';
import Link from 'next/link';
import Header from './Header';
import { ThemeProvider, CartProvider } from '@/lib/context';
import { ToastProvider } from '@/components/ui/Toast';
import CartSidebar, { CartSidebarProvider } from '@/components/ui/CartSidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <ToastProvider>
          <CartSidebarProvider>
            <div className="flex flex-col min-h-screen w-full relative" style={{ background: 'var(--bg)' }}>
              <Header />
              <CartSidebar />

              <div className="flex-1 w-full flex flex-col items-center">
                <main className="w-full max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-10 page-fade-in relative z-10">
                  {children}
                </main>
              </div>

              {/* Footer */}
              <footer className="w-full mt-auto border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--surface)' }}>
                <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white font-bold text-sm">A</div>
                        <span className="text-base font-bold" style={{ color: 'var(--fg)' }}>ApnaKart</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                        Smart shopping for your daily needs. Fresh groceries delivered in minutes.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>Quick Links</h3>
                      <ul className="space-y-2.5">
                        {[
                          { href: '/', label: 'Home' },
                          { href: '/store', label: 'Store' },
                          { href: '/budget', label: 'Budget Tracker' },
                          { href: '/assistant', label: 'AI Assistant' },
                        ].map(link => (
                          <li key={link.href}>
                            <Link href={link.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: 'var(--fg)' }}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>Help & Support</h3>
                      <ul className="space-y-2.5">
                        {['Customer Care', 'How it Works', 'Return Policy', 'FAQs'].map(item => (
                          <li key={item}>
                            <Link href="#" className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: 'var(--fg)' }}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>Download App</h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Get the best experience on mobile.</p>
                      <div className="flex flex-col gap-2">
                        <div className="px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors" style={{ background: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}>
                          📱 App Store
                        </div>
                        <div className="px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors" style={{ background: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}>
                          🤖 Play Store
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--muted)' }}>
                    <p>© 2026 ApnaKart. All rights reserved.</p>
                    <div className="flex gap-6">
                      <span className="flex items-center gap-1.5">⚡ 45-min delivery</span>
                      <span className="flex items-center gap-1.5">🔒 Secure payments</span>
                      <span className="flex items-center gap-1.5">🔄 Easy returns</span>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </CartSidebarProvider>
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
