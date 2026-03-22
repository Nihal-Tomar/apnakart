'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownLeft, RefreshCcw, 
  Lightbulb, UtensilsCrossed, Calendar, ChevronRight, BarChart3, Filter, 
  MoreHorizontal, ArrowRight, Tag, PieChart, Activity, Zap, Download, 
  Share2, ShieldCheck, CreditCard, Bell, MessageSquare, Mic, Plus, DownloadCloud,
  Layers, Target, DollarSign, Clock, CircleUserRound, Info, X, HelpCircle
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { transactions, categorySpending, dailySpending } from '@/lib/data/transactions';
import { subscriptions } from '@/lib/data/subscriptions';
import { useTheme } from '@/lib/context';

// ===== IMPORT MODULAR FINTECH COMPONENTS =====
import CountUp from '@/components/ui/CountUp';
import RadialGauge from '@/components/charts/RadialGauge';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import FintechCard from '@/components/cards/FintechCard';
import ThemeToggle from '@/components/ui/ThemeToggle';

const TABS = [
  { id: 'overview', label: 'Financial Overview', icon: PieChart },
  { id: 'transactions', label: 'Spending Log', icon: Activity },
  { id: 'subscriptions', label: 'Household Bills', icon: Layers },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function BudgetPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const totalBalance = 9581;
  const savingsGoal = 85; 

  const monthlyTrendData = [180, 150, 80, 100, 40, 60];
  const monthlyTrendLabels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="pt-32 pb-40 page-fade-in max-w-7xl mx-auto px-6 md:px-12 bg-white transition-colors duration-500 min-h-screen">
      
      {/* ===== HEADER: VAULT (BLACK) 360 (GREEN) ===== */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 pb-16 border-b border-gray-100 mx-4">
        <div className="space-y-4 pl-4 border-l-[12px] border-black">
           <div className="flex items-center gap-6">
              <div className="w-18 h-18 rounded-[28px] bg-black text-[#82C341] flex items-center justify-center shadow-3xl transform hover:rotate-6 transition-all">
                  <Activity size={36} />
              </div>
              <div className="pl-2">
                <h1 className="text-6xl md:text-8xl font-[1000] text-black tracking-[-0.05em] leading-none uppercase">
                  Vault <span className="text-[#82C341]">360</span>
                </h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mt-3 opacity-60 pl-1">Elite Household Operating System Protocol</p>
              </div>
           </div>
        </div>

        {/* Global Navigation Hub */}
        <div className="flex items-center gap-6">
           <ThemeToggle />
           <div className="flex bg-[#F8FAFC] p-2.5 rounded-[32px] border border-gray-100 h-20 items-center px-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] backdrop-blur-xl">
              {TABS.map(tab => (
                <button 
                   key={tab.id} 
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex items-center gap-3 px-8 h-12 rounded-[20px] text-[11px] font-[900] uppercase tracking-[0.2em] transition-all duration-500 relative ${activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-black'}`}
                >
                   {activeTab === tab.id && (
                     <motion.div layoutId="tab-bg" className="absolute inset-0 bg-black rounded-[20px] shadow-2xl" />
                   )}
                   <tab.icon size={16} className="relative z-10" /> 
                   <span className="relative z-10 hidden md:inline">{tab.label}</span>
                </button>
              ))}
           </div>
        </div>
      </motion.div>

      {/* ===== ELITE GRID: ALL CARDS WHITE ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 px-4">
         
         <FintechCard className="p-16 bg-white">
            <div className="flex justify-between items-start mb-14 pl-2">
               <div className="w-16 h-16 rounded-[24px] bg-black text-[#82C341] flex items-center justify-center shadow-3xl">
                  <Wallet size={30} />
               </div>
               <div className="flex gap-3">
                 <button className="p-4 bg-[#F8FAFC] rounded-2xl hover:bg-black hover:text-white transition-all text-black"><DownloadCloud size={20} /></button>
                 <button className="p-4 bg-[#F8FAFC] rounded-2xl hover:bg-black hover:text-white transition-all text-black"><Share2 size={20} /></button>
               </div>
            </div>
            <div className="pl-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Master Resource Scale</p>
              <h2 className="text-7xl font-[1000] text-black tracking-tighter mb-6 leading-none">
                <CountUp target={totalBalance} />
              </h2>
              <div className="flex items-center gap-4 text-green-600 font-[950] text-xs">
                 <div className="flex items-center gap-1 bg-green-600/10 px-3 py-1.5 rounded-xl"><ArrowUpRight size={14} /> +14.2%</div>
                 <span className="text-gray-300 font-black text-[9px] uppercase tracking-widest pl-1">Global Intensity Change</span>
              </div>
            </div>
         </FintechCard>

         <FintechCard className="p-16 flex items-center gap-10 bg-white">
            <RadialGauge percentage={78} />
            <div className="flex-1 space-y-5 pl-4">
               <div>
                 <h4 className="text-3xl font-[1000] text-black tracking-tighter leading-none mb-2">Excellent</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Efficiency Status</p>
               </div>
               <p className="text-xs font-bold text-gray-400 leading-relaxed pr-6">Household capital velocity is within <span className="text-black font-black">Elite Parametric Margins</span>.</p>
            </div>
         </FintechCard>

         <div className="grid grid-rows-2 gap-8">
            <motion.div whileHover={{ x: 12 }} className="bg-white border border-black p-8 rounded-[40px] text-black flex items-center justify-between px-12 group cursor-pointer shadow-3xl">
               <div className="flex items-center gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-black text-[#82C341] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                     <Download size={30} />
                   </div>
                  <span className="text-[11px] font-[1000] uppercase tracking-[0.4em]">Export Archive</span>
               </div>
               <ChevronRight size={24} className="text-gray-400 group-hover:translate-x-4 transition-transform group-hover:text-black" />
            </motion.div>
            <motion.div whileHover={{ x: -12 }} className="bg-white border border-gray-100 p-8 rounded-[40px] flex items-center justify-between px-12 group cursor-pointer shadow-2xl">
               <div className="flex items-center gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform border border-gray-100">
                     <Zap size={30} />
                   </div>
                  <span className="text-[11px] font-[1000] uppercase tracking-[0.4em] text-black">Active Synch</span>
               </div>
               <div className="w-4 h-4 rounded-full bg-green-500 shadow-2xl shadow-green-500/50 animate-pulse" />
            </motion.div>
         </div>
      </div>

      {/* ALLOCATION / TRENDS - SYNCED TO PURE WHITE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8 px-4">
         <FintechCard className="lg:col-span-4 p-16 bg-white">
            <h3 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.5em] mb-14 flex items-center gap-5 pl-2">
               <PieChart size={20} className="text-black" /> Resource Split
            </h3>
            <div className="space-y-12 pr-6 pl-2">
               {categorySpending.slice(0, 4).map((cat, i) => (
                 <div key={cat.category} className="space-y-5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em]">
                       <span className="text-gray-400 group-hover:text-black transition-colors">{cat.category}</span>
                       <span className="text-black font-[1000]">{formatPrice(cat.amount)}</span>
                    </div>
                    <div className="relative w-full h-3.5 bg-[#F8FAFC] rounded-full overflow-hidden shadow-inner p-0.5 border border-gray-50">
                       <motion.div 
                          initial={{ width: 0 }} whileInView={{ width: `${(cat.amount / 5000) * 100}%` }}
                          transition={{ duration: 1.2, delay: i * 0.1 }}
                          className="h-full bg-black rounded-full shadow-2xl relative"
                       />
                    </div>
                 </div>
               ))}
            </div>
         </FintechCard>

         <FintechCard className="lg:col-span-8 p-16 bg-white">
            <div className="flex justify-between items-start mb-20 pl-4">
               <div>
                  <h3 className="text-5xl font-[1000] text-black tracking-[-0.04em] leading-none mb-4">Flow Intensity</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Real-Time Sequence Monitoring</p>
               </div>
               <div className="flex gap-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center text-xs font-black text-black shadow-sm">{d}</div>
                  ))}
               </div>
            </div>
            <BarChart data={dailySpending} />
         </FintechCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8 px-4">
         <motion.div 
            whileHover={{ scale: 0.99 }}
            className="lg:col-span-7 bg-white text-black p-16 rounded-[72px] shadow-3xl relative overflow-hidden group border-4 border-black"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-[#82C341]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-14 pl-4 pr-10">
               <div className="w-28 h-28 rounded-[36px] bg-black text-[#82C341] flex items-center justify-center shadow-3xl flex-shrink-0 animate-float">
                  <Lightbulb size={56} />
               </div>
               <div className="space-y-8 flex-grow pr-10">
                  <span className="text-[11px] font-black text-[#82C341] uppercase tracking-[0.6em] mb-4 inline-block">Asset Protocol Update</span>
                  <h4 className="text-4xl font-[1000] tracking-[-0.05em] leading-tight uppercase">Switch to Vault Bundles for 15% Savings.</h4>
                  <p className="text-gray-400 text-lg font-bold leading-relaxed opacity-70">Optimization logic detected repeatable transaction patterns in 12 recurring assets.</p>
                  <button className="flex items-center gap-6 mt-14 bg-black text-white px-12 py-6 rounded-[24px] text-[11px] font-[1000] uppercase tracking-[0.3em] hover:bg-[#82C341] transition-all transform active:scale-95 group shadow-3xl">
                     Initiate Patch <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform" />
                  </button>
               </div>
            </div>
         </motion.div>

         <FintechCard className="lg:col-span-5 p-16 flex flex-col items-center justify-center bg-white">
            <h3 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.5em] mb-16 self-start pl-4">Target Velocity</h3>
            <div className="flex flex-col items-center justify-center space-y-16 w-full">
               <RadialGauge percentage={85} label="Wealth Target" />
               <div className="text-center pb-8">
                  <h5 className="text-4xl font-[1000] text-black tracking-[-0.05em] mb-4 uppercase">₹12,750 Saved</h5>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] opacity-40">Next Protocol: ₹15,000</p>
               </div>
            </div>
         </FintechCard>
      </div>

      {/* RECENT RECORD SYNC */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-24 px-8">
         <div className="lg:col-span-8 space-y-14">
             <div className="flex justify-between items-center px-4 pl-8 border-l-8 border-black">
                <h3 className="text-4xl font-[1000] text-black tracking-[-0.05em] uppercase">Flow Record</h3>
                <button className="text-[10px] font-black uppercase tracking-widest bg-[#F8FAFC] border border-gray-100 px-10 py-5 rounded-2xl hover:bg-black hover:text-white transition-all text-black">Full Archive</button>
             </div>
             <div className="bg-white rounded-[72px] border border-gray-100 shadow-3xl overflow-hidden p-4">
                {transactions.slice(0, 5).map(tx => (
                   <div key={tx.id} className="flex items-center justify-between p-12 pl-14 hover:bg-[#F8FAFC] transition-all border-b border-gray-50 last:border-0 group cursor-pointer active:scale-98 rounded-[48px]">
                      <div className="flex items-center gap-12 pl-4">
                         <div className={`w-18 h-18 rounded-3xl flex items-center justify-center text-2xl shadow-inner ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-[#F8FAFC] text-black border border-gray-50'}`}>
                            {tx.type === 'credit' ? <ArrowDownLeft size={32} /> : <TrendingDown size={32} />}
                         </div>
                         <div className="pl-2">
                            <p className="text-2xl font-[1000] text-black tracking-tighter leading-none mb-3 uppercase group-hover:translate-x-4 transition-transform">{tx.description}</p>
                            <p className="text-[11px] font-[1000] text-gray-300 uppercase tracking-[0.4em]">{tx.category} • {tx.date}</p>
                         </div>
                      </div>
                      <div className="text-right pr-14">
                         <p className={`text-4xl font-[1000] tracking-[-0.06em] ${tx.type === 'credit' ? 'text-green-500' : 'text-black'}`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
         </div>

         <div className="lg:col-span-4 space-y-16">
            <FintechCard className="p-16 bg-white">
               <div className="flex items-center gap-8 mb-14 border-b border-gray-50 pb-10 pl-2">
                  <div className="w-18 h-18 rounded-3xl bg-black text-[#82C341] flex items-center justify-center shadow-2xl"><Calendar size={36} /></div>
                  <div>
                    <h4 className="text-3xl font-[1000] text-black tracking-tighter uppercase leading-none mb-2">Subs</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Renewal Log</p>
                  </div>
               </div>
               <div className="space-y-10 pr-6 pl-2">
                  {subscriptions.slice(0, 4).map(sub => (
                    <div key={sub.id} className="flex items-center justify-between group">
                       <div className="flex items-center gap-6">
                          <span className="text-3xl w-14 h-14 bg-[#F8FAFC] border border-gray-50 rounded-2xl flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-sm">{sub.icon}</span>
                          <span className="text-[12px] font-[1000] text-gray-800 uppercase tracking-widest">{sub.name}</span>
                       </div>
                       <span className="text-lg font-black text-black">{formatPrice(sub.amount)}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-16 py-6 bg-black text-white rounded-3xl text-[11px] font-[1000] uppercase tracking-[0.4em] hover:bg-[#82C341] transition-all shadow-3xl">Renewals Console</button>
            </FintechCard>

            <motion.div whileHover={{ scale: 1.02 }} className="p-14 pl-14 bg-white border-8 border-red-600 rounded-[72px] text-black shadow-3xl relative overflow-hidden group">
               <div className="relative z-10 flex items-center justify-between mb-10 pr-6">
                  <span className="bg-red-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black tracking-[0.6em] uppercase shadow-2xl">Lethal Alert</span>
                  <Bell size={32} className="text-red-600 animate-float" />
               </div>
               <h4 className="text-4xl font-[1000] tracking-[-0.05em] leading-tight relative z-10 pr-8 uppercase text-red-600">Capital Overflow: Snacks.</h4>
               <p className="text-gray-900 text-base font-black mt-6 relative z-10 pr-6 leading-relaxed opacity-90">System halt recommended for 'Luxury Calories' until next cycle.</p>
            </motion.div>
         </div>
      </section>

      {/* FLOAT CONSOLE SYNC */}
      <div className="fixed bottom-12 right-12 z-[100] flex flex-col gap-8 items-end">
         <motion.button 
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`w-20 h-20 rounded-[32px] flex items-center justify-center shadow-4xl text-white transition-all transform ${isVoiceActive ? 'bg-red-500 scale-125' : 'bg-black'}`}
         >
            {isVoiceActive ? <X size={34} /> : <Mic size={34} />}
         </motion.button>
         
         <motion.button 
            whileHover={{ scale: 1.15, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className="w-24 h-24 rounded-[40px] bg-[#82C341] text-white flex items-center justify-center shadow-[0_40px_80px_rgba(130,195,65,0.4)] group relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Plus size={48} className="relative z-10" />
         </motion.button>
      </div>
    </div>
  );
}
