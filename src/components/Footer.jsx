"use client";

import Link from 'next/link';

// =========================================================================
// IKON SVG KUSTOM, UNIK, & RESMI
// =========================================================================
const DiamondSparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
    <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25c.343.186.343.682 0 .868l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-.868l9.75-5.25z" />
    <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.129-8.425 4.536a.75.75 0 01-.712 0l-8.425-4.536zM3.265 13.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.129-8.425 4.536a.75.75 0 01-.712 0l-8.425-4.536z" opacity="0.4" />
    <path d="M12 21.75a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM18.75 12a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM5.25 12a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const WhatsAppSmallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
);

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] relative z-20 overflow-hidden mt-12 border-t border-white/5">
      
      {/* Background Glow Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-8 relative z-10">
        
        {/* ========================================================= */}
        {/* BANNER APRESIASI (GOLDEN RATIO LAYOUT)                      */}
        {/* ========================================================= */}
        <div className="mb-24 p-8 sm:p-10 lg:p-12 rounded-[2rem] bg-gradient-to-br from-[#0A1329]/80 via-[#060D1F] to-[#030712] backdrop-blur-xl border border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(6,182,212,0.1)] transition-all duration-700 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 group relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-700"></div>

          {/* KIRI: 61.8% */}
          <div className="w-full lg:w-[61.8%] flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 z-10 lg:pr-10">
            <div className="p-4 bg-cyan-950/40 rounded-2xl border border-cyan-500/30 shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:bg-cyan-900/50 transition-all duration-500 flex items-center justify-center">
              <DiamondSparkleIcon />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">Dukung Perjalanan Kreatif Ini</h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                Jika {' '}
                {/* TEKS DENGAN EFEK GLOW & GRADIENT */}
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                  Ekosistem Toolkit Gratis
                </span>
                {' '} atau hasil karya desain saya telah memberikan nilai tambah untuk Anda, pertimbangkan untuk memberikan apresiasi. Dukungan Anda adalah bahan bakar utama untuk pemeliharaan server dan komunitas AquaNime.
              </p>
            </div>
          </div>
          
          {/* KANAN: 38.2% */}
          <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end z-10">
            <a 
              href="https://saweria.co/mrr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 tracking-wide"
            >
              Beri Apresiasi
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

        </div>

        {/* ========================================================= */}
        {/* LINK FOOTER UTAMA                                         */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 mb-20 relative z-10">
          
          <div className="w-full lg:w-[61.8%] pr-0 lg:pr-20">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-4xl font-black tracking-tighter text-white">
                MRR<span className="text-cyan-500 group-hover:text-white transition-colors">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
              Menerjemahkan imajinasi menjadi realitas visual. Fokus pada pembuatan identitas merek yang presisi, estetis, dan strategis melalui desain grafis dan teknologi web.
            </p>
          </div>

          <div className="w-full lg:w-[38.2%] grid grid-cols-2 gap-8 sm:gap-12">
            
            {/* Kolom Navigasi */}
            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 flex items-center gap-2 opacity-80">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Navigasi
              </h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><Link href="/projects" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">Portofolio</Link></li>
                <li><Link href="/photography" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">Fotografi</Link></li>
                <li><Link href="/about" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">Tentang Saya</Link></li>
                
                {/* LINK TOOLKIT DENGAN ANIMASI PING & GLOW */}
                <li className="pt-1">
                  <Link href="/toolkit" className="group flex items-center gap-2 w-fit">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/50 overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-cyan-400/30 animate-ping"></div>
                      <BoltIcon />
                    </div>
                    <span className="font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                      Toolkit Ekosistem
                    </span>
                  </Link>
                </li>

              </ul>
            </div>

            {/* Kolom Kontak */}
            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6 flex items-center gap-2 opacity-80">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Kontak
              </h4>
              <ul className="space-y-5 text-sm text-slate-400 font-medium">
                <li>
                  <a href="mailto:hello@mrr.my.id" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                    <span className="p-2 rounded-full bg-[#0A1329] border border-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all shadow-inner">
                      <MailIcon />
                    </span>
                    hello@mrr.my.id
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/6285155020363" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                    <span className="p-2 rounded-full bg-[#0A1329] border border-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all shadow-inner">
                      <WhatsAppSmallIcon />
                    </span>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* COPYRIGHT & SOCIAL MEDIA                                  */}
        {/* ========================================================= */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] sm:text-xs text-slate-500 font-medium relative z-10">
          <p>© {currentYear} Muhammad Rafli Ramadhan. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-8">
            <a href="https://instagram.com/img_ischeznut.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 uppercase tracking-widest transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/muhammad-rafli-ramadhan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 uppercase tracking-widest transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}