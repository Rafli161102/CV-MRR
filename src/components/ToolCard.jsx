"use client";

import Link from 'next/link';

export default function ToolCard({ tool }) {
  const isActive = tool.status === 'active';

  const CardContent = (
    <div className={`relative h-full flex flex-col p-6 border transition-all duration-500 ${
      isActive
        ? 'bg-gradient-to-b from-white/[0.03] to-transparent border-white/10 hover:border-[#fffa00]/50 hover:bg-[#fffa00]/5 group'
        : 'bg-white/[0.01] border-white/5 opacity-70 grayscale-[30%]'
    }`}>
      
      {/* Efek Glow saat di-hover (Hanya untuk yang aktif) */}
      {isActive && (
        <div className="absolute inset-0 bg-[#fffa00]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}

      {/* Header Kartu: Ikon & Status */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3 border ${
          isActive
            ? 'bg-[#fffa00]/10 border-[#fffa00]/30 text-[#fffa00] group-hover:scale-110 transition-transform duration-300'
            : 'bg-white/5 border-white/10 text-slate-500'
        }`}>
          {tool.icon}
        </div>
        
        {/* Badge Status */}
        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border ${
          isActive
            ? 'bg-[#fffa00]/10 text-[#fffa00] border-[#fffa00]/20'
            : 'bg-slate-800/50 text-slate-400 border-slate-700/50'
        }`}>
          {isActive ? 'Akses Gratis' : 'Coming Soon'}
        </span>
      </div>

      {/* Konten Utama */}
      <div className="flex-grow relative z-10">
        <h3 className={`text-xl font-black tracking-tight mb-2 ${isActive ? 'text-white group-hover:text-[#fffa00] transition-colors' : 'text-slate-300'}`}>
          {tool.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
          {tool.description}
        </p>
      </div>

      {/* Footer Kartu: Kategori & Tags */}
      <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-slate-500">
          {tool.category}
        </span>
        
        {/* Tanda Panah Interaktif (Hanya untuk yang aktif) */}
        {isActive && (
          <div className="w-8 h-8 bg-[#fffa00]/10 flex items-center justify-center text-[#fffa00] group-hover:bg-[#fffa00] group-hover:text-black transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  // Jika aktif, bungkus dengan Link. Jika tidak, jadikan div biasa.
  return isActive ? (
    <Link href={tool.link} className="block h-full outline-none">
      {CardContent}
    </Link>
  ) : (
    <div className="block h-full cursor-not-allowed">
      {CardContent}
    </div>
  );
}