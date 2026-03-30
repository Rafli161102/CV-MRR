"use client";

import Link from 'next/link';
import { PROJECT_LIST } from '../data/store';

// =========================================================================
// KOMPONEN IKON SVG MINIMALIS & PROFESIONAL
// =========================================================================
const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ToolsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827M15.75 12.75l-2.456-2.456M7.102 18.324a3.75 3.75 0 01-5.304 0 3.75 3.75 0 010-5.304l6.187-6.187a3.75 3.75 0 015.304 0l2.455 2.456" />
  </svg>
);

export default function Home() {
  const featuredProjects = PROJECT_LIST.slice(0, 3);
  const whatsappNumber = "6285155020363"; 
  const waMessage = "Halo Rafli, saya telah melihat portofolio Anda dan tertarik untuk berdiskusi mengenai proyek desain.";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white relative w-full overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* BACKGROUND EFFECTS (Aman dari Overflow)                   */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120vw] md:w-[50rem] h-[120vw] md:h-[50rem] bg-cyan-600/10 rounded-full blur-[100px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[100vw] md:w-[40rem] h-[100vw] md:h-[40rem] bg-indigo-600/10 rounded-full blur-[100px] md:blur-[150px]"></div>
        
        {/* Garis Vertikal Halus */}
        <div className="hidden md:block absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
        <div className="hidden md:block absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
      </div>

      {/* ========================================================= */}
      {/* KONTEN UTAMA                                              */}
      {/* ========================================================= */}
      <div className="relative z-10 pt-28 md:pt-36 pb-24 w-full">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          
          {/* ========================================================= */}
          {/* HERO SECTION (GOLDEN RATIO: 61.8% & 38.2%)                */}
          {/* ========================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0 min-h-[75vh] w-full">
            
            {/* KIRI: 61.8% */}
            <div className="w-full lg:w-[61.8%] flex flex-col justify-center text-center lg:text-left pr-0 lg:pr-12 z-20">
              
              <div className="anim-fade-in-up inline-flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
                <span className="text-slate-300 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                  Graphic Design & Community Development
                </span>
              </div>
              
              <h1 className="anim-fade-in-up anim-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-white mb-6 leading-[1.1] drop-shadow-lg break-words">
                Menerjemahkan <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600">Imajinasi</span> <br className="hidden lg:block" />
                Menjadi Realitas Visual.
              </h1>
              
              <p className="anim-fade-in-up anim-delay-200 text-sm sm:text-base md:text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Halo, saya Rafli. Membantu brand dan entitas mencapai potensi maksimalnya melalui desain identitas yang presisi, estetis, dan strategis.
              </p>
              
              <div className="anim-fade-in-up anim-delay-300 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <Link 
                  href="/cv-print" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#030712] hover:bg-cyan-50 font-black rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-1 tracking-wide flex justify-center items-center gap-2 group"
                >
                  <span className="group-hover:-translate-y-1 transition-transform duration-300"><DocumentIcon /></span>
                  Lihat CV Saya
                </Link>

                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-[#25D366] hover:bg-[#25D366]/10 text-white font-bold rounded-xl transition-all tracking-wide flex justify-center items-center gap-2 group hover:-translate-y-1"
                >
                  <span className="text-[#25D366] group-hover:scale-110 transition-transform"><WhatsAppIcon /></span>
                  Mulai Diskusi
                </a>
              </div>
            </div>

            {/* KANAN: 38.2% */}
            <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end relative mt-6 lg:mt-0 z-10">
              <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/5] group anim-float mx-auto lg:mx-0">
                
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-all duration-700 opacity-30 blur-xl"></div>
                <div className="absolute inset-0 border border-cyan-500/50 rounded-[2rem] -rotate-3 group-hover:-rotate-6 transition-all duration-700 z-0"></div>
                
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-[#0A1329] shadow-2xl z-10 border border-white/10">
                  <img 
                    src="/profile.jpg" 
                    alt="Muhammad Rafli Ramadhan" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90"></div>
                </div>
                
                <div className="absolute -bottom-5 left-[-10px] lg:-left-10 z-20 bg-[#0A1329]/90 backdrop-blur-xl p-3 sm:p-5 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Founder of</div>
                  <div className="text-base sm:text-xl font-black text-white flex items-center gap-2">
                    AquaNime <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
                  </div>
                </div>

                <div className="absolute -top-5 right-[-10px] lg:-right-8 z-20 bg-gradient-to-br from-cyan-600 to-blue-700 p-3 sm:p-4 rounded-2xl shadow-[0_10px_30px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform duration-300 flex items-center gap-2 sm:gap-3">
                  <div className="text-xl sm:text-3xl font-black text-white">3+</div>
                  <div className="text-[8px] sm:text-[10px] font-bold text-cyan-100 uppercase tracking-wider leading-tight">Years<br/>Experience</div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PROMO TOOLKIT ECOSYSTEM                                   */}
          {/* ========================================================= */}
          <div className="mt-32 w-full anim-fade-in-up anim-delay-300">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0a152e] to-[#050b1a] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] -z-10"></div>
              
              <div className="flex items-start gap-4 sm:gap-5 z-10 text-center md:text-left w-full md:w-auto flex-col sm:flex-row">
                <div className="p-3 bg-cyan-900/30 border border-cyan-500/30 rounded-2xl hidden md:block group-hover:scale-110 transition-transform duration-500 mx-auto sm:mx-0 shrink-0">
                  <ToolsIcon />
                </div>
                <div className="w-full">
                  <div className="text-cyan-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Micro-SaaS Buatan Saya</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">MRR Toolkit Ecosystem</h3>
                  <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mx-auto md:mx-0">
                    Kumpulan aplikasi web dan utilitas desain gratis. Mulai dari ATS CV Maker, generator tautan WhatsApp premium, hingga ekstraktor palet warna untuk mempercepat alur kerja kreatif Anda.
                  </p>
                </div>
              </div>

              <Link href="/toolkit" className="w-full md:w-auto z-10 whitespace-nowrap px-6 sm:px-8 py-3.5 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3 hover:-translate-x-1">
                Eksplorasi Toolkit
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BENTO GRID: KARYA TERPILIH                                */}
          {/* ========================================================= */}
          <div className="mt-32 pt-16 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6 w-full">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-500 rounded-sm rotate-45 shrink-0"></span>
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Portofolio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">Pilihan <span className="text-cyan-500">Mahakarya</span></h2>
              </div>
              <Link href="/projects" className="w-full sm:w-auto text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase text-[10px] sm:text-sm group flex items-center justify-between sm:justify-start gap-2 transition-all pb-1 border-b border-transparent hover:border-cyan-500/30">
                <span>Jelajahi Galeri</span>
                <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-[300px] sm:auto-rows-[350px] lg:auto-rows-[450px]">
              {featuredProjects.map((project, index) => (
                <Link 
                  href={`/projects/${project.id}`} 
                  key={project.id} 
                  className={`group relative rounded-3xl sm:rounded-[2rem] overflow-hidden bg-[#0A1329] border border-white/5 hover:border-cyan-500/40 transition-all duration-500 shadow-lg hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] 
                  ${index === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 lg:p-10 flex flex-col justify-end transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 sm:mb-3 bg-cyan-900/40 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-full w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                      {project.category}
                    </div>
                    <h3 className={`font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-2 ${index === 0 ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
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