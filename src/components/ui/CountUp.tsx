'use client';

import React, { useState, useEffect } from 'react';

export default function CountUp({ target, prefix = '₹', duration = 2 }: { target: number; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (60 * duration);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{prefix}{count.toLocaleString('en-IN')}</>;
}
