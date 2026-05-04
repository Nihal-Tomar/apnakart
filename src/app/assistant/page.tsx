'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentMessage } from '@/types';
import { agentStatuses, getAgentResponse, getSuggestionChips } from '@/lib/agents';
import {
  Bot, Send, Sparkles, Truck, RotateCcw,
  CreditCard, Apple, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useCartContext } from '@/lib/context';
import { useToast } from '@/components/ui/Toast';
import { formatTimestamp, getGreetingForHour } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Creates a stable initial welcome message with a FIXED timestamp.
 * Using a literal "00:00" instead of toLocaleTimeString() means SSR and
 * client produce exactly the same HTML, eliminating the hydration mismatch.
 * The real time is filled in client-side via useEffect below.
 */
function makeWelcomeMessage(): AgentMessage {
  return {
    id: 'welcome',
    agent: 'execution',
    content:
      "👋 Hi there! I'm your AI grocery assistant. I can help you plan meals, create grocery lists, track your budget, and more. Try asking me something!",
    timestamp: '', // filled in by useEffect
    type: 'text',
  };
}

// ─────────────────────────────────────────────────────────────
// Quick action cards
// ─────────────────────────────────────────────────────────────

const quickActions = [
  { title: 'Track Order',  desc: 'Live delivery status', icon: Truck,     color: '#22C55E', query: 'Where is my order?' },
  { title: 'Returns',      desc: 'Easy return process',  icon: RotateCcw, color: '#EF4444', query: 'How to return an item?' },
  { title: 'Pricing',      desc: 'Delivery charges info',icon: CreditCard, color: '#3B82F6', query: 'What are the delivery charges?' },
  { title: 'Quality',      desc: 'Freshness guarantee',  icon: Apple,     color: '#F59E0B', query: 'Is everything fresh?' },
];

// examplePrompts replaced by getSuggestionChips() — single source of truth in /lib/agents

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function AssistantPage() {
  const [messages, setMessages] = useState<AgentMessage[]>([makeWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartContext();
  const { addToast } = useToast();

  // ── Stamp the welcome message with the real local time AND dynamic name
  // once we're on the client — avoids SSR/hydration mismatches.
  useEffect(() => {
    const now = Date.now();
    const storedName = localStorage.getItem('userName') || 'there';
    const greeting = getGreetingForHour(new Date().getHours());
    setMessages(prev =>
      prev.map(m =>
        m.id === 'welcome'
          ? {
              ...m,
              timestamp: formatTimestamp(now),
              content: `👋 ${greeting}, ${storedName}! I'm your AI grocery assistant. I can help you plan meals, create grocery lists, track your budget, and more. Try asking me something!`,
            }
          : m
      )
    );
  }, []);

  // ── Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send a message
  const handleSend = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;

    // Capture the timestamp once here — same value used for both the
    // user bubble and (after the async gap) the assistant bubble.
    const userTs = Date.now();

    const userMsg: AgentMessage = {
      id: `user-${userTs}`,
      agent: 'user',
      content: msg,
      timestamp: formatTimestamp(userTs),
      type: 'text',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      const replyTs = Date.now();
      const response = getAgentResponse(msg, replyTs);
      setMessages(prev => [...prev, response]);
      setThinking(false);
    }, 800);
  };

  // ─────────────────────────────────────────────────────────
  // Agent display config
  // ─────────────────────────────────────────────────────────

  const agentIcons: Record<string, string> = {
    planner: '🧠',
    budget: '💰',
    shopping: '🛒',
    execution: '⚡',
    user: '👤',
  };

  const agentNames: Record<string, string> = {
    planner: 'Planner',
    budget: 'Budget Advisor',
    shopping: 'Shopping Assistant',
    execution: 'System',
    user: 'You',
  };

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 pb-8 page-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
            AI <span className="text-[var(--primary)]">Assistant</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Your smart grocery concierge — ask anything!
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>AI Online</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleSend(action.query)}
            className="group p-4 rounded-xl border text-left transition-all hover:shadow-md hover:border-[var(--primary)]/30"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
              style={{ background: `${action.color}15`, color: action.color }}
            >
              <action.icon size={20} />
            </div>
            <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--fg)' }}>{action.title}</h3>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{action.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat panel */}
        <div className="lg:col-span-2">
          <div
            className="rounded-xl border overflow-hidden flex flex-col h-[520px]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.agent === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                        msg.agent === 'user' ? 'bg-[var(--primary)] text-white' : ''
                      }`}
                      style={msg.agent !== 'user' ? { background: 'var(--bg)' } : undefined}
                    >
                      {agentIcons[msg.agent]}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`flex flex-col gap-1 max-w-[80%] ${
                        msg.agent === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>
                          {agentNames[msg.agent]}
                        </span>
                        {/* timestamp is '' on first server render, filled by useEffect */}
                        {msg.timestamp && (
                          <span className="text-[10px]" style={{ color: 'var(--muted)' }}>
                            {msg.timestamp}
                          </span>
                        )}
                      </div>
                      <div
                        className={`rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.agent === 'user'
                            ? 'bg-[var(--primary)] text-white rounded-tr-sm'
                            : 'rounded-tl-sm'
                        }`}
                        style={
                          msg.agent !== 'user'
                            ? { background: 'var(--bg)', color: 'var(--fg)' }
                            : undefined
                        }
                      >
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Thinking indicator */}
              {thinking && (
                <div className="flex gap-3 items-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: 'var(--bg)' }}
                  >
                    🧠
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-xl"
                    style={{ background: 'var(--bg)' }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    <span className="text-xs ml-1" style={{ color: 'var(--muted)' }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggestion chips */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {getSuggestionChips().slice(0, 4).map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--muted)' }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div className="p-4 border-t flex gap-3" style={{ borderColor: 'var(--border-color)' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about groceries, budget, meals..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all focus:ring-2 focus:ring-[var(--primary)]/20"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--fg)',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--primary-hover)] active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-green-500/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Agent status */}
          <div
            className="rounded-xl border p-5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
          >
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--fg)' }}>AI Agents</h4>
            <div className="space-y-3">
              {agentStatuses.map(agent => (
                <div key={agent.name} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: 'var(--bg)' }}
                  >
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--fg)' }}>
                      {agent.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                      {agent.role}
                    </p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      agent.status === 'active'
                        ? 'bg-green-500'
                        : agent.status === 'thinking'
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Example prompts */}
          <div
            className="rounded-xl border p-5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-color)' }}
          >
            <h4
              className="text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: 'var(--fg)' }}
            >
              <Sparkles size={16} className="text-[var(--primary)]" /> Try asking
            </h4>
            <div className="space-y-1">
              {getSuggestionChips().map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-[var(--bg)] flex items-center gap-2 group"
                  style={{ color: 'var(--fg)' }}
                >
                  <ArrowRight
                    size={14}
                    className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trust badge */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-[#22C55E]/5 to-[#22C55E]/10 border border-green-100">
            <ShieldCheck size={24} className="text-[var(--primary)] mb-3" />
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--fg)' }}>
              AI Guarantee
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              All suggestions are personalized based on your shopping history. Your data stays
              private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
