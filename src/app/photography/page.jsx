"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function Photography() {
  // Efek ini digunakan jika kamu memakai script widget pihak ketiga (seperti Elfsight)
  useEffect(() => {
    // Script widget akan dimuat secara aman di sini
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Pembersihan script saat pindah halaman
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-[#0A1329]/80 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            Bercerita Melalui <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Lensa & Cahaya</span>
          </h1>
          
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Selain merancang identitas visual, saya mengeksplorasi dunia melalui lensa kamera. Ini adalah galeri hobi fotografi saya yang tersinkronisasi langsung secara <i>real-time</i> dari jurnal Instagram pribadi saya.
          </p>

          <a 
            href="https://www.instagram.com/img_ischeznut.jpg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @img_ischeznut.jpg
          </a>
        </div>

        {/* INSTAGRAM GRID WIDGET CONTAINER */}
        <div className="bg-[#0A1329]/80 border border-white/10 rounded-[2rem] p-4 sm:p-8 min-h-[60vh] flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-sm">
          
          {/* WIDGET ELFSIGHT (GANTI ID DI BAWAH JIKA SUDAH PUNYA WIDGET SENDIRI) */}
          <div className="elfsight-app-eb3eb186-b2d9-4b67-9c98-c88b725227d8 w-full"></div>
          
          {/* Pesan Fallback jika Widget belum dimuat atau kosong */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 text-center px-4 -z-10">
            <svg className="w-12 h-12 text-cyan-500 mb-4 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <p className="text-sm text-cyan-400/80 font-medium">Sinkronisasi Feed Instagram...</p>
          </div>
        </div>

        {/* Tombol Kembali ke Portofolio Utama */}
        <div className="mt-12 text-center">
          <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase text-sm inline-flex items-center gap-2 transition-all group">
            <span className="group-hover:-translate-x-2 transition-transform">←</span> Kembali ke Karya Desain
          </Link>
        </div>

      </div>
    </div>
  );
}