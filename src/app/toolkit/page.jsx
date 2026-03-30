import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';

export const metadata = {
  title: 'Toolkit Ekosistem | MRR Digital Tools',
  description: 'Kumpulan Micro-SaaS gratis dan utilitas desain profesional untuk mempercepat workflow kreatif Anda.',
};

// =========================================================================
// IKON SVG PREMIUM UNTUK PRIVASI & TIPS
// =========================================================================
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export default function ToolkitPage() {
  const categories = [...new Set(toolkits.map(tool => tool.category))];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* ANIMASI KEYFRAMES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}} />

      {/* Decorative Background */}
      <div className="fixed top-0 right-0 w-[60vw] h-[60vw] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ========================================================= */}
        {/* HEADER SECTION (GOLDEN RATIO: 61.8% & 38.2%)              */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-32 items-start">
          
          {/* BAGIAN KIRI: 61.8% (Informasi Utama) */}
          <div className="w-full lg:w-[61.8%] reveal stagger-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              The Ecosystem
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.05]">
              Senjata Rahasia <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Pekerja Kreatif.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Eksplorasi kumpulan <span className="text-white">Micro-SaaS & Utilitas Digital</span> yang dirancang untuk menyederhanakan alur kerja desain, branding, dan manajemen komunitas Anda.
            </p>
          </div>

          {/* BAGIAN KANAN: 38.2% (Panel Keamanan & Panduan) */}
          <div className="w-full lg:w-[38.2%] reveal stagger-2">
            <div className="bg-gradient-to-br from-[#0A1329] to-[#030712] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                  <ShieldCheckIcon />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">Privasi Mutlak</h3>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Client-Side Logic</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1"><EyeSlashIcon /></div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Zero Data Storage:</strong> Kami tidak menyediakan database. Seluruh informasi yang Anda input tetap berada di memori browser Anda.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1"><LockIcon /></div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Keamanan Enkripsi:</strong> Tidak ada transmisi data pribadi ke server manapun. Privasi Anda adalah prioritas utama arsitektur kami.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[11px] text-slate-500 italic leading-relaxed">
                  *Gunakan browser Chrome, Safari, atau Edge versi terbaru untuk performa rendering PDF dan visual yang optimal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TOOLKIT CATEGORIES (STAGGERED RENDERING)                  */}
        {/* ========================================================= */}
        <div className="space-y-32">
          {categories.map((category, catIndex) => {
            const categoryTools = toolkits.filter(tool => tool.category === category);
            return (
              <div key={category} className={`reveal stagger-${catIndex + 3}`}>
                
                {/* Visual Category Header */}
                <div className="flex items-center gap-6 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase italic">
                      {category}
                    </h2>
                  </div>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                  <span className="text-[10px] font-bold text-slate-600 tracking-[0.3em] uppercase hidden sm:block">
                    {categoryTools.length} Tools Available
                  </span>
                </div>

                {/* Toolkit Grid */}
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
        {/* FOOTER RECOMMENDATIONS / UPCOMING TOOLS                   */}
        {/* ========================================================= */}
        <div className="mt-40 pt-20 border-t border-white/5 reveal stagger-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#050B18] rounded-[3rem] p-10 border border-white/5">
            <div>
              <h3 className="text-2xl font-black text-white mb-4">Punya Ide Toolkit Baru?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Ekosistem ini terus tumbuh berdasarkan kebutuhan komunitas. Jika Anda memiliki saran utilitas yang dapat mempermudah pekerjaan kreatif, mari diskusikan melalui WhatsApp.
              </p>
              <a href="https://wa.me/6285155020363" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors group">
                Ajukan Ide Toolkit
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Pro Tips & Guide</h4>
              <ul className="space-y-3 text-xs text-slate-400 list-disc pl-4">
                <li>Klik tombol <span className="text-cyan-500 font-bold">Akses Gratis</span> untuk membuka tools secara instan.</li>
                <li>Gunakan mode Desktop pada browser HP jika tampilan editor terasa terlalu sempit.</li>
                <li>Bookmark halaman ini (`mrr.my.id/toolkit`) untuk akses cepat toolkit harian Anda.</li>
                <li>Ikuti Instagram <span className="text-white">@img_ischeznut.jpg</span> untuk info update toolkit terbaru.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}