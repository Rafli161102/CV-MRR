"use client";

import Link from 'next/link';
import { PROJECT_LIST } from '../data/store';

export default function Home() {
  // Mengambil 3 karya pertama dari store.js untuk dipajang di Beranda
  const featuredProjects = PROJECT_LIST.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* =========================================================================
         BACKGROUND CYBER SPACE FX
         ========================================================================= */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>
      
      {/* Orbs Sinar Cyan Melayang */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* =========================================================================
             HERO SECTION (SAPAAN UTAMA)
             ========================================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 min-h-[70vh]">
            
            {/* Bagian Teks (Kiri) */}
            <div className="w-full lg:w-[61.8%] flex flex-col justify-center text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-[#0A1329]/80 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 self-center lg:self-start shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                Graphic Designer & Founder
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-[5rem] font-black tracking-tighter text-white mb-8 leading-[1.1] drop-shadow-2xl">
                Menciptakan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Visual Epik
                </span> <br />
                Yang Beresonansi.
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
                Halo, saya Rafli. Membantu brand dan entitas mencapai potensi maksimalnya melalui identitas visual yang presisi, estetis, dan strategis.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link href="/projects" className="w-full sm:w-auto px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 tracking-wide text-center">
                  Lihat Karya Terbaik
                </Link>
                <Link href="/about" className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-bold rounded-full transition-all tracking-wide text-center group">
                  Kenali Lebih Jauh <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </div>

            {/* Bagian Visual (Kanan) - Golden Ratio Frame */}
            <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                {/* Efek Bingkai Cyber Melayang */}
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
                <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Foto Profil Utama */}
                <div className="absolute inset-8 rounded-full overflow-hidden bg-[#0A1329] border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/profile.jpg" 
                    alt="M. Rafli Ramadhan" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }}
                  />
                </div>
                
                {/* Lencana AquaNime */}
                <div className="absolute -bottom-4 -right-4 bg-[#0A1329] p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Founder of</div>
                  <div className="text-lg font-black text-cyan-400">AquaNime.</div>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
             SEKILAS KARYA (FEATURED PROJECTS)
             ========================================================================= */}
          <div className="mt-40 pt-20 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Mahakarya <span className="text-cyan-500">Terpilih</span></h2>
                <p className="text-slate-400 text-lg">Sekilas cuplikan dari portofolio terbaru saya.</p>
              </div>
              <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase text-sm group flex items-center gap-2 transition-all">
                Lihat Semua <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProjects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id} className="group flex flex-col h-full bg-[#0A1329]/80 backdrop-blur-sm p-6 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0D1836] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500">
                  <div className="relative aspect-[1.618/1] rounded-[1.5rem] overflow-hidden bg-[#060D1F] mb-6 border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                  </div>
                  <div className="px-2 pb-2">
                    <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
