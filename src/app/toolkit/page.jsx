"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// MINIMALIST ICONS
// =========================================================================
const AppIcons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
};

// =========================================================================
// COMPONENT: MINIMALIST LIST CARD
// =========================================================================
const MinimalistCard = ({ tool }) => {
  const isActive = tool.status === 'active';
  const isFlagship = tool.id === 'css-studio';
  const CardWrapper = isActive ? Link : 'div';
  const hrefProp = isActive ? { href: tool.link } : {};

  return (
    <CardWrapper 
      {...hrefProp} 
      className={`group relative flex items-center gap-4 p-4 bg-[#050505] border transition-all duration-300 rounded-2xl ${
        isActive 
          ? isFlagship 
            ? 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_4px_20px_rgba(6,182,212,0.05)] active:scale-[0.98]' 
            : 'border-white/5 hover:border-white/20 active:scale-[0.98]'
          : 'border-white/5 opacity-50 grayscale cursor-not-allowed'
      }`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border transition-colors ${
        isActive 
          ? isFlagship ? 'bg-cyan-950/20 border-cyan-500/20 text-cyan-400' : 'bg-[#111] border-white/5 text-slate-300 group-hover:text-white'
          : 'bg-transparent border-white/5 text-slate-600'
      }`}>
         <div className="w-5 h-5">{tool.icon}</div>
      </div>
      
      {/* Text */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-sm font-bold truncate tracking-tight ${isActive ? 'text-white' : 'text-slate-500'}`}>
            {tool.title}
          </h3>
          {isFlagship && <AppIcons.Sparkles />}
        </div>
        <p className="text-[11px] text-slate-500 font-medium line-clamp-1 group-hover:text-slate-400 transition-colors">
          {tool.description}
        </p>
      </div>

      {/* Action / Arrow */}
      <div className="shrink-0">
        {isActive ? (
          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
            isFlagship ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black' : 'text-slate-600 group-hover:text-white'
          }`}>
            <AppIcons.ArrowRight />
          </div>
        ) : (
          <span className="text-[9px] font-black tracking-widest uppercase text-slate-600 bg-[#111] px-2 py-1 rounded-md">Soon</span>
        )}
      </div>
    </CardWrapper>
  );
};

// =========================================================================
// COMPONENT: MINIMALIST TABS
// =========================================================================
const MinimalistTabs = ({ categories, activeCat, setActiveCat }) => (
  <div className="flex overflow-x-auto no-scrollbar gap-2 py-4 -mx-6 px-6 snap-x sticky top-[68px] z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-white/5">
    {categories.map(cat => (
      <button 
        key={cat} onClick={() => setActiveCat(cat)}
        className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 snap-center ${
          activeCat === cat 
          ? 'bg-white text-black shadow-sm' 
          : 'bg-transparent text-slate-500 hover:text-slate-300'
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
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32 overscroll-none" style={{ overscrollBehavior: 'none' }}>
      
      {/* HEADER MINIMALIST */}
      <div className="sticky top-0 z-50 bg-[#030712] px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-black text-white tracking-tighter">
            MRR <span className="text-slate-500 font-medium ml-0.5">Ecosystem</span>
          </h1>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded-md">Secure</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        
        {/* HERO TEXT */}
        <div className="mb-6 mt-4 animate-fade-in">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2 leading-tight">
            Senjata Rahasia <br/> Pekerja Kreatif.
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Kumpulan Micro-SaaS profesional untuk menyederhanakan workflow harian Anda.
          </p>
        </div>

        {/* TABS & LIST */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <MinimalistTabs categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />
          
          <div className="space-y-3 pt-6 pb-10">
            {filteredTools.map(tool => (
              <MinimalistCard key={tool.id} tool={tool} />
            ))}
            
            {filteredTools.length === 0 && (
                <div className="text-center py-12 text-xs text-slate-500">Belum ada tool.</div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
