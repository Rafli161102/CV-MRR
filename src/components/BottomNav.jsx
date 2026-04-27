"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const getIconClass = (href) => {
    return pathname === href
      ? "text-[#fffa00] scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,250,0,0.8)]"
      : "text-[#666] group-hover:text-white transition-all duration-300";
  };

  const getLabelClass = (href) => {
    return pathname === href
      ? "text-[9px] font-black tracking-[0.2em] uppercase text-[#fffa00] mt-1.5 transition-all"
      : "text-[9px] font-bold tracking-[0.2em] uppercase text-[#444] mt-1.5 group-hover:text-[#888] transition-all";
  };

  return (
    // FIX 1: inset-x-0 memastikan lebar sempurna, transform-gpu memaksa HP merender via Hardware Acceleration agar tidak lag/lepas saat discroll
    <div className="show-in-pwa fixed inset-x-0 bottom-0 z-[90] select-none transform-gpu translate-z-0">
      
      {/* Tactical Glass Background */}
      <div className="w-full bg-[#03060a]/95 backdrop-blur-2xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] relative">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#fffa00] to-transparent"></div>

        {/* FIX 2: justify-center + w-full untuk menjamin semua elemen tertata rata tengah */}
        <div className="flex w-full justify-center items-end h-[68px] max-w-md mx-auto pb-1.5 px-2">
          
          {/* TAB 1: HUB (EXPLORE) */}
          <Link href="/toolkit" className="group flex-1 flex flex-col items-center justify-center h-full relative active:scale-95 transition-transform touch-manipulation">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${getIconClass("/toolkit")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            <span className={getLabelClass("/toolkit")}>HUB</span>
          </Link>

          {/* TAB 2: STUDIO (CENTER FLAGSHIP) */}
          <Link href="/css-studio" className="group flex-1 flex flex-col items-center justify-end h-full relative scale-100 active:scale-95 transition-all duration-300 touch-manipulation">
            
            {/* FIX 3: Tambahkan left-1/2 -translate-x-1/2 agar posisinya PASTI tepat di tengah mutlak! */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-[15px] w-12 h-12 -z-10 transition-opacity duration-500 ${pathname === '/css-studio' ? 'bg-[#fffa00] opacity-30 animate-pulse' : 'bg-transparent opacity-0'}`}></div>

            {/* FIX 3: Tambahkan left-1/2 -translate-x-1/2 di sini juga */}
            <div className={`flex items-center justify-center w-[52px] h-[52px] absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${
              pathname === '/css-studio'
              ? 'bg-[#fffa00] text-black shadow-[0_0_20px_rgba(255,250,0,0.5)]'
              : 'bg-[#0a0a0a] text-[#fffa00] border border-[#fffa00]/50 group-hover:bg-[#121212]'
            }`}
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
            </div>
            
            <span className={pathname === "/css-studio" ? "text-[10px] font-black tracking-[0.2em] uppercase text-[#fffa00] mt-2 z-10" : "text-[9px] font-bold tracking-[0.2em] uppercase text-[#666] mt-2 z-10 group-hover:text-[#fffa00]"}>
              ENGINE
            </span>
          </Link>

          {/* TAB 3: PROFILE (USER) */}
          <Link href="/toolkit/profile" className="group flex-1 flex flex-col items-center justify-center h-full relative active:scale-95 transition-transform touch-manipulation">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${getIconClass("/toolkit/profile")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            <span className={getLabelClass("/toolkit/profile")}>USER</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
