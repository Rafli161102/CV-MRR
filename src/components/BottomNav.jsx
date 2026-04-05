"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const getIconClass = (href) => {
    const isActive = pathname === href;
    return isActive
      ? "text-cyan-400 group-hover:scale-110 group-active:scale-95 transition-transform duration-200"
      : "text-slate-500 group-hover:text-white transition-all duration-200";
  };

  const getLabelClass = (href) => {
    const isActive = pathname === href;
    return isActive
      ? "text-[9px] font-bold tracking-widest uppercase text-cyan-400 mt-1"
      : "text-[9px] font-medium tracking-widest uppercase text-slate-500 mt-1 group-hover:text-white transition-all";
  };

  return (
    <div className="show-in-pwa fixed bottom-0 left-0 w-full z-50 animate-nav-slide-up">
      <div className="bg-[#050b14]/95 backdrop-blur-2xl border-t border-white/5 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Tinggi diturunkan dari h-20 menjadi h-16 agar minimalis */}
        <div className="flex justify-around items-center h-16 px-6">
          
          <Link href="/toolkit" className="group flex flex-col items-center justify-center w-16 relative">
            {/* KUNCI: Tambahkan w-6 h-6 agar ukuran ikon terkunci */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${getIconClass("/toolkit")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" /></svg>
            <span className={getLabelClass("/toolkit")}>Explore</span>
          </Link>

          <Link href="/toolkit/freelance-invoice" className="group flex flex-col items-center justify-center w-16 relative scale-100 active:scale-95 transition-transform">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[15px] opacity-20 animate-nav-pulse z-0 scale-75"></div>
            {/* Tombol tengah dikecilkan (p-3, -mt-6) */}
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-3 rounded-full text-white shadow-lg -mt-6 border-[4px] border-[#050b14] z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            </div>
            <span className={pathname === "/toolkit/freelance-invoice" ? "text-[9px] font-bold tracking-widest uppercase text-cyan-400 mt-1 z-10" : "text-[9px] font-medium tracking-widest uppercase text-slate-500 mt-1 z-10 group-hover:text-white transition-colors"}>Invoice</span>
          </Link>

          <Link href="/toolkit/profile" className="group flex flex-col items-center justify-center w-16 relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${getIconClass("/toolkit/profile")}`}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className={getLabelClass("/toolkit/profile")}>Profile</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
