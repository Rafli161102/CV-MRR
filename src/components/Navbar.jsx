"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Efek transparan/glassmorphism saat halaman di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Daftar Menu Utama
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Portofolio', href: '/projects' },
    { name: 'Fotografi', href: '/photography' },
    { name: 'Tentang', href: '/about' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* LOGO MRR */}
        <Link href="/" className="relative z-50 group flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
            MRR<span className="text-cyan-500">.</span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* TOMBOL TOOLKIT (Special Highlight) */}
          <Link 
            href="/toolkit" 
            className="group relative px-5 py-2 rounded-full overflow-hidden"
          >
            {/* Background & Efek Hover Tombol Toolkit */}
            <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full group-hover:bg-cyan-500/20 transition-all duration-300"></div>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            
            <span className="relative z-10 flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              Toolkit ⚡
            </span>
          </Link>
        </nav>

        {/* TOMBOL MENU MOBILE (Hamburger) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-50 p-2 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            {isMobileMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

      </div>

      {/* DROPDOWN MENU MOBILE */}
      <div className={`md:hidden fixed inset-0 bg-[#030712]/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-8 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
        
        {/* Tombol Toolkit di Mobile */}
        <Link 
          href="/toolkit" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xl flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          Toolkit ⚡
        </Link>
      </div>
    </header>
  );
}