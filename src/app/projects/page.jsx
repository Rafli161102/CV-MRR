"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PROJECT_LIST } from '../../data/store';

// =========================================================================
// IKON SVG PROFESIONAL
// =========================================================================
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(PROJECT_LIST.map(project => project.category))];

  const filteredProjects = activeCategory === 'All' 
    ? PROJECT_LIST 
    : PROJECT_LIST.filter(project => project.category === activeCategory);

  return (
    // FIX UTAMA: overflow-hidden di root div untuk membunuh semua potensi layar melar di HP
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#030712]">
      
      {/* Background Decor (Posisi aman di dalam pembungkus overflow-hidden) */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* HEADER SECTION (GOLDEN RATIO 61.8 : 38.2)                 */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20 items-start">
          
          <div className="w-full lg:w-[61.8%] reveal stagger-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Galeri Mahakarya
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
              Eksplorasi <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Visual & Identitas.</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Kumpulan arsip proyek desain komersial dan komunitas. Setiap karya dirancang dengan pendekatan strategis untuk memecahkan masalah komunikasi visual.
            </p>
          </div>

          <div className="w-full lg:w-[38.2%] reveal stagger-2 mt-2 lg:mt-0">
            <div className="bg-gradient-to-br from-[#0A1329] to-[#030712] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 sm:p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5 shrink-0">
                  <FolderIcon />
                </div>
                <div>
                  <h3 className="text-white font-black text-3xl sm:text-4xl">{PROJECT_LIST.length}</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Arsip</p>
                </div>
              </div>

              <div className="pt-5 border-t border-white/5 flex items-start gap-3">
                <div className="mt-0.5"><SparklesIcon /></div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed italic">
                  "Desain yang baik tidak hanya terlihat indah, tetapi harus mampu berbicara dan menyelesaikan masalah."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* FILTER KATEGORI (DESAIN CHIP/PILL PROFESIONAL)            */}
        {/* ========================================================= */}
        <div className="mb-12 reveal stagger-3">
          
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Filter Kategori</h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-[#030712] shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-105'
                }`}
              >
                {/* Latar Belakang Tombol yang Lebih Mewah */}
                {activeCategory === category ? (
                  <span className="absolute inset-0 bg-cyan-400 rounded-full"></span>
                ) : (
                  <span className="absolute inset-0 bg-[#0A1329] border border-white/10 rounded-full group-hover:border-cyan-500/50 transition-colors"></span>
                )}
                
                {/* Ubah kata 'All' agar panjang karakternya imbang dengan kategori lain */}
                <span className="relative z-10">
                  {category === 'All' ? 'Semua Karya' : category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* GRID PORTOFOLIO                                           */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const staggerDelay = index < 5 ? `stagger-${index + 4}` : 'stagger-7';
            
            return (
              <Link 
                href={`/projects/${project.id}`} 
                key={project.id} 
                className={`reveal ${staggerDelay} group relative rounded-[2rem] overflow-hidden bg-[#0A1329] border border-white/5 hover:border-cyan-500/40 transition-all duration-500 shadow-lg hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] flex flex-col h-full`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#050A14]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1329] via-transparent to-transparent opacity-90"></div>
                </div>
                
                <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10 -mt-8">
                  <div className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3 bg-[#0A1329] border border-cyan-500/20 px-3 py-1.5 rounded-full w-fit shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    {project.category}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2 leading-snug">
                    {project.title}
                  </h3>
                  
                  {project.client && (
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">
                      Klien: {project.client}
                    </p>
                  )}
                  
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mt-auto">
                    {project.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 reveal stagger-4">
            <p className="text-slate-500 text-lg">Belum ada karya di kategori ini.</p>
          </div>
        )}

      </div>
    </div>
  );
}