"use client";

import { WORK_EXPERIENCE, EDUCATION } from '../../data/store';
import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL 
// =========================================================================
const PaintBrushIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#fffa00]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-3.879a1.5 1.5 0 10-2.12-2.122l-3.88 3.88a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#fffa00]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.084-.907 1.92-2.022 1.92H5.772c-1.115 0-2.022-.836-2.022-1.92v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const AcademicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#fffa00]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

export default function About() {
  return (
    // FIX OVERFLOW ABSOLUTE: Menjaga layar HP dari melar
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 relative w-full overflow-x-hidden bg-[#050505]">
      
      {/* BACKGROUND DECOR KONSISTEN DENGAN BERANDA */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] left-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-[#fffa00]/10 rounded-full blur-[100px] lg:blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-indigo-600/10 rounded-full blur-[100px] lg:blur-[140px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* HEADER & PROFIL (GOLDEN RATIO)                            */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 lg:mb-32 items-start">
          
          <div className="w-full lg:w-[61.8%] reveal stagger-1">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Graphic Design & Community Development
            </div>
            
            {/* TEMA FONT 100% SAMA DENGAN BERANDA */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter text-white mb-8 sm:mb-10 leading-[1.1] drop-shadow-lg">
              Di Balik <br className="hidden sm:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#fffa00] to-[#fffa00]">Layar Kreatif.</span>
            </h1>
            
            <div className="space-y-6 text-sm sm:text-base lg:text-lg text-slate-400 font-medium leading-relaxed sm:leading-loose max-w-2xl">
              <p>
                Halo! Saya <span className="text-white font-bold">M. Rafli Ramadhan</span>, seorang desainer grafis profesional yang memiliki passion mendalam dalam menerjemahkan imajinasi menjadi realitas visual. Saya sangat menguasai ekosistem industri seperti <strong className="text-[#fffa00]">Adobe Creative Suite</strong> (Photoshop, Illustrator, InDesign) dan operasional fotografi DSLR.
              </p>
              <p>
                Pengalaman saya membentang luas dalam ranah desain cetak maupun digital; mulai dari perancangan identitas merek, materi pemasaran B2B korporat, hingga tata kelola kendali mutu produksi cetak (Quality Control) agar hasil akhir sesuai standar.
              </p>
              <p>
                Selain eksekusi teknis, peran saya sebagai pendiri komunitas <strong className="text-[#fffa00]">AquaNime</strong> telah secara alami menajamkan kemampuan kepemimpinan, negosiasi klien, serta manajemen proyek visual skala besar.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[38.2%] flex flex-col gap-6 sm:gap-8 reveal stagger-2 mt-4 lg:mt-0">
            
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="w-1.5 h-6 bg-[#fffa00]"></div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Arsenal Keahlian</h2>
            </div>
            
            {/* Creative Tools */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/5 shadow-2xl hover:border-[#fffa00]/30 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#fffa00]/10 rounded-xl border border-[#fffa00]/20 group-hover:bg-[#fffa00]/20 transition-colors">
                  <PaintBrushIcon />
                </div>
                <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#fffa00] uppercase">Creative Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva', 'Photography'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-[#050505] border border-white/5 text-slate-300 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide hover:border-[#fffa00]/40 hover:text-white transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Productivity & Biz */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/5 shadow-2xl hover:border-[#fffa00]/30 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#fffa00]/10 rounded-xl border border-[#fffa00]/20 group-hover:bg-[#fffa00]/20 transition-colors">
                  <BriefcaseIcon />
                </div>
                <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#fffa00] uppercase">Productivity & Biz</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Ms. Word', 'Ms. Excel', 'Business Dev.', 'Quality Control', 'B2B Pitching'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-[#050505] border border-white/5 text-slate-300 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide hover:border-[#fffa00]/40 hover:text-white transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* TIMELINE REKAM JEJAK (RESPONSIF & MOBILE-SMART)           */}
        {/* ========================================================= */}
        <div className="mb-32 reveal stagger-3">
          
          <div className="mb-12 sm:mb-16 md:text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Rekam Jejak <br className="sm:hidden" /> & <span className="text-[#fffa00]">Pengalaman</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-medium">Evolusi karir dan jejak kontribusi saya di industri kreatif.</p>
          </div>
          
          <div className="relative w-full mx-auto">
            
            {/* GARIS TIMELINE: Cerdas menyesuaikan posisi! 
                Di HP -> Mepet Kiri (left-[20px])
                Di Desktop -> Membelah layar dengan proporsi Golden Ratio (left-[38.2%]) */}
            <div className="absolute left-[20px] lg:left-[38.2%] top-2 bottom-0 w-[2px] bg-gradient-to-b from-[#fffa00]/80 via-[#fffa00]/20 to-transparent lg:-translate-x-1/2 rounded-full z-0"></div>
            
            <div className="flex flex-col gap-10 sm:gap-14 relative z-10">
              {WORK_EXPERIENCE.map((exp, index) => (
                <div key={index} className="relative flex flex-col lg:flex-row items-start w-full group">
                  
                  {/* TITIK NEON (Node) */}
                  <div className="absolute left-[20px] lg:left-[38.2%] -translate-x-1/2 mt-7 lg:mt-1.5 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-[#fffa00] group-hover:bg-[#fffa00] group-hover:shadow-[0_0_20px_rgba(255,250,0,0.8)] transition-all duration-300 z-20"></div>
                  
                  {/* SISI KIRI (Desktop): Tahun & Perusahaan. Di HP disembunyikan karena dipindah ke dalam kotak */}
                  <div className="hidden lg:block w-[38.2%] pr-12 text-right pt-0">
                     <span className="inline-flex items-center px-4 py-1.5 bg-[#121212]/80 text-[#fffa00] border border-[#fffa00]/20 rounded-full text-[10px] font-bold tracking-widest mb-3 shadow-md">
                       {exp.year}
                     </span>
                     <h4 className="text-sm font-bold text-white uppercase tracking-widest">{exp.company}</h4>
                  </div>

                  {/* SISI KANAN / KARTU KONTEN */}
                  {/* Di HP: pl-14 memberikan ruang agar garis dan titik neon tidak tertutup */}
                  <div className="w-full lg:w-[61.8%] pl-14 lg:pl-12">
                     <div className="bg-gradient-to-br from-[#0a0a0a]/90 to-[#050505]/90 backdrop-blur-xl p-6 sm:p-8 rounded-[1.5rem] sm:rounded-3xl border border-white/5 hover:border-[#fffa00]/40 shadow-xl group-hover:shadow-[0_15px_40px_rgba(255,250,0,0.1)] group-hover:-translate-y-1 transition-all duration-500">
                       
                       {/* Khusus Mobile: Tampilkan Tahun dan Perusahaan di DALAM kotak */}
                       <div className="lg:hidden mb-4 border-b border-white/5 pb-4">
                         <span className="inline-flex items-center px-3 py-1 bg-[#121212]/80 text-[#fffa00] border border-[#fffa00]/20 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest mb-2">
                           {exp.year}
                         </span>
                         <h4 className="text-xs sm:text-sm font-bold text-[#fff500] uppercase tracking-widest">{exp.company}</h4>
                       </div>

                       <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 tracking-tight group-hover:text-[#fff500] transition-colors leading-snug">{exp.role}</h3>
                       <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                         {exp.description}
                       </p>
                     </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN 3: PENDIDIKAN FORMAL (Bento Grid)                  */}
        {/* ========================================================= */}
        <div className="mb-20 reveal stagger-4 border-t border-white/5 pt-16 sm:pt-20">
          
          <div className="flex items-center gap-4 mb-10 sm:mb-16">
            <div className="p-3 bg-[#fffa00]/10 border border-[#fffa00]/30 rounded-xl shrink-0"><AcademicIcon /></div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Latar <span className="text-[#fffa00]">Pendidikan</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {EDUCATION.map((edu, index) => (
               <div key={index} className="bg-[#0a0a0a] p-6 sm:p-8 rounded-[2rem] border border-white/5 hover:border-[#fffa00]/30 transition-all duration-300 group shadow-lg hover:shadow-[#fffa00]/5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#050505] border border-white/10 text-slate-300 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest mb-4 sm:mb-5">
                    <span className="w-1.5 h-1.5 bg-slate-500 group-hover:bg-[#fffa00] rounded-full transition-colors"></span>
                    {edu.year}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{edu.institution}</h3>
                  <p className="text-[#fffa00] font-bold mb-4 uppercase text-[9px] sm:text-[10px] tracking-widest">{edu.degree}</p>
                  
                  {edu.description && (
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed italic">
                        "{edu.description}"
                      </p>
                    </div>
                  )}
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}