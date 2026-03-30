"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECT_LIST } from '../../../data/store';
import { notFound } from 'next/navigation';

// =========================================================================
// IKON SVG PREMIUM & MINIMALIS
// =========================================================================
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ClientIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

const RoleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827M15.75 12.75l-2.456-2.456M7.102 18.324a3.75 3.75 0 01-5.304 0 3.75 3.75 0 010-5.304l6.187-6.187a3.75 3.75 0 015.304 0l2.455 2.456" />
  </svg>
);

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;

  const project = PROJECT_LIST.find((p) => p.id === slug);

  if (!project) {
    return notFound();
  }

  const imagesToShow = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#030712] selection:bg-cyan-500/30">
      
      {/* 🌌 ATMOSFER LATAR BELAKANG (Anti-Bocor) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] bg-cyan-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
        {/* Garis Grid Dekoratif Halus */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* 🔙 NAVIGASI KEMBALI */}
        <div className="mb-12 reveal stagger-1">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-500 group shadow-xl"
          >
            <ArrowLeftIcon />
            Back to Case Studies
          </Link>
        </div>

        {/* 📐 LAYOUT UTAMA: GOLDEN RATIO 61.8 : 38.2 */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-20 sm:mb-32">
          
          {/* 🖋️ BAGIAN KIRI (61.8%): NARASI VISUAL */}
          <div className="w-full lg:w-[61.8%] reveal stagger-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black tracking-[0.3em] text-cyan-400 uppercase mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              {project.category}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-10 leading-[1.05] drop-shadow-2xl">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className={i === project.title.split(' ').length - 1 ? "text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-cyan-500/50"></span>
                <h3 className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
                  The Challenge & Context
                </h3>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed sm:leading-loose font-medium max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* 📊 BAGIAN KANAN (38.2%): METADATA PREMIUM */}
          <div className="w-full lg:w-[38.2%] reveal stagger-3 lg:sticky lg:top-32">
            <div className="relative group">
              {/* Glow Behind Card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative bg-[#0A1329]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px]"></div>
                
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/5 flex justify-between items-center">
                  Project Insights
                  <span className="w-2 h-2 rounded-full bg-cyan-500/20 border border-cyan-500/50"></span>
                </h4>

                <div className="space-y-10">
                  {/* Klien */}
                  <div className="flex items-center gap-6 group/item">
                    <div className="p-4 bg-cyan-500/5 rounded-2xl border border-white/5 group-hover/item:border-cyan-500/30 transition-colors shrink-0 shadow-inner">
                      <ClientIcon />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1.5 opacity-60">Partner / Brand</p>
                      <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                        {project.company || "Independent Work"}
                      </p>
                    </div>
                  </div>

                  {/* My Role */}
                  <div className="flex items-center gap-6 group/item">
                    <div className="p-4 bg-cyan-500/5 rounded-2xl border border-white/5 group-hover/item:border-cyan-500/30 transition-colors shrink-0 shadow-inner">
                      <RoleIcon />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1.5 opacity-60">Primary Role</p>
                      <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                        {project.role || "Lead Visual Designer"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-slate-500 italic leading-relaxed text-center">
                    "Crafted with precision using the Golden Ratio principles for maximum visual impact."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 CINEMATIC GALLERY: STAGGERED DISPLAY */}
        <div className="flex flex-col gap-12 sm:gap-20">
          {imagesToShow.map((imgUrl, index) => (
            <div 
              key={index}
              className="reveal stagger-4 group relative w-full rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#050A14] shadow-2xl transition-all duration-1000 hover:shadow-cyan-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/40 z-10 pointer-events-none"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imgUrl} 
                alt={`${project.title} Perspective ${index + 1}`}
                className="w-full h-auto object-cover transform transition-transform duration-[2.5s] group-hover:scale-[1.03]"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop'; }}
              />
            </div>
          ))}
        </div>

        {/* 🚀 CALL TO ACTION (CTA) SECTION */}
        <div className="mt-32 sm:mt-48 py-20 px-8 rounded-[3rem] bg-gradient-to-b from-[#0A1329] to-transparent border-t border-white/5 text-center reveal stagger-5">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tighter">
              Let's Build Your <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#030712] selection:bg-cyan-500/30">Identity</span>.
            </h4>
            <p className="text-base sm:text-lg text-slate-400 mb-12 font-medium leading-relaxed">
              Saya siap membantu Anda mentransformasikan ide bisnis menjadi sebuah identitas merek yang memiliki nilai jual tinggi dan strategi visual yang solid.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={`https://wa.me/6285155020363?text=${encodeURIComponent(`Halo Rafli, saya telah melihat proyek ${project.title} dan tertarik untuk bekerja sama.`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-[#030712] font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-1"
              >
                Mulai Diskusi Proyek
              </a>
              <Link href="/projects" className="text-slate-400 hover:text-white font-bold text-sm transition-colors border-b border-white/10 pb-1">
                Explore Other Works
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}