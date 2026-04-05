"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// PREMIUM SVG ICON LIBRARY (FOCUSED FOR MOBILE LISTS)
// =========================================================================
const AppIcons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-400 animate-pulse"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
};

// =========================================================================
// UI COMPONENT: COMPACT TOOL ITEM (ALA SETTINGS APP)
// =========================================================================
const CompactToolItem = ({ tool }) => (
  <Link href={tool.link} className="group flex items-center gap-4 p-4 bg-[#0a0a0a] border border-white/5 rounded-2xl active:scale-[0.98] transition-all duration-300 shadow-inner">
    {/* Icon (Golden Ratio Spacing) */}
    <div className="w-11 h-11 shrink-0 bg-[#141414] border border-white/5 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-950/50 group-hover:text-cyan-300 transition-colors">
       <div className="w-6 h-6">{tool.icon}</div>
    </div>
    
    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h3 className="text-sm font-bold text-white truncate">{tool.title}</h3>
        {tool.isNew && <span className="text-[7px] font-black bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded uppercase tracking-wider border border-cyan-500/30">New</span>}
      </div>
      <p className="text-[10px] text-slate-500 font-medium line-clamp-1 group-hover:text-slate-400 transition-colors">
        {tool.description}
      </p>
    </div>

    {/* Arrow (Native App Feel) */}
    <div className="text-slate-700 group-hover:text-cyan-500 transition-colors px-1">
      <AppIcons.ArrowRight />
    </div>
  </Link>
);

// =========================================================================
// UI COMPONENT: MOBILE SEGMENTED CONTROL (TABS)
// =========================================================================
const MobileTabs = ({ categories, activeCat, setActiveCat }) => (
  <div className="flex overflow-x-auto no-scrollbar gap-2.5 py-6 -mx-6 px-6 snap-x touch-pan-x sticky top-[73px] md:top-[89px] z-40 bg-[#030712]">
    {categories.map(cat => (
      <button 
        key={cat} 
        onClick={() => setActiveCat(cat)}
        className={`shrink-0 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 border-2 snap-center ${
          activeCat === cat 
          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
          : 'bg-[#0a0a0a] text-slate-500 border-[#1f1f1f] active:scale-95 hover:border-[#333]'
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
  
  const flagshipTool = toolkits.find(tool => tool.id === 'css-studio');
  const filteredTools = activeCat === 'All' 
    ? toolkits 
    : toolkits.filter(tool => tool.category === activeCat);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32 overscroll-none" style={{ overscrollBehavior: 'none' }}>
      
      {/* Decorative Glows (Background Layer) */}
      <div className="fixed top-0 right-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-cyan-950/15 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ========================================================= */}
      {/* STICKY MOBILE APP HEADER (PREMIUM & COMPACT)               */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4.5 md:px-12 md:py-5 mb-6 md:mb-12">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter italic">MRR <span className="text-cyan-500 uppercase not-italic text-sm ml-1 tracking-widest font-extrabold">Ecosystem</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Version 3.0 | <span className="text-emerald-400">Secure</span></p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg active:scale-95 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-500"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SECTION (PERPETUAL IDENTITIY)                        */}
        {/* ========================================================= */}
        <div className="mb-10 md:mb-16 animate-fade-in stagger-1">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-[1.1]">
            Senjata Rahasia <br/> Pekerja Kreatif.
          </h2>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl font-medium">
            Kumpulan <span className="text-white">Micro-SaaS & Utilitas Client-Side</span> profesional yang dirancang untuk menyederhanakan workflow harian Anda.
          </p>
        </div>

        {/* ========================================================= */}
        {/* THE MONSTER (FLAGSHIP): DEV VISUAL STUDIO                  */}
        {/* ========================================================= */}
        {flagshipTool && activeCat === 'All' && (
          <div className="mb-12 animate-fade-in stagger-2">
            <div className="bg-gradient-to-br from-[#0a0f1c] to-[#050505] border border-cyan-500/30 rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(6,182,212,0.15)] relative overflow-hidden group active:scale-[0.98] transition-all duration-300">
               <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[70px]"></div>
               
               <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#1f1f1f] relative z-10">
                    {/* Ikon Besar & Mewah */}
                    <div className="w-16 h-16 shrink-0 bg-[#141414] border-2 border-cyan-500 rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                       <div className="w-9 h-9">{flagshipTool.icon}</div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-1">
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">{flagshipTool.title}</h3>
                            <AppIcons.Sparkles />
                        </div>
                        <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.3em]">Featured Flagship Studio</p>
                    </div>
               </div>
               
               <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-medium relative z-10">
                  {flagshipTool.description}
               </p>
               
               <Link href={flagshipTool.link} className="flex-1 flex items-center justify-center gap-2.5 w-full py-4 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-[0_10px_20px_rgba(6,182,212,0.2)]">
                  Buka Workspace <AppIcons.ArrowRight />
               </Link>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN INTERFACE ALA NATIVE APP (TABS + LIST)               */}
        {/* ========================================================= */}
        <div className="animate-fade-in stagger-3 relative z-30">
          
          <MobileTabs categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />
          
          <div className="space-y-3.5 pt-2 pb-10 min-h-[50vh]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block mb-4">
              {activeCat === 'All' ? 'Semua Peralatan' : `Kategori: ${activeCat}`}
            </span>
            
            <div className="grid grid-cols-1 gap-3.5">
              {filteredTools.map(tool => (
                tool.id !== 'css-studio' && <CompactToolItem key={tool.id} tool={tool} />
              ))}
            </div>
            
            {filteredTools.filter(t=>t.id!=='css-studio').length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#0a0a0a] rounded-3xl border border-[#1f1f1f]">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-700 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm6 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" /></svg>
                   <p className="text-xs text-slate-500 font-medium">Belum ada tool di kategori ini.</p>
                </div>
            )}
          </div>
        </div>

        {/* FEEDBACK BUTTON (APP FOOTER) */}
        <div className="mt-16 mb-10 p-7 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center shadow-xl animate-fade-in stagger-4">
           <h4 className="text-base font-black text-white mb-2 tracking-tight">Butuh Tool Lain?</h4>
           <p className="text-[11px] text-slate-500 mb-6 leading-relaxed max-w-xs mx-auto">Punya ide aplikasi micro-SaaS yang bisa mempermudah kerjaan kita? Mari diskusikan bersama.</p>
           <a href="https://wa.me/6285155020363" className="inline-block px-10 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full active:scale-95 transition-all shadow-lg hover:bg-slate-200">Hubungi Arsitek</a>
        </div>

      </div>

      {/* ========================================================= */}
      {/* PREMIUM CSS UTILITIES (SCROLL & ANIMATION)                 */}
      {/* ========================================================= */}
      <style>{`
        /* Hide scrollbar for PWA navigation */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Smooth Fade In Staggered Animation */
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        /* PWA iOS Bottom Bounce Fix */
        body { overscroll-behavior: none; }
      `}</style>
    </div>
  );
}
