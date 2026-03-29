"use client";

import { PROJECT_LIST } from '../../../../data/store';
import Link from 'next/link';

export default function ProjectDetail({ params }) {
  // 1. Mencari data project yang sesuai dengan URL yang diklik
  const project = PROJECT_LIST.find((p) => p.id === params.slug);

  // 2. Jika URL tidak ditemukan / Project belum ada
  if (!project) {
    return (
      <div className="min-h-screen bg-[#060D1F] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">Karya tidak ditemukan atau belum diunggah.</p>
        <Link href="/projects" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          Kembali ke Galeri
        </Link>
      </div>
    );
  }

  // 3. Menangani jika gambar tunggal (image) atau banyak gambar (images array)
  // Fitur ini memungkinkan kamu nambahin banyak foto di store.js ke depannya
  const projectImages = project.images ? project.images : [project.image];

  return (
    <div className="min-h-screen bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white pt-32 pb-48 relative">
      
      {/* Latar Belakang Clean Deep Cyber Space */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
           TOMBOL KEMBALI
           ========================================================================= */}
        <Link href="/projects" className="inline-flex items-center gap-3 text-cyan-500 hover:text-cyan-300 font-bold tracking-widest uppercase text-xs mb-16 transition-all group">
          <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-white transition-all">
            ←
          </span>
          Kembali ke Galeri
        </Link>

        {/* =========================================================================
           HEADER KARYA (GOLDEN RATIO SPACING)
           ========================================================================= */}
        <div className="mb-20">
          <div className="text-sm font-bold tracking-[0.3em] text-cyan-400 uppercase mb-6 drop-shadow-md">
            {project.category}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {project.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 md:gap-20 pt-10 border-t border-white/10">
            <div className="md:w-[61.8%]">
              <h3 className="text-lg font-bold text-white mb-4">Latar Belakang / Deskripsi</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                {project.description}
              </p>
            </div>
            <div className="md:w-[38.2%] bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 shadow-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Klien / Perusahaan</h3>
              <p className="text-xl font-bold text-cyan-400">{project.company}</p>
            </div>
          </div>
        </div>

        {/* =========================================================================
           GALERI VERTIKAL (ANTI-SLIDER / BEHANCE STYLE)
           ========================================================================= */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {projectImages.map((imgUrl, index) => (
            <div key={index} className="w-full bg-[#0A1329] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imgUrl} 
                alt={`${project.title} - Preview ${index + 1}`} 
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.src = '[https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop)'; }}
              />
            </div>
          ))}
        </div>

        {/* =========================================================================
           CALL TO ACTION BAWAH
           ========================================================================= */}
        <div className="mt-32 pt-16 border-t border-white/10 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Tertarik dengan visual seperti ini?</h3>
          <Link href="/about" className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded-full font-bold tracking-wide transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105">
            Lihat Profil Lengkap Saya
          </Link>
        </div>

      </div>
    </div>
  );
}
