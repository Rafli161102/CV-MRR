import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

export const metadata = {
  title: 'Toolkit Gratis | MRR Ecosystem',
  description: 'Kumpulan Micro-SaaS dan utilitas gratis untuk desainer, freelancer, dan pekerja kreatif persembahan Muhammad Rafli Ramadhan.',
};

export default function ToolkitPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Halaman (Typographic Hierarchy) */}
        <div className="max-w-3xl mb-16 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            MRR Ecosystem
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 tracking-tighter mb-6">
            Senjata Rahasia <br/> Pekerja Kreatif.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Kumpulan <span className="text-cyan-400 font-semibold">Micro-SaaS & Toolkit Gratis</span> yang dirancang khusus untuk mempercepat alur kerja Desainer Grafis, Freelancer, dan Komunitas. 100% berjalan di browser Anda tanpa menyimpan data privasi.
          </p>
        </div>

        {/* Grid Etalase Toolkit (Golden Ratio layout logic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {toolkits.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Background Hiasan Abstrak */}
        <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      </div>
    </div>
  );
}