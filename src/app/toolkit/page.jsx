"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard'; // Asumsi komponen ini sudah ada

// =========================================================================
// IKON SVG PREMIUM & RINGKAS (UNTUK MOBILE HEADER)
// =========================================================================
const AppIcons = {
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296a3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043a3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296a3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043a3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
  Zap: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.8 18.525a3.375 3.375 0 002.456 2.456L20.25 21.75l.259-1.036a3.375 3.375 0 002.456-2.456L24 18l-1.036-.259a3.375 3.375 0 00-2.456-2.456L20.25 14.25l-.259 1.036a3.375 3.375 0 00-2.456 2.456L16.8 18l1.036.259z" /></svg>
};

export default function ToolkitPage() {
  const categories = [...new Set(toolkits.map(tool => tool.category))];
  const flagshipTool = toolkits.find(tool => tool.id === 'css-studio');

  return (
    <div className="min-h-screen pb-32 relative overflow-x-hidden bg-[#030712] font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* ========================================================= */}
      {/* DECORATIVE GLOW BACKGROUNDS (PERPETUAL)                    */}
      {/* ========================================================= */}
      <div className="fixed top-0 right-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-cyan-950/15 rounded-full blur-[120px] md:blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-indigo-950/15 rounded-full blur-[120px] md:blur-[140px] pointer-events-none z-0"></div>

      {/* ========================================================= */}
      {/* STICKY MOBILE APP HEADER (ALA NATIVE PWA)                 */}
      {/* ========================================================= */}
      <div className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 md:px-12 md:py-5 mb-8 md:mb-16">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter italic">MRR <span className="text-cyan-500 uppercase not-italic text-sm ml-1 tracking-widest font-extrabold">Toolkit</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Eco-System Lab v2.1</p>
          </div>
          
          {/* Mobile Quick Stats (Golden Ratio spacing) */}
          <div className="flex items-center gap-2 md:gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 shadow-inner">
                <AppIcons.Shield />
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider hidden xs:block">Secure</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 shadow-inner">
                <AppIcons.Zap />
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider hidden xs:block">{toolkits.filter(t=>t.status==='active').length} Active</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SECTION (COMPACT UNTUK MOBILE)                        */}
        {/* ========================================================= */}
        <div className="mb-12 md:mb-20 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 md:mb-6 leading-[1.1]">
            Senjata Rahasia <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Pekerja Kreatif.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl font-medium">
            Kumpulan <span className="text-white">Micro-SaaS & Utilitas Client-Side</span> profesional untuk mempercepat workflow desain dan branding Anda.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FEATURED FLAGSHIP: DEV VISUAL STUDIO (APP-LIKE CARD)       */}
        {/* ========================================================= */}
        {flagshipTool && (
          <div className="mb-16 md:mb-24 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <AppIcons.Sparkles />
              <h3 className="text-[11px] font-black text-amber-400 uppercase tracking-[0.3em] italic">Featured Flagship Studio</h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-amber-500/30 to-transparent"></div>
            </div>

            <Link href={flagshipTool.link} className="group relative flex flex-col sm:flex-row gap-6 p-6 md:p-8 bg-gradient-to-br from-[#0a0f1c] to-[#050505] border border-cyan-500/30 hover:border-cyan-400 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] active:scale-[0.98]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[70px]"></div>
              
              {/* Icon (Golden Ratio padding) */}
              <div className="w-16 h-16 shrink-0 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-3 transition-transform duration-500 border border-cyan-400/20">
                 <div className="w-8 h-8 text-white">{flagshipTool.icon}</div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[8px] font-black tracking-widest uppercase rounded">✨ AI Hybrid</span>
                  <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[8px] font-black tracking-widest uppercase rounded">Enterprise</span>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors tracking-tight truncate">{flagshipTool.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                  {flagshipTool.description}
                </p>
              </div>

              {/* Action Arrow (Mobile-First touch target) */}
              <div className="self-end sm:self-center flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest group-hover:gap-4 transition-all bg-[#0d1424] px-4 py-2.5 rounded-xl border border-[#1f1f1f] shadow-inner active:bg-cyan-950/30">
                Buka <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </div>
            </Link>
          </div>
        )}

        {/* ========================================================= */}
        {/* CATEGORIES GRID (MOBILE OPTIMIZED SPACING)                */}
        {/* ========================================================= */}
        <div className="space-y-20 md:space-y-28">
          {categories.map((category, catIndex) => {
            const categoryTools = toolkits.filter(tool => tool.category === category && tool.id !== 'css-studio');
            if (categoryTools.length === 0) return null;
            return (
              <div key={category} className="animate-slide-up" style={{ animationDelay: `${0.2 + catIndex * 0.1}s` }}>
                
                {/* Visual Category Header (Ala App Menu) */}
                <div className="flex items-center gap-4 mb-8 md:mb-10">
                    <div className="w-1 h-7 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)]"></div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase italic">{category}</h2>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
                    <span className="text-[9px] font-bold text-slate-600 tracking-wider hidden xs:block">{categoryTools.length} Tools</span>
                </div>

                {/* Toolkit Grid (Rapat di Mobile, Lega di Desktop) */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                  {categoryTools.map((tool) => (
                    // Asumsi ToolCard sudah Mobile-Friendly
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* FOOTER CTA (APP-LIKE BOTTOM PANEL)                        */}
        {/* ========================================================= */}
        <div className="mt-32 md:mt-40 pt-16 md:pt-20 border-t border-white/5 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#050B18] rounded-3xl p-8 md:p-12 border border-white/5 shadow-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Butuh Toolkit Baru?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">Ekosistem ini terus tumbuh berdasarkan kebutuhan komunitas AquaNime. Jika Anda punya ide, mari diskusikan.</p>
              <a href="https://wa.me/6285155020363" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-tr from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
                 Ajukan via WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
            
            <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 shadow-inner relative z-10">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Community Guide</h4>
              <ul className="space-y-3 text-xs text-slate-400 list-none pl-0 font-medium leading-relaxed">
                <li className="flex gap-2.5 items-start"><span className="text-cyan-500">●</span> Simpan halaman ini sebagai Bookmark untuk akses cepat.</li>
                <li className="flex gap-2.5 items-start"><span className="text-cyan-500">●</span> Seluruh data diinput aman karena menggunakan Client-Side Logic.</li>
                <li className="flex gap-2.5 items-start"><span className="text-cyan-500">●</span> Update berkala bisa dicek di Instagram @img_ischeznut.jpg</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* CUSTOM CSS UNTUK ANIMASI HANYA DI MOBILE                  */}
      {/* ========================================================= */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Smooth Slide Up Animation */
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Breakpoint khusus XS (Extra Small Mobile) */
        @media (min-width: 420px) { .xs\:block { display: block !important; } .xs\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </div>
  );
}
