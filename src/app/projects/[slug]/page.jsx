"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECT_LIST } from '../../../data/store';
import { notFound } from 'next/navigation';

// =========================================================================
// IKON SVG PROFESIONAL UNTUK METADATA PROYEK
// =========================================================================
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ClientIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

const RoleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827M15.75 12.75l-2.456-2.456M7.102 18.324a3.75 3.75 0 01-5.304 0 3.75 3.75 0 010-5.304l6.187-6.187a3.75 3.75 0 015.304 0l2.455 2.456" />
  </svg>
);

const DateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;

  const project = PROJECT_LIST.find((p) => p.id === slug);

  if (!project) {
    return notFound();
  }

  // Trik Cerdas: Jika project.images ada dan tidak kosong, gunakan itu. Jika tidak, jadikan array dengan 1 gambar.
  const imagesToShow = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    // FIX OVERFLOW: Mengamankan agar layar tidak melar ke samping
    <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#030712]">
      
      {/* Background Decor (Glow Konsisten) */}
      <div className="fixed top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-cyan-900/15 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="fixed bottom-0 left-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* TOMBOL KEMBALI (Pill Shaped Minimalist)                   */}
        {/* ========================================================= */}
        <div className="mb-10 sm:mb-12 reveal stagger-1">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0A1329] border border-white/10 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-[#0A1329]/80 shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 group w-fit"
          >
            <ArrowLeftIcon />
            Kembali ke Galeri
          </Link>
        </div>

        {/* ========================================================= */}
        {/* HEADER SECTION (GOLDEN RATIO 61.8 : 38.2)                 */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* KIRI: 61.8% (Judul Tipografi Dinamis & Deskripsi) */}
          <div className="w-full lg:w-[61.8%] reveal stagger-2">
            
            {/* Badge Kategori */}
            <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 sm:mb-6 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
              {project.category}
            </div>
            
            {/* FONT DINAMIS: Lebih kecil di HP agar tidak terlalu memakan ruang, namun membesar otomatis di PC */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black text-white tracking-tighter mb-6 sm:mb-8 leading-[1.1] sm:leading-tight">
              {project.title}
            </h1>
            
            {/* Latar Belakang Proyek */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-300 uppercase tracking-widest mb-4 border-b border-white/10 pb-3 inline-block">
                Latar Belakang / Deskripsi
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed sm:leading-loose">
                {project.description}
              </p>
            </div>
          </div>

          {/* KANAN: 38.2% (Kartu Metadata Glassmorphism) */}
          <div className="w-full lg:w-[38.2%] reveal stagger-3 mt-4 lg:mt-0">
            <div className="bg-[#0A1329]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
              
              {/* Efek Cahaya Halus */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <h4 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-4">
                Informasi Proyek
              </h4>

              <div className="space-y-5 sm:space-y-6">
                
                {/* Klien */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shrink-0">
                    <ClientIcon />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Klien</p>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {project.company || "Proyek Personal"}
                    </p>
                  </div>
                </div>

                {/* Peran */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shrink-0">
                    <RoleIcon />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Peran / Role</p>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {project.role || "Lead Visual Designer"}
                    </p>
                  </div>
                </div>

                {/* Tahun Eksekusi */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shrink-0">
                    <DateIcon />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Tahun Eksekusi</p>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {project.year || "2023 - 2024"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CINEMATIC MULTIPLE IMAGE DISPLAY (OTOMATIS LOOPING)         */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-24 flex flex-col gap-8 sm:gap-12">
          {imagesToShow.map((imgUrl, index) => {
            // Efek animasi berurutan untuk setiap gambar yang diload
            const staggerDelay = index < 5 ? `stagger-${index + 3}` : 'stagger-7';

            return (
              <div 
                key={index}
                className={`reveal ${staggerDelay} w-full rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-[#050A14] group`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={imgUrl} 
                  alt={`${project.title} - Preview ${index + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'; }}
                />
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* NEXT CALL TO ACTION (Navigasi Bawah)                      */}
        {/* ========================================================= */}
        <div className="mt-20 sm:mt-32 pt-10 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 reveal stagger-5">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-lg mb-2">Tertarik dengan hasil desain ini?</h4>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Mari diskusikan visi proyek kreatif Anda selanjutnya bersama saya.
            </p>
          </div>
          <a 
            href={`https://wa.me/6285155020363?text=${encodeURIComponent(`Halo Rafli, saya tertarik untuk berdiskusi mengenai pembuatan desain ${project.category} seperti proyek ${project.title}.`)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-cyan-500 text-[#030712] font-bold text-xs sm:text-sm hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 w-full sm:w-auto text-center whitespace-nowrap"
          >
            Diskusikan Proyek Anda
          </a>
        </div>

      </div>
    </div>
  );
}