"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';

// =========================================================================
// UI COMPONENTS UNTUK TAMPILAN ALA NATIVE APP
// =========================================================================

const CategoryTab = ({ title, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 border-2 ${
      isActive 
      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
      : 'bg-[#0a0a0a] text-slate-500 border-[#1f1f1f] active:scale-95'
    }`}
  >
    {title}
  </button>
);

const MiniToolCard = ({ tool }) => (
  <Link href={tool.link} className="group relative flex items-center gap-4 p-4 bg-[#0a0f1c] border border-white/5 rounded-2xl active:scale-[0.97] transition-all shadow-lg">
    {/* Icon Wrapper */}
    <div className="w-12 h-12 shrink-0 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors border border-white/5 shadow-inner">
      {tool.icon}
    </div>
    
    {/* Info */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h3 className="text-sm font-bold text-white truncate">{tool.title}</h3>
        {tool.isPremium && (
          <span className="text-[7px] font-black bg-amber-500 text-black px-1.5 py-0.5 rounded-sm uppercase">PRO</span>
        )}
      </div>
      <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">{tool.description}</p>
    </div>

    {/* Arrow */}
    <div className="text-slate-700 group-hover:text-cyan-500 transition-colors px-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  </Link>
);

export default function ToolkitPage() {
  const [activeCat, setActiveCat] = useState('All');
  const categories = ['All', ...new Set(toolkits.map(tool => tool.category))];
  
  const filteredTools = activeCat === 'All' 
    ? toolkits 
    : toolkits.filter(tool => tool.category === activeCat);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32">
      
      {/* APP HEADER */}
      <div className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight italic">MRR <span className="text-cyan-500 uppercase not-italic text-sm ml-1 tracking-widest">Toolkit</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Ecosystem Lab v2.0</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-400"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        
        {/* HORIZONTAL CATEGORY SCROLL */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 py-6 -mx-6 px-6 snap-x touch-pan-x">
          {categories.map(cat => (
            <CategoryTab 
              key={cat} 
              title={cat} 
              isActive={activeCat === cat} 
              onClick={() => setActiveCat(cat)}
            />
          ))}
        </div>

        {/* FLAGSHIP FEATURE (DIBUAT LEBIH MEWAH) */}
        {activeCat === 'All' && (
          <div className="mb-10 anim-fade-in">
             <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-4 block">Recommended Studio</span>
             <Link href="/css-studio" className="block relative group overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 p-[1px] shadow-[0_15px_30px_rgba(6,182,212,0.2)]">
                <div className="bg-[#050b14] rounded-[calc(1.5rem-1px)] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
                    </div>
                    <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-black px-2 py-1 rounded border border-cyan-500/20 uppercase tracking-widest">AI Power</span>
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">Dev Visual Studio</h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">Laboratorium desain hibrida untuk membangun komponen UI secara visual dengan bantuan AI.</p>
                </div>
             </Link>
          </div>
        )}

        {/* GRID UTAMA - MINI CARDS */}
        <div className="space-y-4">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">
            {activeCat === 'All' ? 'Semua Peralatan' : `Kategori: ${activeCat}`}
          </span>
          
          <div className="grid grid-cols-1 gap-3">
            {filteredTools.map(tool => (
              tool.id !== 'css-studio' && <MiniToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* FEEDBACK BUTTON */}
        <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 text-center">
           <h4 className="text-sm font-bold text-white mb-2">Butuh Tool Lain?</h4>
           <p className="text-[11px] text-slate-500 mb-5 leading-relaxed">Punya ide aplikasi micro-SaaS yang bisa mempermudah kerjaan kita? Mari diskusikan.</p>
           <a href="https://wa.me/6285155020363" className="inline-block px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl active:scale-95 transition-all">Hubungi Arsitek</a>
        </div>

      </div>

      {/* STYLE KHUSUS HIDE SCROLLBAR */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .anim-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
