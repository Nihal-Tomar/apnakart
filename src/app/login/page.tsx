'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${isLogin ? 'Login' : 'Signup'} successful! (Demo mode)`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md">
        <div className="glass-strong rounded-3xl p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-white font-extrabold text-xl shadow-lg mb-3">A</div>
            <h1 className="text-2xl font-extrabold gradient-text">ApnaKart</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
          </div>

          {/* Google Login */}
          <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl text-[13px] font-semibold mb-4 transition-all"
            style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </motion.button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
            <span className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-[13px]"
                  style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--fg)' }} />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-[13px]"
                  style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--fg)' }} />
              </div>
            </div>
            <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} type="submit"
              className="gradient-btn w-full py-3.5 rounded-2xl text-sm">
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          <p className="text-center text-[13px] mt-4" style={{ color: 'var(--muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-bold" style={{ color: 'var(--primary)' }}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs mt-4">
          <Link href="/" className="flex items-center justify-center gap-1 font-medium" style={{ color: 'var(--primary)' }}>
            <ArrowLeft size={12} /> Back to Dashboard
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
