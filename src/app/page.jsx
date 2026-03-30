"use client";

import Link from 'next/link';
import { PROJECT_LIST } from '../data/store';

// =========================================================================
// KOMPONEN IKON SVG MINIMALIS & PROFESIONAL
// =========================================================================
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ToolsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827M15.75 12.75l-2.456-2.456M7.102 18.324a3.75 3.75 0 01-5.304 0 3.75 3.75 0 010-5.304l6.187-6.187a3.75 3.75 0 015.304 0l2.455 2.456" />
  </svg>
);

export default function Home() {
  // Mengambil 3 karya pertama untuk fitur
  const featuredProjects = PROJECT_LIST.slice(0, 3);
  
  // Kontak
  const whatsappNumber = "6285155020363"; 
  const waMessage = "Halo Rafli, saya telah melihat portofolio Anda dan tertarik untuk berdiskusi mengenai proyek kolaborasi.";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* BACKGROUND EFFECTS (Lebih Halus & Clean) */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-cyan-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-900/10 rounded-full blur-[150px]"></div>
        {/* Grid pattern overlay untuk kesan technical/design */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* ========================================================= */}
          {/* HERO SECTION (GOLDEN RATIO: 61.8% & 38.2%) */}
          {/* ========================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 min-h-[75vh]">
            
            {/* KIRI: 61.8% (Tipografi & Informasi) */}
            <div className="w-full lg:w-[61.8%] flex flex-col justify-center text-center lg:text-left pr-0 lg:pr-12">
              
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
                <span className="w-8 h-[1px] bg-cyan-500 hidden sm:block"></span>
                <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                  Graphic Design & Community Development
                </span>
              </div>
              
              {/* Headline dengan kontras tinggi ala UI/UX Trend */}
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-lg">
                Menerjemahkan Ide <br className="hidden lg:block" />
                Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Visual Epik.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Membantu entitas dan brand mencapai potensi maksimalnya melalui desain identitas yang presisi, estetis, serta pendekatan komunikasi yang strategis.
              </p>
              
              {/* TOMBOL CALL TO ACTION (Desain Mewah) */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                
                {/* Tombol Lihat & Download CV (Mengarah ke Halaman Auto-Generate) */}
                <Link 
                  href="/cv-print" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#030712] hover:bg-cyan-50 font-black rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 tracking-wide flex justify-center items-center gap-2 group"
                >
                  <DownloadIcon />
                  Lihat & Download CV
                </Link>

                {/* Tombol Diskusi WhatsApp */}
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-[#25D366] hover:bg-[#25D366]/10 text-white font-bold rounded-full transition-all tracking-wide flex justify-center items-center gap-2 group"
                >
                  <span className="text-[#25D366] group-hover:scale-110 transition-transform"><WhatsAppIcon /></span>
                  Mulai Diskusi
                </a>

              </div>
            </div>

            {/* KANAN: 38.2% (Visual Abstrak / Portret) */}
            <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end relative mt-8 lg:mt-0">
              {/* Desain bingkai Squircle modern untuk foto profil */}
              <div className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] lg:w-96 lg:h-[30rem] group">
                
                {/* Efek layer belakang yang offset */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-all duration-700 opacity-20 blur-sm"></div>
                <div className="absolute inset-0 border border-cyan-500/50 rounded-[2rem] -rotate-3 group-hover:-rotate-6 transition-all duration-700"></div>
                
                {/* Main Image Container */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-[#0A1329] shadow-2xl z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/profile.jpg" 
                    alt="Muhammad Rafli Ramadhan" 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 lg:-left-12 z-20 bg-[#0A1329]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Founder of</div>
                  <div className="text-xl font-black text-white flex items-center gap-2">
                    AquaNime <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* PROMO CV TOOLS (Banner Eksekutif Glassmorphism)           */}
          {/* ========================================================= */}
          <div className="mt-24 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0a152e] to-[#040914] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <div className="flex items-start gap-5 z-10">
                <div className="p-3 bg-cyan-900/30 border border-cyan-500/30 rounded-xl hidden sm:block">
                  <ToolsIcon />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-wide">HRD-Ready ATS CV Maker</h3>
                  <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                    Kesulitan membuat CV yang lolos seleksi mesin ATS? Saya merancang <i>tools</i> gratis ini untuk Anda. Tersedia mode terjemahan otomatis ke Inggris & standar Jepang (JIS).
                  </p>
                </div>
              </div>

              <Link href="/cv-maker" className="z-10 whitespace-nowrap px-6 py-3.5 bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-900/20 text-white font-bold rounded-xl transition-all flex items-center gap-3">
                Coba Tools Gratis
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BENTO GRID: KARYA TERPILIH                                */}
          {/* ========================================================= */}
          <div className="mt-32 pt-16 border-t border-white/5">
            
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Pilihan <span className="text-cyan-500">Mahakarya</span></h2>
                <p className="text-slate-400">Beberapa studi kasus desain dan identitas visual terbaik.</p>
              </div>
              <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase text-sm group flex items-center gap-2 transition-all border-b border-cyan-500/30 pb-1">
                Jelajahi Galeri <ArrowRightIcon />
              </Link>
            </div>

            {/* Layout Bento Grid (1 Item Besar, 2 Item Sedang) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Link 
                  href={`/projects/${project.id}`} 
                  key={project.id} 
                  // Logika Bento: Item pertama mengambil 2 kolom di layar besar
                  className={`group relative rounded-[2rem] overflow-hidden bg-[#0A1329] border border-white/5 hover:border-cyan-500/40 transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] 
                  ${index === 0 ? 'md:col-span-2 lg:col-span-2 aspect-video lg:aspect-auto lg:h-[400px]' : 'col-span-1 aspect-square lg:h-[400px]'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70 group-hover:opacity-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                  />
                  
                  {/* Gradient Overlay dari bawah untuk tulisan */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end">
                    <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2">
                      {project.category}
                    </div>
                    <h3 className={`font-bold text-white group-hover:text-cyan-300 transition-colors ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
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