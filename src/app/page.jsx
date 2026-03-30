"use client";

import Link from 'next/link';
import { PROJECT_LIST } from '../data/store'; // Pastikan path ini benar sesuai foldermu

export default function Home() {
  // Mengambil 3 karya pertama dari store.js
  const featuredProjects = PROJECT_LIST.slice(0, 3);
  
  // Kontak
  const whatsappNumber = "6285155020363"; 
  const waMessage = "Halo Rafli, saya tertarik dengan portofolio desain Anda dan ingin berdiskusi lebih lanjut.";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* BACKGROUND (GRID PATTERN & GLOW) - UI/UX TREND 2025         */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] bg-cyan-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[40rem] h-[30rem] bg-blue-900/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* ========================================================= */}
          {/* 1. HERO SECTION (EDITORIAL STYLE)                         */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center text-center mb-24 animate-fade-in-up">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">Available for Work & Collaboration</span>
            </div>

            {/* Giant Typography */}
            <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-2xl">
              Merancang <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Identitas,</span> <br className="hidden sm:block" />
              Membangun <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Bercerita.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              Halo, saya <b className="text-white font-bold">Muhammad Rafli Ramadhan</b>. Seorang Desainer Grafis & UI/UX Enthusiast yang mengubah ide kompleks menjadi karya visual yang estetis, strategis, dan berdampak.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-full transition-all hover:scale-105 tracking-wide text-center flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Mulai Diskusi Proyek
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" /></svg>
              </a>
              <Link 
                href="/projects" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-full transition-all tracking-wide text-center flex justify-center items-center gap-2"
              >
                Lihat Portofolio
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. BENTO GRID SECTION (TREN UI/UX MODERN)                 */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-32">
            
            {/* Bento 1: Profil & Intro (Besar) */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
              </div>
              <div>
                <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Desain Grafis & Branding</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Menciptakan logo, kemasan, dan materi pemasaran yang tidak hanya indah dipandang, tapi juga memiliki strategi komunikasi yang kuat.</p>
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm mt-8 group-hover:gap-3 transition-all">
                Lebih Lanjut Tentang Saya <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Bento 2: Photography (Medium) */}
            <Link href="/photography" className="md:col-span-1 lg:col-span-1 bg-[#0A1329] border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between group hover:bg-[#0D1836] hover:border-purple-500/50 transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Fotografi</h3>
                <p className="text-slate-400 text-xs">Jurnal Visual Pribadi.</p>
              </div>
              <div className="relative z-10 mt-12 flex justify-between items-end">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white backdrop-blur-md">@img_ischeznut.jpg</span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-purple-500 group-hover:border-purple-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white"><path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </Link>

            {/* Bento 3: CV Maker (Medium Highlight) */}
            <Link href="/cv-maker" className="md:col-span-3 lg:col-span-1 bg-gradient-to-b from-cyan-600 to-blue-800 rounded-[2rem] p-6 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-1 transition-all">
              <div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold text-white backdrop-blur-md inline-block mb-4 uppercase tracking-widest">Free Tool</div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">ATS CV<br/>Maker.</h3>
                <p className="text-cyan-100 text-xs leading-relaxed">Aplikasi cerdas untuk membuat CV berstandar mesin HRD (ATS) secara gratis, lengkap dengan fitur auto-translate.</p>
              </div>
              <div className="mt-8 text-white font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Coba Sekarang <span>→</span>
              </div>
            </Link>

          </div>

          {/* ========================================================= */}
          {/* 3. SELECTED WORKS (PROJECTS GRID)                         */}
          {/* ========================================================= */}
          <div className="pt-10 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Selected <span className="text-cyan-500">Works</span></h2>
                <p className="text-slate-400 text-sm">Beberapa karya pilihan dari portofolio saya.</p>
              </div>
              <Link href="/projects" className="px-6 py-2 rounded-full border border-white/10 text-white hover:bg-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all">
                Lihat Semua Karya
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => {
                // Menghindari error jika properti image tidak ada di store.js
                const imgSrc = project.image || (project.images && project.images[0]) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';

                return (
                  <Link href={`/projects/${project.id}`} key={project.id} className="group block">
                    {/* Image Container with Inner Shadow */}
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0A1329] mb-5 border border-white/5 shadow-lg group-hover:border-cyan-500/30 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={imgSrc} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                      />
                      {/* Overlay Soft Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating View Button */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    
                    {/* Text Details */}
                    <div className="px-2">
                      <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}