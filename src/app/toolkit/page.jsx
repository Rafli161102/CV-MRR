import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

export const metadata = {
  title: 'Toolkit Ekosistem | MRR',
  description: 'Kumpulan Micro-SaaS dan utilitas gratis untuk desainer persembahan Muhammad Rafli Ramadhan.',
};

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

export default function ToolkitPage() {
  const categories = [...new Set(toolkits.map(tool => tool.category))];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* HEADER GOLDEN RATIO */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 items-center">
          <div className="w-full lg:w-[61.8%]">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> MRR Ecosystem
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
              Senjata Rahasia <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pekerja Kreatif.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Kumpulan <span className="text-cyan-400 font-semibold">Micro-SaaS Gratis</span> untuk mempercepat alur kerja harian Anda tanpa ribet.
            </p>
          </div>

          <div className="w-full lg:w-[38.2%]">
            <div className="bg-[#0A1329]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"><ShieldIcon /></div>
                <h3 className="text-white font-bold text-lg leading-tight">100% Aman <br/> & Privat</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 italic">"Semua data diproses langsung di browser Anda. Kami tidak menyimpan informasi apapun di server kami."</p>
            </div>
          </div>
        </div>

        {/* KATEGORI - PERBAIKAN DIVIDER & SPACING */}
        <div className="space-y-24">
          {categories.map((category) => {
            const categoryTools = toolkits.filter(tool => tool.category === category);
            return (
              <div key={category} className="group">
                <div className="flex items-center gap-5 mb-10 overflow-hidden">
                  <h2 className="text-2xl font-black text-white tracking-tight shrink-0 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                    {category}
                  </h2>
                  <div className="h-[2px] flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}