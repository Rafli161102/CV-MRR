"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECT_LIST } from '../../../data/store';
import { notFound } from 'next/navigation';

// =========================================================================
// IKON SVG PROFESIONAL RAMPING
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

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
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
    // FIX OVERFLOW ABSOLUTE: w-full dan overflow-x-hidden pada level root
    <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#030712]">
      
      {/* Background Decor - Dikunci agar tidak bocor ke luar viewport */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[500px] bg-cyan-900/10 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[500px] bg-indigo-900/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* Navigasi Kembali */}
        <div className="mb-10 reveal stagger-1">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0A1329]/50 backdrop-blur-sm border border-white/5 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-[#0A1329] shadow-lg transition-all duration-300 group"
          >
            <ArrowLeftIcon />
            Kembali
          </Link>
        </div>

        {/* HEADER: GOLDEN RATIO 61.8 : 38.2 */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
          
          {/* KIRI (61.8%): Konten Narasi */}
          <div className="w-full lg:w-[61.8%] reveal stagger-2">
            <div className="inline-flex items-center gap-2 text-[8px] sm:text-[9px] font-black tracking-[0.3em] text-cyan-400 uppercase mb-4 sm:mb-6 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
              {project.category}
            </div>
            
            {/* TEMA FONT: Menyesuaikan halaman utama (Gradient Text yang Mewah) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tighter mb-8 sm:mb-10 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg">
              {project.title}
            </h1>
            
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-white/10 pb-3">
                Latar Belakang Proyek
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed sm:leading-loose font-medium">
                {project.description}
              </p>
            </div>
          </div>

          {/* KANAN (38.2%): Metadata Ringkas */}
          <div className="w-full lg:w-[38.2%] reveal stagger-3">
            <div className="bg-gradient-to-br from-[#0A1329] to-[#030712] border border-cyan-500/10 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <div className="space-y-8 relative z-10">
                {/* Klien */}
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-cyan-950/40 rounded-2xl border border-cyan-500/20 shrink-0 shadow-inner group-hover:bg-cyan-900/50 transition-colors">
                    <ClientIcon />
                  </div>
                  <div>
                    <p className="text-[9px] text-cyan-400/70 uppercase tracking-widest font-bold mb-1">Client / Company</p>
                    <p className="text-xs sm:text-sm font-bold text-white">{project.company || "Personal Project"}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-cyan-950/40 rounded-2xl border border-cyan-500/20 shrink-0 shadow-inner group-hover:bg-cyan-900/50 transition-colors">
                    <RoleIcon />
                  </div>
                  <div>
                    <p className="text-[9px] text-cyan-400/70 uppercase tracking-widest font-bold mb-1">My Role</p>
                    <p className="text-xs sm:text-sm font-bold text-white">{project.role || "Lead Visual Designer"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-500 italic leading-relaxed">
                  Proyek ini dikembangkan dengan pendekatan <span className="text-slate-400 font-semibold">User-Centered Design</span> untuk hasil visual maksimal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY AREA: Cinematic & Staggered dengan Efek 3D Hover */}
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
          {imagesToShow.map((imgUrl, index) => (
            <div 
              key={index}
              className={`reveal stagger-4 w-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#050A14] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:shadow-[0_30px_60px_rgba(6,182,212,0.15)] group`}
            >
              <img 
                src={imgUrl} 
                alt={`${project.title} View ${index + 1}`}
                // Menambahkan sedikit rotasi saat di-hover untuk kesan dinamis
                className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:rotate-1 origin-center"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'; }}
              />
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* BANNER CTA MEWAH (Menggantikan CTA Lama yang Kaku)        */}
        {/* ========================================================= */}
        <div className="mt-24 sm:mt-32 reveal stagger-5">
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0A1329] to-[#030712] border border-cyan-500/20 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-cyan-500/40 transition-colors duration-500">
            
            {/* Glow Latar CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] -z-10"></div>

            <div className="text-center md:text-left z-10 w-full md:w-[61.8%]">
              <h4 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">Punya Visi Serupa?</h4>
              <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed mx-auto md:mx-0">
                Mari wujudkan identitas visual yang <span className="text-cyan-400 font-semibold drop-shadow-md">strategis dan berdampak nyata</span> untuk entitas bisnis Anda bersama saya.
              </p>
            </div>

            <div className="z-10 w-full md:w-auto flex justify-center md:justify-end shrink-0">
              <a 
                href={`https://wa.me/6285155020363?text=${encodeURIComponent(`Halo Rafli, saya tertarik berdiskusi mengenai proyek ${project.title}.`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                // Desain Tombol Action Premium
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#030712] font-black text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] flex items-center justify-center gap-3 hover:-translate-y-1 whitespace-nowrap"
              >
                <WhatsAppIcon />
                Mulai Diskusi
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}