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

const toastConfig: Record<ToastType, { icon: React.ReactNode; bg: string; border: string; iconColor: string; textColor: string }> = {
  success: {
    icon: <CheckCircle size={16} />,
    bg: '#F0FDF4',
    border: '#BBF7D0',
    iconColor: '#22C55E',
    textColor: '#166534',
  },
  error: {
    icon: <AlertCircle size={16} />,
    bg: '#FEF2F2',
    border: '#FECACA',
    iconColor: '#EF4444',
    textColor: '#991B1B',
  },
  info: {
    icon: <Info size={16} />,
    bg: '#EFF6FF',
    border: '#BFDBFE',
    iconColor: '#3B82F6',
    textColor: '#1E40AF',
  },
  cart: {
    icon: <ShoppingCart size={16} />,
    bg: '#F0FDF4',
    border: '#BBF7D0',
    iconColor: '#22C55E',
    textColor: '#166534',
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts(prev => [...prev.slice(-4), { id, type, message, duration }]); // keep max 5
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 w-72 max-w-[calc(100vw-2rem)]">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => {
            const config = toastConfig[toast.type];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg"
                style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                }}
              >
                <span style={{ color: config.iconColor }} className="flex-shrink-0 mt-0.5">
                  {config.icon}
                </span>
                <p
                  className="text-sm font-medium flex-1 leading-snug"
                  style={{ color: config.textColor }}
                >
                  {toast.message}
                </p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-0.5 rounded-md hover:opacity-70 transition-opacity flex-shrink-0"
                  style={{ color: config.textColor }}
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
