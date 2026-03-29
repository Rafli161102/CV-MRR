import { WORK_EXPERIENCE, EDUCATION } from '../../data/store'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-48 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* HEADER ABOUT */}
        <div className="mb-20 md:mb-28 max-w-4xl">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Tentang <span className="text-cyan-500">Saya</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 font-light leading-relaxed">
            Lebih dari sekadar menciptakan desain, saya membangun cerita dan identitas visual yang beresonansi.
          </p>
        </div>

        {/* PROFIL SINGKAT & KEAHLIAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          
          {/* Kolom Kiri: Profil */}
          <div className="bg-[#0A1329]/50 backdrop-blur-sm p-8 sm:p-10 rounded-[3rem] border border-white/5">
            <h2 className="text-3xl font-bold text-white mb-6">M. Rafli Ramadhan</h2>
            <div className="w-16 h-1 bg-cyan-500 rounded-full mb-8"></div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Halo! Saya seorang <b>Graphic Designer</b> berpengalaman dengan keahlian dalam menciptakan desain visual yang menarik dan efektif. Saya sangat menguasai perangkat lunak standar industri seperti Adobe Creative Suite (Photoshop, Illustrator, InDesign) dan mampu mengoperasikan kamera DSLR dengan baik.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Saya memiliki pengalaman kuat dalam desain cetak (printing) maupun digital, mulai dari pembuatan identitas logo, materi pemasaran B2B, hingga pengelolaan kualitas produksi cetak. Selain itu, pengalaman saya memimpin komunitas AquaNime telah mengasah kemampuan komunikasi, negosiasi, dan manajemen proyek visual saya.
            </p>
          </div>

          {/* Kolom Kanan: Skills */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-white mb-2">Senjata & Keahlian</h2>
            
            <div className="bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <h3 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-6">Creative Tools</h3>
              <div className="flex flex-wrap gap-3">
                {['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva', 'Photography (DSLR)'].map((tool) => (
                  <span key={tool} className="px-5 py-2.5 bg-[#060D1F] text-slate-300 rounded-full text-sm font-medium border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <h3 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-6">Productivity & Business</h3>
              <div className="flex flex-wrap gap-3">
                {['Ms. Word', 'Ms. Excel', 'Business Development', 'Print Quality Control', 'B2B Pitching'].map((tool) => (
                  <span key={tool} className="px-5 py-2.5 bg-[#060D1F] text-slate-300 rounded-full text-sm font-medium border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PENDIDIKAN */}
        <div className="mb-32">
          <h2 className="text-4xl font-black tracking-tight text-white mb-16 text-center">Latar Belakang <span className="text-cyan-500">Pendidikan</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {EDUCATION.map((edu, index) => (
               <div key={index} className="bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0D1836] transition-all duration-500">
                  <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold tracking-widest mb-4">
                    {edu.year}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.institution}</h3>
                  <p className="text-slate-400 font-medium mb-3 uppercase text-sm tracking-wide">{edu.degree}</p>
                  {edu.description && (
                    <p className="text-slate-500 font-light text-sm italic">
                      {edu.description}
                    </p>
                  )}
               </div>
            ))}
          </div>
        </div>

        {/* PENGALAMAN KERJA (TIMELINE) */}
        <div className="mb-20">
          <h2 className="text-4xl font-black tracking-tight text-white mb-16 text-center">Rekam Jejak & <span className="text-cyan-500">Pengalaman</span></h2>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>
            
            <div className="flex flex-col gap-12">
              {WORK_EXPERIENCE.map((exp, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#060D1F] z-10"></div>
                  
                  <div className={`w-full md:w-[45%] bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0D1836] transition-all duration-500 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold tracking-widest mb-4">
                      {exp.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <p className="text-slate-400 font-medium mb-4 uppercase text-sm tracking-wide">{exp.company}</p>
                    <p className="text-slate-500 font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
