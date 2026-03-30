import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

export const metadata = {
  title: 'Toolkit Ekosistem | MRR Digital Tools',
  description: 'Kumpulan Micro-SaaS dan utilitas gratis untuk desainer persembahan Muhammad Rafli Ramadhan.',
};

// =========================================================================
// IKON SVG PREMIUM & MINIMALIS
// =========================================================================
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-cyan-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export default function ToolkitPage() {
  const categories = [...new Set(toolkits.map(tool => tool.category))];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#030712]">
      
      {/* ANIMASI GLOBAL */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .reveal { animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
        .delay-4 { animation-delay: 400ms; }
      `}} />

      {/* BACKGROUND DECORATION */}
      <div className="fixed top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ========================================================= */}
        {/* HEADER: GOLDEN RATIO (61.8% | 38.2%)                      */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-32 items-start">
          
          {/* KIRI: 61.8% (THE MAIN CONTENT) */}
          <div className="w-full lg:w-[61.8%] reveal">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> 
              Digital Laboratory
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] lg:leading-[0.85]">
              Efisiensi <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">Tanpa Batas.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Kumpulan <span className="text-white">Micro-SaaS & Toolkit Eksklusif</span> yang dirancang untuk mengotomatisasi pekerjaan repetitif desainer, pembuat konten, dan teknisi web.
            </p>
          </div>

          {/* KANAN: 38.2% (TRUST & PRIVACY CARD) */}
          <div className="w-full lg:w-[38.2%] reveal delay-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0A1329]/90 backdrop-blur-2xl border border-white/10 rounded-[2.2rem] p-8 md:p-10 shadow-2xl overflow-hidden">
                
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <ShieldIcon />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl tracking-tight">Privasi Mutlak</h3>
                    <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Client-Side Engine</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <InfoIcon />
                    <p className="text-slate-400 text-sm leading-relaxed">
                      <strong className="text-slate-200">Zero Server Storage:</strong> Semua data diproses 100% di browser Anda. Kami tidak memiliki akses ke inputan Anda.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <InfoIcon />
                    <p className="text-slate-400 text-sm leading-relaxed">
                      <strong className="text-slate-200">Offline Ready:</strong> Setelah halaman dimuat, sebagian besar tools dapat bekerja tanpa koneksi internet.
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5">
                  <p className="text-[10px] text-slate-500 leading-relaxed font-semibold uppercase tracking-widest">
                    Direkomendasikan menggunakan Google Chrome atau Safari versi terbaru untuk performa PDF terbaik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* KATEGORI TOOLKIT (CATEGORIZED GRID)                        */}
        {/* ========================================================= */}
        <div className="space-y-32">
          {categories.map((category, idx) => {
            const categoryTools = toolkits.filter(tool => tool.category === category);
            return (
              <section key={category} className={`reveal delay-${idx + 3}`}>
                {/* CATEGORY HEADER */}
                <div className="flex items-center gap-6 mb-12">
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-2 h-8 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                      {category}
                    </h2>
                  </div>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                  <span className="text-[10px] font-bold text-slate-600 tracking-[0.3em] uppercase hidden sm:block">
                    {categoryTools.length} Modules Loaded
                  </span>
                </div>

                {/* TOOLKIT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}