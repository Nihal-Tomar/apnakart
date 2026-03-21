'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentMessage } from '@/types';
import { agentStatuses, getAgentResponse, getSuggestionChips } from '@/lib/agents';
import { Bot, Send, Sparkles } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    { id: '0', agent: 'execution', content: "👋 Welcome to ApnaKart AI Assistant! I coordinate our 4 AI agents to help you with grocery planning, budgeting, and shopping. Ask me anything!", timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), type: 'text' },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chips = getSuggestionChips();

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
    }, 800 + Math.random() * 1200);
  };

  const agentColors: Record<string, string> = { planner: '#4F46E5', budget: '#22C55E', shopping: '#3B82F6', execution: '#F59E0B', user: '#64748B' };
  const agentNames: Record<string, string> = { planner: 'Planner Agent', budget: 'Budget Agent', shopping: 'Shopping Agent', execution: 'Execution Agent', user: 'You' };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <Bot size={28} style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
            AI <span className="gradient-text">Assistant</span>
          </h1>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Chat with our multi-agent AI system</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent Status */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-3">
          <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>AI Agents</h3>
          {agentStatuses.map((agent, i) => (
            <motion.div key={agent.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
              className="glass card-lift rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{agent.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--fg)' }}>{agent.name}</p>
                  <p className="text-[10px] truncate" style={{ color: 'var(--muted)' }}>{agent.role}</p>
                </div>
                <div className="w-2 h-2 rounded-full" style={{
                  background: agent.status === 'active' ? 'var(--success)' : agent.status === 'thinking' ? 'var(--warning)' : 'var(--muted)',
                  boxShadow: agent.status === 'active' ? '0 0 6px var(--success)' : 'none'
                }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="lg:col-span-3">
          <div className="glass rounded-3xl flex flex-col" style={{ height: '65vh', minHeight: '400px' }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map(msg => (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={`flex gap-3 ${msg.agent === 'user' ? 'justify-end' : ''}`}>
                    {msg.agent !== 'user' && (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                        style={{ background: `${agentColors[msg.agent]}15`, color: agentColors[msg.agent] }}>
                        {msg.agent === 'planner' ? '🧠' : msg.agent === 'budget' ? '💰' : msg.agent === 'shopping' ? '🛒' : '⚡'}
                      </div>
                    )}
                    <div className={`max-w-[80%] ${msg.agent === 'user' ? 'order-first' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold" style={{ color: agentColors[msg.agent] }}>{agentNames[msg.agent]}</span>
                        <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{msg.timestamp}</span>
                      </div>
                      <div className="rounded-2xl px-4 py-3 text-[13px] whitespace-pre-wrap leading-relaxed" style={{
                        background: msg.agent === 'user' ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))' : 'var(--surface-hover)',
                        color: msg.agent === 'user' ? '#fff' : 'var(--fg)',
                        boxShadow: msg.agent === 'user' ? '0 4px 15px rgba(79,70,229,0.2)' : 'none',
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: 'rgba(79,70,229,0.1)' }}>🧠</div>
                  <div className="rounded-2xl px-4 py-3 text-[13px] flex items-center gap-2" style={{ background: 'var(--surface-hover)', color: 'var(--muted)' }}>
                    <Sparkles size={14} className="animate-pulse" /> Thinking...
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ borderTop: '1px solid var(--border-color)', scrollbarWidth: 'none' }}>
              {chips.map(chip => (
                <button key={chip} onClick={() => handleSend(chip)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'var(--surface-hover)', color: 'var(--fg)', border: '1px solid var(--border-color)' }}>
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about meals, budget, shopping..."
                  className="flex-1 px-4 py-3 rounded-2xl text-[13px]"
                  style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--fg)' }} />
                <button onClick={() => handleSend()} disabled={!input.trim() || thinking}
                  className="gradient-btn px-5 py-3 rounded-2xl flex items-center gap-2 text-sm disabled:opacity-50">
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
