"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer'; // Memanggil pustaka untuk transisi scroll
import { PROJECT_LIST, PHOTO_GALLERY } from '../data/store'; 

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

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

export default function Home() {
  const whatsappNumber = "6285155020363"; 
  const waMessage = "Halo Rafli, saya telah melihat portofolio Anda dan tertarik untuk berdiskusi mengenai proyek desain.";

  // =========================================================================
  // IMPROVEMENT MUTLAK: SISTEM ROTASI KARYA OTOMATIS (MENGGANTI 1 PER 1 SECARA MODERN)
  // =========================================================================
  // FIX INISIALISASI: Langsung ambil 3 proyek pertama yang berbeda untuk inisialisasi awal
  const [gridIndices, setGridIndices] = useState([0, 1, 2]); // Kotak 1, 2, 3 berawal dari index 0, 1, 2
  const [fadingIndex, setFadingIndex] = useState(null); // Melacak kotak mana yang sedang fade-out
  
  // Menggunakan useRef agar perhitungan nomor proyek selanjutnya tidak terganggu oleh render ulang (Anti Duplikat!)
  const nextItemIndexRef = useRef(3); 

  useEffect(() => {
    if (!PROJECT_LIST || PROJECT_LIST.length <= 3) return;

    let updateSlot = 0; // Menentukan kotak mana yang mau diganti (0, 1, atau 2)

    const intervalId = setInterval(() => {
      // 1. Picu efek pudar (Fade out) pada kotak yang mendapat giliran
      setFadingIndex(updateSlot);
      
      // 2. Ganti data SECARA INSTAN setelah gambar memudar (delay 500ms mengikuti durasi CSS)
      setTimeout(() => {
        setGridIndices(prevIndices => {
          const newIndices = [...prevIndices];
          
          // Masukkan proyek selanjutnya ke dalam kotak ini
          newIndices[updateSlot] = nextItemIndexRef.current;
          return newIndices;
        });

        // 3. Pindahkan memori "Proyek Selanjutnya" ke urutan berikutnya. Jika habis, kembali ke 0.
        nextItemIndexRef.current = (nextItemIndexRef.current + 1) % PROJECT_LIST.length;
        
        // 4. Munculkan kembali gambarnya (Fade in)
        setFadingIndex(null);

        // Pindah giliran kotak mana yang akan diubah di putaran detik selanjutnya (0 -> 1 -> 2 -> 0)
        updateSlot = (updateSlot + 1) % 3;
      }, 500);

    }, 4000); // Berganti otomatis setiap 4 detik

    return () => clearInterval(intervalId);
  }, []);

  // =========================================================================
  // TRANSISI SCROLL MUTLAK (Clean & Minimalist Scroll Reveal)
  // =========================================================================
  // Terapkan InView pada setiap section utama
  const [refToolkit, inViewToolkit] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refPortfolio, inViewPortfolio] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refCamera, inViewCamera] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white relative w-full overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120vw] md:w-[50rem] h-[120vw] md:h-[50rem] bg-cyan-600/10 rounded-full blur-[100px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[100vw] md:w-[40rem] h-[100vw] md:h-[40rem] bg-indigo-600/10 rounded-full blur-[100px] md:blur-[150px]"></div>
        
        <div className="hidden md:block absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
        <div className="hidden md:block absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative z-10 pt-24 md:pt-36 pb-24 w-full">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          
          {/* ========================================================= */}
          {/* HERO SECTION (justify-center di desktop)                    */}
          {/* ========================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 min-h-[auto] lg:min-h-[70vh] w-full py-10">
            
            {/* KIRI */}
            <div className="w-full lg:w-[61.8%] flex flex-col justify-center text-center lg:text-left z-20">
              
              <div className="anim-fade-in-up inline-flex items-center justify-center lg:justify-start gap-3 mb-6 mx-auto lg:mx-0">
                <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
                <span className="text-slate-300 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                  Graphic Design & Community Development
                </span>
              </div>
              
              <h1 className="anim-fade-in-up anim-delay-100 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter text-white mb-6 leading-[1.1] drop-shadow-lg break-words">
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

            {/* KANAN */}
            <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end relative z-10">
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
          {/* PROMO TOOLKIT ECOSYSTEM (Scroll Reveal)                     */}
          {/* ========================================================= */}
          <div ref={refToolkit} className={`mt-20 lg:mt-32 w-full transition-all duration-1000 transform ease-in-out ${inViewToolkit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
          {/* BENTO GRID: KARYA TERPILIH (TRANSISI SCROLL & FIX DUPLIKAT) */}
          {/* ========================================================= */}
          <div ref={refPortfolio} className={`mt-20 lg:mt-32 pt-16 border-t border-white/5 transition-all duration-1000 transform ease-in-out ${inViewPortfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6 w-full">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-500 rounded-sm rotate-45 shrink-0"></span>
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Portofolio Desain</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">Karya <span className="text-cyan-500">Unggulan</span></h2>
              </div>
              <Link href="/projects" className="w-full sm:w-auto text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase text-[10px] sm:text-sm group flex items-center justify-between sm:justify-start gap-2 transition-all pb-1 border-b border-transparent hover:border-cyan-500/30">
                <span>Lihat Seluruh Karya</span>
                <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-cyan-50 group-hover:text-white transition-colors shrink-0">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            {/* Grid Container Utama: Peletakan Bento Grid Modern */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-[300px] sm:auto-rows-[350px] lg:auto-rows-[450px]">
              {gridIndices.map((projectIndex, slotIndex) => {
                // Memastikan data aman dan tidak error
                const project = PROJECT_LIST[projectIndex] || PROJECT_LIST[0]; 
                if (!project) return null;

                return (
                  <Link 
                    href={`/projects/${project.id}`} 
                    key={slotIndex} // Key berupa posisi grid (0, 1, 2) agar layout tak hancur
                    className={`group relative rounded-3xl sm:rounded-[2rem] overflow-hidden bg-[#0A1329] border border-white/5 hover:border-cyan-500/40 Shadow-2xl hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)]
                    ${slotIndex === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
                    transition-opacity duration-700 ease-in-out
                    ${fadingIndex === slotIndex ? 'opacity-0' : 'opacity-100'}
                    `}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-100"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'; }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className={`absolute bottom-0 left-0 w-full flex flex-col justify-end transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${slotIndex === 0 ? 'p-8 sm:p-10' : 'p-6 sm:p-8'}`}>
                      {/* IMPROVEMENT: Peletakan badge Montserrat lebih clean */}
                      <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3 bg-cyan-900/40 backdrop-blur-md border border-cyan-500/30 px-3.5 py-1.5 rounded-full w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-pulse"></span>
                        {project.category}
                      </div>
                      <h3 className={`font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-2 ${slotIndex === 0 ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* GALERI FOTOGRAFI (TAMBAHAN BARU DI DEPAN + Scroll Reveal) */}
          {/* ========================================================= */}
          <div ref={refCamera} className={`mt-20 lg:mt-32 pt-16 border-t border-white/5 transition-all duration-1000 transform ease-in-out ${inViewCamera ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6 w-full">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-cyan-400 shrink-0"><CameraIcon /></span>
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Lensa Kamera</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">Sudut <span className="text-cyan-500">Pandang</span></h2>
              </div>
              <Link href="/fotografi" className="w-full sm:w-auto text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase text-[10px] sm:text-sm group flex items-center justify-between sm:justify-start gap-2 transition-all pb-1 border-b border-transparent hover:border-cyan-500/30">
                <span>Lihat Seluruh Foto</span>
                <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-cyan-50 group-hover:text-white transition-colors shrink-0">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            {/* Layout Masonry Sederhana (Hanya Menampilkan 4 Foto Pertama) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
               {PHOTO_GALLERY && PHOTO_GALLERY.slice(0, 4).map((photo, i) => (
                  <div 
                     key={photo.id || i} 
                     className={`group relative overflow-hidden rounded-2xl bg-[#0A1329] border border-white/5 hover:border-cyan-500/30 transition-all ${i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'}`}
                  >
                     <img 
                        src={photo.url} 
                        alt={photo.title || 'Fotografi'} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop'; }} 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 z-10">
                        <span className="text-white text-xs font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 tracking-wide line-clamp-1">{photo.title}</span>
                     </div>
                  </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
