'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentMessage } from '@/types';
import { agentStatuses, getAgentResponse, getSuggestionChips } from '@/lib/agents';
import { Bot, Send, Sparkles, User, Brain, ShoppingCart, Zap, Wallet, ArrowRight, MessageSquare, ShieldCheck, X, CheckCircle2, MoreHorizontal, PackageSearch, RotateCcw, CreditCard, Truck, Apple, HelpCircle } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    { id: '0', agent: 'execution', content: "👋 System Ready. Select a Quick Protocol below or deploy a custom command sequence.", timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), type: 'text' },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickSolves = [
    { title: "Order Status", desc: "Live GPS Tracking", icon: Truck, color: "#82C341", query: "Where is my order?" },
    { title: "Return Center", desc: "100% Money Back", icon: RotateCcw, color: "#EF4444", query: "How to return an item?" },
    { title: "Billing Sync", desc: "Refunds & Ledger", icon: CreditCard, color: "#3b82f6", query: "What are the delivery charges?" },
    { title: "Freshness", desc: "Quality Verified", icon: Apple, color: "#FF9F00", query: "Is everything fresh?" },
  ];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: AgentMessage = { id: Date.now().toString(), agent: 'user', content: msg, timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      const response = getAgentResponse(msg);
      setMessages(prev => [...prev, response]);
      setThinking(false);
    }, 800); 
  };

  return (
    <div className="space-y-24 pb-32 page-fade-in max-w-7xl mx-auto pl-4">
      {/* ===== ELITE HEADER ===== */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 pb-16 border-b border-gray-100">
        <div className="pl-12 border-l-[12px] border-black space-y-4">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[22px] bg-black text-[var(--primary)] flex items-center justify-center shadow-3xl transform -rotate-6 hover:rotate-0 transition-all duration-700">
                  <Brain size={32} />
              </div>
              <h1 className="text-6xl md:text-8xl font-[950] text-black tracking-[-0.05em] leading-none uppercase">
                AI <span className="text-purple-600">PRO</span>
              </h1>
           </div>
           <p className="text-[11px] font-[1000] text-gray-400 uppercase tracking-[0.5em] pl-2 opacity-60">High-Fidelity Autonomous Concierge for 10-Min Logistics</p>
        </div>
        <div className="flex items-center gap-6 px-10 py-5 bg-gray-50/50 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
           <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse relative z-10" />
           <span className="text-[11px] font-black uppercase text-black tracking-[0.3em] relative z-10">Global Network: <span className="text-green-600">STABLE</span></span>
        </div>
      </motion.div>

      {/* ===== BEAUTIFUL QUICK SOLVE HUB: ZEPTO STYLE ===== */}
      <section className="space-y-12">
        <div className="flex items-center gap-6 px-4">
           <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-2xl">
              <Zap size={24} />
           </div>
           <div>
              <h2 className="text-4xl font-black text-black tracking-tighter uppercase">Quick Solve Hub</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1.5 pl-1">Instant Resolution Protocols</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {quickSolves.map((solve, i) => (
             <motion.button 
                key={solve.title}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(solve.query)}
                className="bg-white p-10 pl-12 rounded-[48px] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] text-left group hover:bg-black transition-all duration-700 relative overflow-hidden h-[240px] flex flex-col justify-between"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-[3] group-hover:bg-white/5 transition-all duration-1000" />
                <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shadow-xl mb-6 relative z-10 transition-colors" style={{ background: solve.color + '15', color: solve.color }}>
                   <solve.icon size={32} />
                </div>
                <div className="relative z-10">
                   <h3 className="text-2xl font-[950] text-black tracking-tighter group-hover:text-white transition-colors">{solve.title}</h3>
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1 group-hover:text-gray-400 transition-colors">{solve.desc}</p>
                </div>
             </motion.button>
           ))}
        </div>
      </section>

      {/* ===== INTERACTIVE CHAT TERMINAL ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 pt-12 border-t border-gray-100">
        
        {/* Main Chat Flow */}
        <div className="lg:col-span-8 space-y-10">
           <div className="bg-white rounded-[72px] border border-gray-100 shadow-[0_50px_100px_-50px_rgba(0,0,0,0.1)] flex flex-col h-[650px] overflow-hidden group">
              
              {/* Messages Viewport */}
              <div className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide no-scrollbar scrolling-touch">
                 <AnimatePresence initial={false}>
                    {messages.map(msg => (
                      <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, x: msg.agent === 'user' ? 40 : -40 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex gap-6 ${msg.agent === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                         <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center text-3xl shadow-xl flex-shrink-0 animate-float
                            ${msg.agent === 'user' ? 'bg-black text-white' : 'bg-gray-50'}`}
                         >
                            {msg.agent === 'user' ? '👤' : msg.agent === 'planner' ? '🧠' : msg.agent === 'budget' ? '💰' : msg.agent === 'shopping' ? '🛒' : '⚡'}
                         </div>
                         <div className={`flex flex-col gap-2 max-w-[80%] ${msg.agent === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className="flex items-center gap-4 px-2">
                               <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">{msg.agent === 'user' ? 'Commander Sequence' : msg.agent + ' protocol'}</span>
                            </div>
                            <div className={`rounded-[40px] px-10 py-7 text-[15px] font-black leading-relaxed shadow-sm transition-all duration-500 hover:shadow-2xl
                               ${msg.agent === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-gray-50 text-black border border-gray-50 whitespace-pre-wrap'}`}>
                               {msg.content}
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
                 {thinking && (
                    <div className="flex gap-6 items-center">
                       <div className="w-14 h-14 rounded-[22px] bg-purple-50 text-purple-600 flex items-center justify-center text-2xl animate-spin-slow">🧠</div>
                       <p className="text-[10px] font-black uppercase text-purple-600 tracking-[0.6em] animate-pulse">Analyzing Asset Resolution...</p>
                    </div>
                 )}
                 <div ref={chatEndRef} />
              </div>

              {/* Advanced Command Input */}
              <div className="p-12 bg-gray-50/40 border-t border-gray-50 flex flex-col gap-6">
                 <div className="flex gap-4 items-center">
                    <input 
                       type="text" 
                       value={input} 
                       onChange={e => setInput(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleSend()}
                       placeholder="Deploy custom command or question..." 
                       className="flex-1 px-10 py-6 rounded-[32px] bg-white border border-gray-100 text-[14px] font-[900] text-black focus:ring-[12px] focus:ring-black/5 shadow-inner transition-all placeholder:text-gray-200"
                    />
                    <motion.button 
                       whileTap={{ scale: 0.9 }}
                       onClick={() => handleSend()} 
                       className="w-20 h-20 rounded-[32px] bg-black text-white flex items-center justify-center shadow-3xl hover:bg-gray-800 transition-all"
                    >
                       <Send size={32} />
                    </motion.button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar: Agent Status Console */}
        <div className="lg:col-span-4 space-y-16">
           <div className="bg-white p-14 rounded-[72px] border border-gray-100 shadow-xl space-y-12">
              <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.5em] border-b border-gray-50 pb-6 pl-2">System Status Console</h4>
              <div className="space-y-10 pl-2">
                 {agentStatuses.map(agent => (
                   <div key={agent.name} className="flex items-center gap-6 group">
                      <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                         {agent.icon}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                            <h5 className="text-[13px] font-black text-black tracking-tight uppercase">{agent.name}</h5>
                            <span className={`w-3 h-3 rounded-full ${agent.status === 'active' ? 'bg-green-500 shadow-lg' : 'bg-gray-200'}`}></span>
                         </div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{agent.role}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Security Banner: Professional High-Contrast */}
           <div className="bg-black p-14 rounded-[72px] text-white shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full translate-x-32 translate-y-32 blur-3xl" />
              <ShieldCheck size={72} className="text-purple-400 mb-10" />
              <h4 className="text-4xl font-[950] tracking-tight mb-6 uppercase leading-none">AI Concierge Guarantee</h4>
              <p className="text-gray-400 text-sm font-bold leading-relaxed mb-12">Every resolution processed through our 'Quick Solve Hub' is backed by our instant resolution protocol. 100% Verified.</p>
              <button className="w-full py-6 rounded-[24px] bg-white text-black text-[11px] font-[950] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group">
                 Open Help Desk <HelpCircle size={20} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
