'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ThemeProvider, CartProvider } from '@/lib/context';
import { ToastProvider } from '@/components/ui/Toast';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <ToastProvider>
          <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen w-full" style={{ marginLeft: '0px' }}>
              <style jsx>{`
                @media (min-width: 1024px) {
                  div[data-main] { margin-left: 260px !important; }
                }
              `}</style>
              <div data-main="" className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '0px' }}>
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
