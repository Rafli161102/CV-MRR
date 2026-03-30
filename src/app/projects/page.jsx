"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PROJECT_LIST } from '../../data/store';

// =========================================================================
// IKON SVG PROFESIONAL (Untuk Kategori & UI Utama)
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

// Fungsi Pemetaan Ikon Kategori Dinamis
const getCategoryIcon = (categoryName) => {
  const baseClass = "w-4 h-4";
  switch (categoryName) {
    case 'All':
      // Grid Icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
    case 'Brand Identity':
      // Star/Badge Icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
    case 'Packaging Design':
      // Cube Icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
    case 'Print Design':
      // Printer/Doc Icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.92-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>;
    case 'Social Media Design':
      // Mobile Device Icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>;
    case 'Community Design':
      // Users Group Icon
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>;
    default:
      // Default Icon (Chevron) jika ada kategori baru
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
  }
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Mengambil kategori unik
  const categories = ['All', ...new Set(PROJECT_LIST.map(project => project.category))];

  // Filter data berdasarkan kategori
  const filteredProjects = activeCategory === 'All' 
    ? PROJECT_LIST 
    : PROJECT_LIST.filter(project => project.category === activeCategory);

  return (
    // FIX OVERFLOW: w-full overflow-x-hidden ditambahkan secara eksplisit
    <div className="min-h-screen pt-32 pb-24 relative w-full overflow-x-hidden bg-[#030712]">
      
      {/* Background Decor (Fixed Width mencegah melar) */}
      <div className="fixed top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="fixed bottom-0 left-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full px-5 sm:px-8 lg:px-12">
        
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
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
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
        {/* FILTER KATEGORI (MODERN SWIPEABLE MENU & IKON DINAMIS)    */}
        {/* ========================================================= */}
        <div className="mb-12 reveal stagger-3 relative w-full -mx-5 px-5 sm:mx-0 sm:px-0">
          
          <div className="flex items-center gap-4 mb-5 hidden sm:flex">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Filter Kategori</h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          {/* Fading Edge di Mobile untuk indikator bisa di-swipe */}
          <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none z-10 sm:hidden"></div>

          {/* Wrapper Scroll Horizontal (Sembunyikan Scrollbar) */}
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group flex items-center gap-2.5 shrink-0 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-300 border snap-center ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                    : 'bg-[#0A1329] text-slate-400 border-white/5 hover:border-cyan-500/40 hover:bg-[#0d1a38]'
                }`}
              >
                {/* Ikon Kategori */}
                <span className={`${activeCategory === category ? 'text-white' : 'text-cyan-500 group-hover:text-cyan-400'} transition-colors`}>
                  {getCategoryIcon(category)}
                </span>
                
                {/* Teks Kategori (Mengubah All menjadi Semua Karya) */}
                <span className="whitespace-nowrap">
                  {category === 'All' ? 'Semua Karya' : category}
                </span>
              </button>
            ))}
            {/* Spacing ekstra di kanan agar item terakhir tidak menempel pinggir di layar HP */}
            <div className="w-2 shrink-0 sm:hidden"></div>
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