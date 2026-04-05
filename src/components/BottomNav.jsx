"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// TACTICAL HUD ICONS (ZZZ / ARKNIGHTS VIBE)
// =========================================================================
const AppIcons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 animate-pulse"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296a3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043a3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296a3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043a3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
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
            ? 'bg-[#0a101a] border-l-[3px] border-l-cyan-400 border-t border-r border-b border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] active:scale-[0.98]' 
            : 'bg-[#080808] border border-white/10 hover:bg-[#111] hover:border-white/30 active:scale-[0.98]'
          : 'bg-[#050505] border border-dashed border-white/10 opacity-60 grayscale cursor-not-allowed'
      }`}
      style={{ clipPath: isFlagship ? 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' : 'none' }}
    >
      {/* Background Accent Lines */}
      {isFlagship && (
        <div className="absolute right-2 top-2 opacity-20 pointer-events-none">
          <svg width="30" height="30" viewBox="0 0 40 40"><path d="M0 40L40 0H20L0 20V40Z" fill="#22d3ee"/></svg>
        </div>
      )}

      {/* Technical Icon Box */}
      <div className={`w-12 h-12 shrink-0 flex items-center justify-center transition-all duration-300 relative ${
        isActive 
          ? isFlagship 
            ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-500/50 group-hover:bg-cyan-400 group-hover:text-black' 
            : 'bg-black border border-white/20 text-slate-300 group-hover:text-white'
          : 'bg-transparent border border-white/10 text-slate-600'
      }`}
      style={{ clipPath: 'polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)' }}
      >
         <div className="w-5 h-5 z-10">{tool.icon}</div>
      </div>
      
      {/* Data Content */}
      <div className="flex-1 min-w-0 pr-2 z-10">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-sm sm:text-base font-black tracking-tight truncate uppercase ${isActive ? 'text-white' : 'text-slate-500'}`}>
            {tool.title}
          </h3>
          {isFlagship && (
             <div className="flex items-center gap-1 bg-cyan-400 text-black px-1.5 py-[2px] rounded-sm">
                 <span className="text-[7px] font-black tracking-[0.2em]">CORE</span>
             </div>
          )}
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium line-clamp-1 group-hover:text-slate-300 transition-colors">
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
             <span className="text-[8px] font-black tracking-[0.2em] text-slate-600">LOCK</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default function ToolkitPage() {
  const categories = ['All', ...new Set(toolkits.map(tool => tool.category))];
  const [activeCat, setActiveCat] = useState('All');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false); // STATE UNTUK MODAL
  
  const filteredTools = activeCat === 'All' 
    ? [...toolkits].sort((a, b) => (a.id === 'css-studio' ? -1 : b.id === 'css-studio' ? 1 : 0))
    : toolkits.filter(tool => tool.category === activeCat);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32 relative selection:bg-cyan-500/30 selection:text-cyan-300" style={{ overscrollBehavior: 'none' }}>
      
      {/* Background Grid Pattern (Sci-Fi) */}
      <div className="fixed inset-0 tactical-grid opacity-[0.05] pointer-events-none z-0"></div>
      
      {/* ========================================================= */}
      {/* TACTICAL HEADER                                           */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-40 bg-[#030712]/95 backdrop-blur-xl px-6 py-5 border-b border-white/5 shadow-md">
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
          
          {/* SECURE BADGE - BISA DIKLIK */}
          <button 
            onClick={() => setIsSecurityModalOpen(true)}
            className="group flex items-center gap-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500 px-3 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-95 transition-all"
          >
             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
             <span className="text-[9px] font-black text-emerald-400 tracking-[0.2em] uppercase">SYS.ONLINE</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO TERMINAL TEXT                                        */}
        {/* ========================================================= */}
        <div className="mb-6 mt-8 animate-fade-in relative border-l-2 border-cyan-400 pl-4">
          <div className="text-[9px] text-cyan-400 font-black tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <span>//</span> TERMINAL INIT
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-black text-white tracking-tighter mb-2 leading-[1.05] uppercase">
            Creative <br/> <span className="text-cyan-400">Override.</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-[280px] font-medium">
            Sistem utilitas Micro-SaaS terenkripsi untuk optimalisasi workflow.
          </p>
        </div>

        {/* ========================================================= */}
        {/* TACTICAL TABS                                             */}
        {/* ========================================================= */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 py-4 -mx-6 px-6 snap-x sticky top-[68px] z-30 bg-[#030712]/95 backdrop-blur-md border-b border-white/5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {categories.map(cat => (
            <button 
              key={cat} onClick={() => setActiveCat(cat)}
              className={`shrink-0 pb-3 text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 snap-center relative ${
                activeCat === cat ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
              {activeCat === cat && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              )}
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* MODULE LIST                                               */}
        {/* ========================================================= */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-3 pt-6 pb-10">
            {filteredTools.map(tool => (
              <TacticalCard key={tool.id} tool={tool} />
            ))}
            
            {filteredTools.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-black border border-dashed border-white/20">
                   <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">ERR: MODULE NOT FOUND</span>
                </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL / POP-UP SECURITY LOGIC (ZERO DATA STORAGE)         */}
      {/* ========================================================= */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in touch-none">
           {/* Background Click untuk Close */}
           <div className="absolute inset-0" onClick={() => setIsSecurityModalOpen(false)}></div>
           
           {/* Modal Box */}
           <div className="relative w-full max-w-sm bg-[#050b14] border border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)] rounded-2xl overflow-hidden z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
              
              {/* Header Modal */}
              <div className="bg-emerald-950/50 border-b border-emerald-500/30 px-5 py-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <AppIcons.Shield />
                    <span className="text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase">Security Protocol</span>
                 </div>
                 <button onClick={() => setIsSecurityModalOpen(false)} className="text-emerald-500 hover:text-white transition-colors text-xs font-black">
                    [ X ]
                 </button>
              </div>

              {/* Isi Konten Modal */}
              <div className="p-5 sm:p-6 space-y-5">
                 <div className="space-y-1.5">
                    <h4 className="text-white text-xs font-black tracking-widest uppercase">1. Zero Data Storage</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Aplikasi ini beroperasi menggunakan <strong>Client-Side Logic</strong>. Artinya, seluruh data yang Anda masukkan (Nama, Invoice, Desain Canvas) <strong>TIDAK PERNAH</strong> dikirim atau disimpan di server kami.
                    </p>
                 </div>
                 <div className="space-y-1.5">
                    <h4 className="text-white text-xs font-black tracking-widest uppercase">2. Local Environment</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Semua proses *render*, kalkulasi, dan manipulasi AI dilakukan secara langsung di dalam *browser* HP/Laptop Anda. Privasi karya Anda 100% aman.
                    </p>
                 </div>
                 <div className="space-y-1.5">
                    <h4 className="text-white text-xs font-black tracking-widest uppercase">3. Cache Memory</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Data preferensi (seperti pengaturan Profil Global) hanya disimpan secara sementara di dalam <span className="text-emerald-400 font-mono">localStorage</span> perangkat Anda sendiri.
                    </p>
                 </div>
              </div>

              <div className="bg-black/50 px-6 py-4 border-t border-white/5">
                 <button onClick={() => setIsSecurityModalOpen(false)} className="w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/50 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors active:scale-95">
                    Acknowledge
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CSS CYBER GRID & ANIMATIONS                               */}
      {/* ========================================================= */}
      <style>{`
        .tactical-grid {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
