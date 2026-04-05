import { toolkits } from '../../data/toolkitDB';
import ToolCard from '../../components/ToolCard';
import Link from 'next/link';

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

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* TOOLKIT */}
        <div className="space-y-32">
          {categories.map((category, catIndex) => {
            const categoryTools = toolkits.filter(tool => tool.category === category);
            return (
              <div key={category}>

                <div className="mb-12">
                  <h2 className="text-2xl font-black text-white">{category}</h2>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                  {/* TOOL DARI DATABASE */}
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}

                  {/* DEV VISUAL STUDIO CARD */}
                  {category === categories[0] && (
                    <Link href="/css-studio" className="group relative flex flex-col p-6 bg-gradient-to-br from-[#0a0f1c] to-[#050505] border border-cyan-500/30 hover:border-cyan-400 rounded-3xl transition-all duration-500 hover:-translate-y-2 shadow-xl">
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                          </svg>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black rounded-full">AI Hybrid</span>
                          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[9px] font-black rounded-full">Enterprise</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400">Dev Visual Studio</h3>
                      <p className="text-xs text-slate-400">
                        Laboratorium desain berbasis AI untuk UI, tipografi, dan pixel art.
                      </p>

                      <div className="mt-6 text-[10px] font-black text-cyan-500 uppercase">
                        Buka Workspace →
                      </div>

                    </Link>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}