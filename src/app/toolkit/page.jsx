"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// TACTICAL HUD ICONS (ZZZ / ARKNIGHTS VIBE)
// =========================================================================
const AppIcons = {
  Hexagon: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
};

// =========================================================================
// COMPONENT: TACTICAL MODULE CARD (CHAMFERED EDGES)
// =========================================================================
const TacticalCard = ({ tool }) => {
  const isActive = tool.status === 'active';
  const isFlagship = tool.id === 'css-studio';
  const CardWrapper = isActive ? Link : 'div';
  const hrefProp = isActive ? { href: tool.link } : {};

  return (
    <CardWrapper 
      {...hrefProp} 
      className={`group relative flex items-center gap-4 p-4 transition-all duration-300 ${
        isActive 
          ? isFlagship 
            ? 'bg-[#0a101a] border-l-4 border-l-cyan-400 border-t border-r border-b border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] active:scale-[0.98]' 
            : 'bg-[#080808] border border-white/10 hover:bg-[#111] hover:border-white/30 active:scale-[0.98]'
          : 'bg-[#050505] border border-dashed border-white/10 opacity-60 grayscale cursor-not-allowed'
      }`}
      style={{ clipPath: isFlagship ? 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' : 'none' }}
    >
      {/* Background Accent Lines */}
      {isFlagship && (
        <div className="absolute right-2 top-2 opacity-20 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40"><path d="M0 40L40 0H20L0 20V40Z" fill="#22d3ee"/></svg>
        </div>
      )}

      {/* Technical Icon Box */}
      <div className={`w-[50px] h-[50px] shrink-0 flex items-center justify-center transition-all duration-300 relative ${
        isActive 
          ? isFlagship 
            ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-500/50 group-hover:bg-cyan-400 group-hover:text-black' 
            : 'bg-black border border-white/20 text-slate-300 group-hover:text-white'
          : 'bg-transparent border border-white/10 text-slate-600'
      }`}
      style={{ clipPath: 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
      >
         <div className="w-6 h-6 z-10">{tool.icon}</div>
      </div>
      
      {/* Data Content */}
      <div className="flex-1 min-w-0 pr-2 z-10">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-[15px] font-black tracking-tight truncate uppercase ${isActive ? 'text-white' : 'text-slate-500'}`}>
            {tool.title}
          </h3>
          {isFlagship && (
             <div className="flex items-center gap-1 bg-cyan-400 text-black px-1.5 py-[2px] rounded-sm">
                 <span className="text-[8px] font-black tracking-[0.2em]">CORE_ENGINE</span>
             </div>
          )}
        </div>
        <p className="text-[11px] text-slate-400 font-medium line-clamp-1 group-hover:text-slate-300 transition-colors">
          {tool.description}
        </p>
      </div>

      {/* Status Output */}
      <div className="shrink-0 z-10">
        {isActive ? (
          <div className={`flex items-center justify-center w-8 h-8 transition-all duration-300 ${
            isFlagship 
            ? 'text-cyan-400 group-hover:translate-x-1.5' 
            : 'text-slate-500 group-hover:text-white group-hover:translate-x-1.5'
          }`}>
            <AppIcons.ArrowRight />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10">
             <span className="text-[9px] font-black tracking-[0.2em] text-slate-600">LOCK</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// =========================================================================
// COMPONENT: TACTICAL TABS (UNDERLINED)
// =========================================================================
const TacticalTabs = ({ categories, activeCat, setActiveCat }) => (
  <div className="flex overflow-x-auto no-scrollbar gap-6 py-4 -mx-6 px-6 snap-x sticky top-[75px] z-40 bg-[#030712]/95 backdrop-blur-md border-b border-white/10">
    {categories.map(cat => (
      <button 
        key={cat} onClick={() => setActiveCat(cat)}
        className={`shrink-0 pb-3 text-[11px] font-black tracking-[0.15em] uppercase transition-all duration-300 snap-center relative ${
          activeCat === cat ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        {cat}
        {activeCat === cat && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        )}
      </button>
    ))}
  </div>
);

export default function ToolkitPage() {
  const categories = ['All', ...new Set(toolkits.map(tool => tool.category))];
  const [activeCat, setActiveCat] = useState('All');
  
  const filteredTools = activeCat === 'All' 
    ? [...toolkits].sort((a, b) => (a.id === 'css-studio' ? -1 : b.id === 'css-studio' ? 1 : 0))
    : toolkits.filter(tool => tool.category === activeCat);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32 relative selection:bg-cyan-500/30 selection:text-cyan-300" style={{ overscrollBehavior: 'none' }}>
      
      {/* Background Grid Pattern (Sci-Fi) */}
      <div className="fixed inset-0 tactical-grid opacity-[0.07] pointer-events-none z-0"></div>
      
      {/* ========================================================= */}
      {/* TACTICAL HEADER (BUG FIX: CLEAR READABILITY)                */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-xl px-6 py-5 border-b border-white/10 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex flex-col gap-[3px]">
               <div className="w-4 h-[3px] bg-white"></div>
               <div className="w-2.5 h-[3px] bg-cyan-400"></div>
             </div>
             <h1 className="text-xl font-black text-white tracking-[0.1em] uppercase">
               MRR<span className="text-cyan-400 ml-1">OS</span>
             </h1>
          </div>
          
          {/* SECURE BADGE - HIGH CONTRAST */}
          <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500 px-3 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black text-emerald-400 tracking-[0.2em] uppercase">SYS.ONLINE</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO TERMINAL TEXT                                        */}
        {/* ========================================================= */}
        <div className="mb-6 mt-8 animate-fade-in relative border-l-2 border-cyan-400 pl-4">
          <div className="text-[10px] text-cyan-400 font-black tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <span>//</span> TERMINAL INIT
          </div>
          <h2 className="text-[34px] font-black text-white tracking-tighter mb-2 leading-[1.1] uppercase">
            Creative <br/> <span className="text-cyan-400">Override.</span>
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-[280px] font-medium">
            Sistem utilitas Micro-SaaS terenkripsi untuk optimalisasi workflow.
          </p>
        </div>

        {/* ========================================================= */}
        {/* TACTICAL TABS & MODULE LIST                               */}
        {/* ========================================================= */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <TacticalTabs categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />
          
          <div className="space-y-4 pt-6 pb-10">
            {filteredTools.map(tool => (
              <TechCard key={tool.id} tool={tool} />
            ))}
            
            {filteredTools.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-black border border-dashed border-white/20">
                   <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">ERR: MODULE NOT FOUND</span>
                </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .tactical-grid {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
