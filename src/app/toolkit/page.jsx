"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// TECHNICAL HUD ICONS (ANIME / SCI-FI VIBE)
// =========================================================================
const AppIcons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 animate-pulse"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
};

// =========================================================================
// COMPONENT: ANIME / TECH UI LIST CARD (GOLDEN RATIO PROPORTIONS)
// =========================================================================
const TechCard = ({ tool }) => {
  const isActive = tool.status === 'active';
  const isFlagship = tool.id === 'css-studio';
  const CardWrapper = isActive ? Link : 'div';
  const hrefProp = isActive ? { href: tool.link } : {};

  return (
    <CardWrapper 
      {...hrefProp} 
      className={`group relative flex items-center gap-5 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 rounded-[1.25rem] overflow-hidden ${
        isActive 
          ? isFlagship 
            ? 'bg-[#060b14]/80 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] active:scale-[0.98]' 
            : 'bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.98]'
          : 'bg-black/20 border border-white/5 opacity-60 grayscale cursor-not-allowed'
      }`}
    >
      {/* Decorative Tech Line (Left Edge) */}
      {isFlagship && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-md shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>}

      {/* Icon Wrapper (Golden Ratio Scale 1:1.6) */}
      <div className={`w-12 h-12 sm:w-[52px] sm:h-[52px] shrink-0 rounded-xl flex items-center justify-center border transition-all duration-500 ${
        isActive 
          ? isFlagship 
            ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:rotate-3' 
            : 'bg-[#0f0f0f] border-white/10 text-slate-300 group-hover:text-white'
          : 'bg-transparent border-white/5 text-slate-600'
      }`}>
         <div className="w-5 h-5 sm:w-6 sm:h-6">{tool.icon}</div>
      </div>
      
      {/* Text Content */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-sm sm:text-base font-black tracking-tight truncate ${isActive ? 'text-white' : 'text-slate-500'}`}>
            {tool.title}
          </h3>
          {isFlagship && (
             <div className="flex items-center gap-1 bg-cyan-500/10 px-1.5 py-0.5 rounded uppercase tracking-[0.2em]">
                 <AppIcons.Sparkles />
                 <span className="text-[7px] font-black text-cyan-400">ENGINE</span>
             </div>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 font-medium line-clamp-1 group-hover:text-slate-300 transition-colors">
          {tool.description}
        </p>
      </div>

      {/* Action / Status Indicator */}
      <div className="shrink-0">
        {isActive ? (
          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
            isFlagship 
            ? 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black group-hover:translate-x-1' 
            : 'text-slate-500 group-hover:text-white group-hover:translate-x-1'
          }`}>
            <AppIcons.ArrowRight />
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-[#111] border border-white/5 px-2 py-1 rounded text-slate-600">
             <AppIcons.Lock />
             <span className="text-[8px] font-black tracking-widest uppercase">LOCKED</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// =========================================================================
// COMPONENT: HUD TABS
// =========================================================================
const TechTabs = ({ categories, activeCat, setActiveCat }) => (
  <div className="flex overflow-x-auto no-scrollbar gap-3 py-4 -mx-6 px-6 snap-x sticky top-[72px] z-40 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5">
    {categories.map(cat => (
      <button 
        key={cat} onClick={() => setActiveCat(cat)}
        className={`shrink-0 px-5 py-2.5 rounded-lg text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 snap-center border ${
          activeCat === cat 
          ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
          : 'bg-transparent text-slate-500 border-white/10 hover:border-white/30 hover:text-slate-300'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default function ToolkitPage() {
  const categories = ['All', ...new Set(toolkits.map(tool => tool.category))];
  const [activeCat, setActiveCat] = useState('All');
  
  // Memastikan Flagship (CSS Studio) selalu ada di urutan pertama saat mode 'All'
  const filteredTools = activeCat === 'All' 
    ? [...toolkits].sort((a, b) => (a.id === 'css-studio' ? -1 : b.id === 'css-studio' ? 1 : 0))
    : toolkits.filter(tool => tool.category === activeCat);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32 relative overflow-hidden" style={{ overscrollBehavior: 'none' }}>
      
      {/* ========================================================= */}
      {/* BACKGROUND: CYBER GRID & RADIAL GLOW                      */}
      {/* ========================================================= */}
      <div className="fixed inset-0 cyber-grid opacity-[0.15] pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* ========================================================= */}
      {/* HUD HEADER MINIMALIST                                     */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-xl px-6 py-5 border-b border-white/10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-cyan-400 rounded-sm animate-pulse"></div>
             <h1 className="text-lg font-black text-white tracking-widest uppercase">
               MRR<span className="text-slate-500 font-medium mx-1">/</span>OS
             </h1>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-[0.2em] shadow-inner">
             <span className="text-[8px] font-black text-emerald-400">SYS.ONLINE</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO TEXT (SHARP & BOLD)                                  */}
        {/* ========================================================= */}
        <div className="mb-8 mt-6 animate-fade-in relative">
          <div className="absolute -left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 to-transparent opacity-50"></div>
          <h2 className="text-[32px] sm:text-[40px] font-black text-white tracking-tighter mb-3 leading-[1.05]">
            Kreativitas <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tanpa Batas.</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
            Terminal Micro-SaaS profesional. Dirancang untuk efisiensi workflow desain & development.
          </p>
        </div>

        {/* ========================================================= */}
        {/* TABS & TECH LIST                                          */}
        {/* ========================================================= */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <TechTabs categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />
          
          <div className="space-y-4 pt-6 pb-10">
            {filteredTools.map(tool => (
              <TechCard key={tool.id} tool={tool} />
            ))}
            
            {filteredTools.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                   <div className="w-10 h-10 border border-slate-700 text-slate-600 rounded-lg flex items-center justify-center mb-3">!</div>
                   <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Modul Kosong</p>
                </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* CSS CYBER GRID & ANIMATIONS                               */}
      {/* ========================================================= */}
      <style>{`
        /* Pattern HUD Grid */
        .cyber-grid {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
