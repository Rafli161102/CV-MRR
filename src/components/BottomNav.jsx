"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const getIconClass = (href) => {
    return pathname === href
      ? "text-cyan-400 scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
      : "text-slate-500 group-hover:text-white transition-all duration-300";
  };

  const getLabelClass = (href) => {
    return pathname === href
      ? "text-[9px] font-black tracking-[0.2em] uppercase text-cyan-400 mt-1.5 transition-all"
      : "text-[9px] font-bold tracking-[0.2em] uppercase text-slate-600 mt-1.5 group-hover:text-slate-300 transition-all";
  };

  return (
    <div className="show-in-pwa fixed bottom-0 left-0 w-full z-50">
      
      {/* Tactical Glass Background */}
      <div className="bg-[#03060a]/90 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] relative">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

        <div className="flex justify-around items-end h-[70px] px-4 max-w-md mx-auto pb-2">
          
          {/* TAB 1: EXPLORE */}
          <Link href="/toolkit" className="group flex flex-col items-center justify-center w-20 relative active:scale-95 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${getIconClass("/toolkit")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            <span className={getLabelClass("/toolkit")}>HUB</span>
          </Link>

          {/* TAB 2: STUDIO (CENTER FLAGSHIP) */}
          <Link href="/css-studio" className="group flex flex-col items-center justify-center relative w-20 scale-100 active:scale-95 transition-all duration-300 -mt-6">
            
            {/* Sci-Fi Center Button (Chamfered look via clip-path) */}
            <div className={`flex items-center justify-center w-14 h-14 relative z-10 transition-all duration-300 ${
              pathname === '/css-studio' 
              ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
              : 'bg-[#0f172a] text-cyan-400 border border-cyan-500/50 group-hover:bg-cyan-950'
            }`}
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} // Hexagon Shape
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
            </div>
            
            <span className={pathname === "/css-studio" ? "text-[10px] font-black tracking-[0.2em] uppercase text-cyan-400 mt-2 z-10" : "text-[9px] font-bold tracking-[0.2em] uppercase text-slate-500 mt-2 z-10 group-hover:text-cyan-400"}>
              ENGINE
            </span>
          </Link>

          {/* TAB 3: PROFILE */}
          <Link href="/toolkit/profile" className="group flex flex-col items-center justify-center w-20 relative pt-1 active:scale-95 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${getIconClass("/toolkit/profile")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            <span className={getLabelClass("/toolkit/profile")}>USER</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
