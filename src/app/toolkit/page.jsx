"use client";

import React from 'react';
import Link from 'next/link';
import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

// =========================================================================
// IKON SVG PREMIUM UNTUK PRIVASI & TIPS
// =========================================================================
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export default function ToolkitPage() {
  const categories = [...new Set(toolkits.map(tool => tool.category))];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-x-hidden bg-[#030712]">
      
      {/* Decorative Background */}
      <div className="fixed top-0 right-0 w-[60vw] h-[60vw] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 items-start">
          
          {/* INFORMASI UTAMA */}
          <div className="w-full lg:w-[61.8%] animate-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              The Ecosystem
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
              Senjata Rahasia <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Pekerja Kreatif.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Eksplorasi kumpulan <span className="text-white">Micro-SaaS & Utilitas Digital</span> yang dirancang untuk menyederhanakan alur kerja desain, branding, dan komunitas.
            </p>
          </div>

          {/* PANEL PRIVASI */}
          <div className="w-full lg:w-[38.2%] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-br from-[#0A1329] to-[#030712] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5"><ShieldCheckIcon /></div>
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">Privasi Mutlak</h3>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Client-Side Logic</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1"><EyeSlashIcon /></div>
                  <p className="text-sm text-slate-400 leading-relaxed"><strong className="text-slate-200">Zero Data Storage:</strong> Informasi yang Anda input tetap berada di memori lokal browser Anda.</p>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1"><LockIcon /></div>
                  <p className="text-sm text-slate-400 leading-relaxed"><strong className="text-slate-200">Keamanan Enkripsi:</strong> Tidak ada transmisi data pribadi ke server manapun.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* FEATURED FLAGSHIP: DEV VISUAL STUDIO                      */}
        {/* ========================================================= */}
        <div className="mb-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Featured Flagship</h2>
            </div>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-amber-500/20 to-transparent"></div>
          </div>

          <Link href="/css-studio" className="group relative flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-br from-[#0a0f1c] to-[#050505] border border-cyan-500/30 hover:border-cyan-400 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]"></div>
            
            <div className="w-20 h-20 shrink-0 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black tracking-widest uppercase rounded-full">✨ AI Hybrid</span>
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[9px] font-black tracking-widest uppercase rounded-full">Enterprise</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors tracking-tight">Dev Visual Studio</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                Laboratorium desain tercanggih. Bangun komponen UI, tipografi interaktif, efek glassmorphism, hingga pixel art secara instan dengan bantuan asisten AI.
              </p>
            </div>

            <div className="self-end md:self-center flex items-center gap-3 text-xs font-black text-cyan-500 uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
              Buka Workspace 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </Link>
        </div>

        {/* CATEGORIES GRID */}
        <div className="space-y-32">
          {categories.map((category, catIndex) => {
            const categoryTools = toolkits.filter(tool => tool.category === category && tool.id !== 'css-studio');
            if (categoryTools.length === 0) return null;
            return (
              <div key={category} className="animate-slide-up" style={{ animationDelay: `${0.3 + catIndex * 0.1}s` }}>
                <div className="flex items-center gap-6 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase italic">{category}</h2>
                  </div>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-40 pt-20 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#050B18] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
            <div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Punya Ide Toolkit Baru?</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">Ekosistem ini terus tumbuh berdasarkan kebutuhan komunitas AquaNime. Jika Anda punya ide, mari diskusikan.</p>
              <a href="https://wa.me/6285155020363" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_20px_rgba(6,182,212,0.2)] active:scale-95">
                Ajukan Ide via WhatsApp
              </a>
            </div>
            <div className="bg-white/[0.02] rounded-[2rem] p-8 border border-white/5 shadow-inner">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Pro Tips & Guide</h4>
              <ul className="space-y-4 text-sm text-slate-400 list-none pl-0">
                <li className="flex gap-3 items-start"><span className="text-cyan-500">●</span> Simpan halaman ini sebagai Bookmark untuk akses cepat setiap hari.</li>
                <li className="flex gap-3 items-start"><span className="text-cyan-500">●</span> Seluruh data diinput aman karena menggunakan Client-Side Logic.</li>
                <li className="flex gap-3 items-start"><span className="text-cyan-500">●</span> Update berkala bisa dicek di Instagram <span className="text-white">@img_ischeznut.jpg</span></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
