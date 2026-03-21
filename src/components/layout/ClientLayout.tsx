'use client';

import React from 'react';
import Header from './Header';
import { ThemeProvider, CartProvider } from '@/lib/context';
import { ToastProvider } from '@/components/ui/Toast';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <ToastProvider>
           <div className="flex flex-col min-h-screen w-full relative" style={{ background: 'var(--bg)' }}>
              {/* Horizontal Header (Full Width - Stays centered with mx-auto if inside a container, but here it's stickied to top) */}
              <Header />

              {/* MAIN CONTAINER: THIS WILL KEEP EVERYTHING CENTERED */}
              <div className="flex-1 w-full flex flex-col items-center">
                 <main className="w-full max-w-7xl px-4 md:px-6 lg:px-10 py-10 md:py-16 page-fade-in relative z-10">
                   {children}
                 </main>
              </div>

              {/* Footer Section */}
              <footer className="w-full mt-auto py-16 px-4 flex flex-col items-center border-t border-gray-100 bg-white" style={{ borderTop: '1px solid var(--border-color)' }}>
                <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12">
                   <div>
                    <h3 className="text-[14px] font-black uppercase mb-6 text-gray-900 tracking-widest">ApnaKart</h3>
                    <p className="text-[13px] font-medium leading-relaxed text-gray-500">Smart shopping for your daily needs. Inspired by India, built for everyone.</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase mb-6 text-gray-400 tracking-widest">Quick Links</h3>
                    <ul className="text-[13px] font-bold space-y-3" style={{ color: 'var(--fg)' }}>
                      <li><a href="/" className="hover:text-[var(--primary)] transition-all flex items-center gap-2">Dashboard</a></li>
                      <li><a href="/store" className="hover:text-[var(--primary)] transition-all flex items-center gap-2">Store</a></li>
                      <li><a href="/budget" className="hover:text-[var(--primary)] transition-all flex items-center gap-2">Budget</a></li>
                    </ul>
                  </div>
                   <div>
                    <h3 className="text-[10px] font-black uppercase mb-6 text-gray-400 tracking-widest">Help & Support</h3>
                    <ul className="text-[13px] font-bold space-y-3" style={{ color: 'var(--fg)' }}>
                      <li><a href="#" className="hover:text-[var(--primary)] transition-all">Customer Care</a></li>
                      <li><a href="#" className="hover:text-[var(--primary)] transition-all">How it works</a></li>
                      <li><a href="#" className="hover:text-[var(--primary)] transition-all">Store Locator</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase mb-6 text-gray-400 tracking-widest">Connect</h3>
                    <div className="flex gap-4">
                      {['TW', 'IN', 'FB'].map(s => <span key={s} className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black cursor-pointer hover:bg-[var(--primary)] hover:text-white transition-all">{s}</span>)}
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-7xl pt-12 mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] gap-4">
                   <p>© 2026 APNAKART INC. ALL RIGHTS RESERVED.</p>
                   <div className="flex gap-8">
                      <span>Express 45-Min Delivery</span>
                      <span>100% Secure Transaction</span>
                   </div>
                </div>
              </footer>
           </div>
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
