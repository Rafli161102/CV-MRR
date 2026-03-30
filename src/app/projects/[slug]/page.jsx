"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECT_LIST } from '../../../data/store';
import { notFound } from 'next/navigation';

// =========================================================================
// IKON SVG KUSTOM & MINIMALIS
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

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.327.196 2.348 1.358 2.348 2.694v5.034c0 1.336-1.02 2.498-2.348 2.694a48.067 48.067 0 01-4.222.388l-4.103 3.65a.75.75 0 01-1.247-.56V13.71a48.937 48.937 0 01-2.731-.273c-1.327-.196-2.348-1.358-2.348-2.694V5.465c0-1.336 1.02-2.498 2.348-2.694zM12 7a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 7zm-3.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018.5 7zm7 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
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
    <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#030712] selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Decor - Anti-Overflow Lock */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] bg-cyan-900/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[500px] bg-indigo-900/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* NAVIGASI KEMBALI                                          */}
        {/* ========================================================= */}
        <div className="mb-12 reveal stagger-1">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-500 group"
          >
            <ArrowLeftIcon />
            Kembali ke Galeri
          </Link>
        </div>

        {/* ========================================================= */}
        {/* HEADER AREA (GOLDEN RATIO 61.8 : 38.2)                    */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-20 sm:mb-28">
          
          {/* KIRI: Narasi Proyek */}
          <div className="w-full lg:w-[61.8%] reveal stagger-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black tracking-[0.25em] text-cyan-400 uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              {project.category}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-10 leading-[1.05] drop-shadow-2xl">
              {project.title}
            </h1>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">The Overview</span>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed sm:leading-loose font-medium">
                {project.description}
              </p>
            </div>
          </div>

          {/* KANAN: Metadata Glass Card */}
          <div className="w-full lg:w-[38.2%] reveal stagger-3">
            <div className="bg-[#0A1329]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-[50px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 pb-5 border-b border-white/5">
                Project Detail
              </h4>

              <div className="space-y-10 relative z-10">
                {/* Client Item */}
                <div className="flex items-center gap-6 group/item">
                  <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shrink-0 group-hover/item:bg-cyan-500/20 group-hover/item:border-cyan-500/40 transition-all duration-500">
                    <ClientIcon />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1.5">Company</p>
                    <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight italic">
                      {project.company || "Internal Project"}
                    </p>
                  </div>
                </div>

                {/* Role Item */}
                <div className="flex items-center gap-6 group/item">
                  <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shrink-0 group-hover/item:bg-cyan-500/20 group-hover/item:border-cyan-500/40 transition-all duration-500">
                    <RoleIcon />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1.5">My Role</p>
                    <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight italic">
                      {project.role || "Lead Visual Designer"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Eksekusi visual berbasis strategi identitas merek dan riset pasar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* GALLERY AREA (OTOMATIS LOOPING)                            */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-12 sm:gap-20">
          {imagesToShow.map((imgUrl, index) => (
            <div 
              key={index}
              className={`reveal stagger-4 w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 bg-[#050A14] shadow-2xl transition-all duration-1000 hover:shadow-cyan-500/5`}
            >
              <img 
                src={imgUrl} 
                alt={`${project.title} Preview ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-[2s] hover:scale-[1.02]"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'; }}
              />
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* RE-VAMP CTA: PUNYA VISI SERUPA?                           */}
        {/* ========================================================= */}
        <div className="mt-32 sm:mt-48 reveal stagger-5">
          <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-[#0A1329]/80 backdrop-blur-3xl rounded-[3rem]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-600/20 transition-all duration-1000"></div>

            <div className="relative z-10 px-8 py-12 sm:p-16 flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                Punya Visi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Serupa?</span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-400 max-w-xl leading-relaxed mb-10 font-medium">
                Saya siap membantu Anda menerjemahkan ide menjadi identitas visual yang strategis, estetis, dan berdampak nyata bagi bisnis Anda.
              </p>
              
              <a 
                href={`https://wa.me/6285155020363?text=${encodeURIComponent(`Halo Rafli, saya telah melihat proyek ${project.title} dan tertarik untuk berdiskusi lebih lanjut.`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-3 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:-translate-y-1 active:scale-95"
              >
                <div className="absolute inset-0 rounded-2xl bg-cyan-400 animate-ping opacity-20 group-hover/btn:opacity-40 transition-opacity"></div>
                <ChatIcon />
                <span className="tracking-wide">Mulai Diskusi Sekarang</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}