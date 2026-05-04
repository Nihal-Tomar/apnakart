'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

const KEY = 'apnakart-wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch { /* ignore malformed data */ }
  }, []);

  const toggle = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      const next = exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (id: string) => wishlist.some(p => p.id === id);

  return { wishlist, toggle, isWishlisted };
}
