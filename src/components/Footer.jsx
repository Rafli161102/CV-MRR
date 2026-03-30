"use client";

import Link from 'next/link';

// =========================================================================
// IKON SVG KUSTOM, UNIK, & RESMI (Didesain Khusus tanpa Ikon Bawaan)
// =========================================================================
const DiamondSparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0 text-cyan-400 group-hover:animate-pulse">
    <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25c.343.186.343.682 0 .868l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-.868l9.75-5.25z" />
    <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.129-8.425 4.536a.75.75 0 01-.712 0l-8.425-4.536zM3.265 13.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.129-8.425 4.536a.75.75 0 01-.712 0l-8.425-4.536z" opacity="0.5" />
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-16 pb-8 relative z-20 overflow-hidden">
      
      {/* Background Glow Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* BANNER DUKUNGAN / APRESIASI KARYA (GLASSMORPHISM)         */}
        {/* ========================================================= */}
        <div className="mb-20 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-r from-[#0A1329] to-[#050A14] border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.05)] flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <div className="p-4 bg-cyan-950/50 rounded-2xl border border-cyan-500/30 shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-500">
              <DiamondSparkleIcon />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">Dukung Perjalanan Kreatif Ini</h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                Jika alat ATS CV gratis atau desain saya telah membantu Anda, pertimbangkan untuk memberikan sedikit apresiasi. Setiap dukungan sangat berarti untuk server dan komunitas AquaNime.
              </p>
            </div>
          </div>
          
          {/* Ganti Href dengan link Trakteer / Saweria / KaryaKarsa milikmu */}
          <a 
            href="https://saweria.co/mrr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto whitespace-nowrap px-8 py-4 bg-white/5 hover:bg-cyan-600 border border-white/10 hover:border-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 hover:-translate-y-1"
          >
            Beri Apresiasi
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <span className="text-3xl font-extrabold tracking-tighter text-white">
                MRR<span className="text-cyan-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Menerjemahkan imajinasi menjadi realitas visual. Fokus pada pembuatan identitas merek yang presisi, estetis, dan strategis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Navigasi
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/projects" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">Portofolio</Link></li>
              <li><Link href="/photography" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">Galeri Fotografi</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">Tentang Saya</Link></li>
              <li><Link href="/cv-maker" className="hover:text-cyan-400 hover:translate-x-1 inline-block transition-transform">ATS CV Tools</Link></li>
            </ul>
          </div>

          {/* Contact Info (Di sinilah email barumu bersinar!) */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Hubungi Saya
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="mailto:hello@mrr.my.id" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                  <span className="p-2.5 rounded-full bg-white/5 border border-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                    <MailIcon />
                  </span>
                  hello@mrr.my.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/6285155020363" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                  <span className="p-2.5 rounded-full bg-white/5 border border-white/5 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                    <WhatsAppSmallIcon />
                  </span>
                  +62 851-5502-0363
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Socials */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <p>© {currentYear} Muhammad Rafli Ramadhan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://instagram.com/img_ischeznut.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 uppercase tracking-widest font-semibold transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/muhammad-rafli-ramadhan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 uppercase tracking-widest font-semibold transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}