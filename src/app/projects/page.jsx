"use client";

import { PROJECT_LIST } from '../../data/store'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white pt-32 pb-40 relative overflow-hidden">
      
      {/* Latar Belakang Clean Deep Cyber Space */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Galeri */}
        <div className="mb-20 md:mb-24">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-lg">
            Galeri <span className="text-cyan-500">Portofolio</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Kumpulan mahakarya desain terbaik saya. Di-update otomatis dari sistem <i className="text-cyan-400 font-medium">Drag & Play</i>.
          </p>
        </div>
        
        {/* Grid Portofolio Interaktif */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          
          {/* Sistem Looping Otomatis (Membaca dari store.js) */}
          {PROJECT_LIST.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={index}>
              <div className="group flex flex-col h-full bg-[#0A1329]/80 backdrop-blur-sm p-5 sm:p-6 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0D1836] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 cursor-pointer">
                
                {/* Gambar Pembungkus */}
                <div className="relative aspect-[4/3] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#060D1F] mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                  />
                  
                  {/* Efek Gelap Saat Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                  
                  {/* Tombol Melayang Saat Hover */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 px-6 py-3 bg-cyan-500 text-white font-bold rounded-full text-sm tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.6)] whitespace-nowrap">
                    Buka Studi Kasus
                  </div>
                </div>
                
                {/* Deskripsi & Keterangan Karya */}
                <div className="px-2 pb-2 flex flex-col flex-grow">
                  <div className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4">
                    {project.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-500/70 mb-5 tracking-wide uppercase">
                    Klien: {project.company}
                  </p>
                  <p className="text-slate-400 text-base leading-relaxed font-light mt-auto line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  )
}
