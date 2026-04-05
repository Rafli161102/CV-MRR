"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// PREMIUM SVG ICON LIBRARY
// =========================================================================
const AppIcons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-400 animate-pulse"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
};

// =========================================================================
// UI COMPONENT: PREMIUM LIST CARD (WITH COMING SOON STATE)
// =========================================================================
const PremiumListCard = ({ tool }) => {
  const isActive = tool.status === 'active';
  
  // Jika coming soon, kita render div biasa (bukan Link) agar tidak bisa diklik
  const CardWrapper = isActive ? Link : 'div';
  const hrefProp = isActive ? { href: tool.link } : {};

  return (
    <CardWrapper 
      {...hrefProp} 
      className={`group relative flex items-center gap-4 p-4 sm:p-5 bg-[#0a0f1c] border rounded-[1.5rem] transition-all duration-300 ${
        isActive 
          ? 'border-white/10 hover:border-cyan-500/40 shadow-lg active:scale-[0.98] cursor-pointer' 
          : 'border-white/5 opacity-60 grayscale-[30%] cursor-not-allowed'
      }`}
    >
      {/* Icon Wrapper (Menjamin Ukuran Serasi/Harmonis) */}
      <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl flex items-center justify-center border shadow-inner transition-colors ${
        isActive 
          ? 'bg-[#141414] border-white/10 text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/40' 
          : 'bg-transparent border-white/5 text-slate-500'
      }`}>
         <div className="w-6 h-6 sm:w-7 sm:h-7">{tool.icon}</div>
      </div>
      
      {/* Text Content */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-sm sm:text-base font-bold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
            {tool.title}
          </h3>
          {tool.isNew && isActive && (
            <span className="text-[7px] font-black bg-cyan-500 text-black px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>
          )}
        </div>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1 group-hover:text-slate-400 transition-colors">
          {tool.description}
        </p>
      </div>

      {/* Status Indicator (Akses vs Coming Soon) */}
      <div className="shrink-0 flex items-center">
        {isActive ? (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-sm">
            <AppIcons.ArrowRight />
          </div>
        ) : (
          <div className="px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#2a2a2a] shadow-inner">
            <span className="text-[8px] font-black tracking-widest uppercase text-slate-500">Soon</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// =========================================================================
// UI COMPONENT: MOBILE SEGMENTED CONTROL (TABS)
// =========================================================================
const MobileTabs = ({ categories, activeCat, setActiveCat }) => (
  <div className="flex overflow-x-auto no-scrollbar gap-2.5 py-6 -mx-6 px-6 snap-x touch-pan-x sticky top-[73px] md:top-[89px] z-40 bg-[#030712]/95 backdrop-blur-md">
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
      {/* STICKY MOBILE APP HEADER                                 */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4.5 md:px-12 md:py-5 mb-6 md:mb-12">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter italic">MRR <span className="text-cyan-500 uppercase not-italic text-sm ml-1 tracking-widest font-extrabold">Ecosystem</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Version 3.0 | <span className="text-emerald-400">Secure</span></p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
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
            <Link href={flagshipTool.link} className="block bg-gradient-to-br from-[#0a0f1c] to-[#050505] border border-cyan-500/30 rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(6,182,212,0.15)] relative overflow-hidden group active:scale-[0.98] transition-all duration-300">
               <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[70px]"></div>
               
               <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#1f1f1f] relative z-10">
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
               
               {/* Button Sleek */}
               <div className="flex items-center justify-between px-6 py-3.5 bg-[#141414] border border-[#2a2a2a] group-hover:border-cyan-500/50 rounded-xl transition-all shadow-inner relative z-10">
                  <span className="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Buka Workspace</span>
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                     <AppIcons.ArrowRight />
                  </div>
               </div>
            </Link>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN INTERFACE (TABS + PREMIUM LIST)                      */}
        {/* ========================================================= */}
        <div className="animate-fade-in stagger-3 relative z-30">
          
          <MobileTabs categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />
          
          <div className="space-y-4 pt-2 pb-10 min-h-[50vh]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block mb-2">
              {activeCat === 'All' ? 'Semua Peralatan' : `Kategori: ${activeCat}`}
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map(tool => (
                tool.id !== 'css-studio' && <PremiumListCard key={tool.id} tool={tool} />
              ))}
            </div>
            
            {filteredTools.filter(t=>t.id!=='css-studio').length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#0a0a0a] rounded-3xl border border-[#1f1f1f]">
                   <p className="text-xs text-slate-500 font-medium">Belum ada tool di kategori ini.</p>
                </div>
            )}
          </div>
        </div>

        {/* FEEDBACK BUTTON */}
        <div className="mt-16 mb-10 p-7 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center shadow-xl animate-fade-in stagger-4">
           <h4 className="text-base font-black text-white mb-2 tracking-tight">Butuh Tool Lain?</h4>
           <p className="text-[11px] text-slate-500 mb-6 leading-relaxed max-w-xs mx-auto">Punya ide aplikasi micro-SaaS yang bisa mempermudah kerjaan kita? Mari diskusikan bersama.</p>
           <a href="https://wa.me/6285155020363" className="inline-block px-10 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full active:scale-95 transition-all shadow-lg hover:bg-slate-200">Hubungi Arsitek</a>
        </div>

      </div>

      {/* ========================================================= */}
      {/* CSS UTILITIES                                              */}
      {/* ========================================================= */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.1s; } .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; } .stagger-4 { animation-delay: 0.4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        body { overscroll-behavior: none; }
      `}</style>
    </div>
  );
}
