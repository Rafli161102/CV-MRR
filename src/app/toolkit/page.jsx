import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

export const metadata = {
  title: 'Toolkit Ekosistem | MRR',
  description: 'Kumpulan Micro-SaaS dan utilitas gratis untuk desainer persembahan Muhammad Rafli Ramadhan.',
};

// =========================================================================
// IKON SVG MINIMALIS & PROFESIONAL
// =========================================================================
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export default function ToolkitPage() {
  const categories = [...new Set(toolkits.map(tool => tool.category))];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative bg-[#030712] overflow-x-hidden">
      
      {/* SUNTIKAN ANIMASI FADE-IN-UP */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeInUp 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}} />

      {/* Decorative background elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SECTION (GOLDEN RATIO 61.8 : 38.2)                   */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 items-start lg:items-center">
          
          {/* SISI KIRI (61.8%): VISI & HEADLINE */}
          <div className="w-full lg:w-[61.8%] opacity-0 animate-fade-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              MRR Ecosystem Tools
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
              Senjata Rahasia <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Pekerja Kreatif.</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
              Kumpulan <span className="text-white font-bold">Micro-SaaS & Toolkit Gratis</span> yang dirancang untuk mengeliminasi hambatan teknis. Fokus pada kreativitas Anda, biar kami yang urus kompleksitasnya.
            </p>
          </div>

          {/* SISI KANAN (38.2%): SAFETY & PRIVACY GUIDE */}
          <div className="w-full lg:w-[38.2%] opacity-0 animate-fade-up delay-100">
            <div className="bg-gradient-to-br from-[#0A1329] to-[#030712] border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <ShieldIcon />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl leading-tight">Data Anda, <br/> Hak Anda.</h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0"><LockIcon /></div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <span className="text-white font-semibold">Zero Server-Side Storage:</span> Seluruh pemrosesan (seperti PDF CV) terjadi 100% di peramban (browser) Anda. Data tidak pernah menyentuh database kami.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0"><InfoIcon /></div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <span className="text-white font-semibold">Tips Optimal:</span> Gunakan <span className="text-cyan-400">Google Chrome</span> atau <span className="text-cyan-400">Safari Desktop</span> untuk hasil ekspor visual yang paling tajam dan presisi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TOOLKIT CONTENT (STAGGERED CATEGORIES)                    */}
        {/* ========================================================= */}
        <div className="space-y-32">
          {categories.map((category, index) => {
            const categoryTools = toolkits.filter(tool => tool.category === category);
            const delayClass = index === 0 ? 'delay-200' : 'delay-300';

            return (
              <div key={category} className={`opacity-0 animate-fade-up ${delayClass}`}>
                
                {/* CATEGORY HEADER */}
                <div className="flex items-center gap-6 mb-12 relative">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {category}
                    </h2>
                  </div>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                  
                  {/* Decorative number for category order */}
                  <span className="hidden md:block text-slate-800 font-black text-4xl select-none">
                    0{index + 1}
                  </span>
                </div>

                {/* TOOLS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* FOOTER PANDUAN EXTRA                                      */}
        {/* ========================================================= */}
        <div className="mt-32 pt-16 border-t border-white/5 opacity-0 animate-fade-up delay-300">
           <div className="bg-cyan-500/5 rounded-[2rem] p-8 md:p-12 border border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h4 className="text-white font-bold text-xl mb-3 uppercase tracking-wider">Punya Ide Toolkit Baru?</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Ekosistem ini akan terus tumbuh. Jika Anda butuh alat bantu tertentu yang belum ada di sini, jangan ragu untuk memberikan saran kepada saya melalui kontak di bawah.
                </p>
              </div>
              <a 
                href="mailto:hello@mrr.my.id" 
                className="px-8 py-4 bg-white text-[#030712] font-black rounded-xl hover:bg-cyan-400 hover:text-white transition-all shadow-xl"
              >
                Kirim Saran
              </a>
           </div>
        </div>

      </div>
    </div>
  );
}