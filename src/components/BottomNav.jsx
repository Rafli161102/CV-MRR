"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const getIconClass = (href) => {
    const isActive = pathname === href;
    return isActive
      ? "text-cyan-400 scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
      : "text-slate-500 group-hover:text-white transition-all duration-300";
  };

  const getLabelClass = (href) => {
    const isActive = pathname === href;
    return isActive
      ? "text-[9px] font-bold tracking-widest uppercase text-cyan-400 mt-1.5 transition-all"
      : "text-[9px] font-medium tracking-widest uppercase text-slate-500 mt-1.5 group-hover:text-white transition-all";
  };

  return (
    <div className="show-in-pwa fixed bottom-0 left-0 w-full z-50 animate-nav-slide-up">
      {/* Background yang lebih gelap dan blur tingkat tinggi */}
      <div className="bg-[#030712]/80 backdrop-blur-2xl border-t border-white/5 pb-[env(safe-area-inset-bottom)] shadow-[0_-20px_40px_rgba(0,0,0,0.6)]">
        
        <div className="flex justify-around items-center h-[72px] px-6 max-w-md mx-auto">
          
          {/* TAB KIRI: EXPLORE */}
          <Link href="/toolkit" className="group flex flex-col items-center justify-center w-16 relative pt-1 active:scale-95 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${getIconClass("/toolkit")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" /></svg>
            <span className={getLabelClass("/toolkit")}>Explore</span>
          </Link>

          {/* TAB TENGAH: STUDIO (Menggantikan Invoice) */}
          <Link href="/css-studio" className="group flex flex-col items-center justify-center w-20 relative scale-100 active:scale-95 transition-all duration-300">
            {/* Ambient Glow */}
            <div className={`absolute top-[-15px] rounded-full blur-[20px] w-12 h-12 z-0 transition-opacity duration-500 ${pathname === '/css-studio' ? 'bg-cyan-500 opacity-30 animate-pulse' : 'bg-transparent opacity-0'}`}></div>
            
            {/* Floating Minimalist Button */}
            <div className={`p-3.5 rounded-2xl shadow-xl -mt-7 border z-10 transition-all duration-300 ${
              pathname === '/css-studio' 
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_10px_20px_rgba(6,182,212,0.3)]' 
              : 'bg-[#111] text-cyan-400 border-white/5 group-hover:bg-[#1a1a1a] group-hover:border-white/10 group-hover:-translate-y-1'
            }`}>
              {/* Ikon Code / Studio */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
            </div>
            
            <span className={pathname === "/css-studio" ? "text-[9px] font-bold tracking-widest uppercase text-cyan-400 mt-2 z-10 transition-all" : "text-[9px] font-medium tracking-widest uppercase text-slate-500 mt-2 z-10 group-hover:text-white transition-all"}>Studio</span>
          </Link>

          {/* TAB KANAN: PROFILE */}
          <Link href="/toolkit/profile" className="group flex flex-col items-center justify-center w-16 relative pt-1 active:scale-95 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${getIconClass("/toolkit/profile")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className={getLabelClass("/toolkit/profile")}>Profile</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
