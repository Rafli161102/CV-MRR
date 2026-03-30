import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

export const metadata = {
  title: 'Toolkit Ekosistem | MRR',
  description: 'Kumpulan Micro-SaaS dan utilitas gratis untuk desainer, freelancer, dan pekerja kreatif persembahan Muhammad Rafli Ramadhan.',
};

// =========================================================================
// IKON SVG PROFESIONAL (Keamanan & Tips)
// =========================================================================
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-400 mt-0.5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a120.66 120.66 0 01-4.5 0m3.75 2.383a8.96 8.96 0 01-3 0M12 2.25a6.75 6.75 0 016.75 6.75c0 2.385-1.233 4.516-3.15 5.75m-7.2-5.75a6.75 6.75 0 00-6.75 6.75c0 2.385 1.233 4.516 3.15 5.75" />
  </svg>
);

export default function ToolkitPage() {
  // Mengelompokkan toolkit berdasarkan Kategori
  const categories = [...new Set(toolkits.map(tool => tool.category))];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* SUNTIKAN CSS ANIMASI KHUSUS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .anim-delay-100 { animation-delay: 100ms; }
        .anim-delay-200 { animation-delay: 200ms; }
        .anim-delay-300 { animation-delay: 300ms; }
      `}} />

      {/* Background Hiasan Abstrak */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ========================================================= */}
        {/* HEADER SECTION (GOLDEN RATIO: 61.8% & 38.2%)              */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 items-center">
          
          {/* KIRI: 61.8% (Judul & Deskripsi) */}
          <div className="w-full lg:w-[61.8%]">
            <div className="anim-fade-in-up inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              MRR Ecosystem
            </div>
            
            <h1 className="anim-fade-in-up anim-delay-100 text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
              Senjata Rahasia <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pekerja Kreatif.</span>
            </h1>
            
            <p className="anim-fade-in-up anim-delay-200 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Kumpulan <span className="text-cyan-400 font-semibold">Micro-SaaS & Utilitas Gratis</span> yang dirancang khusus untuk mempercepat alur kerja Desainer Grafis, Freelancer, dan Komunitas. 
            </p>
          </div>

          {/* KANAN: 38.2% (Kartu Keamanan & Panduan) */}
          <div className="w-full lg:w-[38.2%] anim-fade-in-up anim-delay-300">
            <div className="bg-[#0A1329]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
              
              {/* Efek Glow di dalam kartu privasi */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500"></div>

              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <ShieldCheckIcon />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">100% Aman & Privat</h3>
                  <p className="text-emerald-400/80 text-xs font-semibold tracking-wider uppercase">Local Processing</p>
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                <li className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                  <LightbulbIcon />
                  <span><strong>Tanpa Database:</strong> Semua alat (seperti CV Maker) memproses data langsung di dalam browser HP/Laptop Anda.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                  <LightbulbIcon />
                  <span><strong>Privasi Terjamin:</strong> Kami tidak pernah menyimpan, merekam, atau mencuri data pribadi Anda ke dalam server kami.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                  <LightbulbIcon />
                  <span><strong>Performa Optimal:</strong> Gunakan browser versi terbaru (Chrome/Safari) untuk pengalaman rendering PDF yang maksimal.</span>
                </li>
              </ul>

            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* GRID ETALASE TERKATEGORI (DIKELOMPOKKAN)                  */}
        {/* ========================================================= */}
        <div className="space-y-20">
          {categories.map((category, index) => {
            // Filter alat berdasarkan kategori saat ini
            const categoryTools = toolkits.filter(tool => tool.category === category);
            
            // Hitung delay animasi agar kategori berurutan munculnya
            const animationDelay = `anim-delay-${(index + 2) * 100}`; 

            return (
              <div key={category} className={`anim-fade-in-up ${animationDelay}`}>
                
                {/* Header Kategori */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight shrink-0">
                    {category}
                  </h2>
                  {/* Garis pemisah horizontal yang estetik */}
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
                </div>

                {/* Grid Kartu Toolkit untuk kategori ini */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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