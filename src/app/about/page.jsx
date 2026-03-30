"use client";

import { WORK_EXPERIENCE, EDUCATION } from '../../data/store';
import Image from 'next/image';

// =========================================================================
// IKON SVG PROFESIONAL UNTUK WIDGET KEAHLIAN
// =========================================================================
const PaintBrushIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-3.879a1.5 1.5 0 10-2.12-2.122l-3.88 3.88a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.084-.907 1.92-2.022 1.92H5.772c-1.115 0-2.022-.836-2.022-1.92v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const AcademicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

export default function About() {
  return (
    // ANTI-OVERFLOW: w-full & overflow-x-hidden mengamankan layar HP dari melar ke samping
    <div className="min-h-screen pt-32 pb-32 relative w-full overflow-x-hidden bg-[#030712]">
      
      {/* ========================================================= */}
      {/* BACKGROUND DECOR (Cahaya Cyan/Indigo khas Tema Utama)       */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-cyan-900/10 rounded-full blur-[100px] lg:blur-[140px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-indigo-900/10 rounded-full blur-[100px] lg:blur-[140px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* HEADER SECTION                                            */}
        {/* ========================================================= */}
        <div className="mb-16 sm:mb-24 text-center lg:text-left reveal stagger-1">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Di Balik Layar
          </div>
          
          {/* TEMA FONT: Gradient Hit menyamakan halaman depan */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter text-white mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg">
            Tentang <span className="text-cyan-400">Saya.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Lebih dari sekadar menciptakan desain, saya membangun cerita dan identitas visual yang mampu beresonansi dengan audiens Anda.
          </p>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN 1: PROFIL & KEAHLIAN (GOLDEN RATIO 61.8 : 38.2)    */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-32 items-start">
          
          {/* KIRI (61.8%): Narasi Profil Pribadi */}
          <div className="w-full lg:w-[61.8%] reveal stagger-2">
            <div className="bg-gradient-to-br from-[#0A1329] to-[#030712] backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
              
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-cyan-500/20 transition-all duration-700"></div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">M. Rafli Ramadhan</h2>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                <p className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest">Graphic Designer</p>
              </div>

              <div className="space-y-6 text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                <p>
                  Halo! Saya seorang profesional dengan keahlian mendalam dalam menciptakan desain visual yang menarik dan efektif secara komersial. Saya sangat menguasai ekosistem perangkat lunak standar industri seperti <strong className="text-slate-200">Adobe Creative Suite</strong> (Photoshop, Illustrator, InDesign) dan mampu mengoperasikan kamera DSLR dengan presisi.
                </p>
                <p>
                  Pengalaman saya membentang luas dalam ranah desain cetak (printing) maupun digital; mulai dari perancangan identitas logo, materi pemasaran B2B, hingga pengelolaan kendali mutu produksi cetak (QC).
                </p>
                <p>
                  Selain keahlian teknis, peran saya sebagai pendiri komunitas <strong className="text-cyan-400">AquaNime</strong> telah menajamkan kemampuan komunikasi, negosiasi klien, serta manajemen proyek skala visual saya.
                </p>
              </div>
            </div>
          </div>

          {/* KANAN (38.2%): Widget Senjata & Keahlian */}
          <div className="w-full lg:w-[38.2%] flex flex-col gap-6 sm:gap-8 reveal stagger-3">
            
            <h2 className="text-xl sm:text-2xl font-black text-white px-2">Senjata & Keahlian</h2>
            
            {/* Widget 1: Creative Tools */}
            <div className="bg-[#0A1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/5 shadow-xl hover:border-cyan-500/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg"><PaintBrushIcon /></div>
                <h3 className="text-xs sm:text-sm font-bold tracking-widest text-cyan-400 uppercase">Creative Tools</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva', 'Photography (DSLR)'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-[#030712] border border-white/5 text-slate-300 rounded-full text-[11px] sm:text-xs font-bold tracking-wide hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Widget 2: Productivity */}
            <div className="bg-[#0A1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/5 shadow-xl hover:border-cyan-500/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg"><BriefcaseIcon /></div>
                <h3 className="text-xs sm:text-sm font-bold tracking-widest text-cyan-400 uppercase">Productivity & Biz</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {['Ms. Word', 'Ms. Excel', 'Business Development', 'Quality Control', 'B2B Pitching'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-[#030712] border border-white/5 text-slate-300 rounded-full text-[11px] sm:text-xs font-bold tracking-wide hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN 2: LATAR BELAKANG PENDIDIKAN                       */}
        {/* ========================================================= */}
        <div className="mb-32 reveal stagger-4">
          
          <div className="flex items-center gap-4 mb-12 sm:mb-16 justify-center">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyan-500"></div>
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl"><AcademicIcon /></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Latar Belakang <span className="text-cyan-500">Pendidikan</span></h2>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {EDUCATION.map((edu, index) => (
               <div key={index} className="bg-gradient-to-b from-[#0A1329]/80 to-[#050A14] backdrop-blur-md p-8 sm:p-10 rounded-[2rem] border border-white/5 hover:border-cyan-500/40 hover:-translate-y-2 shadow-xl transition-all duration-500 group">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 rounded-full text-[10px] font-bold tracking-widest mb-6">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                    {edu.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{edu.institution}</h3>
                  <p className="text-cyan-400/80 font-bold mb-4 uppercase text-[10px] sm:text-xs tracking-widest">{edu.degree}</p>
                  
                  {edu.description && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  )}
               </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN 3: REKAM JEJAK & PENGALAMAN (TIMELINE INTERAKTIF)  */}
        {/* ========================================================= */}
        <div className="mb-20 reveal stagger-5">
          
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Rekam Jejak <br className="sm:hidden" /> & <span className="text-cyan-500">Pengalaman</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">Perjalanan karir profesional dan kontribusi industri saya.</p>
          </div>
          
          <div className="max-w-5xl mx-auto relative px-4 sm:px-0">
            
            {/* Garis Vertikal Tengah (Glowing) */}
            <div className="absolute left-[28px] sm:left-[40px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/60 via-indigo-500/30 to-transparent md:-translate-x-1/2 rounded-full"></div>
            
            <div className="flex flex-col gap-12 sm:gap-16">
              {WORK_EXPERIENCE.map((exp, index) => {
                // Menentukan posisi konten: Kanan atau Kiri khusus di Desktop
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Node / Titik Bercahaya di Tengah Garis */}
                    <div className="absolute left-[8px] sm:left-[20px] md:left-1/2 -translate-x-1/2 mt-8 md:mt-0 w-5 h-5 rounded-full bg-cyan-400 ring-4 ring-[#030712] shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    {/* Kotak Konten Pengalaman */}
                    <div className={`w-full md:w-[45%] pl-14 sm:pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <div className="bg-[#0A1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/5 hover:border-cyan-500/40 shadow-xl transition-all duration-500 hover:-translate-y-1">
                        
                        <div className={`flex flex-col mb-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                          <span className="inline-flex items-center justify-center px-3 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[10px] font-bold tracking-widest mb-3 w-fit">
                            {exp.year}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">{exp.role}</h3>
                        </div>
                        
                        <p className="text-cyan-400 font-black mb-4 uppercase text-[10px] sm:text-xs tracking-widest">{exp.company}</p>
                        
                        <div className="w-full h-px bg-white/10 mb-4"></div>
                        
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    {/* Spasi kosong untuk menyimbangkan flex layout di Desktop */}
                    <div className="hidden md:block w-[45%]"></div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}