'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, ShoppingCart } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'cart';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
    cart: <ShoppingCart size={18} />,
  };

  const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
    success: { bg: '#F0FDF4', border: '#BBF7D0', icon: '#22C55E' },
    error: { bg: '#FEF2F2', border: '#FECACA', icon: '#EF4444' },
    info: { bg: '#EEF2FF', border: '#C7D2FE', icon: '#4F46E5' },
    cart: { bg: '#F0FDF4', border: '#BBF7D0', icon: '#22C55E' },
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-xl"
              style={{
                background: colors[toast.type].bg,
                border: `1px solid ${colors[toast.type].border}`,
              }}
            >
              <span style={{ color: colors[toast.type].icon }}>{icons[toast.type]}</span>
              <p className="text-[13px] font-medium flex-1" style={{ color: '#0F172A' }}>{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="p-0.5 rounded-lg hover:bg-black/5 transition-colors">
                <X size={14} style={{ color: '#64748B' }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
