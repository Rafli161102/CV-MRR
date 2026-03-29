"use client";

import { useState } from 'react'
import { PROJECT_LIST } from '../../data/store'
import Link from 'next/link'

export default function Projects() {
  // 1. Ambil daftar kategori unik dari PROJECT_LIST (Otomatis menyesuaikan data)
  const availableCategories = [
    "All", 
    ...new Set(PROJECT_LIST.map(project => project.category))
  ];

  // 2. State untuk mengontrol kategori yang aktif
  const [activeCategory, setActiveCategory] = useState("All");

  // 3. Logika Penyaringan (Filtering) Project
  const filteredProjects = activeCategory === "All" 
    ? PROJECT_LIST 
    : PROJECT_LIST.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-48 relative">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
           HEADER GALERI (GOLDEN RATIO SPACING)
           ========================================================================= */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          {/* Judul Besar (Golden Ratio sizing vs Deskripsi) */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Galeri <span className="text-cyan-500">Portofolio</span>
          </h1>
          {/* Deskripsi (Golden Ratio spacing/line-height) */}
          <p className="text-xl sm:text-2xl text-slate-400 font-light leading-relaxed">
            Kumpulan mahakarya desain terbaik saya. Jelajahi karya visual berdasarkan kategori spesifik.
          </p>
        </div>

        {/* =========================================================================
           KATEGORI INTERAKTIF (FILTERING BUTTONS) - MODERN & CLEAN
           ========================================================================= */}
        <div className="mb-20 md:mb-24 flex flex-wrap gap-4 items-center bg-[#0A1329]/50 backdrop-blur-sm p-3 rounded-full border border-white/5 selection:bg-cyan-500">
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase px-4 hidden md:block">Filter:</span>
          {availableCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap border ${
                activeCategory === category
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105'
                  : 'bg-[#060D1F] text-slate-300 border-white/10 hover:border-cyan-500/30 hover:text-white'
              }`}
            >
              {category}
              {activeCategory === category && (
                <span className="ml-2 text-xs opacity-70">({
                  category === "All" ? PROJECT_LIST.length : PROJECT_LIST.filter(p => p.category === category).length
                })</span>
              )}
            </button>
          ))}
        </div>
        
        {/* =========================================================================
           GRID PORTOFOLIO INTERAKTIF (GOLDEN RATIO CARD RATIO)
           ========================================================================= */}
        {filteredProjects.length > 0 ? (
          // Grid otomatis menyesuaikan device: 1 kol (HP), 2 kol (Tablet), 3 kol (Desktop)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 transition-all duration-500 ease-in-out">
            
            {/* Sistem Looping Otomatis (Membaca hasil filter) */}
            {filteredProjects.map((project, index) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="transform transition-all duration-500 scale-100 opacity-100">
                <div className="group flex flex-col h-full bg-[#0A1329]/80 backdrop-blur-sm p-6 sm:p-7 rounded-[3rem] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0D1836] hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] transition-all duration-500 cursor-pointer overflow-hidden relative">
                  
                  {/* Gambar Pembungkus (GOLDEN RATIO ASPECT RATIO = 1.618 : 1) */}
                  <div className="relative aspect-[1.618/1] rounded-[2.2rem] overflow-hidden bg-[#060D1F] mb-8 border border-white/5 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                      // Placeholder jika gambar gagal dimuat (Cyber Aesthetic)
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                    />
                    
                    {/* Efek Gelap Gradasi Saat Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Tombol "Buka Studi Kasus" Melayang Saat Hover (Unique Interactivity) */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 px-7 py-3.5 bg-cyan-500 text-white font-bold rounded-full text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(6,182,212,0.7)] whitespace-nowrap z-10">
                      Buka Studi Kasus
                    </div>
                  </div>
                  
                  {/* =========================================================================
                     DESKRIPSI KARYA (GOLDEN RATIO SPACING & TYPOGRAPHY)
                     ========================================================================= */}
                  <div className="px-1 flex flex-col flex-grow relative z-10">
                    {/* Kategori (Golden Ratio minor sizing) */}
                    <div className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                      {project.category}
                    </div>
                    {/* Judul (Golden Ratio major sizing) */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {/* Klien (Golden Ratio spacing) */}
                    <p className="text-sm font-medium text-cyan-500/70 mb-6 tracking-wide uppercase">
                      Klien: {project.company}
                    </p>
                    {/* Deskripsi (Golden Ratio spacing & minor sizing) */}
                    <p className="text-slate-400 text-base leading-relaxed font-light mt-auto line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Efek Sinar Sudut Golden Ratio (Dekorasi Unik) */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          {/* Tampilan Jika Tidak Ada Project di Kategori Tersebut */}
          <div className="text-center py-24 bg-[#0A1329] rounded-[3rem] border border-slate-800 selection:bg-cyan-500">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">Belum ada karya.</h3>
            <p className="text-slate-500">Kategori <span className="text-cyan-400 font-medium">{activeCategory}</span> belum memiliki project yang di-upload.</p>
          </div>
        )}

      </div>
    </div>
  )
}
