import { WORK_EXPERIENCE } from '../../data/store'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-48 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
           HEADER ABOUT
           ========================================================================= */}
        <div className="mb-20 md:mb-28 max-w-4xl">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Tentang <span className="text-cyan-500">Saya</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 font-light leading-relaxed">
            Lebih dari sekadar menciptakan desain, saya membangun cerita dan identitas visual yang beresonansi.
          </p>
        </div>

        {/* =========================================================================
           PROFIL SINGKAT & KEAHLIAN (GRID 2 KOLOM)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          
          {/* Kolom Kiri: Profil */}
          <div className="bg-[#0A1329]/50 backdrop-blur-sm p-8 sm:p-10 rounded-[3rem] border border-white/5">
            <h2 className="text-3xl font-bold text-white mb-6">M. Rafli Ramadhan</h2>
            <div className="w-16 h-1 bg-cyan-500 rounded-full mb-8"></div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Halo! Saya seorang <b>Graphic Designer</b> yang berdedikasi tinggi terhadap estetika fungsional. Saya percaya bahwa desain yang baik tidak hanya terlihat indah, tetapi juga mampu memecahkan masalah dan mengkomunikasikan nilai sebuah merek.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Selain dunia desain profesional, saya juga merupakan <b>Founder dari AquaNime</b>, sebuah komunitas kreatif yang menjadi wadah berekspresi dan berkolaborasi. Pengalaman memimpin komunitas ini telah mengasah kemampuan saya dalam *Art Direction* dan manajemen proyek visual berskala besar.
            </p>
          </div>

          {/* Kolom Kanan: Skills (Senjata & Keahlian) */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-white mb-2">Senjata & Keahlian</h2>
            
            {/* Design Tools */}
            <div className="bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <h3 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-6">Creative Tools</h3>
              <div className="flex flex-wrap gap-3">
                {['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva'].map((tool) => (
                  <span key={tool} className="px-5 py-2.5 bg-[#060D1F] text-slate-300 rounded-full text-sm font-medium border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Office Tools */}
            <div className="bg-[#0A1329]/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <h3 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-6">Productivity</h3>
              <div className="flex flex-wrap gap-3">
                {['Ms. Word', 'Ms. Excel', 'Google Docs', 'Google Sheets'].map((tool) => (
                  <span key={tool} className="px-5 py-2.5 bg-[#060D1F] text-slate-300 rounded-full text-sm font-medium border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
           PENGALAMAN KERJA (TIMELINE DARI store.js)
           ========================================================================= */}
        <div className="mb-20">
          <h2 className="text-4xl font-black tracking-tight text-white mb-16 text-center">Rekam Jejak & <span className="text-cyan-500">Pengalaman</span></h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Garis Vertikal Timeline (Hanya di Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>
            
            <div className="flex flex-col gap-12">
              {WORK_EXPERIENCE.map((exp, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Titik Tengah Timeline (Hanya di Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#060D1F] z-10"></div>
                  
                  {/* Card Pengalaman */}
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
